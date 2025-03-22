import Typography from "@/components/components/atoms/typography";
import { IconProgressCheck } from "@tabler/icons-react";

const Registrationdonpage = () => {
  return (
    <div dir="rtl" className="flex justify-center items-center">
      <div className="flex justify-center items-center p-10 flex-col gap-2">
        <IconProgressCheck size={73} className="text-green-500" />
        <div className="flex flex-col items-center gap-3">
          <Typography variant={"heading/xs"}>ثبت نام موفق شد</Typography>
          <Typography variant={"label/sm"} className="text-center">
            اطلاعات شما در سریع‌ترین زمان ممکن بررسی می‌شود و نتیجه را به شما
            اطلاع می‌دهیم. از شکیبایی شما سپاسگزاریم.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Registrationdonpage;
