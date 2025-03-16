import Image from "next/image";
import Tomanicon from "../../icons/toman";

const ProductCard = ({ product }: { product: any }) => {
  return (
    <div className="bg-maincard p-4 w-[166px] rounded-xl pb-1.5">
      <div className="bg-white rounded-xl w-[140px] h-[140px] flex justify-center items-center mb-2">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="rounded-4xl p-7"
        />
      </div>
      <div className="flex flex-col items-end justify-center gap-2">
        <p dir="rtl" className="text-xs font-bold">
          {product.name}
        </p>
        <div className="bg-primary-50 rounded-4xl w-1/2 flex justify-center items-center">
          <p dir="rtl" className="text-primary-500">
            {product.category}
          </p>
        </div>
      </div>
      <div className="w-auto h-0.5 bg-zinc-700 my-2 rounded-full"></div>
      <div className="flex justify-between items-center">
        <div className="text-xs font-bold">مشاهده</div>
        <div className="flex gap-0.5 items-center">
          <Tomanicon color2="white" />
          <p className="text-xs font-bold">{product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
