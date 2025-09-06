"use client";

import { usePostAccountAuthOtpLoginApi } from "@/utils/apis/account/auth/otp_login/POST/accountAuthOtpLoginPostApi";
import { useGetAccountAuthOtpLoginApi } from "@/utils/apis/account/auth/otp_login/GET/accountAuthOtpLoginGetApi";
import { usePostAccountAuthRegister } from "@/utils/apis/account/auth/register/POST/accountAuthRegisterPostApi";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/components/atoms/input-otp";
import {
  AuthenticateFormStateEnum,
  useAuthStore,
} from "@/utils/store/authenticate.store";
import Typography from "@/components/components/atoms/typography";
import { Input } from "@/components/components/molecules/input";
import { Button } from "@/components/components/atoms/button";
import BottomSheet from "@/app/_components/BottomSheet";
import FileUpload from "@/app/_components/FileUpload";
import React, { useEffect, useState } from "react";
import { IconPencil } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { setToken } from "@/utils/cookie";
import Countdown from "react-countdown";
import { toast } from "sonner";

interface FormFieldsState {
  phoneNumber: string;
  nationalCode: string;
  firstName: string;
  lastName: string;
  otpCode: string;
}

const AuthenticatePage = () => {
  const router = useRouter();
  const { authenticateFormState, setAuthStore } = useAuthStore();
  const [countdownDate, setCountdownDate] = useState<number | null>(null);

  useEffect(() => {
    if (authenticateFormState === AuthenticateFormStateEnum.OTP)
      setCountdownDate(Date.now() + 120000);
  }, [authenticateFormState]);

  const [formFields, setFormFields] = useState<FormFieldsState>({
    phoneNumber: "",
    nationalCode: "",
    firstName: "",
    lastName: "",
    otpCode: "",
  });

  const loginOtpMutateGet = useGetAccountAuthOtpLoginApi({
    onSuccess: () => {
      setAuthStore(AuthenticateFormStateEnum.OTP);
    },
    onError: (error) => {
      if (error?.status === 404) {
        setAuthStore(AuthenticateFormStateEnum.REGISTER_STEP1);
      } else toast.error("خطا در ورود");
    },
  });

  const loginOtpMutatePost = usePostAccountAuthOtpLoginApi({
    onSuccess: (res) => {
      setToken(res.token);
      router.replace("/");
    },
    onError: () => {
      toast.error("خطا در ورود");
    },
  });

  const registerMutate = usePostAccountAuthRegister({
    onSuccess: () => {
      router.replace("/auth/pend-approved");
    },
    onError: () => {},
  });

  const handleContinue = () => {
    if (authenticateFormState === AuthenticateFormStateEnum.LOGIN)
      loginOtpMutateGet.mutate({ phone_number: formFields.phoneNumber });

    if (authenticateFormState === AuthenticateFormStateEnum.REGISTER_STEP1)
      registerMutate.mutate({
        national_code: formFields.nationalCode,
        phone_number: formFields.phoneNumber,
      });

    if (authenticateFormState === AuthenticateFormStateEnum.OTP)
      loginOtpMutatePost.mutate({
        phone_number: formFields.phoneNumber,
        otp_code: formFields.otpCode,
      });
  };

  const bottomSheetTitle = () => {
    switch (authenticateFormState) {
      case AuthenticateFormStateEnum.OTP:
        return "کد تایید را وارد کنید";
      case AuthenticateFormStateEnum.REGISTER_STEP2:
        return "خوش آمدید";
      default:
        return "حساب کاربری";
    }
  };
  const bottomSheetSubtitle = () => {
    switch (authenticateFormState) {
      case AuthenticateFormStateEnum.OTP:
        return "کد تایید ارسال شده به شماره تلفن خود را وارد کنید";
      case AuthenticateFormStateEnum.REGISTER_STEP2:
        return "برای تکمیل فرایند ثبت نام لطفا اطلاعات با دقت پر کنید";
      default:
        return "برای ورود لطفا شماره تلفن همراه خود را وارد کنید";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    let value = e.target.value;
    if (name === "phoneNumber") value = value.replace(/\D/g, "").slice(0, 11);
    if (name === "nationalCode") value = value.replace(/\D/g, "").slice(0, 10);
    setFormFields((prev) => ({ ...prev, [name]: value }));
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
          <div className="flex flex-col gap-2">
            <Typography variant={"heading/xs"}>{bottomSheetTitle()}</Typography>
            <Typography variant={"paragraph/md"}>
              {bottomSheetSubtitle()}
            </Typography>

            {authenticateFormState === AuthenticateFormStateEnum.OTP && (
              <button
                type="button"
                className="flex items-center gap-1 text-primary underline text-xs hover:text-primary/80 transition-colors"
                onClick={() => {
                  setFormFields((prev) => ({ ...prev, phoneNumber: "" }));
                  setAuthStore(AuthenticateFormStateEnum.LOGIN);
                }}
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
            )}
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="w-full flex flex-col gap-2">
              {authenticateFormState === AuthenticateFormStateEnum.OTP ? (
                <div className=" flex flex-col gap-2 justify-center items-center">
                  <InputOTP
                    maxLength={6}
                    value={formFields.otpCode}
                    onChange={(value) =>
                      setFormFields((prev) => ({ ...prev, otpCode: value }))
                    }
                  >
                    <InputOTPGroup className="">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                  </InputOTP>
                  {countdownDate && <Countdown date={countdownDate} />}
                </div>
              ) : (
                <>
                  <Input
                    dir="rtl"
                    className="text-right pb-2"
                    placeholder="شماره همراه"
                    value={formFields.phoneNumber}
                    onChange={handleChange}
                    type="tel"
                    name="phoneNumber"
                    maxLength={11}
                  />

                  {authenticateFormState ===
                    AuthenticateFormStateEnum.REGISTER_STEP1 && (
                    <Input
                      dir="rtl"
                      className="text-right pb-2"
                      placeholder="کد ملی"
                      value={formFields.nationalCode}
                      onChange={handleChange}
                      type="text"
                      name="nationalCode"
                      maxLength={10}
                    />
                  )}

                  {authenticateFormState ===
                    AuthenticateFormStateEnum.REGISTER_STEP2 && (
                    <>
                      <div className="w-full flex gap-2">
                        <Input
                          placeholder="نام"
                          name="firstName"
                          value={formFields.firstName}
                          onChange={handleChange}
                        />
                        <Input
                          placeholder="نام خانوادگی"
                          name="lastName"
                          value={formFields.lastName}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <FileUpload
                          label="مجوز توزیع استانی یا کشوری (اختیاری)"
                          // onChange={setProvincialLicense}
                        />

                        <FileUpload
                          label="جواز کسب (اختیاری)"
                          // onChange={setBusinessLicense}
                        />
                      </div>
                    </>
                  )}
                </>
              )}
              <Button
                variant={"primary"}
                onClick={handleContinue}
                disabled={formFields.phoneNumber.length !== 11}
              >
                {authenticateFormState ===
                  AuthenticateFormStateEnum.REGISTER_STEP2 && "ارسال"}

                {(authenticateFormState ===
                  AuthenticateFormStateEnum.REGISTER_STEP1 ||
                  authenticateFormState === AuthenticateFormStateEnum.LOGIN) &&
                  "ادامه"}

                {authenticateFormState === AuthenticateFormStateEnum.OTP &&
                  "تایید"}
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

export default AuthenticatePage;
