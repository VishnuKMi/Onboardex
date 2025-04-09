"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { Loader } from "lucide-react";
import Confetti from "./Confetti";

export default function ClaimModal({
  isModalOpen,
  setIsModalOpen,
  data,
  refreshClaims,
}) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSuccessfulClaim, setIsSuccessfulClaim] = useState(false);

  async function handleClaim(claimId) {
    setLoading(true);
    const response = await axios.post(
      "users/transfer",
      { claimId },
      {
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
          // @ts-ignore
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    setLoading(false);
    if (response.status === 201 && response.data.success) {
      toast({
        title: "NFT Claimed Successfully",
        description: "Your have claimed your NFT successfully.",
      });
      setShowConfetti(true);
      setIsSuccessfulClaim(true);
      refreshClaims();
    } else {
      toast({
        title: "Something went wrong",
        description: response.data.message,
        variant: "destructive",
      });
    }
  }

  return (
    <div>
      <Dialog onOpenChange={setIsModalOpen} open={isModalOpen}>
        {data && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Claim your NFT 🎉</DialogTitle>
              <DialogDescription>
                <div className="relative bg-landing text-white text-center rounded-lg mt-4 pt-4 pb-16 mb-16">
                  <div className="py-2 text-xl font-bold z-50">
                    {data.product.name}
                  </div>
                  <div className="mb-4 px-4 text-sm z-50">
                    {data.product.description}
                  </div>
                  <div
                    className="absolute left-1/2 -translate-x-1/2"
                    style={{ maxWidth: "100%" }}
                  >
                    <img
                      src={data.product.imageUrl}
                      className="rounded-full z-50 h-36 w-auto"
                      alt="NFT Image"
                    />
                  </div>
                  <div className="absolute -bottom-[20%] left-[36%] h-20 w-32 bg-white rounded-full blur-3xl z-0"></div>
                </div>
              </DialogDescription>
            </DialogHeader>
            {/* <DialogFooter> */}
            <div className="flex justify-center items-center mt-12">
              {!isSuccessfulClaim ? (
                <Button
                  disabled={loading}
                  onClick={() => handleClaim(data?.id)}
                >
                  {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                  Claim
                </Button>
              ) : (
                <Button onClick={() => setIsModalOpen(false)}>Close</Button>
              )}
            </div>
            {/* </DialogFooter> */}
          </DialogContent>
        )}
      </Dialog>
      {showConfetti && <Confetti />}
    </div>
  );
}
