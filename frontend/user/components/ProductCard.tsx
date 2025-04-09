import Image from "next/image";

interface ProductCardProps {
  brand: string;
  name: string;
  claimDate: string;
  image: string;
  isLimited: boolean;
}

export const ProductCard = ({
  brand,
  name,
  claimDate,
  image,
  isLimited,
}: ProductCardProps) => {
  return (
    <div className="rounded-md shadow-md flex flex-col">
      <div className="rounded-md w-[300px] h-[300px] relative flex justify-center items-center">
        <Image
          src={image}
          alt="Product Image"
          className="h-[300px] w-auto max-w-[300px] rounded-md"
          width="300"
          height="300"
        />
      </div>
      <div className="pt-2.5 px-[14px] pb-3">
        <span className="text-[#777777] capitalize">{brand}</span>
        <h3 className="mt-0.5 text-[#141414] capitalize text-lg font-bold">
          {name}
        </h3>
        <div className="mt-[18px]">
          <span className="text-[#777777]">{claimDate}</span>
          {/*{isLimited && <span>Limited Edition</span>}*/}
        </div>
      </div>
    </div>
  );
};
