"use client";

import {
  IconCalendar,
  IconChevronLeft,
  IconEdit,
  IconShield,
  IconUser,
  IconX,
  IconCheck,
} from "@tabler/icons-react";
import { usePutAccountProfileApi } from "@/utils/apis/account/profile/PUT/accountProfilePutApi";
import Typography from "@/components/components/atoms/typography";
import { Input } from "@/components/components/molecules/input";
import { useAuthStore } from "@/utils/store/authenticate.store";
import { Button } from "@/components/components/atoms/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ProfilePage = () => {
  const router = useRouter();
  const { userProfileInfo } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: userProfileInfo?.firstName || "",
    lastName: userProfileInfo?.lastName || "",
    email: userProfileInfo?.email || "",
    phone_number: userProfileInfo?.phone_number || "",
    national_code: userProfileInfo?.national_code || "",
    username: userProfileInfo?.username || "",
  });

  const updateProfileMutation = usePutAccountProfileApi({
    onSuccess: () => {
      setIsEditing(false);
      // TODO: Update the store with new data or refetch profile
    },
    onError: (error) => {
      console.error("Failed to update profile:", error);
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    updateProfileMutation.mutate(formData);
  };

  const handleCancel = () => {
    setFormData({
      firstName: userProfileInfo?.firstName || "",
      lastName: userProfileInfo?.lastName || "",
      email: userProfileInfo?.email || "",
      phone_number: userProfileInfo?.phone_number || "",
      national_code: userProfileInfo?.national_code || "",
      username: userProfileInfo?.username || "",
    });
    setIsEditing(false);
  };

  return (
    <div
      className="px-4 pt-28 flex flex-col gap-6 min-h-screen bg-background"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <Typography
          variant={"paragraph/md"}
          className="self-center"
          weight="bold"
        >
          اطلاعات حساب کاربری
        </Typography>
        <div
          className="cursor-pointer p-2 rounded-full hover:bg-muted transition-colors"
          onClick={() => router.back()}
        >
          <IconChevronLeft size={24} className="text-muted-foreground " />
        </div>
      </div>

      <div className="space-y-6">
        {/* Profile Header */}
        <div className="bg-primary rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <IconUser size={32} className="text-primary-foreground" />
            </div>
            <div>
              <Typography
                weight="bold"
                variant={"paragraph/lg"}
                className="text-primary-foreground"
              >
                {userProfileInfo?.firstName && userProfileInfo?.lastName
                  ? `${userProfileInfo.firstName} ${userProfileInfo.lastName}`
                  : userProfileInfo?.firstName || userProfileInfo?.lastName
                    ? `${userProfileInfo?.firstName || ""} ${userProfileInfo?.lastName || ""}`.trim()
                    : "کاربر گرامی"}
              </Typography>
              <Typography
                variant={"paragraph/sm"}
                className="text-primary-foreground/90"
              >
                {userProfileInfo?.username || "نام کاربری"}
              </Typography>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <IconUser size={20} className="text-primary" />
            </div>
            <Typography
              variant={"paragraph/md"}
              weight="bold"
              className="text-foreground"
            >
              اطلاعات شخصی
            </Typography>
          </div>

          <div className="space-y-4">
            {isEditing ? (
              // Edit Form
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="نام"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    placeholder="نام خود را وارد کنید"
                  />
                  <Input
                    label="نام خانوادگی"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    placeholder="نام خانوادگی خود را وارد کنید"
                  />
                </div>
                <Input
                  label="شماره موبایل"
                  value={formData.phone_number}
                  onChange={(e) =>
                    handleInputChange("phone_number", e.target.value)
                  }
                  placeholder="شماره موبایل خود را وارد کنید"
                  type="tel"
                />
                <Input
                  label="ایمیل"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="ایمیل خود را وارد کنید"
                  type="email"
                />
                <Input
                  label="کد ملی"
                  value={formData.national_code}
                  onChange={(e) =>
                    handleInputChange("national_code", e.target.value)
                  }
                  placeholder="کد ملی خود را وارد کنید"
                />
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSave}
                    className="flex-1"
                    iconLeft={<IconCheck size={20} />}
                    isLoading={updateProfileMutation.isPending}
                    disabled={updateProfileMutation.isPending}
                  >
                    ذخیره تغییرات
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="secondary"
                    className="flex-1"
                    iconLeft={<IconX size={20} />}
                    disabled={updateProfileMutation.isPending}
                  >
                    انصراف
                  </Button>
                </div>
              </div>
            ) : (
              // Display View
              <>
                <div className="flex justify-between items-center p-4 bg-muted rounded-xl">
                  <Typography
                    variant={"paragraph/sm"}
                    className="text-muted-foreground"
                  >
                    نام و نام خانوادگی:
                  </Typography>
                  <Typography
                    variant={"paragraph/sm"}
                    weight="bold"
                    className="text-foreground"
                  >
                    {userProfileInfo?.firstName || null}{" "}
                    {userProfileInfo?.lastName || null}
                    {!userProfileInfo?.firstName &&
                      !userProfileInfo?.lastName &&
                      "___"}
                  </Typography>
                </div>
                <div className="flex justify-between items-center p-4 bg-muted rounded-xl">
                  <Typography
                    variant={"paragraph/sm"}
                    className="text-muted-foreground"
                  >
                    شماره موبایل:
                  </Typography>
                  <Typography
                    variant={"paragraph/sm"}
                    weight="bold"
                    className="text-foreground"
                  >
                    {userProfileInfo?.phone_number || "___"}
                  </Typography>
                </div>
                <div className="flex justify-between items-center p-4 bg-muted rounded-xl">
                  <Typography
                    variant={"paragraph/sm"}
                    className="text-muted-foreground"
                  >
                    ایمیل:
                  </Typography>
                  <Typography
                    variant={"paragraph/sm"}
                    weight="bold"
                    className="text-foreground"
                  >
                    {userProfileInfo?.email || "___"}
                  </Typography>
                </div>
                <div className="flex justify-between items-center p-4 bg-muted rounded-xl">
                  <Typography
                    variant={"paragraph/sm"}
                    className="text-muted-foreground"
                  >
                    کد ملی:
                  </Typography>
                  <Typography
                    variant={"paragraph/sm"}
                    weight="bold"
                    className="text-foreground"
                  >
                    {userProfileInfo?.national_code || "___"}
                  </Typography>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <IconShield size={20} className="text-primary" />
            </div>
            <Typography
              variant={"paragraph/md"}
              weight="bold"
              className="text-foreground"
            >
              اطلاعات حساب
            </Typography>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-muted rounded-xl">
              <Typography
                variant={"paragraph/sm"}
                className="text-muted-foreground"
              >
                نام کاربری:
              </Typography>
              <Typography
                variant={"paragraph/sm"}
                weight="bold"
                className="text-foreground"
              >
                {userProfileInfo?.username || "___"}
              </Typography>
            </div>
            <div className="flex justify-between items-center p-4 bg-muted rounded-xl">
              <div className="flex items-center gap-2">
                <IconCalendar size={16} className="text-muted-foreground" />
                <Typography
                  variant={"paragraph/sm"}
                  className="text-muted-foreground"
                >
                  تاریخ عضویت:
                </Typography>
              </div>
              <Typography
                variant={"paragraph/sm"}
                weight="bold"
                className="text-foreground"
              >
                1402/01/15
              </Typography>
            </div>
            <div className="flex justify-between items-center p-4 bg-primary/10 rounded-xl">
              <Typography
                variant={"paragraph/sm"}
                className="text-muted-foreground"
              >
                وضعیت حساب:
              </Typography>
              <div className="flex items-center gap-2">
                <Typography
                  variant={"paragraph/sm"}
                  weight="bold"
                  className="text-primary"
                >
                  فعال
                </Typography>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Button */}
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="w-full bg-primary text-primary-foreground py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
          >
            <IconEdit size={20} />
            <Typography variant={"paragraph/md"} weight="bold">
              ویرایش اطلاعات
            </Typography>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
