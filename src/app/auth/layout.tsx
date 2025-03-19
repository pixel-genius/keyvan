import LogoIcon from "@/icons/logo";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container bg-maincard mx-auto w-[768px] min-h-full">
      <div className="h-screen flex flex-col">
        <div className="h-[60%] flex justify-center items-center">
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
        <div className=" bg-bg h-[40%] rounded-t-4xl">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
