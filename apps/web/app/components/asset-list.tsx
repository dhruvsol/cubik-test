"use client";
import React, { useState, useEffect } from "react";
import type { Asset } from '../types';
import fetchAssetsByGroup from "./asset-list.server";

export default function AssetList(): JSX.Element {
  const [data, setData] = useState<Asset[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData(): Promise<void> {
        try {
            const assets = await fetchAssetsByGroup(currentPage);
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
}, [currentPage]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <ul>
        {data.map((asset) => (
          <li key={asset.id}>{asset.name}</li>
        ))}
      </ul>
      <div className={`mt-8 flex justify-between items-center`}>
        <button
          className={`px-4 py-2 rounded ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          disabled={currentPage === 1}
          onClick={() => {
            setCurrentPage((prev) => prev - 1);
          }}
          type="button"
        >
          Previous
        </button>
        <span className="text-lg">{`Page ${currentPage}`}</span>
        <button
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => {
            setCurrentPage((prev) => prev + 1);
          }}
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
}
