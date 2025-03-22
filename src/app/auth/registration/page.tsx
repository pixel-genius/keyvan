import { Button } from "@/components/components/atoms/button";
import Typography from "@/components/components/atoms/typography";
import { Input } from "@/components/components/molecules/input";

const Registrationpage = () => {
  return (
    <div dir="rtl" className="p-5">
      <div className="flex flex-col gap-2 pb-2">
        <Typography variant={"heading/xs"}>خوش آمدید</Typography>
        <Typography variant={"paragraph/md"}>
          برای تکمیل فرایند ثبت نام لطفا اطلاعات با دقت پر کنید{" "}
        </Typography>
      </div>
      <div className="flex flex-col">
        <div className="w-full flex gap-2">
          <Input placeholder="نام کاربری" />
          <Input placeholder="شناسه کاربری" />
        </div>
        <div className="pb-2">
          <Input placeholder="آدرس ایمیل" />
          <Input placeholder="کد ملی" />
          <Input placeholder="مجوز توزیع استانی یا کشوری " />
          <Input placeholder="جواز کسب"></Input>
        </div>
        <Button variant={"primary"} state="warning">
          ثبت نام
        </Button>
      </div>
    </div>
  );
};

export default Registrationpage;
