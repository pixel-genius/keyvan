import Typography from "@/components/components/atoms/typography";
import { Button } from "@/components/components/atoms/button";
import { Dispatch, SetStateAction } from "react";
import { formatPrice } from "@/lib/utils";
import BottomSheet from "./BottomSheet";
import Tomanicon from "@/icons/toman";
import Counter from "./Counter";

export type SelectedItemAddCartBottomSheet = {
  id: number;
  name: string;
  price: number;
  count?: number;
} | null;

interface AddToCartBottomSheetProps {
  isOpen: boolean;
  selectedItem: SelectedItemAddCartBottomSheet;
  disabled: boolean;
  setSelectedItem: Dispatch<SetStateAction<SelectedItemAddCartBottomSheet>>;
  onClose: () => void;
  onAddToCart: () => void;
}

const AddToCartBottomSheet = ({
  isOpen,
  onClose,
  selectedItem,
  setSelectedItem,
  disabled,
  onAddToCart,
}: AddToCartBottomSheetProps) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      {selectedItem && (
        <div className="pb-15">
          <hr className="w-1/2 mx-auto border-2 rounded-full mb-4" />
          <Typography
            variant="label/lg"
            weight="semi-bold"
            className="mb-4 text-center"
          >
            افزودن محصول به سبد
          </Typography>
          <Typography
            variant="label/sm"
            weight="bold"
            className="mb-4 text-center"
          >
            {selectedItem.name}
          </Typography>
          <div className="flex items-center justify-center gap-1 mb-4">
            <Typography variant="label/sm" weight="bold">
              {formatPrice(selectedItem.price)}
            </Typography>
            <Tomanicon size={18} />
          </div>
          <Counter
            onChange={(count) => {
              setSelectedItem((prev) => {
                if (!prev) return prev;
                return { ...prev, count };
              });
            }}
          />
          {/* <Textarea placeholder="توضیحات (اختیاری)" className="mb-4" /> */}
          <Button
            className="w-full"
            variant="primary"
            disabled={disabled}
            onClick={onAddToCart}
          >
            افزودن به سبد خرید
          </Button>
        </div>
      )}
    </BottomSheet>
  );
};
export default AddToCartBottomSheet;
