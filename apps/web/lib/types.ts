export type Response = {
    totalResults?: number;
    results?:      Result[];
    page: number;
}

export type Result = {
    interface?:   string;
    id?:          string;
    content?:     Content;
    authorities?: Authority[];
    compression?: Compression;
    grouping?:    Grouping[];
    royalty?:     Royalty;
    creators?:    Creator[];
    ownership?:   Ownership;
    supply?:      null;
    mutable?:     boolean;
    burnt?:       boolean;
}

export type Authority = {
    address?: string;
    scopes?:  string[];
}

export type Compression = {
    eligible?:     boolean;
    compressed?:   boolean;
    data_hash?:    string;
    creator_hash?: string;
    asset_hash?:   string;
    tree?:         string;
    seq?:          number;
    leaf_id?:      number;
}

export type Content = {
    $schema?:  string;
    json_uri?: string;
    files?:    File[];
    metadata?: Metadata;
    links?:    Links;
}

export type File = {
    uri?:     string;
    cdn_uri?: string;
    mime?:    string;
}

export type Links = {
    external_url?: string;
    image?:        string;
}

export type Metadata = {
    attributes?:     Attribute[];
    description?:    string;
    name?:           string;
    symbol?:         Symbol;
    token_standard?: string;
}

export type Attribute = {
    value?:      string;
    trait_type?: string;
}

export type Creator = {
    address?:  string;
    share?:    number;
    verified?: boolean;
}

export type Grouping = {
    group_key?:   string;
    group_value?: string;
}

export type Ownership = {
    frozen?:          boolean;
    delegated?:       boolean;
    delegate?:        null | string;
    ownership_model?: string;
    owner?:           string;
}

export type Royalty = {
    royalty_model?:         string;
    target?:                null;
    percent?:               number;
    basis_points?:          number;
    primary_sale_happened?: boolean;
    locked?:                boolean;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toResponse(json: string): Response {
        return cast(JSON.parse(json), r("Response"));
    }

    public static responseToJson(value: Response): string {
        return JSON.stringify(uncast(value, r("Response")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
                : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
                    : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Response": o([
        { json: "totalResults", js: "totalResults", typ: u(undefined, 0) },
        { json: "results", js: "results", typ: u(undefined, a(r("Result"))) },
    ], false),
    "Result": o([
        { json: "interface", js: "interface", typ: u(undefined, r("Interface")) },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "content", js: "content", typ: u(undefined, r("Content")) },
        { json: "authorities", js: "authorities", typ: u(undefined, a(r("Authority"))) },
        { json: "compression", js: "compression", typ: u(undefined, r("Compression")) },
        { json: "grouping", js: "grouping", typ: u(undefined, a(r("Grouping"))) },
        { json: "royalty", js: "royalty", typ: u(undefined, r("Royalty")) },
        { json: "creators", js: "creators", typ: u(undefined, a(r("Creator"))) },
        { json: "ownership", js: "ownership", typ: u(undefined, r("Ownership")) },
        { json: "supply", js: "supply", typ: u(undefined, null) },
        { json: "mutable", js: "mutable", typ: u(undefined, true) },
        { json: "burnt", js: "burnt", typ: u(undefined, true) },
    ], false),
    "Authority": o([
        { json: "address", js: "address", typ: u(undefined, r("Address")) },
        { json: "scopes", js: "scopes", typ: u(undefined, a(r("Scope"))) },
    ], false),
    "Compression": o([
        { json: "eligible", js: "eligible", typ: u(undefined, true) },
        { json: "compressed", js: "compressed", typ: u(undefined, true) },
        { json: "data_hash", js: "data_hash", typ: u(undefined, "") },
        { json: "creator_hash", js: "creator_hash", typ: u(undefined, "") },
        { json: "asset_hash", js: "asset_hash", typ: u(undefined, "") },
        { json: "tree", js: "tree", typ: u(undefined, "") },
        { json: "seq", js: "seq", typ: u(undefined, 0) },
        { json: "leaf_id", js: "leaf_id", typ: u(undefined, 0) },
    ], false),
    "Content": o([
        { json: "$schema", js: "$schema", typ: u(undefined, "") },
        { json: "json_uri", js: "json_uri", typ: u(undefined, "") },
        { json: "files", js: "files", typ: u(undefined, a(r("File"))) },
        { json: "metadata", js: "metadata", typ: u(undefined, r("Metadata")) },
        { json: "links", js: "links", typ: u(undefined, r("Links")) },
    ], false),
    "File": o([
        { json: "uri", js: "uri", typ: u(undefined, "") },
        { json: "cdn_uri", js: "cdn_uri", typ: u(undefined, "") },
        { json: "mime", js: "mime", typ: u(undefined, r("MIME")) },
    ], false),
    "Links": o([
        { json: "external_url", js: "external_url", typ: u(undefined, "") },
        { json: "image", js: "image", typ: u(undefined, "") },
    ], false),
    "Metadata": o([
        { json: "attributes", js: "attributes", typ: u(undefined, a(r("Attribute"))) },
        { json: "description", js: "description", typ: u(undefined, r("Description")) },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "symbol", js: "symbol", typ: u(undefined, r("Symbol")) },
        { json: "token_standard", js: "token_standard", typ: u(undefined, r("TokenStandard")) },
    ], false),
    "Attribute": o([
        { json: "value", js: "value", typ: u(undefined, "") },
        { json: "trait_type", js: "trait_type", typ: u(undefined, "") },
    ], false),
    "Creator": o([
        { json: "address", js: "address", typ: u(undefined, r("Address")) },
        { json: "share", js: "share", typ: u(undefined, 0) },
        { json: "verified", js: "verified", typ: u(undefined, true) },
    ], false),
    "Grouping": o([
        { json: "group_key", js: "group_key", typ: u(undefined, r("GroupKey")) },
        { json: "group_value", js: "group_value", typ: u(undefined, r("GroupValue")) },
    ], false),
    "Ownership": o([
        { json: "frozen", js: "frozen", typ: u(undefined, true) },
        { json: "delegated", js: "delegated", typ: u(undefined, true) },
        { json: "delegate", js: "delegate", typ: u(undefined, u(null, "")) },
        { json: "ownership_model", js: "ownership_model", typ: u(undefined, r("OwnershipModel")) },
        { json: "owner", js: "owner", typ: u(undefined, "") },
    ], false),
    "Royalty": o([
        { json: "royalty_model", js: "royalty_model", typ: u(undefined, r("RoyaltyModel")) },
        { json: "target", js: "target", typ: u(undefined, null) },
        { json: "percent", js: "percent", typ: u(undefined, 3.14) },
        { json: "basis_points", js: "basis_points", typ: u(undefined, 0) },
        { json: "primary_sale_happened", js: "primary_sale_happened", typ: u(undefined, true) },
        { json: "locked", js: "locked", typ: u(undefined, true) },
    ], false),
    "Address": [
        "2RtGg6fsFiiF1EQzHqbd66AhW7R5bWeQGpTbv2UMkCdW",
        "5XvhfmRjwXkGp3jHGmaKpqeerNYjkuZZBYLVQYdeVcRv",
    ],
    "Scope": [
        "full",
    ],
    "MIME": [
        "image/png",
    ],
    "Description": [
        "Fock it.",
    ],
    "Symbol": [
        "MAD",
    ],
    "TokenStandard": [
        "ProgrammableNonFungible",
    ],
    "GroupKey": [
        "collection",
    ],
    "GroupValue": [
        "J1S9H3QjnRtBbbuD4HjPV6RpRhwuk4zKbxsnCHuTgh9w",
    ],
    "Interface": [
        "Custom",
    ],
    "OwnershipModel": [
        "single",
    ],
    "RoyaltyModel": [
        "creators",
    ],
};
