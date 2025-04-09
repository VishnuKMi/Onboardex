"use client";

import { useState } from "react";
import ProductSlideOver from "@/components/ProductSlideOver";
import ProductMint from "@/components/ProductMint";
import ProductListing from "@/components/ProductListing";
import { TokensDialog } from "@/components/TokensDialog";

export default function Dashboard() {
  const [selectedNft, setSelectedNft] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectedNft = (nft) => {
    setSelectedNft(nft);
    setIsOpen(!isOpen);
  };

  console.log(isOpen);

  return (
    <ProductListing onSelectNft={handleSelectedNft}>
      <TokensDialog />
      <ProductMint />
      <ProductSlideOver
        modalData={selectedNft}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </ProductListing>
  );
}
