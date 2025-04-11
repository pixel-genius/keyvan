import Typography from "@/components/components/atoms/typography";
import { IconHeadset, IconProgressCheck } from "@tabler/icons-react";
import BottomSheet from "@/app/_components/BottomSheet";
import { useState } from "react";

const Registrationdonpage = () => {
  const [isOpen] = useState(true);

  return (
    <div className="h-full">
      <BottomSheet 
        isOpen={isOpen} 
        onClose={() => {}} 
        hasBackdrop={false}
        hasBlur={false}
        isClosable={false}
      >
        <div dir="rtl" className="flex justify-center items-center p-10 flex-col gap-2">
          <IconProgressCheck size={73} className="text-green-500" />
          <div className="flex flex-col items-center gap-3">
            <Typography variant={"heading/xs"}>ثبت نام موفق شد</Typography>
            <Typography variant={"label/sm"} className="text-center">
              اطلاعات شما در سریع‌ترین زمان ممکن بررسی می‌شود و نتیجه را به شما
              اطلاع می‌دهیم. از شکیبایی شما سپاسگزاریم.
            </Typography>
            <div className="flex gap-0.5">
              <IconHeadset size={16} />
              <Typography variant={"label/md"} className="underline">
                تماس با پشتیبانی
              </Typography>
            </div>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
};

export default Registrationdonpage;
