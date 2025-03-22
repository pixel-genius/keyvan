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

const OtpPage = () => {
  const [value, setValue] = React.useState("");
  return (
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

            <Button variant={"primary"} state="warning">
              تایید
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
