import { ReactNode } from "react";
import "../globals.css";
import LogoIcon from "@/icons/logo";
import { Toaster } from "sonner";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Toaster position="top-center" />
      <div className="max-w-md w-full space-y-8 p-8 bg-card rounded-lg shadow-lg">
        <div className="h-screen flex flex-col">
          <div className="h-[60%] flex justify-center items-center ">
            <div dir="rtl">
              <div className="flex flex-col items-center justify-center gap-2.5">
                <LogoIcon size={48} />
                <p className="text-white">قیمت روز تنباکو، سریع و بدون واسطه!</p>
                <p className="text-xs font-light text-sub">
                  هر روز جدیدترین قیمت‌ها را دریافت کنید و خرید عمده خود را با
                  بهترین نرخ انجام دهید.
                </p>
              </div>
            </div>
          </div>
          <div >{children}</div>
        </div>
      </div>
    </div>
  );
}
