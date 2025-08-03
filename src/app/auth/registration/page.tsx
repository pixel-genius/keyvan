"use client";

import Typography from "@/components/components/atoms/typography";
import { Input } from "@/components/components/molecules/input";
import { Button } from "@/components/components/atoms/button";
import BottomSheet from "@/app/_components/BottomSheet";
import FileUpload from "@/app/_components/FileUpload";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Registrationpage = () => {
  const router = useRouter();
  const [isOpen] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });
  const [provincialLicense, setProvincialLicense] = useState<File | null>(null);
  const [businessLicense, setBusinessLicense] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Generate a pending token with timestamp - only on client side
    const pendingToken = {
      token: Math.random().toString(36).substring(2),
      timestamp: Date.now(),
      status: "pending",
    };

    // Store the registration data and pending token
    localStorage.setItem(
      "registrationData",
      JSON.stringify({
        ...formData,
        provincialLicense: provincialLicense ? provincialLicense.name : null,
        businessLicense: businessLicense ? businessLicense.name : null,
      }),
    );

    // Store the pending token
    localStorage.setItem("pendingToken", JSON.stringify(pendingToken));

    // Navigate to pending approval page
    router.push("/auth/pend-approved");
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
              <Input
                placeholder="نام"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <Input
                placeholder="نام خانوادگی"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <FileUpload
                label="مجوز توزیع استانی یا کشوری (اختیاری)"
                onChange={setProvincialLicense}
              />

              <FileUpload
                label="جواز کسب (اختیاری)"
                onChange={setBusinessLicense}
              />
            </div>

            <Button
              variant={"primary"}
              state="warning"
              onClick={handleSubmit}
              disabled={!formData.firstName || !formData.lastName}
            >
              ارسال
            </Button>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
};

export default Registrationpage;
