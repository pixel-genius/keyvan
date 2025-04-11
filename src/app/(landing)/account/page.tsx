import Typography from "@/components/components/atoms/typography";
import { IconChevronLeft } from "@tabler/icons-react";

const Accountpage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <IconChevronLeft size={24} className="cursor-pointer" />
        <Typography variant={"paragraph/md"}>حساب کاربری</Typography>
      </div>
      <div className="p-4 bg-primary rounded-lg">
        <div className="flex justify-between items-center">
          <Typography variant={"paragraph/sm"}>امتیاز شما۳۵امتیاز</Typography>
          <div className="flex gap-1 flex-col text-right">
            <Typography variant={"paragraph/md"}>حساب کاربری</Typography>
            <Typography variant={"paragraph/sm"}>سطح ۱</Typography>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <IconChevronLeft size={24} className="cursor-pointer" />
        <Typography variant={"paragraph/md"}>اطلاعات حساب کاربری</Typography>
      </div>
      <div className="flex justify-between items-center">
        <IconChevronLeft size={24} className="cursor-pointer" />
        <Typography variant={"paragraph/md"}>مستندات و مدارک</Typography>
      </div>
      <div className="flex justify-between items-center">
        <IconChevronLeft size={24} className="cursor-pointer" />
        <Typography variant={"paragraph/md"}>آدرس ها</Typography>
      </div>
      <div className="flex justify-between items-center">
        <IconChevronLeft size={24} className="cursor-pointer" />
        <Typography variant={"paragraph/md"}>خروج از حساب</Typography>
      </div>
    </div>
  );
};

export default Accountpage;
