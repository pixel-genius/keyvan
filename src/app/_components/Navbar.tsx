"use client";

import Typography from "@/components/components/atoms/typography";
import { IconShoppingCart, IconMenu2 } from "@tabler/icons-react";
import { Button } from "@/components/components/atoms/button";
import OrderConfirmation from "./OrderConfirmation";
import { useRouter } from "next/navigation";
import CartItemCard from "./CartItemCard";
import BottomSheet from "./BottomSheet";
import EmptyCart from "./EmptyCart";
import { useState } from "react";
import Image from "next/image";

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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderConfirmationOpen, setIsOrderConfirmationOpen] = useState(false);

  // Sample cart items - in a real app, this would come from a state management solution
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "وینستون",
      image: "/img/winston.png",
      quantity: 2,
      price: 325000,
    },
    {
      id: "2",
      name: "وینستون",
      image: "/img/winston.png",
      quantity: 2,
      price: 325000,
    },
    {
      id: "3",
      name: "وینستون",
      image: "/img/winston.png",
      quantity: 2,
      price: 325000,
    },
  ]);

  // Function to remove an item from the cart
  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Function to increase quantity of an item
  const handleIncreaseQuantity = (id: string) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  // Function to decrease quantity of an item
  const handleDecreaseQuantity = (id: string) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  // Function to handle order submission
  const handleOrderSubmit = () => {
    // In a real app, you would make an API call to submit the order
    setIsOrderConfirmationOpen(true);
    setIsCartOpen(false); // Close cart bottom sheet
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

  // Calculate total items in cart
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <>
      <nav className="bg-maincard flex justify-center z-50 fixed top-0 w-full items-center px-4 py-4">
        <div className="flex justify-between items-center w-full max-w-xl mx-auto">
          {/* Left Icon */}

          <IconMenu2
            size={28}
            color="white"
            className="cursor-pointer"
            onClick={() => router.push("/menu")}
          />
          {/* Center Logo */}
          <Image src="img/logo-main.svg" alt="logo" width={50} height={50} />

          {/* Right Icon with Badge */}
          <div className="relative">
            <IconShoppingCart
              size={28}
              color="white"
              className="cursor-pointer"
              onClick={() => setIsCartOpen(true)}
            />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
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

          {cartItems.length > 0 ? (
            <>
              <Typography
                variant="label/sm"
                weight="normal"
                className="mb-4 text-center"
              >
                تعداد اقلام : <span>{totalItems}</span>
              </Typography>

              <div className="mb-4">
                {cartItems.map((item) => (
                  <CartItemCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    quantity={item.quantity}
                    onRemove={handleRemoveItem}
                    onIncreaseQuantity={handleIncreaseQuantity}
                    onDecreaseQuantity={handleDecreaseQuantity}
                  />
                ))}
              </div>

              <Button
                variant="primary"
                size="md"
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
    </>
  );
};

export default Navbar;
