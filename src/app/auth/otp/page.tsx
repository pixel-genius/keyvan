"use client";
import { Button } from "@/components/components/atoms/button";
import { Countdown } from "@/components/components/atoms/countdown";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/components/atoms/input-otp";

import Typography from "@/components/components/atoms/typography";
import { ArrowRightIcon } from "lucide-react";
import React from "react";
import BottomSheet from "@/app/_components/BottomSheet";
import { useRouter } from "next/navigation";

const OtpPage = () => {
  const router = useRouter();
  const [value, setValue] = React.useState("");
  const [isOpen] = React.useState(true);

  const handleVerify = () => {
    // For demo, accept any OTP
    // Store auth token in localStorage
    localStorage.setItem("demo_auth_token", "demo_token");
    localStorage.setItem("demo_user", JSON.stringify({
      phone: localStorage.getItem("demo_phone"),
      isAuthenticated: true
    }));
    
    // Redirect to registration page
    router.push("/auth/registration");
  };

  return (
    <BottomSheet 
      isOpen={isOpen} 
      onClose={() => {}} 
      hasBackdrop={false}
      hasBlur={false}
      isClosable={false}
    >
      <div dir="rtl" className="">
        <div className=" flex flex-col gap-1">
          <div className=" p-5 flex flex-row gap-1 items-center">
            <ArrowRightIcon size={24} color="white" />
            <Typography variant={"heading/xs"}>ثبت نام</Typography>
          </div>
          <div className="px-5 flex flex-col gap-2 justify-center items-center">
            <div className="w-full flex flex-col gap-2">
              <div className=" flex flex-col gap-2 justify-center items-center">
                <InputOTP
                  maxLength={6}
                  value={value}
                  onChange={(value) => setValue(value)}
                >
                  <InputOTPGroup className="">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                  </InputOTPGroup>
                </InputOTP>
                <Countdown date={Date.now() + 120000} />
              </div>

              <Button 
                variant={"primary"} 
                state="warning"
                onClick={handleVerify}
              >
                تایید
              </Button>
            </div>
          </div>
        </div>
      </div>
    </BottomSheet>
  );
};

export default OtpPage;
