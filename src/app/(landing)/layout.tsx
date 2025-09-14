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
  const { setUserInfo, userProfileInfo } = useAuthStore();
  const accountProfileInfo = useGetAccountProfileGetApi({
    enabled: !userProfileInfo,
  });

  const shopCartList = useGetShopCartListApi();

  useEffect(() => {
    if (accountProfileInfo.isSuccess)
      setUserInfo({
        userProfileInfo: accountProfileInfo.data,
      });
    if (shopCartList.isSuccess)
      setUserInfo({
        shopCart: shopCartList.data,
      });
  }, [accountProfileInfo.isSuccess, shopCartList.isSuccess]);

  return children;
}
