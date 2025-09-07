"use client";

import { useGetAccountProfileGetApi } from "@/utils/apis/account/profile/GET/accountProfileGetApi";
import { useAuthStore } from "@/utils/store/authenticate.store";
import { useEffect } from "react";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setUserInfo, userProfileInfo } = useAuthStore();
  const accountProfileInfo = useGetAccountProfileGetApi({
    enabled: !userProfileInfo,
  });

  useEffect(() => {
    setUserInfo({ userProfileInfo: accountProfileInfo.data });
  }, []);

  return children;
}
