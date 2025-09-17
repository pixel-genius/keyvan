import Typography from "@/components/components/atoms/typography";
import { IconTrash } from "@tabler/icons-react";
import { toPersianNumbers } from "@/lib/utils";
import Image from "next/image";

type CartItemCardProps = {
  id: string;
  name: string;
  image: string;
  quantity: number;
  onRemove: (id: string) => void;
  onIncreaseQuantity: (id: string) => void;
  onDecreaseQuantity: (id: string) => void;
};

const CartItemCard = ({
  id,
  name,
  quantity,
  image,
  onRemove,
}: CartItemCardProps) => {
  return (
    <div className="flex items-center justify-between gap-2 bg-card w-full rounded-lg p-2 mb-4">
      <button
        onClick={() => onRemove(id)}
        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
      >
        <IconTrash size={18} color="#ef4444" />
      </button>

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
            مبلغ : {toPersianNumbers("130000")} تومان
          </Typography>
        </div>
        <div className="h-[54px] w-[54px] rounded-lg overflow-hidden">
          <Image
            src={image || "/img/sigar.png"}
            alt={name}
            width={54}
            height={54}
            className="h-full w-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
