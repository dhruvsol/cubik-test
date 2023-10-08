import React, { useState, useEffect } from "react";
import type { Asset } from '../types';
import fetchAssetsByGroup from "./asset-list.server";

interface AssetListProps {
  page: number;
}

export default function AssetList({ page }: AssetListProps): JSX.Element {
  const [data, setData] = useState<Asset[]>([]);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        const assets = await fetchAssetsByGroup(page);
        if (Array.isArray(assets.items)) {
          setData(assets.items);
        }
      } catch (error) {  
        // console.error("Error fetching assets:", error);
      }
    }

    void fetchData();
  }, [page]);

  return (
    <div>
      <ul>
        {data.map((asset) => (
          <li key={asset.id}>{asset.name}</li>
        ))}
      </ul>
    </div>
  );
}
