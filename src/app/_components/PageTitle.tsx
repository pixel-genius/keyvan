"use client";
import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const PageTitle = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between mb-2" dir="rtl">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div
        onClick={() => {
          router.back();
        }}
        className="cursor-pointer p-2 rounded-full hover:bg-muted transition-colors"
      >
        <div className="flex gap-0.5 items-center">
          <span className="text-lg text-muted-foreground">بازگشت</span>
          <IconChevronLeft size={24} className="text-muted-foreground" />
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
