import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type BottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function BottomSheet({
  isOpen,
  onClose,
  children,
}: BottomSheetProps) {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if ((event.target as HTMLElement).id === "backdrop") {
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
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="backdrop"
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 50 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
            className={cn("w-full bg-background rounded-t-2xl px-4 pb-16 shadow-lg")}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
