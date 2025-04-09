"use client";

import { useState, useEffect } from "react";
import { Client, columns } from "./columns";
import { DataTable } from "./data-table";
import ClientSlideOver from "@/components/ClientSlideOver";
import axios from "axios";

async function getData() {
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

    const sortedClients = updatedClients.sort(
      (a, b) =>
        (new Date(b.users[0]?.createdAt) as any) -
        (new Date(a.users[0]?.createdAt) as any)
    );

    return sortedClients;
  } catch (error) {
    console.error("Error fetching client data:", error);
    return [];
  }
}

export default function ClientList() {
  const [selectedClient, setSelectedClient] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData().then((clients) => {
      console.log(clients);
      setData(clients);
    });
  }, []);

  const handleSelectedClient = (row) => {
    setSelectedClient(row);
    setIsOpen(!isOpen);
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable
        onSelectClient={handleSelectedClient}
        columns={columns}
        data={data}
      />
      <ClientSlideOver
        modalData={selectedClient}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}
