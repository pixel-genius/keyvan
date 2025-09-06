"use client";
import { removeToken } from "@/utils/cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Call the API route to clear the cookie
    fetch("/account/auth/logout", { method: "POST" }).then(() => {
      // Clear Cookie if needed
      removeToken();
      // Redirect to login
      router.replace("/auth/authenticate");
    });
  }, [router]);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>در حال خروج...</div>
  );
};

export default LogoutPage;
