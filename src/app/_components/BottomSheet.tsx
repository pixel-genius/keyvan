"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

type BottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  hasBackdrop?: boolean;
  hasBlur?: boolean;
  isClosable?: boolean;
  fullScreen?: boolean;
};

export default function BottomSheet({
  isOpen,
  onClose,
  children,
  hasBackdrop = true,
  hasBlur = true,
  isClosable = true,
  fullScreen = false,
}: BottomSheetProps) {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isClosable && (event.target as HTMLElement).id === "backdrop") {
        onClose();
      }
    };

    // Prevent body scrolling when BottomSheet is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose, isClosable]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="backdrop"
          className={cn(
            "fixed inset-0 z-50 flex items-end justify-center",
            hasBackdrop && "bg-black/50",
            hasBlur && "backdrop-blur-sm",
            fullScreen ? "items-center" : " w-full mx-auto",
          )}
        >
          <motion.div
            initial={fullScreen ? { scale: 0.9, opacity: 0 } : { y: "100%" }}
            animate={fullScreen ? { scale: 1, opacity: 1 } : { y: 50 }}
            exit={fullScreen ? { scale: 0.9, opacity: 0 } : { y: "100%" }}
            transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
            className={cn(
              "bg-white rounded-2xl flex flex-col",
              fullScreen
                ? "w-full h-full  max-h-[90vh] mx-4 my-4"
                : " w-full mx-auto rounded-t-2xl max-h-[80vh]",
            )}
          >
            <div className="flex-1 overflow-y-auto px-4 pb-16">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
