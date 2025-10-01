"use client";

import {
  IconLogout,
  IconUser,
  IconFile,
  IconMapPin,
  IconCrown,
  IconChevronRight,
} from "@tabler/icons-react";
import Typography from "@/components/components/atoms/typography";
import PageTitle from "@/app/_components/PageTitle";
import { useRouter } from "next/navigation";

const Accountpage = () => {
  const router = useRouter();

  return (
    <div className="pt-8 flex flex-col gap-6 bg-background" dir="rtl">
      {/* Header */}
      <PageTitle title="حساب کاربری" />

      {/* User Stats Card */}
      <div className="relative overflow-hidden bg-primary rounded-2xl p-6 shadow-lg">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-foreground/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-foreground/10 rounded-full translate-y-12 -translate-x-12"></div>

        <div className="relative flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <IconCrown size={24} className="text-primary-foreground" />
            </div>
            <div>
              <Typography
                weight="bold"
                variant={"paragraph/md"}
                className="text-primary-foreground"
              >
                حساب کاربری
              </Typography>
              <Typography
                variant={"paragraph/sm"}
                className="text-primary-foreground/90"
              >
                سطح ۱
              </Typography>
            </div>
          </div>
          <div className="text-right">
            <Typography
              weight="bold"
              variant={"paragraph/lg"}
              className="text-primary-foreground"
            >
              ۳۵
            </Typography>
            <Typography
              variant={"paragraph/sm"}
              className="text-primary-foreground/90"
            >
              امتیاز
            </Typography>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-4">
        {/* Account Information */}
        <div
          className="group flex justify-between items-center p-5 bg-card rounded-2xl shadow-sm border border-border cursor-pointer hover:shadow-md hover:border-primary/20 transition-all duration-300"
          onClick={() => router.push("/account/profile")}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <IconUser size={24} className="text-primary" />
            </div>
            <div>
              <Typography
                variant={"paragraph/md"}
                weight="bold"
                className="text-foreground"
              >
                اطلاعات حساب کاربری
              </Typography>
              <Typography
                variant={"paragraph/sm"}
                className="text-muted-foreground"
              >
                مشاهده و ویرایش اطلاعات شخصی
              </Typography>
            </div>
          </div>
          <IconChevronRight
            size={20}
            className="text-muted-foreground group-hover:text-primary transition-colors rotate-180"
          />
        </div>

        {/* Documents */}
        <div
          className="group flex justify-between items-center p-5 bg-card rounded-2xl shadow-sm border border-border cursor-pointer hover:shadow-md hover:border-primary/20 transition-all duration-300"
          onClick={() => router.push("/account/documents")}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <IconFile size={24} className="text-primary" />
            </div>
            <div>
              <Typography
                variant={"paragraph/md"}
                weight="bold"
                className="text-foreground"
              >
                مستندات و مدارک
              </Typography>
              <Typography
                variant={"paragraph/sm"}
                className="text-muted-foreground"
              >
                مدیریت مدارک و اسناد
              </Typography>
            </div>
          </div>
          <IconChevronRight
            size={20}
            className="text-muted-foreground group-hover:text-primary transition-colors rotate-180"
          />
        </div>

        {/* Addresses */}
        <div
          className="group flex justify-between items-center p-5 bg-card rounded-2xl shadow-sm border border-border cursor-pointer hover:shadow-md hover:border-primary/20 transition-all duration-300"
          onClick={() => router.push("/account/addresses")}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <IconMapPin size={24} className="text-primary" />
            </div>
            <div>
              <Typography
                variant={"paragraph/md"}
                weight="bold"
                className="text-foreground"
              >
                آدرس ها
              </Typography>
              <Typography
                variant={"paragraph/sm"}
                className="text-muted-foreground"
              >
                مدیریت آدرس‌های تحویل
              </Typography>
            </div>
          </div>
          <IconChevronRight
            size={20}
            className="text-muted-foreground group-hover:text-primary transition-colors rotate-180"
          />
        </div>
      </div>

      {/* Logout Button */}
      <div>
        <div
          className="flex text-destructive justify-between items-center p-5 bg-card rounded-2xl shadow-sm border border-destructive/20 cursor-pointer hover:shadow-md hover:border-destructive/40 transition-all duration-300"
          onClick={() => router.push("/auth/logout")}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center">
              <IconLogout size={24} className="text-destructive" />
            </div>
            <Typography variant={"paragraph/md"} weight="bold">
              خروج از حساب
            </Typography>
          </div>
          <IconChevronRight
            size={20}
            className="text-destructive/60 rotate-180"
          />
        </div>
      </div>
    </div>
  );
};

export default Accountpage;
