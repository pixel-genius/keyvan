"use client";

import Typography from "@/components/components/atoms/typography";
import BottomSheet from "@/app/_components/BottomSheet";
import { IconProgressCheck } from "@tabler/icons-react";
import { useState } from "react";

const Registrationdonpage = () => {
  const [isOpen] = useState(true);

  // useEffect(() => {
  //   // Set the pending token in a cookie for the middleware to access
  //   const pendingTokenStr = localStorage.getItem("pendingToken");
  //   if (pendingTokenStr) {
  //     // Set the cookie with the same structure as in localStorage
  //     Cookies.set('pendingToken', pendingTokenStr, {
  //       expires: 1, // 1 day
  //       path: '/',
  //       sameSite: 'strict'
  //     });
  //   }

  //   const timer = setInterval(() => {
  //     setTimeLeft((prev) => {
  //       if (prev <= 1) {
  //         clearInterval(timer);
  //         // Force a page reload to trigger the middleware check
  //         window.location.href = '/auth/pend-approved';
  //         return 0;
  //       }
  //       return prev - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);

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
