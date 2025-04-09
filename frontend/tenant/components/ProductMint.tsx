"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SingleMintModal } from "@/components/SingleMintModal";
import { BatchMintModal } from "@/components/BatchMintModal";

export default function ProductMint() {
  const [selectedModal, setSelectedModal] = useState(null);
  const [open, setOpen] = useState(false);
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-[#00DEA3] hover:bg-[#00DEA3]">Add New</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DialogTrigger asChild>
              <DropdownMenuItem
                onClick={() => {
                  setOpen(true);
                  setSelectedModal("single");
                }}
              >
                Single Mint
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogTrigger asChild>
              <DropdownMenuItem onClick={() => setSelectedModal("batch")}>
                Batch Mint
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        {selectedModal === "single" && <SingleMintModal setOpen={setOpen} />}
        {selectedModal === "batch" && <BatchMintModal />}
      </DialogContent>
    </Dialog>
  );
}
