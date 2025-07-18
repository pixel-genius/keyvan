"use client";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutClientWrapper(props: React.PropsWithChildren) {
  const pathname = usePathname();
  const hideNavAndFooter = pathname.startsWith("/auth");

  return (
    <>
      {!hideNavAndFooter && <Navbar />}
      {props.children}
      {!hideNavAndFooter && <Footer />}
    </>
  );
} 