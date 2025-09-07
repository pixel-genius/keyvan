"use client";

import {
  IconCalendar,
  IconChevronLeft,
  IconEdit,
  IconShield,
  IconUser,
} from "@tabler/icons-react";
import Typography from "@/components/components/atoms/typography";
import { useAuthStore } from "@/utils/store/authenticate.store";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const { userProfileInfo } = useAuthStore();

  return (
    <div
      className="px-4 pt-28 flex flex-col gap-6 min-h-screen bg-background"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <Typography
          variant={"paragraph/md"}
          className="self-center"
          weight="bold"
        >
          اطلاعات حساب کاربری
        </Typography>
        <div
          className="cursor-pointer p-2 rounded-full hover:bg-muted transition-colors"
          onClick={() => router.back()}
        >
          <IconChevronLeft size={24} className="text-muted-foreground " />
        </div>
      </div>

      <div className="space-y-6">
        {/* Profile Header */}
        <div className="bg-primary rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <IconUser size={32} className="text-primary-foreground" />
            </div>
            <div>
              <Typography
                weight="bold"
                variant={"paragraph/lg"}
                className="text-primary-foreground"
              >
                {userProfileInfo?.firstName || null}{" "}
                {userProfileInfo?.lastName || null}
              </Typography>
              <Typography
                variant={"paragraph/sm"}
                className="text-primary-foreground/90"
              >
                {userProfileInfo?.username || null}
              </Typography>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <IconUser size={20} className="text-primary" />
            </div>
            <Typography
              variant={"paragraph/md"}
              weight="bold"
              className="text-foreground"
            >
              اطلاعات شخصی
            </Typography>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-muted rounded-xl">
              <Typography
                variant={"paragraph/sm"}
                className="text-muted-foreground"
              >
                نام و نام خانوادگی:
              </Typography>
              <Typography
                variant={"paragraph/sm"}
                weight="bold"
                className="text-foreground"
              >
                {userProfileInfo?.firstName || null}{" "}
                {userProfileInfo?.lastName || null}
                {!userProfileInfo?.firstName &&
                  !userProfileInfo?.lastName &&
                  "___"}
              </Typography>
            </div>
            <div className="flex justify-between items-center p-4 bg-muted rounded-xl">
              <Typography
                variant={"paragraph/sm"}
                className="text-muted-foreground"
              >
                شماره موبایل:
              </Typography>
              <Typography
                variant={"paragraph/sm"}
                weight="bold"
                className="text-foreground"
              >
                {userProfileInfo?.phone_number || "___"}
              </Typography>
            </div>
            <div className="flex justify-between items-center p-4 bg-muted rounded-xl">
              <Typography
                variant={"paragraph/sm"}
                className="text-muted-foreground"
              >
                ایمیل:
              </Typography>
              <Typography
                variant={"paragraph/sm"}
                weight="bold"
                className="text-foreground"
              >
                {userProfileInfo?.email || "___"}
              </Typography>
            </div>
            <div className="flex justify-between items-center p-4 bg-muted rounded-xl">
              <Typography
                variant={"paragraph/sm"}
                className="text-muted-foreground"
              >
                کد ملی:
              </Typography>
              <Typography
                variant={"paragraph/sm"}
                weight="bold"
                className="text-foreground"
              >
                {userProfileInfo?.national_code || "___"}
              </Typography>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <IconShield size={20} className="text-primary" />
            </div>
            <Typography
              variant={"paragraph/md"}
              weight="bold"
              className="text-foreground"
            >
              اطلاعات حساب
            </Typography>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-muted rounded-xl">
              <Typography
                variant={"paragraph/sm"}
                className="text-muted-foreground"
              >
                نام کاربری:
              </Typography>
              <Typography
                variant={"paragraph/sm"}
                weight="bold"
                className="text-foreground"
              >
                {userProfileInfo?.username || "___"}
              </Typography>
            </div>
            <div className="flex justify-between items-center p-4 bg-muted rounded-xl">
              <div className="flex items-center gap-2">
                <IconCalendar size={16} className="text-muted-foreground" />
                <Typography
                  variant={"paragraph/sm"}
                  className="text-muted-foreground"
                >
                  تاریخ عضویت:
                </Typography>
              </div>
              <Typography
                variant={"paragraph/sm"}
                weight="bold"
                className="text-foreground"
              >
                1402/01/15
              </Typography>
            </div>
            <div className="flex justify-between items-center p-4 bg-primary/10 rounded-xl">
              <Typography
                variant={"paragraph/sm"}
                className="text-muted-foreground"
              >
                وضعیت حساب:
              </Typography>
              <div className="flex items-center gap-2">
                <Typography
                  variant={"paragraph/sm"}
                  weight="bold"
                  className="text-primary"
                >
                  فعال
                </Typography>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <button className="w-full bg-primary text-primary-foreground py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3">
          <IconEdit size={20} />
          <Typography variant={"paragraph/md"} weight="bold">
            ویرایش اطلاعات
          </Typography>
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
