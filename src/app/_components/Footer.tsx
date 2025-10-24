"use client";

import {
  IconUser,
  IconListDetails,
  IconShoppingBag,
  IconHome,
} from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    {
      id: "account",
      href: "/account",
      icon: <IconUser size={24} />,
      label: "حساب",
    },
    {
      id: "requests",
      href: "/requests",
      icon: <IconListDetails size={24} />,
      label: "درخواست ها",
    },
    {
      id: "products",
      href: "/products",
      icon: <IconShoppingBag size={24} />,
      label: "محصولات",
    },
    { id: "home", href: "/", icon: <IconHome size={24} />, label: "خانه" },
  ];

  return (
    <footer className="bg-white fixed bottom-0 left-0 w-full py-4 z-30 flex items-center shadow-lg">
      <div className="flex justify-around w-full max-w-xl mx-auto text-xs text-white">
        {links.map((link) => (
          <div
            key={link.id}
            className={`flex flex-col gap-2 items-center cursor-pointer transition-colors ${
              pathname === link.href ? "text-primary" : "text-zinc-400"
            }`}
            onClick={() => router.push(link.href)}
          >
            {link.icon}
            <p>{link.label}</p>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
