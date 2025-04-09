"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ClientListCard() {
  const [topClients, setTopClients] = useState([
    { address: "", name: "", mints: 0, purchases: 0, transfers: 0 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/admin/tenants", {
          baseURL: process.env.NEXT_PUBLIC_API_URL,
        });

        const updatedClients = response.data.map((client) => {
          const analytics = client.products.reduce(
            (acc, product) => {
              const { nft } = product;
              const { claim } = nft;

              acc.mints += 1;
              if (claim) {
                acc.purchases += 1;
                if (claim.isClaimed) {
                  acc.transfers += 1;
                }
              }

              return acc;
            },
            {
              mints: 0,
              purchases: 0,
              transfers: 0,
            }
          );
          return { ...client, ...analytics };
        });

        const sortedClients = updatedClients.sort((a, b) => {
          const sumA = a.mints + a.transfers + a.purchases;
          const sumB = b.mints + b.transfers + b.purchases;
          return sumB - sumA;
        });

        const top5Clients = sortedClients.slice(0, 5);
        setTopClients(top5Clients);
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 bg-white shadow-lg rounded">
      <h3 className="font-semibold text-base mb-6">TOP CLIENTS</h3>

      <div className="block w-full overflow-x-auto">
        {topClients?.length > 0 ? (
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Client
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Mints
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Purchases
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Transfers
                </th>
              </tr>
            </thead>
            <tbody>
              {topClients?.map((client, index) => (
                <tr key={index}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left uppercase">
                    {client.name}
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {client.mints}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {client.purchases}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {client.transfers}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center items-center h-28">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        )}
      </div>
    </div>
  );
}
