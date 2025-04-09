"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { Loader, Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ClaimModal from "@/components/ClaimModal";

export default function Transactions() {
  const { data: session } = useSession();
  const { data, error, isLoading, mutate } = useSWR(
    // @ts-ignore
    ["/users/claims", session?.accessToken],
    fetcher
  );
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedRowData, setSelectedRowData] = React.useState<any>(null);

  return (
    <div>
      <h1 className="text-[#141414] mb-[50px] text-2xl font-semibold font-poppins">
        Claim History
      </h1>
      {isLoading && (
        <div className="flex justify-center mt-[200px]">
          <Loader className="h-20 w-20 animate-spin" color="#5151D4" />
        </div>
      )}
      {!isLoading && data && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead className="w-[130px]">DATE</TableHead>
              <TableHead className="w-[450px]">PRODUCT</TableHead>
              <TableHead className="w-[130px]">STATUS</TableHead>
              <TableHead className="w-[130px]">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((claim, index) => (
              <TableRow key={claim.id}>
                <TableCell className="w-[50px]">{index + 1}</TableCell>
                <TableCell className="w-[130px]">{claim.createdAt}</TableCell>
                <TableCell className="w-[450px] flex items-center gap-x-4">
                  <Image
                    src={claim.product.imageUrl}
                    alt={claim.product.name}
                    width="40"
                    height="40"
                  />
                  <span>{claim.product.name}</span>
                </TableCell>
                <TableCell className="w-[130px]">
                  <Badge
                    variant={claim.status === "PENDING" ? "warning" : "success"}
                  >
                    {claim.status}
                  </Badge>
                </TableCell>
                <TableCell className="w-[130px]">
                  {claim.status === "PENDING" && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setSelectedRowData(claim);
                        setIsModalOpen(true);
                      }}
                    >
                      Claim
                    </Button>
                  )}
                  {claim.status === "CLAIMED" && (
                    <Button variant="primary" size="sm">
                      Share
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {isModalOpen && (
        <ClaimModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          refreshClaims={mutate}
          data={selectedRowData}
        />
      )}
    </div>
  );
}
