import { Button } from "@/components/components/atoms/button";
import { Input } from "@/components/components/molecules/input";

const LoginPage = () => {
  return (
    <div dir="rtl" className="">
      <div className=" flex flex-col gap-1">
        <div className=" p-5 flex flex-col gap-1 justify-center">
          <p className="text-xl font-bold">حساب کاربری</p>
          <p>برای ورود یا ثبت نام لطفا شماره همراه خود را وارد کنید</p>
        </div>
        <div className="px-5 flex flex-col gap-2 justify-center items-center">
          <div className="w-full flex flex-col gap-2">
            <Input placeholder="شماره همراه" />
            <Button variant={"primary"} state="warning">
              ادامه
            </Button>
          </div>
          <p className="text-xs font-light">
            ورود شما به معنای پذیرش{" "}
            <span className="underline"> شرایط و قوانین </span>
            پلتفرم تمباکو است
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
