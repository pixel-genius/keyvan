"use client";

import React from "react";
import { Button } from "@/components/components/atoms/button";
import { Input } from "@/components/components/molecules/input";
import BottomSheet from "@/app/_components/BottomSheet";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nationalId, setNationalId] = useState("");

  const handleContinue = () => {
    // Store phone number and national ID in localStorage for demo
    localStorage.setItem("demo_phone", phoneNumber);
    localStorage.setItem("demo_national_id", nationalId);
    router.push("/auth/otp");
  };

  // Only allow numbers and max 11 digits
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 11);
    setPhoneNumber(value);
  };

  // Only allow numbers and max 10 digits for national ID
  const handleNationalIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setNationalId(value);
  };

  return (
    <div dir="rtl" className="">
      <BottomSheet isOpen={true} onClose={() => {}} hasBackdrop={false} hasBlur={false} isClosable={false}>
        <div className="flex py-8 flex-col gap-1">
          <div className="p-2 flex flex-col gap-1 justify-center">
            <h2 className="text-xl font-bold pb-2">حساب کاربری</h2>
            <p className="text-xs">برای ورود یا ثبت نام لطفا شماره همراه خود را وارد کنید</p>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="w-full flex flex-col gap-2">
              <Input 
              dir="rtl"
              className="text-right pb-2"
              placeholder="شماره همراه" 
              value={phoneNumber}
              onChange={handlePhoneChange}
              type="tel"
              maxLength={11}
              />
              <Input 
              dir="rtl"
              className="text-right pb-2"
              placeholder="کد ملی" 
              value={nationalId}
              onChange={handleNationalIdChange}
              type="text"
              maxLength={10}
              />
              <Button 
                variant={"primary"} 
                onClick={handleContinue}
                disabled={phoneNumber.length !== 11 || nationalId.length !== 10}
              >
                ادامه
              </Button>
            </div>
            <p className="text-sm font-light">
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
