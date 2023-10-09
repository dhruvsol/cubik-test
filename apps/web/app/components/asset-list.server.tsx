import type { Asset } from "../types";

const ITEMS_PER_PAGE = 10;
const url = "https://mainnet.helius-rpc.com/?api-key=9138758c-cbf0-4175-8382-0dd4b16d7992";

interface AssetResult {
  items?: Asset[];
  [key: string]: unknown;
}

async function fetchAssetsByGroup(page = 1): Promise<AssetResult> {
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
        limit: ITEMS_PER_PAGE,
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch from server.");
  }

  const data = await response.json() as { result?: AssetResult };

  if (data.result) {
    console.log("Assets fetched successfully");
    return data.result;
  }

  console.warn("Result property missing from fetched data");
  throw new Error("Failed to fetch assets.");
}


// fetchAssetsByGroup(1)
//   .then(result => {
//     console.log("Fetched assets:", result);
//   })
//   .catch(error => {
//     console.error("Error fetching assets:", error);
//   });

export default fetchAssetsByGroup;
