"use client";

import { Button } from "@/components/components/atoms/button";
import Typography from "@/components/components/atoms/typography";
import { Input } from "@/components/components/molecules/input";
import BottomSheet from "@/app/_components/BottomSheet";
import { useState } from "react";
import FileUpload from "@/app/_components/FileUpload";

const Registrationpage = () => {
  const [isOpen] = useState(true);
  const [provincialLicense, setProvincialLicense] = useState<File | null>(null);
  const [businessLicense, setBusinessLicense] = useState<File | null>(null);

  const handleSubmit = () => {
    // Demo function - would send data to API in production
    console.log({ 
      provincialLicense, 
      businessLicense 
    });
  };

  return (
    <div className="h-full">
      <BottomSheet 
        isOpen={isOpen} 
        onClose={() => {}} 
        hasBackdrop={false}
        hasBlur={false}
        isClosable={false}
      >
        <div dir="rtl" className="p-5 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Typography variant={"heading/xs"}>خوش آمدید</Typography>
            <Typography variant={"paragraph/md"}>
              برای تکمیل فرایند ثبت نام لطفا اطلاعات با دقت پر کنید{" "}
            </Typography>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="w-full flex gap-2">
              <Input placeholder="نام " />
              <Input placeholder="نام خانوادگی" />
            </div>
            
            <div className="flex flex-col gap-2">
              <Input placeholder="آدرس ایمیل" />
              <Input placeholder="کد ملی" />
              
              <FileUpload 
                label="مجوز توزیع استانی یا کشوری" 
                onChange={setProvincialLicense}
              />
              
              <FileUpload 
                label="جواز کسب" 
                onChange={setBusinessLicense}
              />
            </div>
            
            <Button variant={"primary"} state="warning" onClick={handleSubmit}>
              ارسال
            </Button>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
};

export default Registrationpage;
