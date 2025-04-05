import { BaseInput } from "@/components/components/atoms/base-input";
import { Chip } from "@/components/components/atoms/chip";
import Typography from "@/components/components/atoms/typography";
import { Input } from "@/components/components/molecules/input";
import Tomanicon from "@/icons/toman";
import {
  IconChevronLeft,
  IconChevronRight,
  IconTrendingDown,
  IconTrendingUp,
} from "@tabler/icons-react";

const Pricepage = () => {
  return (
    <div dir="rtl">
      <div className="flex justify-between pb-3.5">
        <div>
          <Typography variant={"label/md"} weight={"medium"}>
            قیمت محصولات اسفند ۱۴۰۳
          </Typography>
        </div>
        <div className="flex flex-row gap-0.5">
          <IconChevronRight size={24} />
          <IconChevronLeft size={24} />
        </div>
      </div>
      <div className="flex flex-row gap-1 pb-3.5  bg- ">
        <div className="bg-primary rounded-full px-2 py-4  flex flex-col gap-1 justify-center items-center">
          <Typography variant={"label/xs"} weight={"bold"}>
            ۱ شنبه
          </Typography>
          <Typography variant={"label/xs"} weight={"bold"}>
            ۱۲
          </Typography>
        </div>
      </div>
      <div className="pb-3.5">
        <Input placeholder="جستجو کنید ...." />
      </div>
      <div className="flex flex-row gap-1 pb-3.5">
        <Chip variant={"primary"} size={"sm"}>
          <Typography variant="label/xs" weight="bold">
            همه
          </Typography>
        </Chip>
        <Chip variant={"secendery"} size={"sm"}>
          <Typography variant="label/xs" weight="bold">
            سیگار
          </Typography>
        </Chip>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center border-b pb-3.5 border-zinc-700">
          <div className="flex flex-col gap-2 ">
            <Typography variant={"label/sm"} weight={"medium"}>
              کمل کامپکت نقره ای کویین
            </Typography>
            <div className="flex gap-1.5 items-center">
              <Typography variant={"label/sm"} weight={"medium"}>
                ۳٬۵۰۰٬۰۰۰
              </Typography>
              <Tomanicon size={18} />
            </div>
          </div>
          <IconTrendingUp size={24} className="text-green-500" />
        </div>
        <div className="flex justify-between items-center border-b pb-3.5 border-zinc-700">
          <div className="flex flex-col gap-2 ">
            <Typography variant={"label/sm"} weight={"medium"}>
              کمل کامپکت نقره ای کویین
            </Typography>
            <div className="flex gap-1.5 items-center">
              <Typography variant={"label/sm"} weight={"medium"}>
                ۳٬۵۰۰٬۰۰۰
              </Typography>
              <Tomanicon size={18} />
            </div>
          </div>
          <IconTrendingDown size={24} className="text-red-500" />
        </div>
      </div>
    </div>
  );
};

export default Pricepage;
