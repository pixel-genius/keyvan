import { ShopProductDetailApiResponse } from "@/utils/apis/shop/products/[id]/GET/shopProductDetailApi";
import Typography from "@/components/components/atoms/typography";
import { Badge } from "@/components/components/atoms/badge";
import Tomanicon from "../../icons/toman";
import Image from "next/image";

const ProductCard = ({
  product,
}: {
  product: ShopProductDetailApiResponse;
}) => {
  // اطمینان از این که قیمت عددی است
  const price =
    typeof product.latest_price === "string"
      ? parseFloat(product.latest_price)
      : product.latest_price;

  // فرمت کردن قیمت به تومان
  const formattedPrice = price
    ? new Intl.NumberFormat("fa-IR").format(price)
    : "0";
  return (
    <div className="bg-maincard p-4 rounded-xl pb-1.5">
      <div className="flex justify-center items-center mb-2 min-h-[150px] relative">
        <Image
          src={product?.image}
          alt={product?.name || ""}
          fill
          className="w-full object-cover rounded"
        />
      </div>
      <div className="flex flex-col items-start justify-center gap-2">
        <Typography
          variant="paragraph/xs"
          weight="normal"
          className="text-right"
        >
          {product?.name || ""}
        </Typography>

        {product?.category && (
          <Badge variant="default">{product?.category?.name || ""}</Badge>
        )}
      </div>
      <div className="w-auto h-0.5 bg-zinc-700 my-2 rounded-full"></div>
      <div className="flex justify-between items-center">
        <div className="flex gap-0.5 items-center">
          <Typography
            className="text-primary"
            variant={"label/md"}
            weight="normal"
          >
            {formattedPrice}
          </Typography>
          <Tomanicon color2="white" />
        </div>
        <div className="text-xs font-bold">مشاهده</div>
      </div>
    </div>
  );
};

export default ProductCard;
