import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export default function HomePage() {
  return (
    <div>
      <div className="relative">
        <Image
          src="/hero-teaser.png"
          alt="Hero Teaser"
          width="1440"
          height="400"
          className="w-full"
        />
        <div className="absolute top-[125px] left-[80px]">
          <h1 className="font-bold text-[54px] leading-[65px] text-white max-w-[500px]">
            Discover Timeless Luxury!
          </h1>
          <p className="text-white mt-2.5">
            Unlock Exclusive NFTs with Every Purchase!
          </p>

          <div className="mt-[64px] flex gap-x-4">
            <Button size="lg" variant="secondary" className="flex gap-x-2">
              Buy Now
              <ShoppingBag />
            </Button>
            <Button size="lg" variant="outline" className="flex gap-x-2">
              Explore
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
