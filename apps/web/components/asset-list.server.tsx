import type { Asset } from "../app/types";

const ITEMS_PER_PAGE = 10;
const url = "https://mainnet.helius-rpc.com/?api-key=9138758c-cbf0-4175-8382-0dd4b16d7992";

interface AssetResult {
  items?: Asset[];
  [key: string]: unknown;
}

async function fetchAssetsByGroup(page = 1): Promise<AssetResult> {
  console.log("Initiating fetch for page:", page); // Log when initiating the fetch

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
          limit: ITEMS_PER_PAGE,
        },
      }),
    });

    if (!response.ok) {
      console.error("Error response from server:", response.statusText); // Log if there's an HTTP error
      throw new Error("Failed to fetch from server.");
    }

    const data = await response.json() as { result?: AssetResult };
    console.log("Fetched data:", data); // Log the fetched data

    if (data.result) {
      console.log("Assets fetched successfully");
      return data.result;
    } else {
      console.warn("Result property missing from fetched data");
    }

    throw new Error("Failed to fetch assets.");
  } catch (error) {
    console.error("Error in fetchAssetsByGroup:", error); // Log any caught errors
    throw error;
  }
}

// Trigger the fetch to see the logs
fetchAssetsByGroup(1)
  .then(result => {
    console.log("Fetched assets:", result);
  })
  .catch(error => {
    console.error("Error fetching assets:", error);
  });

export default fetchAssetsByGroup;
