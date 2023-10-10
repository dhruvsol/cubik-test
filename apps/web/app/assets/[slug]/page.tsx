"use server";
import { Response, Result } from "../../../lib/types";
import {Button} from "@ui/components/button";
import Image from 'next/image';
import Link from "next/link";

export default async function Page({ params, searchParams, }: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const url = `https://rpc.helius.xyz/?api-key=${process.env.HELIUS_API_KEY}`
    let assetList: Result[] = [];
    let page = params.slug as unknown as number
    async function fetchPage(page: number): Promise<Result[]> {
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
                    limit: 10,
                },
            }),
        });
        const { result } = await response.json();
        return result?.items || [];
    }
    const results = await fetchPage(Number(page));
    assetList = results.flat();
    const response = {
        totalResults: assetList.length,
        results: assetList,
        page: 1,
    } as Response;

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {response?.results?.map((data, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-4">
                        <Image src={data!.content!.files![0].uri!} width={50} height={50} alt="Image" className="w-full mb-4" />
                        <h2 className="text-xl font-bold mb-2">{data?.content?.metadata?.name}</h2>
                        <p className="text-gray-500 mb-4">{data?.content?.metadata?.description}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {data?.content?.metadata?.attributes?.map((attribute, index) => (
                                <div key={index} className="bg-gray-100 p-2 rounded-lg">
                                    <p className="text-gray-500">{attribute.trait_type}</p>
                                    <p className="font-bold">{attribute.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="fixed bottom-0 left-0 right-0 flex justify-center items-center bg-gray-200 p-4 gap-2">
                {Number(page) !== 1 && <Link href={`/assets/${Number(page) - 1}`}><Button className="border border-black" variant="outline">Previous (Page {Number(page) - 1})</Button></Link>}
                <Link href={`/assets/${Number(page) + 1}`}><Button>Next (Page {Number(page) + 1})</Button></Link>
            </div>
        </>
    )
}
