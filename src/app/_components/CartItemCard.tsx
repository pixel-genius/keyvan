import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/components/atoms/alertDialog";
import type { ORDERTYPE } from "@/utils/apis/shop/cart/add/POST/shopCartAddPostApi";
import { ShopCartApiResponse } from "@/utils/apis/shop/cart/GET/shopCartGetApi";
import { IconAlertSquareRounded, IconTrash } from "@tabler/icons-react";
import Typography from "@/components/components/atoms/typography";
import { Button } from "@/components/components/atoms/button";
import { Chip } from "@/components/components/atoms/chip";
import { UseMutationResult } from "@tanstack/react-query";
import { toPersianNumbers } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";

type CartItemCardProps = {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number | string;
  orderType: ORDERTYPE;
  disabled: boolean;
  removeMutate: UseMutationResult<
    ShopCartApiResponse,
    unknown,
    number,
    unknown
  >;
  onIncreaseQuantity: (id: string) => void;
  onDecreaseQuantity: (id: string) => void;
};

const CartItemCard = ({
  id,
  name,
  quantity,
  image,
  price,
  disabled,
  orderType,
  removeMutate,
}: CartItemCardProps) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <div
        className={
          "flex items-center justify-between gap-2 bg-card w-full rounded-lg p-2"
        }
      >
        <button
          disabled={disabled}
          onClick={() => setOpen(true)}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <IconTrash size={25} className="text-red-500" />
        </button>
        <Chip variant={orderType === "buy" ? "success" : "danger"}>
          {orderType === "buy" ? "خرید" : "فروش"}
        </Chip>
        <div className="flex items-center gap-4 ml-auto">
          <div className="flex flex-col items-end">
            <Typography
              variant="label/sm"
              weight="normal"
              className="text-right mb-1"
            >
              {name} x {toPersianNumbers(quantity)}
            </Typography>
            <Typography
              variant="label/xs"
              weight="normal"
              className="text-right text-gray-500"
            >
              مبلغ : {toPersianNumbers(price)} تومان
            </Typography>
          </div>
          <div className="h-[54px] w-[54px] rounded-lg overflow-hidden">
            <Image
              src={image || "/img/sigar.png"}
              alt={name}
              width={54}
              height={54}
              className="h-full text-xs w-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
      <AlertDialog open={open}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex justify-center gap-2">
              <IconAlertSquareRounded size={50} className="text-red-500" />
            </AlertDialogTitle>
            <AlertDialogDescription className="text-lg text-right">
              آیا از حذف محصول مطمئنید ؟
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              variant="secondary"
              onClick={() => {
                setOpen(false);
              }}
              disabled={removeMutate.isPending}
              className="w-full"
            >
              لغو
            </Button>
            <Button
              onClick={() => {
                removeMutate.mutateAsync(+id).then(() => {
                  setOpen(false);
                });
              }}
              isLoading={removeMutate.isPending}
              disabled={removeMutate.isPending}
              className="w-full"
            >
              تایید
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CartItemCard;
