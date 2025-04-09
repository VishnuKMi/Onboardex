"use client";

import { ProductCard } from "@/components/ProductCard";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader } from "lucide-react";
import React from "react";

export default function Dashboard() {
  const { data: session } = useSession();

  const { data, error, isLoading, mutate } = useSWR(
    // @ts-ignore
    [`/users/claims?claimed=${true}`, session?.accessToken],
    fetcher
  );

  // @ts-ignore
  if (!session?.accessToken) return null;

  return (
    <div>
      <h1 className="text-[#141414] text-2xl font-semibold font-poppins">
        Dashboard
      </h1>
      {isLoading ? (
        <div className="flex justify-center mt-[200px]">
          <Loader className="h-20 w-20 animate-spin" color="#5151D4" />
        </div>
      ) : data && data.length > 0 ? (
        <div className="flex flex-wrap gap-[30px] mt-12">
          {data?.map((claim) => (
            <ProductCard
              brand={claim.product.brand}
              name={claim.product.name}
              claimDate={claim.createdAt}
              image={claim.product.imageUrl}
              isLimited={false}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[400px]">
          <h1 className="text-[#141414] text-2xl font-semibold font-poppins">
            No Digital collectibles found
          </h1>
          <p className="text-[#777777] mt-2.5">
            You have not claimed any digital collectibles yet.
          </p>
          <div className="flex gap-x-4">
            <Button variant="outline" className="mt-4" asChild>
              <Link href="/">Explore</Link>
            </Button>
            <Button variant="primary" className="mt-4" asChild>
              <Link href="/profile/claims">Claim</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
