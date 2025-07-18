"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Call the API route to clear the cookie
    fetch("/api/logout", { method: "POST" })
      .then(() => {
        // Clear localStorage/sessionStorage if needed
        localStorage.clear();
        sessionStorage.clear();
        // Redirect to login
        router.replace("/auth/login");
      });
  }, [router]);

  return <div style={{textAlign: 'center', marginTop: '2rem'}}>در حال خروج...</div>;
};

export default LogoutPage; 