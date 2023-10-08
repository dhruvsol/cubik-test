import React, { useState, useEffect } from "react";
import type { Asset } from '../types';
import fetchAssetsByGroup from "./asset-list.server";

interface AssetListProps {
  page: number;
}

export default function AssetList({ page }: AssetListProps): JSX.Element {
  const [data, setData] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData(): Promise<void> {
        try {
            const assets = await fetchAssetsByGroup(page);
            if (assets && Array.isArray(assets.items)) {
                setData(assets.items);
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unexpected error occurred.');
            }
        }
    }
    fetchData();
}, [page]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
