import { IconShoppingCartCheck } from "@tabler/icons-react";
import Typography from "@/components/components/atoms/typography";
import { Button } from "@/components/components/atoms/button";
import { useRouter } from "next/navigation";

type OrderConfirmationProps = {
  onClose: () => void;
  onTrackOrder: () => void;
};

const OrderConfirmation = ({ onClose, onTrackOrder }: OrderConfirmationProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <IconShoppingCartCheck size={80} color="#22c55e" className="mb-6" />
      
      <Typography variant="label/lg" weight="semi-bold" className="mb-4 text-center">
        پیش سفارش شما ثبت شد!
      </Typography>
      
      <Typography variant="label/sm" weight="normal" className="text-center text-gray-500 mb-8 max-w-xs">
        به‌زودی موجودی را بررسی می‌کنیم. در صورت تایید، برای هماهنگی ارسال و پرداخت با شما تماس خواهیم گرفت.
      </Typography>
      
      <div className="flex w-full gap-4 mt-auto">
        <Button
          variant="primary"
          size="md"
          onClick={onTrackOrder}
          className="flex-1"
        >
          پیگیری سفارش
        </Button>
        
        <Button
          variant="secondary"
          size="md"
          onClick={onClose}
          className="flex-1"
        >
          رفتن به خانه
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmation; 