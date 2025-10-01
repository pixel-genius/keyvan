"use client";

import {
  IconArchive,
  IconBook,
  IconHeadset,
  IconInfoCircle,
  IconMenu2,
  IconPhone,
  IconScale,
  IconX,
} from "@tabler/icons-react";
import {
  ShopOrderCreatePostApiPayload,
  usePostShopOrderCreateApi,
} from "@/utils/apis/shop/orders/create/POST/shopOrderCreatePostApi";
import {
  AccountAddressesObj,
  useGetAccountAddressList,
} from "@/utils/apis/account/addresses/GET/accountAddressesListGetApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/components/atoms/select";
import { useDeleteShopCartItemsRemoveApi } from "@/utils/apis/shop/cart/items/[id]/remove/DELETE/shopCartItemsRemoveDeleteApi";
import { useGetMutateShopCartListApi } from "@/utils/apis/shop/cart/GET/shopCartGetApi";
import Typography from "@/components/components/atoms/typography";
import { useAuthStore } from "@/utils/store/authenticate.store";
import { toEnglishDigits, toPersianNumbers } from "@/lib/utils";
import { Button } from "@/components/components/atoms/button";
import AddAddressBottomSheet from "./AddAddressBottomSheet";
import OrderConfirmation from "./OrderConfirmation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CartItemCard from "./CartItemCard";
import BottomSheet from "./BottomSheet";
import EmptyCart from "./EmptyCart";
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
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [formFields, setFormFields] = useState<{
    notes: string;
    address_id: number | null;
  }>({
    notes: "",
    address_id: null,
  });
  const [defaultAddressState, setDefaultAddressState] =
    useState<AccountAddressesObj | null>(null);
  console.log(formFields);
  const shopCartGetMutate = useGetMutateShopCartListApi({
    onSuccess: (res) => {
      setUserInfo({ shopCart: res });
    },
  });

  const accountAddressListQuery = useGetAccountAddressList({
    enabled:
      Number(shopCart?.total_buy_items) > 0 ||
      Number(shopCart?.total_sell_items) > 0,
  });

  const shopDeleteCartItemMutate = useDeleteShopCartItemsRemoveApi({
    onSuccess: (res) => {
      setUserInfo({ shopCart: res });
    },
  });

  const shopOrderMutate = usePostShopOrderCreateApi({
    onSuccess: () => {
      toast.success("ثبت درخواست با موفقیت انجام شد");
      setIsCartOpen(false);
      shopCartGetMutate.mutate(undefined);
      router.push("/requests");
    },
    onError: () => {
      toast.error("درخواست انجام نشد");
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
    shopOrderMutate.mutate(formFields as ShopOrderCreatePostApiPayload);
  };

  // Handle tracking order
  const handleTrackOrder = () => {
    setIsOrderConfirmationOpen(false);
    router.push("/requests"); // Navigate to requests page
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

  useEffect(() => {
    let defaultAddress: AccountAddressesObj | undefined =
      accountAddressListQuery.data?.data.find((item) => item.is_default);

    if (!defaultAddress) {
      defaultAddress = accountAddressListQuery.data?.data?.[0];
    }
    setDefaultAddressState(defaultAddress || null);
  }, [accountAddressListQuery.data?.data]);

  useEffect(() => {
    setFormFields((prev) => ({
      ...prev,
      address_id: defaultAddressState?.id || null,
    }));
  }, [defaultAddressState]);
  useEffect(() => {
    if (!isCartOpen) {
      setFormFields({ notes: "", address_id: null });
    }
  }, [isCartOpen]);

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
          <Image
            src="img/logo-main.svg"
            unoptimized
            alt="logo"
            width={50}
            height={50}
          />
          {/* <LogoIcon size={48} /> */}

          {/* Right Icon with Badge */}
          <div className="relative">
            <IconArchive
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
            درخواست ها
          </Typography>

          {Number(shopCart?.total_sell_items) > 0 ||
          Number(shopCart?.total_buy_items) > 0 ? (
            <>
              <Typography
                variant="label/sm"
                weight="normal"
                className="mb-4 text-center"
              >
                تعداد اقلام :{" "}
                <span>
                  {shopCart?.items?.length
                    ? toPersianNumbers(shopCart?.items?.length)
                    : null}
                </span>
              </Typography>
              <div className="max-h-[250px] overflow-y-auto mb-2 flex flex-col gap-2">
                {shopCart?.items?.map((item) => (
                  <CartItemCard
                    key={item.id}
                    id={String(item.id)}
                    name={item.product.name}
                    image={item.product.image}
                    orderType={item.order_type}
                    price={item.suggested_price}
                    disabled={shopOrderMutate.isPending}
                    quantity={item.quantity}
                    removeMutate={shopDeleteCartItemMutate}
                    onIncreaseQuantity={handleIncreaseQuantity}
                    onDecreaseQuantity={handleDecreaseQuantity}
                  />
                ))}
              </div>
              <div className="mb-2">
                {accountAddressListQuery.data?.data?.length ? (
                  <Select
                    defaultValue={formFields.address_id?.toString()}
                    onValueChange={(value) => {
                      setFormFields((prev) => ({
                        ...prev,
                        address_id: +value,
                      }));
                    }}
                  >
                    <SelectTrigger
                      className="bg-transparent w-full "
                      style={{ boxShadow: "unset !important" }}
                      dir="rtl"
                    >
                      <SelectValue placeholder="آدرس مورد نظر را انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent dir="rtl">
                      {accountAddressListQuery.data?.data.map((item) => (
                        <SelectItem
                          key={item.id + item.title}
                          value={item.id.toString()}
                        >
                          {item.title} {item.is_default ? "(پیش فرض)" : null}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="flex flex-col items-center gap-2 p-4 bg-muted/10 rounded-xl">
                    <Typography
                      variant="paragraph/sm"
                      className="text-muted-foreground text-center"
                    >
                      شما هنوز آدرسی ثبت نکرده‌اید
                    </Typography>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setIsAddAddressOpen(true);
                      }}
                      className="w-full"
                    >
                      افزودن آدرس جدید
                    </Button>
                  </div>
                )}
              </div>
              <textarea
                value={formFields.notes}
                onChange={(e) => {
                  setFormFields((prev) => ({
                    ...prev,
                    notes: e.target.value,
                  }));
                }}
                placeholder="...یادداشت خود را بنویسید"
                dir="rtl"
                className="w-full text-right mb-1 p-4 border border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-background text-foreground min-h-[100px] resize-none"
              />
              <Button
                variant="primary"
                size="md"
                isLoading={shopOrderMutate.isPending}
                disabled={!formFields.address_id || shopOrderMutate.isPending}
                onClick={handleOrderSubmit}
                className="w-full"
              >
                ثبت درخواست
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

      {/* Add Address Bottom Sheet */}
      <AddAddressBottomSheet
        isOpen={isAddAddressOpen}
        onClose={() => setIsAddAddressOpen(false)}
        onSave={() => {
          accountAddressListQuery.refetch();
        }}
      />
    </>
  );
};

export default Navbar;
