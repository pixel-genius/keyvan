"use client";
import Image from "next/image";

const LogoIcon = () => {
  return (
    <Image
      src="/img/logo-main.svg"
      unoptimized
      alt="logo"
      width={50}
      height={50}
    />
  );
};

export default LogoIcon;
