"use client";

import { useGetAccountAuthOtpLoginApi } from "@/utils/apis/account/auth/otp_login/GET/accountAuthOtpLoginGetApi";
import { Input } from "@/components/components/molecules/input";
import { Button } from "@/components/components/atoms/button";
import { useAuthStore } from "@/utils/store/userAuth.store";
import BottomSheet from "@/app/_components/BottomSheet";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const { setAuthStore } = useAuthStore();

  const loginMutate = useGetAccountAuthOtpLoginApi({
    onSuccess: () => {
      setAuthStore({ phoneNumber });
      router.push("/auth/otp/");
    },
    onError: (error) => {
      if (error?.response?.data?.error === "User not found")
        toast.error("کاربر با این شماره تلفن وجود ندارد");
      else toast.error("خطا در ورود");
    },
  });

  const handleContinue = () => {
    loginMutate.mutate({ phone_number: phoneNumber });
    // router.push("/auth/otp");
  };

  // Only allow numbers and max 11 digits
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 11);
    setPhoneNumber(value);
  };

  return (
    <div dir="rtl" className="max-w-lg w-full  mx-auto">
      <BottomSheet
        isOpen={true}
        onClose={() => {}}
        hasBackdrop={false}
        hasBlur={false}
        isClosable={false}
      >
        <div className="flex py-8 px-4 flex-col gap-1">
          <div className="p-2 flex flex-col gap-1 justify-center">
            <h2 className="text-xl font-bold pb-2">حساب کاربری</h2>
            <p className="text-xs">
              برای ورود یا ثبت نام لطفا شماره همراه خود را وارد کنید
            </p>
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
              {/* <Input
                dir="rtl"
                className="text-right pb-2"
                placeholder="کد ملی"
                value={nationalId}
                onChange={handleNationalIdChange}
                type="text"
                maxLength={10}
              /> */}
              <p className="text-sm font-light">
                حساب کاربری ندارید ؟ برای ثبت نام &nbsp;
                <Link href="/auth/register" className="underline">
                  کلیک
                </Link>
                &nbsp; کنید
              </p>
              <Button
                variant={"primary"}
                onClick={handleContinue}
                disabled={phoneNumber.length !== 11}
              >
                ادامه
              </Button>
            </div>
            <p className="text-sm font-light">
              ورود شما به معنای پذیرش
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
