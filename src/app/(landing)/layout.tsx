import { ReactNode } from "react";
import "../globals.css";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-4 rounded-4xl ">
        {children}
      </main>
      <Footer />
    </div>
  );
} 