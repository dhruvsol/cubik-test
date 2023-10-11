import Link from "next/link";
import clsx from "clsx";
import { Button } from "ui";
import { Result } from "./utils/types";
import Image from "next/image";

const url =
  "https://mainnet.helius-rpc.com/?api-key=7577dff3-a00f-4d74-a7d2-83661e19fe7c";

export const getAssetsByGroup = async ({ page, limit }): Promise<Result> => {
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
        page: page,
        limit: limit,
      },
    }),
  });
  const { result } = await response.json();
  console.log("royalty", result.items[9].ownership);
  return result;
};

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const limit =
    typeof searchParams.limit === "string" ? Number(searchParams.limit) : 10;

  console.log(searchParams);
  const response = await getAssetsByGroup({ page, limit });
  console.log("RESPONSEE", response);
  return (
    <main className="flex min-h-screen flex-col items-center w-full p-24 max-w-3xl">
      <div className="flex space-x-6">
        <Button>
          <Link
            href={{
              pathname: "/",
              query: {
                page: page > 1 ? page - 1 : 1,
              },
            }}
            className={clsx(page <= 1 && "pointer-events-none opacity-50")}
          >
            Previous
          </Link>
        </Button>
        <Button>
          <Link
            href={{
              pathname: "/",
              query: {
                page: page + 1,
              },
            }}
            className={clsx(
              response.items.length < 10 && "pointer-events-none opacity-50"
            )}
          >
            Next
          </Link>
        </Button>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 place-items-center mt-8">
        {response.items.map((item: any) => (
          <div key={item.id} className="flex flex-col items-center">
            <div>{item.content.metadata.name}</div>
            <Image
              alt=""
              src={item.content.files[0].uri}
              width={80}
              height={80}
              priority={true}
              className="mt-4"
            />
            <br />
          </div>
        ))}
      </div>
    </main>
  );
}
