import { IconShoppingCartOff } from "@tabler/icons-react";
import Typography from "@/components/components/atoms/typography";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <IconShoppingCartOff size={64} color="#9ca3af" className="mb-4" />
      <Typography variant="label/lg" weight="semi-bold" className="mb-2 text-center">
        سبد خرید شما خالی است
      </Typography>
      <Typography variant="label/sm" weight="normal" className="text-center text-gray-500">
        برای مشاهده محصولات به منو مراجعه کنید
      </Typography>
    </div>
  );
};

export default EmptyCart; 