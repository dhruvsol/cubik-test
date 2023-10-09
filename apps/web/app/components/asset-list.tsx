"use client";
import React, { useState, useEffect } from "react";
import fetchAssetsByGroup from "./asset-list.server";
import { Button } from "ui-components";
import type { Asset } from "../types";

export default function AssetList(): JSX.Element {
  const [data, setData] = useState<Asset[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const assets = await fetchAssetsByGroup(currentPage);
        // console.log("Fetched assets for page:", currentPage, assets);
        if (Array.isArray(assets.items)) {
          setData(assets.items);
        }
      } catch (fetchError) {
        if (fetchError instanceof Error) {
          setError(fetchError.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    })().catch((err) => {
      console.error("An unexpected error occurred:", err);
    });
  }, [currentPage]);

  const handleNext = (): void => {
    console.log("Next button clicked.");
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = (): void => {
    console.log("Previous button clicked.");
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (error)
    return <div className="text-center my-5 text-red-500">Error: {error}</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-transparent text-white">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-transparent text-black rounded-lg shadow-md">
          <thead>
            <tr className="bg-transparent text-gray-500">
              <th className="px-4 py-2 border border-gray-400">ID</th>
              <th className="px-4 py-2 border border-gray-400">Owner</th>
              <th className="px-4 py-2 border border-gray-400">Compressed</th>
            </tr>
          </thead>
          <tbody>
            {data.map((asset) => (
              <tr key={asset.id} className="bg-transparent text-gray-200">
                <td className="px-4 py-2 border border-gray-400">{asset.id}</td>
                <td className="px-4 py-2 border border-gray-400">
                  {asset.ownership?.owner}
                </td>
                <td className="px-4 py-2 border border-gray-400">
                  {asset.compression?.compressed.toString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5 space-x-4">
      <Button className="mr-2" onClick={handlePrevious} variant="primary">
          Previous
        </Button>
        <Button variant="secondary" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
}
