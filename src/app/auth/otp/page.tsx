"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/components/atoms/input-otp";
import { Countdown } from "@/components/components/atoms/countdown";
import Typography from "@/components/components/atoms/typography";
import { Button } from "@/components/components/atoms/button";
import BottomSheet from "@/app/_components/BottomSheet";
import { IconPencil } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const OtpPage = () => {
  const router = useRouter();
  const [isOpen] = useState(true);
  const [value, setValue] = useState("");
  const [phone, setPhone] = useState("");
  const [countdownDate, setCountdownDate] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedPhone = localStorage.getItem("demo_phone");
    if (storedPhone) {
      setPhone(storedPhone);
    }
    // Set countdown date on client side only
    setCountdownDate(Date.now() + 120000);
  }, []);

  const handleVerify = () => {
    // For demo, accept any OTP
    // Store auth token in localStorage
    localStorage.setItem("demo_auth_token", "demo_token");
    localStorage.setItem(
      "demo_user",
      JSON.stringify({
        phone: localStorage.getItem("demo_phone"),
        isAuthenticated: true,
      }),
    );

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
            <div className="flex flex-col">
              <Typography
                className="pb-4 font-bold "
                weight="bold"
                variant={"heading/sm"}
              >
                کد تأیید را وارد کنید
              </Typography>
              <Typography className="pb-2" variant={"label/sm"}>
                {/* ویرایش شماره  */}
                کد تأیید را به شمارهٔ <span className="font-bold">
                  {phone}
                </span>{" "}
                فرستادیم.
              </Typography>

              <button
                type="button"
                className="flex items-center gap-1 text-primary underline text-xs hover:text-primary/80 transition-colors"
                onClick={() => router.push("/auth/login")}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                <IconPencil size={16} className="ml-1" />
                ویرایش شماره
              </button>
            </div>
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
                {isClient && countdownDate && (
                  <Countdown date={countdownDate} />
                )}
              </div>

              <Button variant={"primary"} onClick={handleVerify}>
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
