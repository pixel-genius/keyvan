import { ShopProductDetailApiResponse } from "@/utils/apis/shop/products/[id]/GET/shopProductDetailApi";
import Typography from "@/components/components/atoms/typography";
import { Button } from "@/components/components/atoms/button";
import { Dispatch, SetStateAction } from "react";
import { formatPrice } from "@/lib/utils";
import BottomSheet from "./BottomSheet";
import Tomanicon from "@/icons/toman";
import Counter from "./Counter";

interface AddToCartBottomSheetProps {
  isOpen: boolean;
  selectedProduct:
    | (ShopProductDetailApiResponse & {
        count?: number;
      })
    | null;
  disabled: boolean;
  setSelectedProduct: Dispatch<
    SetStateAction<
      | (ShopProductDetailApiResponse & {
          count?: number;
        })
      | null
    >
  >;
  onClose: () => void;
  onAddToCart: () => void;
}

const AddToCartBottomSheet = ({
  isOpen,
  onClose,
  selectedProduct,
  setSelectedProduct,
  disabled,
  onAddToCart,
}: AddToCartBottomSheetProps) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      {selectedProduct && (
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
            {selectedProduct.name}
          </Typography>
          <div className="flex items-center justify-center gap-1 mb-4">
            <Typography variant="label/sm" weight="bold">
              {formatPrice(selectedProduct.latest_price)}
            </Typography>
            <Tomanicon size={18} />
          </div>
          <Counter
            onChange={(count) => {
              setSelectedProduct((prev) => {
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
