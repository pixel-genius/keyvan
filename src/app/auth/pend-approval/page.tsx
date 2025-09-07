"use client";

import Typography from "@/components/components/atoms/typography";
import BottomSheet from "@/app/_components/BottomSheet";
import { IconProgressCheck } from "@tabler/icons-react";
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
        <div
          dir="rtl"
          className="flex justify-center items-center p-10 flex-col gap-2"
        >
          <IconProgressCheck size={73} className="text-green-500" />
          <div className="flex flex-col items-center gap-3">
            <Typography variant={"heading/xs"}>ثبت نام موفق شد</Typography>
            <Typography variant={"label/sm"} className="text-center">
              اطلاعات شما در حال بررسی است <br />
              <br /> در اسرع وقت به شما اطلاع رسانی خواهد شد
            </Typography>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
};

export default Registrationdonpage;
