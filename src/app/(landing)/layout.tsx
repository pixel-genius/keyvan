"use client";

import { useGetAccountProfileGetApi } from "@/utils/apis/account/profile/GET/accountProfileGetApi";
import { useGetShopCartListApi } from "@/utils/apis/shop/cart/GET/shopCartGetApi";
import { useAuthStore } from "@/utils/store/authenticate.store";
import { useEffect } from "react";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setUserInfo } = useAuthStore();

  const accountProfileInfo = useGetAccountProfileGetApi();

  const shopCartList = useGetShopCartListApi();

  useEffect(() => {
    if (accountProfileInfo.isSuccess && accountProfileInfo.data)
      setUserInfo({
        userProfileInfo: accountProfileInfo.data,
      });
    if (shopCartList.isSuccess && shopCartList.data)
      setUserInfo({
        shopCart: shopCartList.data,
      });
  }, [
    accountProfileInfo.isSuccess,
    accountProfileInfo.data,
    shopCartList.isSuccess,
    shopCartList.data,
    setUserInfo,
  ]);

  return children;
}
