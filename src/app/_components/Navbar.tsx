"use client";

import {
  IconBook,
  IconHeadset,
  IconInfoCircle,
  IconMenu2,
  IconPhone,
  IconScale,
  IconShoppingCart,
  IconX,
} from "@tabler/icons-react";
import { useDeleteShopCartItemsRemoveApi } from "@/utils/apis/shop/cart/items/[id]/remove/DELETE/shopCartItemsRemoveDeleteApi";
import { usePostShopOrderCreateApi } from "@/utils/apis/shop/orders/create/POST/shopOrderCreatePostApi";
import Typography from "@/components/components/atoms/typography";
import { useAuthStore } from "@/utils/store/authenticate.store";
import { toEnglishDigits, toPersianNumbers } from "@/lib/utils";
import { Button } from "@/components/components/atoms/button";
import OrderConfirmation from "./OrderConfirmation";
import { useRouter } from "next/navigation";
import CartItemCard from "./CartItemCard";
import BottomSheet from "./BottomSheet";
import EmptyCart from "./EmptyCart";
import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

// Define a type for cart items
type CartItem = {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
};

const Navbar = () => {
  const router = useRouter();
  const { shopCart, setUserInfo } = useAuthStore();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderConfirmationOpen, setIsOrderConfirmationOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [note, setNote] = useState<string>("");
  const shopDeleteCartItemMutate = useDeleteShopCartItemsRemoveApi({
    onSuccess: (res) => {
      setUserInfo({ shopCart: res });
    },
  });
  const shopOrderMutate = usePostShopOrderCreateApi({
    onSuccess: () => {
      toast.success("ثبت سفارش با موفقیت انجام شد");
      setIsCartOpen(false);
      router.push("/orders");
    },
    onError: () => {
      toast.error("سفارش انجام نشد");
    },
  });
  // Sample cart items - in a real app, this would come from a state management solution
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Function to increase quantity of an item
  const handleIncreaseQuantity = (id: string) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: +toEnglishDigits(item.quantity) + 1 }
          : item,
      ),
    );
  };

  // Function to decrease quantity of an item
  const handleDecreaseQuantity = (id: string) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: +toEnglishDigits(item.quantity) - 1 }
          : item,
      ),
    );
  };

  // Function to handle order submission
  const handleOrderSubmit = () => {
    shopOrderMutate.mutate({ notes: note });
  };

  // Handle tracking order
  const handleTrackOrder = () => {
    setIsOrderConfirmationOpen(false);
    router.push("/orders"); // Navigate to orders page
  };

  // Handle close order confirmation
  const handleCloseOrderConfirmation = () => {
    setIsOrderConfirmationOpen(false);
    router.push("/"); // Navigate to home page
  };

  // Menu items for sidebar
  const menuItems = [
    {
      id: "about",
      title: "درباره ما",
      icon: IconInfoCircle,
      onClick: () => {
        setIsSidebarOpen(false);
        // TODO: Navigate to about page
        console.log("Navigate to about page");
      },
    },
    {
      id: "contact",
      title: "تماس با ما",
      icon: IconPhone,
      onClick: () => {
        setIsSidebarOpen(false);
        // TODO: Navigate to contact page
        console.log("Navigate to contact page");
      },
    },
    {
      id: "support",
      title: "پشتیبانی",
      icon: IconHeadset,
      onClick: () => {
        setIsSidebarOpen(false);
        // TODO: Navigate to support page
        console.log("Navigate to support page");
      },
    },
    {
      id: "terms",
      title: "قانون و مقررات",
      icon: IconScale,
      onClick: () => {
        setIsSidebarOpen(false);
        // TODO: Navigate to terms page
        console.log("Navigate to terms page");
      },
    },
    {
      id: "education",
      title: "آموزش",
      icon: IconBook,
      onClick: () => {
        setIsSidebarOpen(false);
        // TODO: Navigate to education page
        console.log("Navigate to education page");
      },
    },
  ];

  return (
    <>
      <nav className="bg-maincard flex justify-center z-50 fixed top-0 w-full items-center px-4 py-4">
        <div className="flex justify-between items-center w-full max-w-xl mx-auto">
          {/* Left Icon */}

          <IconMenu2
            size={28}
            color="white"
            className="cursor-pointer"
            onClick={() => setIsSidebarOpen(true)}
          />
          {/* Center Logo */}
          <Image src="img/logo-main.svg" alt="logo" width={50} height={50} />
          {/* <LogoIcon size={48} /> */}

          {/* Right Icon with Badge */}
          <div className="relative">
            <IconShoppingCart
              size={28}
              color="white"
              className="cursor-pointer"
              onClick={() => setIsCartOpen(true)}
            />
            {shopCart?.items && shopCart?.items?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {toPersianNumbers(shopCart?.items?.length)}
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* Cart Bottom Sheet */}
      <BottomSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)}>
        <div className="py-4 px-3">
          <Typography
            variant="label/lg"
            weight="semi-bold"
            className="mb-2 text-center"
          >
            سبد سفارش
          </Typography>

          {Number(shopCart?.total_items) > 0 ? (
            <>
              <Typography
                variant="label/sm"
                weight="normal"
                className="mb-4 text-center"
              >
                تعداد اقلام :{" "}
                <span>
                  {shopCart?.total_items
                    ? toPersianNumbers(shopCart?.total_items)
                    : null}
                </span>
              </Typography>

              <div className="mb-4">
                {shopCart?.items?.map((item) => (
                  <CartItemCard
                    key={item.id}
                    id={String(item.id)}
                    name={item.product.name}
                    image={item.product.image}
                    disabled={shopOrderMutate.isPending}
                    quantity={item.quantity}
                    removeMutate={shopDeleteCartItemMutate}
                    onIncreaseQuantity={handleIncreaseQuantity}
                    onDecreaseQuantity={handleDecreaseQuantity}
                  />
                ))}
              </div>
              <textarea
                value={note}
                onChange={(e) => {
                  setNote(e.currentTarget.value);
                }}
                placeholder="...یادداشت خود را بنویسید"
                className="w-full text-right mb-1 p-4 border border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-background text-foreground min-h-[100px] resize-none"
              />
              <Button
                variant="primary"
                size="md"
                isLoading={shopOrderMutate.isPending}
                disabled={shopOrderMutate.isPending}
                onClick={handleOrderSubmit}
                className="w-full"
              >
                ثبت سفارش
              </Button>
            </>
          ) : (
            <EmptyCart />
          )}
        </div>
      </BottomSheet>

      {/* Order Confirmation Bottom Sheet */}
      <BottomSheet
        isOpen={isOrderConfirmationOpen}
        onClose={handleCloseOrderConfirmation}
      >
        <OrderConfirmation
          onClose={handleCloseOrderConfirmation}
          onTrackOrder={handleTrackOrder}
        />
      </BottomSheet>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0  bg-opacity-60 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`fixed right-0 top-0 h-full w-80 bg-maincard z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <Typography
                variant="heading/lg"
                weight="bold"
                className="text-white"
              >
                منو
              </Typography>

              <div
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 cursor-pointer hover:bg-white/10 transition-all duration-200 rounded-lg"
              >
                <IconX size={24} className="text-white" />
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-3">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={item.onClick}
                    className="w-full h-16 flex items-center justify-end cursor-pointer hover:bg-white/10 transition-all duration-200 rounded-xl backdrop-blur-sm"
                  >
                    <Typography
                      variant="label/lg"
                      weight="medium"
                      className="text-white text-right"
                    >
                      {item.title}
                    </Typography>
                    <div className="flex items-center justify-center w-12 h-12 backdrop-blur-sm">
                      <IconComponent size={24} className="text-white" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="mt-12 text-center">
              <Typography
                variant="label/sm"
                weight="normal"
                className="text-white/70"
              >
                نسخه 1.0.0
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
