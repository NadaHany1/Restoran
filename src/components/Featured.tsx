"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Product } from '@/types/Types'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from "next/navigation";


const Featured = () => {

  const router = useRouter();
  const [products, setProducts] = useState<Product[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
        const {data, error} = await supabase.from("products").select("*")
        setProducts(data);
        setLoading(false);
    };

    loadProducts();
  }, [])

  if (loading) {
    return (
      <div className="w-screen flex justify-center items-center h-[80vh] text-orange-500">
        Loading featured products...
      </div>
    );
  }


  return (
    <div className='w-screen overflow-x-scroll no-scrollbar'>
      {/* WRAPPER */}
      <div className="flex w-max">
      {/* SINGLE ITEM */}
      {products?.map((item) => 
        <div key={item.id} className="flex flex-col gap-1 h-[80vh] w-screen items-center justify-around py-6 hover:bg-orange-50 transition-all duration-300 md:w-[50vw] xl:w-[33vw]">
          {/* IMAGE CONTAINER */}
          {item.image && <div className="relative flex-1 w-full">
            <Image src={item.image} alt='' fill  className='object-contain'/>
          </div>}
          {/* TEXT CONTAINER */}
          <div className="flex-1 flex flex-col gap-4 p-6 text-orange-500 text-center justify-center items-center">
            <h3 className='font-bold uppercase text-2xl'>{item.title}</h3>
            <p className='text-md'>{item.description}</p>
            <span className='font-bold text-xl'>{item.price}</span>
            <button 
            onClick={ () => router.push(`/product/${item.id}`)}
            className='bg-orange-500 text-white block w-max p-4 rounded-md hover:bg-orange-600 cursor-pointer'>Add To Cart</button>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default Featured
