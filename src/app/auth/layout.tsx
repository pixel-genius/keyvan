import LogoIcon from "@/icons/logo";
import { ReactNode } from "react";
import "../globals.css";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-screen" dir="rtl">
      <div className="w-full max-w-md bg-card shadow-lg">
        <div className="h-screen flex flex-col">
          <div className="flex text-center px-2 pt-28 flex-col items-center justify-center gap-2.5">
            <LogoIcon />

            <p className="text-white font-bold text-center">
              قیمت روز تنباکو، سریع و بدون واسطه!
            </p>
            <p className="text-xs font-light text-sub text-center">
              هر روز جدیدترین قیمت‌ها را دریافت کنید و خرید عمده خود را با
              بهترین نرخ انجام دهید.
            </p>
          </div>
          <div className="flex-1">{children}</div>
        </div>
      </div>
      {/* <PWAInstaller /> */}
    </div>
  );
}
