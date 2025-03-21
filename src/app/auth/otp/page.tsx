"use client";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ArrowRightIcon } from "lucide-react";
import React from "react";

const OtpPage = () => {
  const [value, setValue] = React.useState("");
  return (
    <div dir="rtl" className="">
      <div className=" flex flex-col gap-1">
        <div className=" p-5 flex flex-row gap-1 items-center">
          <ArrowRightIcon size={24} color="white" />
          <p className="text-xl font-bold">ثبت نام</p>
        </div>
        <div className="px-5 flex flex-col gap-2 justify-center items-center">
          <div className="w-full flex flex-col gap-2">
            <div dir="ltr" className="flex flex-row gap-3">
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
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button>تایید</Button>
          </div>
          <p className="text-xs font-light">
            ورود شما به معنای پذیرش{" "}
            <span className="underline"> شرایط و قوانین </span>
            پلتفرم تمباکو است
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
