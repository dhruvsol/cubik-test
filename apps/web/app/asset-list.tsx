"use client";
import React, { useState, useEffect } from "react";
import { fetchAssetsByGroup } from "./components/asset-list.server";
import type { Asset } from './types';

interface AssetListProps {
  page: number;
}

export default function AssetList({ page }: AssetListProps): JSX.Element {
  const [data, setData] = useState<Asset[]>([]);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const assets = await fetchAssetsByGroup(page);
      setData(assets);
    }

    fetchData();
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
