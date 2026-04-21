"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getSingleProduct } from "@/services/products";
import { Product } from "@/types/Types";
import Price from "@/components/Price";

const ProductPage = () => {
  const params = useParams();
  const id = Number(params.id);
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getSingleProduct(id);
        setSingleProduct(data);
      } catch (error) {
        console.error("cannot get product:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return <div>
      <div className="flex flex-col md:flex-row justify-around items-center gap-5 w-[80vw] h-screen md:h-[90vh] py-[5vh] m-auto animate-pulse">
           {/* IMAEG CONTAINER */}
           <div className="relative flex-1 w-[50vw] aspect-square bg-gray-300 rounded-[50%]"></div>
           {/* TEXT CONTAINER */}
           <div className="flex-2 flex w-full flex-col gap-5 text-orange-500 ">
             <div className="w-[60%] h-8 bg-gray-300 rounded-4xl"></div>
             <div className="w-full h-8 bg-gray-300 rounded-4xl"></div>
             <div className="w-full h-8 bg-gray-300 rounded-4xl"></div>
             <div className="w-full h-8 bg-gray-300 rounded-4xl"></div>
             <div className="w-[30%] h-8 bg-gray-300 rounded-4xl"></div>
           </div>
         </div>
    </div>;
  }

  if (!singleProduct) {
    return <div>Product not found</div>;
  }

  return (
    <div className="flex flex-col md:flex-row justify-around items-center gap-5 w-[80vw] h-screen md:h-[90vh] py-[5vh] m-auto">
      {singleProduct.image && (
        <div className="relative flex-1 w-full h-full">
          <Image
            src={singleProduct.image}
            alt={singleProduct.title}
            fill
            className="object-contain"
          />
        </div>
      )}

      <div className="flex-2 flex flex-col gap-5 text-orange-500">
        <h1 className="text-3xl font-bold capitalize">{singleProduct.title}</h1>
        <p>{singleProduct.description}</p>

        <Price
          product={singleProduct}
        />
      </div>
    </div>
  );
};

export default ProductPage;
