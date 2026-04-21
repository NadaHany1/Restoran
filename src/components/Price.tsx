"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { TCartItemInsert, Product, User } from "@/types/Types";
import {useCartStore} from "@/context/cartContextZustand"
import { useAuth } from "@/context/AuthContext";
import Toast from "./Toast";

type Data = {
  id: number;
  product_id: number;
  size: string;
  additional_price: number;
};

type Props = {
  product: Product;
};

const Price = ({ product }: Props) => {
  const [total, setTotal] = useState(product.price);
  const [quantity, setQuantity] = useState(1);
  const [productOptions, setProductOptions] = useState<Data[]>([]);
  const [selected, setSelected] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false)


  const selectedOption = productOptions[selected];

  const addToCart = useCartStore((state) => state.addToCart)
  // const currentUser = 
  const {user} = useAuth();

  // Fetch product options (sizes) from Supabase
  useEffect(() => {
    const fetchSizes = async () => {
      const { data, error } = await supabase
        .from("product_options")
        .select("*")
        .eq("product_id", product.id)
        .order("id", { ascending: true });

      if (error) {
        console.error("Error while fetching sizes:", error);
        return;
      }

      setProductOptions(data || []);
    };

    fetchSizes();
  }, [product.id]);

  // Update total whenever quantity or selected option changes
  useEffect(() => {
    const additionalPrice = productOptions[selected]?.additional_price || 0;
    setTotal(quantity * (product.price + additionalPrice));
  }, [quantity, selected, productOptions, product.price]);

  const handleAddToCart = (product:Product, user:User | null) => {
    const myItem : TCartItemInsert = {
      product_id: product.id,
      size: selectedOption.size,
      quantity: quantity,
      unit_price: (product.price + selectedOption.additional_price),
      title:product.title,
      image:product.image
    }

    // addToCart(myItem, user!.id);
    if(!user?.id){
      setShowLoginMessage(true)
    }else{
      addToCart(myItem, user?.id);
      setShowSuccessMessage(true)
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4 rounded-md">
      <h2 className="text-lg font-bold text-orange-500">${total.toFixed(2)}</h2>

      {/* ADDED TO CART MESSAGE */}
      {showSuccessMessage && (
        <Toast
          message="Added to cart successfully"
          duration={3000}
          onClose={() => setShowSuccessMessage(false)}
        />
      )}

      {showLoginMessage && (
        <Toast
          message="Please login first"
          duration={3000}
          onClose={() => setShowLoginMessage(false)}
        />
      )}

      {/* OPTIONS CONTAINER */}
      <div className="flex flex-row w-full gap-2 items-center">
        {productOptions.map((option, index) => (
          <button
            key={option.id}
            className="p-2 ring-1 ring-orange-500 rounded-md"
            style={{
              background:
                selected === index ? "oklch(83.7% 0.128 66.29)" : "white",
              color: selected === index ? "white" : "oklch(70.5% 0.213 47.604)",
            }}
            onClick={() => setSelected(index)}
          >
            {option.size}
          </button>
        ))}
      </div>

      {/* QUANTITY CONTAINER */}
      <div className="w-full flex flex-col gap-2">
        <label
          htmlFor="quantity"
          className="font-bold text-lg capitalize text-white"
        >
          Quantity
        </label>
        <div className="ring-1 ring-orange-500 flex">
          <input
            type="number"
            id="quantity"
            min={1}
            max={20}
            value={quantity}
            onChange={(e) => {
              const value = Math.max(1, Math.min(20, Number(e.target.value)));
              setQuantity(value);
            }}
            className="flex-2 p-2 focus:outline-none accent-amber-600"
          />
          <button
            type="button"
            onClick={() => handleAddToCart(product, user)}
            className="flex-1 bg-orange-500 text-white p-2 hover:bg-orange-600 cursor-pointer"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
    // <TestSupa/>
  );
};

export default Price;