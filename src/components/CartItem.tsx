import React from 'react'
import Image from "next/image";
import { Plus, Minus} from "lucide-react";
import Modal from './Modal';
import { TCartItem } from '@/types/Types';
import { useCartStore } from '@/context/cartContextZustand';

interface CartProps {
  cartItem: TCartItem
  };


const CartItem = ({cartItem} : CartProps) => {
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  return (
    <div className="relative w-full flex flex-col gap-1 md:flex-row justify-between md:items-center p-5 border-b border-gray-300">
      {/* DELETE BUTTON */}
      <div className="absolute top-2 right-2">
        <Modal
          header={"Delete product"}
          message="Are you sure you want to delete this product from your cart ?
          This action cannot be undone."
          buttonText="Delete"
          onConfirm={() => removeFromCart(cartItem.id)}
        />
      </div>
      {/* ITEM DETAILS */}
      <div className="flex-1 flex justify-start gap-3">
        {/* ITEM IMAGE */}
        {/* IMAGE CONAINER */}
        <div className="relative h-20 aspect-square">
          <Image
            src={cartItem.image ? cartItem.image : "/slide1.png"}
            alt="cart item image"
            fill
            sizes="100"
          />
        </div>
        <div className="flex flex-col justify-center text-gray-500 text-md md:text-xl font-semibold">
          {/* ITEM NAME */}
          <p className="text-black font-bold text-[1.2em]">
            {cartItem.title ?? cartItem.title}
          </p>
          {/* ITEM OPTIONS */}
          <p>Size: {cartItem.size}</p>
        </div>
      </div>
      {/* ORDER DETAILS */}
      <div className="flex-1 flex w-full flex-row justify-center">
        {/* QUANTITY */}
        <div className="flex gap-5 text-black text-md md:text-xl">
          <button
            className="border-none p-0.5 rounded-full bg-orange-500 text-white hover:bg-orange-600 cursor-pointer"
            type="button"
            onClick={() => updateQuantity(cartItem.id, 1)}
          >
            <Plus />
          </button>
          <p>{cartItem.quantity}</p>
          <button
            className="border-none p-0.5 rounded-full bg-orange-500 text-white hover:bg-orange-600 cursor-pointer"
            type="button"
            onClick={() => updateQuantity(cartItem.id, -1)}
          >
            <Minus />
          </button>
        </div>
      
      <div className="flex-1 text-right">
        {/* TOTAL PRICE */}
        <p className="text-black font-bold text-md md:text-xl">
          ${cartItem.total_price}
        </p>
      </div>
      </div>
    </div>
  );
}

export default CartItem
