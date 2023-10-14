export type Result = {
  total: number;
  limit: number;
  page: number;
  items: Items[];
};

type Items = {
  interface: string;
  id: string;
  content: Content;
  authorities: Authorities;
  compression: Compression;
  grouping: Grouping[];
  royalty: Royalty;
  creators: Creators[];
  ownership: Ownership;
  supply: number | null;
  mutable: boolean;
  burnt: boolean;
};

type Content = {
  $schema: string;
  json_uri: string;
  files: File[];
  metadata: Metadadta;
  links: Links;
};

type File = {
  uri: string;
  cdn_uri: string;
  mime: string;
};

type Metadadta = {
  attributes: Attribute;
  description: string;
  name: string;
  symbol: string;
  token_standard: string;
};

type Attribute = {
  value: string;
  trait_type: string;
};

type Links = {
  external_url: string;
  image: string;
};

type Authorities = {
  address: string;
  scopes: string[];
};

type Compression = {
  eligible: boolean;
  compressed: boolean;
  data_hash: string;
  creator_hash: string;
  asset_hash: string;
  tree: string;
  seq: number;
  leaf_id: number;
};

type Grouping = {
  group_key: string;
  group_value: string;
};

type Royalty = {
  royalty_model: string;
  target: null;
  percent: number;
  basis_points: number;
  primary_sale_happened: boolean;
  locked: boolean;
};

type Creators = {
  address: string;
  share: number;
  verified: boolean;
};

type Ownership = {
  frozen: boolean;
  delegated: boolean;
  delegate: string;
  ownership_model: string;
  owner: string;
};
