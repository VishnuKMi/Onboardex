import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { TransferForm } from "@/components/TransferForm";

const ProductSlideOver = ({ isOpen, setIsOpen, modalData }) => {
  const side = "right";

  const handleDelete = async () => {};

  return (
    <Sheet key={side} open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>{modalData?.productName}</SheetTitle>
        </SheetHeader>
        <div className="relative pb-[56.25%] rounded-md my-4">
          <img
            className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
            src={modalData?.imageUrl}
            alt="NFT"
          />
        </div>
        <SheetDescription className="min-h-[150px]">
          {modalData?.claimEmail && <p>Claimed by: {modalData.claimEmail}</p>}

          {!modalData?.isClaim && (
            <TransferForm serialId={modalData?.serialId} />
          )}
        </SheetDescription>
        {/*<SheetFooter>*/}
        {/*  <Button variant="destructive" onClick={() => handleDelete()}>*/}
        {/*    Delete*/}
        {/*  </Button>*/}
        {/*</SheetFooter>*/}
      </SheetContent>
    </Sheet>
  );
};

export default ProductSlideOver;
