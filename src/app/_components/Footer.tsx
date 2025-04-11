"use client";

import { usePathname, useRouter } from "next/navigation";
import { IconUser, IconListDetails, IconShoppingBag, IconHome, IconCategory } from "@tabler/icons-react";

const Footer = () => {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { id: "account", href: "/account", icon: <IconUser size={24} />, label: "حساب" },
    { id: "orders", href: "/orders", icon: <IconListDetails size={24} />, label: "سفارشات" },
    { id: "products", href: "/products", icon: <IconShoppingBag size={24} />, label: "محصولات" },
    { id: "home", href: "/", icon: <IconHome size={24} />, label: "خانه" },
  ];

  return (
    <footer className="bg-maincard fixed bottom-0 left-0 w-full py-4 z-30 flex items-center shadow-lg">
      <div className="flex justify-around w-full text-xs text-gray-600">
        {links.map((link) => (
          <div
            key={link.id}
            className={`flex flex-col gap-2 items-center cursor-pointer ${
              pathname === link.href ? "text-primary" : "text-gray-600"
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
