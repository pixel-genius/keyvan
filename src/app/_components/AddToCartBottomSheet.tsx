import {
  cn,
  formatPrice,
  toEnglishDigits,
  toPersianNumbers,
} from "@/lib/utils";
import { ORDERTYPE } from "@/utils/apis/shop/cart/add/POST/shopCartAddPostApi";
import Typography from "@/components/components/atoms/typography";
import { Button } from "@/components/components/atoms/button";
import { Dispatch, SetStateAction, useState } from "react";
import BottomSheet from "./BottomSheet";
import Tomanicon from "@/icons/toman";
import Counter from "./Counter";

export type SelectedItemAddCartBottomSheet = {
  id: number;
  name: string;
  price: number;
  count?: number;
  order_type?: ORDERTYPE;
  suggested_price?: string | number | null;
} | null;

interface AddToCartBottomSheetProps {
  isOpen: boolean;
  selectedItem: SelectedItemAddCartBottomSheet;
  disabled: boolean;
  setSelectedItem: Dispatch<SetStateAction<SelectedItemAddCartBottomSheet>>;
  onClose: () => void;
  onAddToCart: (order_type: ORDERTYPE) => void;
}

const AddToCartBottomSheet = ({
  isOpen,
  onClose,
  selectedItem,
  setSelectedItem,
  disabled,
  onAddToCart,
}: AddToCartBottomSheetProps) => {
  const [tab, setTab] = useState<ORDERTYPE>("buy");

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      {selectedItem && (
        <div className="pb-15">
          <hr className="w-1/2 mx-auto border-2 rounded-full mb-4" />
          <div className="flex items-center mb-4 gap-2" dir="rtl">
            <Button
              onClick={() => {
                if (tab !== "buy") setTab("buy");
              }}
              className={cn(
                "w-full",
                tab === "buy"
                  ? "!bg-green-100 !text-green-500 font-bold text-lg"
                  : "",
              )}
              variant="secondary"
            >
              خرید
            </Button>
            <Button
              onClick={() => {
                if (tab !== "sell") setTab("sell");
              }}
              className={cn(
                "w-full",
                tab === "sell" ? "!bg-red-100 !text-red-500 text-lg" : "",
              )}
              variant="secondary"
            >
              فروش
            </Button>
          </div>
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
          <input
            name="suggested_price"
            dir="rtl"
            className="w-full border mb-6 rounded px-3 py-2 outline-none focus:ring-0"
            value={
              selectedItem.suggested_price
                ? toPersianNumbers(selectedItem.suggested_price)
                : ""
            }
            onChange={(e) => {
              setSelectedItem((prev) => {
                if (!prev) return prev;
                return {
                  ...prev,
                  suggested_price: toEnglishDigits(e.target.value),
                };
              });
            }}
            placeholder="قیمت پیشنهادی..."
            type="text"
          />
          <Button
            className="w-full mb-3"
            disabled={disabled}
            variant="primary"
            onClick={() => {
              onAddToCart(tab);
            }}
          >
            افزودن درخواست
          </Button>
        </div>
      )}
    </BottomSheet>
  );
};
export default AddToCartBottomSheet;
