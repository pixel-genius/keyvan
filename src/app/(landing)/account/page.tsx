"use client";

import Typography from "@/components/components/atoms/typography";
import { IconChevronLeft, IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const Accountpage = () => {
  const router = useRouter();
  return (
    <div className=" px-4 pt-28 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <IconChevronLeft size={24} className="cursor-pointer" />
        <Typography variant={"paragraph/md"}>حساب کاربری</Typography>
      </div>
      <div className="p-4 bg-primary rounded-lg mb-8">
        <div className="flex justify-between items-center">
          <Typography weight="bold" variant={"paragraph/sm"}>امتیاز شما۳۵امتیاز</Typography>
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
      <div className="flex text-red-500  justify-between items-center py-8 border-t-1 border-zink-200 cursor-pointer" onClick={() => router.push('/auth/logout')}>
        <IconLogout  size={24} className="cursor-pointer" />
        <Typography variant={"paragraph/md"}>خروج از حساب</Typography>
      </div>
    </div>
  );
};

export default Accountpage;
