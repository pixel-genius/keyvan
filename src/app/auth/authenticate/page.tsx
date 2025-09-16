"use client";

import { usePostAccountAuthOtpLoginApi } from "@/utils/apis/account/auth/otp_login/POST/accountAuthOtpLoginPostApi";
import { useGetAccountAuthOtpLoginApi } from "@/utils/apis/account/auth/otp_login/GET/accountAuthOtpLoginGetApi";
import { usePostAccountAuthRegister } from "@/utils/apis/account/auth/register/POST/accountAuthRegisterPostApi";
import { useAccountFilesUploadPost } from "@/utils/apis/account/files/upload/POST/accountFilesUploadPostApi";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/components/atoms/input-otp";
import { usePutAccountProfileApi } from "@/utils/apis/account/profile/PUT/accountProfilePutApi";
import {
  AuthenticateFormStateEnum,
  useAuthStore,
} from "@/utils/store/authenticate.store";
import { IconPencil, IconProgressCheck } from "@tabler/icons-react";
import Typography from "@/components/components/atoms/typography";
import { Input } from "@/components/components/molecules/input";
import { Button } from "@/components/components/atoms/button";
import React, { useEffect, useMemo, useState } from "react";
import BottomSheet from "@/app/_components/BottomSheet";
import FileUpload from "@/app/_components/FileUpload";
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
  certificate_file: number | undefined;
  license_file: number | undefined;
}

const AuthenticatePage = () => {
  const router = useRouter();
  const { authenticateFormState, setAuthStore } = useAuthStore();
  const [countdownDate, setCountdownDate] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
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
    license_file: undefined,
    certificate_file: undefined,
  });

  useEffect(() => {
    return () => {
      setAuthStore(AuthenticateFormStateEnum.LOGIN);
      setFormFields({
        phoneNumber: "",
        nationalCode: "",
        firstName: "",
        lastName: "",
        otpCode: "",
        license_file: undefined,
        certificate_file: undefined,
      });
    };
  }, []);

  const accountFileUploadMutate = useAccountFilesUploadPost({
    onSuccess: (res) => {
      toast.success("فایل با موفقیت آپلود شد");
      if (res.category === "business_license") {
        setFormFields((prev) => ({ ...prev, license_file: res.id }));
      } else {
        setFormFields((prev) => ({ ...prev, certificate_file: res.id }));
      }
    },
    onError: () => {
      toast.error("خطا در آپلود فایل");
    },
  });

  const loginOtpMutateGet = useGetAccountAuthOtpLoginApi({
    onSuccess: () => {
      setAuthStore(AuthenticateFormStateEnum.OTP);
    },
    onError: (error) => {
      if (error.response?.data?.has_account === false) {
        setAuthStore(AuthenticateFormStateEnum.REGISTER_STEP1);
      } else if (!error.response?.data.is_verified) {
        setAuthStore(AuthenticateFormStateEnum.PEND_APPROVAL);
      } else {
        toast.error("خطا در ورود");
      }
    },
  });

  const loginOtpMutatePost = usePostAccountAuthOtpLoginApi({
    onSuccess: (res) => {
      if (res.is_verified) {
        setToken(res.token);
        router.replace("/");
      } else setAuthStore(AuthenticateFormStateEnum.PEND_APPROVAL);
    },
    onError: () => {
      toast.error("خطا در ورود");
    },
  });

  const registerMutate = usePostAccountAuthRegister({
    onSuccess: (res) => {
      if (res.success) {
        setUserId(res.user_id);
        setAuthStore(AuthenticateFormStateEnum.REGISTER_STEP2);
      }
    },
    onError: (error) => {
      if (!error.response?.data.success)
        toast.error("این شماره تلفن برای کد ملی ذکر شده نیست!");
      else toast.error("خطا در ورود!");
    },
  });

  const accountProfileMutate = usePutAccountProfileApi({
    onSuccess: () => {
      setAuthStore(AuthenticateFormStateEnum.PEND_APPROVAL);
    },
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
  const submitBtnDisabled = useMemo(() => {
    let valid = true;
    const phoneNumberValid = formFields.phoneNumber.length === 11,
      nationalCodeValid = formFields.nationalCode.length === 10;
    switch (authenticateFormState) {
      default:
        valid = !phoneNumberValid || loginOtpMutateGet.isPending;
        break;
      case AuthenticateFormStateEnum.OTP:
        valid = formFields.otpCode.length !== 4 || loginOtpMutatePost.isPending;
        break;
      case AuthenticateFormStateEnum.REGISTER_STEP1:
        valid =
          (!phoneNumberValid && !nationalCodeValid) || registerMutate.isPending;
        break;
      case AuthenticateFormStateEnum.REGISTER_STEP2:
        valid =
          !phoneNumberValid &&
          !nationalCodeValid &&
          !formFields.lastName &&
          !formFields.firstName;
        break;
    }

    return valid;
  }, [
    authenticateFormState,
    formFields,
    registerMutate.isPending,
    loginOtpMutateGet.isPending,
    loginOtpMutatePost.isPending,
  ]);

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
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={0} />
                    </InputOTPGroup>
                  </InputOTP>
                  {countdownDate ? (
                    <Countdown
                      date={countdownDate}
                      renderer={({ formatted }) => (
                        <span dir="ltr">
                          {formatted.minutes}:{formatted.seconds}
                        </span>
                      )}
                      onComplete={() => {
                        setCountdownDate(null);
                      }}
                    />
                  ) : (
                    <Button
                      variant="secondary"
                      size={"sm"}
                      onClick={() => {
                        setCountdownDate(Date.now() + 120000);
                        loginOtpMutateGet.mutate({
                          phone_number: formFields.phoneNumber,
                        });
                      }}
                    >
                      ارسال کد
                    </Button>
                  )}
                </div>
              ) : (
                <>
                  {(authenticateFormState === AuthenticateFormStateEnum.LOGIN ||
                    authenticateFormState ===
                      AuthenticateFormStateEnum.REGISTER_STEP1) && (
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
                  )}
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
                          isLoading={accountFileUploadMutate.isPending}
                          disabled={accountProfileMutate.isPending}
                          label="مجوز توزیع استانی یا کشوری (اختیاری)"
                          onChange={(file) => {
                            accountFileUploadMutate.mutate({
                              user_id: userId as number,
                              category: "business_license",
                              file: file as File,
                            });
                          }}
                        />

                        <FileUpload
                          isLoading={accountFileUploadMutate.isPending}
                          disabled={accountProfileMutate.isPending}
                          label="جواز کسب (اختیاری)"
                          onChange={(file) => {
                            accountFileUploadMutate.mutate({
                              user_id: userId as number,
                              category: "certification",
                              file: file as File,
                            });
                          }}
                        />
                      </div>
                    </>
                  )}
                </>
              )}
              <Button
                variant={"primary"}
                onClick={handleContinue}
                disabled={submitBtnDisabled}
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
      <BottomSheet
        isOpen={
          authenticateFormState === AuthenticateFormStateEnum.PEND_APPROVAL
        }
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

export default AuthenticatePage;
