"use client";

import { Button } from "@/components/components/atoms/button";
import { Input } from "@/components/components/molecules/input";
import BottomSheet from "@/app/_components/BottomSheet";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleContinue = () => {
    // Store phone number in localStorage for demo
    localStorage.setItem("demo_phone", phoneNumber);
    router.push("/auth/otp");
  };

  return (
    <div dir="rtl" className="">
      <BottomSheet isOpen={true} onClose={() => {}} hasBackdrop={false} hasBlur={false} isClosable={false}>
        <div className="flex flex-col gap-1">
          <div className="p-5 flex flex-col gap-1 justify-center">
            <p className="text-xl font-bold">حساب کاربری</p>
            <p>برای ورود یا ثبت نام لطفا شماره همراه خود را وارد کنید</p>
          </div>
          <div className="px-5 flex flex-col gap-2 justify-center items-center">
            <div className="w-full flex flex-col gap-2">
              <Input 
                placeholder="شماره همراه" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <Button 
                variant={"primary"} 
                state="warning"
                onClick={handleContinue}
              >
                ادامه
              </Button>
            </div>
            <p className="text-xs font-light">
              ورود شما به معنای پذیرش{" "}
              <span className="underline"> شرایط و قوانین </span>
              پلتفرم تمباکو است
            </p>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
};

export default LoginPage;
