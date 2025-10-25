import LogoIcon from "@/icons/logo";
import { ReactNode } from "react";
import "../globals.css";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center " dir="rtl">
      <div className="w-full">
        <div className="flex flex-col">
          <div className="flex text-center px-2 pt-28 flex-col items-center justify-center gap-2.5">
            <LogoIcon />
            <p className="font-bold text-2xl text-center">
              ما به سلامت می اندیشیم
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
