
"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import CartItem from "@/components/CartItem";
import { useCartStore } from "@/context/cartContextZustand";

const CartPage = () => {
  const { user } = useAuth();
  const loadCart = useCartStore((state) => state.loadCart);
  const checkout = useCartStore((state) => state.checkout);
  const totalPrice = useCartStore((state) => state.totalPrice)
  const cart = useCartStore((state) => state.cart);

  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Load cart on mount
  useEffect(() => {
    if (!user) return;
    loadCart(user.id);
  }, [user]);
  
  const handleCheckout = async () => {
    setLoading(true);
    try {
      if (user) {
        await checkout(user.id);
      }
    } finally {
      setLoading(false);
    }
  };
  
  if (!mounted) return null;

  return (
    <div className="mx-[5vw] h-full">
      <h1 className="text-4xl text-orange-500 text-center font-bold py-[5vh] uppercase">
        Cart
      </h1>
      <div className="w-full h-fit flex flex-col justify-between items-center">
        {user ? (
          <div className="w-full flex flex-col justify-start items-center">
            {cart.length === 0 ? (
              <p className="mt-[25vh] text-gray-500 text-2xl">
                Your cart is empty
              </p>
            ) : (
              cart.map((item) => <CartItem key={item.id} cartItem={item} />)
            )}
          </div>
        ) : (
          <div className="w-full text-center">
            <p className="mt-[25vh] text-gray-500  text-2xl">
              Please Login First
            </p>
          </div>
        )}
        {cart.length > 0 && (
          <div className="flex flex-row justify-between items-center w-[80vw] md:w-1/2 my-5 px-5 bg-orange-500 text-white text:lg md:text-2xl font-semibold rounded-lg">
            <p className="">{`total: ${totalPrice()}`}</p>
            <button
              className="relative px-4 py-2 rounded-lg cursor-pointer"
              onClick={handleCheckout}
            >
              {loading ? "CheckingOut" : "Checkout"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;