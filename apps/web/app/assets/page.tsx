import Link from "next/link";
import { Button } from "ui";

interface AssetsProps {
  total: number;
  limit: number;
  page: number;
  items: {
    interface: string;
    id: string;
    content: Record<string, unknown>;
    authorities: Record<string, unknown>[];
    compression: Record<string, unknown>;
    grouping: Record<string, unknown>;
    royalty: Record<string, unknown>;
    creators: Record<string, unknown>[];
    ownership: Record<string, unknown>;
    supply: number;
    mutable: boolean;
    burnt: boolean;
  }[];
}

async function fetchAssets({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}): Promise<AssetsProps | undefined> {
  const apiKey: string | undefined = process.env.NEXT_PUBLIC_HELIUS_API_KEY;

  if (!apiKey) {
    throw new Error("API key is not defined.");
  }

  const url = `https://mainnet.helius-rpc.com/?api-key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "my-id",
        method: "getAssetsByGroup",
        params: {
          groupKey: "collection",
          groupValue: "J1S9H3QjnRtBbbuD4HjPV6RpRhwuk4zKbxsnCHuTgh9w",
          page,
          limit,
        },
      }),
    });

    const { result } = (await response.json()) as { result: AssetsProps };
    return result;
  } catch (error) {
    throw new Error(`Error fetching assets: ${error}`);
  }
}

export default async function Page({
  searchParams,
}: Record<string, string | string[] | undefined>): Promise<JSX.Element> {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const limit =
    typeof searchParams.page === "string" ? Number(searchParams.limit) : 10;

  const assets = await fetchAssets({ page, limit });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-slate-950 p-24">
      <div className="flex w-full max-w-5xl items-center justify-between font-mono text-sm">
        <div className="flex w-full flex-col">
          <h1 className="mb-10 text-center text-4xl font-bold text-gray-400">
            Asset List
          </h1>
          <ul className="flex flex-col gap-5">
            {assets?.items.map((asset) => (
              <li key={asset.id}>
                <div className="flex flex-col rounded-lg border border-slate-700 bg-slate-900 px-10 py-5">
                  <p>Interface: {asset.interface}</p>
                  <p>ID: {asset.id}</p>
                  <p>Supply: {asset.supply}</p>
                  <p>
                    Mutable:{" "}
                    <span
                      className={
                        asset.mutable ? "text-green-500" : "text-red-500"
                      }
                    >
                      {asset.mutable.toString()}
                    </span>
                  </p>
                  <p>
                    Burnt:{" "}
                    <span
                      className={
                        asset.burnt ? "text-green-500" : "text-red-500"
                      }
                    >
                      {asset.burnt.toString()}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-row justify-center gap-10 px-10">
            {page > 1 && (
              <Link href={`/assets?page=${page - 1}`}>
                <Button variant="secondary">Previous</Button>
              </Link>
            )}
            {assets?.items.length === assets?.limit && (
              <Link href={`/assets?page=${page + 1}`}>
                <Button variant="secondary">Next</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
