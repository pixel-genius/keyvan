"use client";
import Image from "next/image";

const LogoIcon = () => {
  return (
    <Image
      src="/img/logo-main.svg"
      unoptimized
      alt="logo"
      width={100}
      height={100}
    />
  );
};

export default LogoIcon;
