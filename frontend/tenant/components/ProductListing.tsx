"use client";

import React, { useEffect, useState } from "react";
import { NftDetail } from "@/types/nft-detail";
import LoadingSpinner from "@/modules/common/icons/loading-spinner";
import { Pagination } from "@/modules/common/components";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";

type LoadNftProps = {
  onSelectNft?: (nftData: NftDetail) => void;
  children?: React.ReactNode;
};

const ProductListing: React.FC<LoadNftProps> = ({ onSelectNft, children }) => {
  const [allNFTs, setAllNFTs] = useState<NftDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredNFTs, setFilteredNFTs] = useState<NftDetail[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: session } = useSession();

  const handleSearchInput = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const response = await axios.get("tenants/products", {
          baseURL: process.env.NEXT_PUBLIC_API_URL,
          headers: {
            // @ts-ignore
            Authorization: `Bearer ${session.accessToken}`,
          },
        });

        const result = await response.data;
        if (result.data) {
          setAllNFTs(result.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      }
    };

    fetchNFTs();
  }, [session]);

  const handleSelection = (nft: NftDetail) => {
    onSelectNft(nft);
  };

  useEffect(() => {
    const filterNFTs = () => {
      const filteredNFTs = allNFTs?.filter((metadata) => {
        return metadata.productName
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      });
      setFilteredNFTs(filteredNFTs);
    };

    filterNFTs();
  }, [searchQuery, allNFTs]);

  const itemsPerPage = 8;
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentNFTs = filteredNFTs.slice(firstItemIndex, lastItemIndex);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="text-center">
        <LoadingSpinner className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" />
      </div>
    );
  }

  return (
    <div className="bg-white mt-4 p-6 rounded-lg shadow-md relative">
      <div className="flex flex-col justify-between gap-y-6">
        <div className="flex justify-between">
          <h3 className="text-lg font-bold">Products</h3>
          <div className="flex items-center justify-end gap-2">
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                className="px-3 py-2 w-80"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchInput}
              />
              <Button className="px-3 py-2 bg-[#00DEA3] hover:bg-[#00DEA3]">
                <Search />
              </Button>
            </div>
            {children}
          </div>
        </div>
        <div className="grid grid-cols-4 place-items-center gap-4">
          {currentNFTs.length > 0 ? (
            currentNFTs.map((nft) => (
              <div
                className="border bodyColor p-4 rounded-md cursor-pointer w-full h-full"
                key={nft.id}
                onClick={() => handleSelection(nft)}
              >
                <div className="rounded-md overflow-hidden h-40">
                  <img
                    className="w-full h-full object-cover"
                    src={nft.imageUrl}
                    alt="NFT"
                  />
                </div>
                <div className="mt-2">
                  <div className="flex justify-between mt-4">
                    <p className="capitalize">{nft.productName}</p>
                    <Badge variant="success">{nft?.status}</Badge>
                  </div>
                  <p className="text-xs text-gray-400">{nft.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No NFTs available</p>
          )}
        </div>
        <Pagination
          className=""
          itemsPerPage={8}
          totalItems={allNFTs?.length}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default ProductListing;
