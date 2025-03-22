"use client";

import { IconShoppingCart, IconMenu2 } from "@tabler/icons-react";
import LogoIcon from "../../icons/logo";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="bg-maincard flex justify-between z-50 fixed top-0 w-full items-center px-4 py-6">
      <IconShoppingCart size={28} color="white" className="cursor-pointer" onClick={() => router.push("/cart")} />
      <LogoIcon />
      <IconMenu2 size={28} color="white" className="cursor-pointer" onClick={() => router.push("/menu")} />
    </nav>
  );
};

export default Navbar;
