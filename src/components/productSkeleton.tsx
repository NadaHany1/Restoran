import React from 'react'
import { singleProduct } from '@/data'
import Image from 'next/image'
// import { useState } from 'react'
// import Price from '@/components/Price'
// import { getSingleProduct, Product } from '@/services/products'

const ProductSkeleton = () => {

  return (
    <div className='flex flex-col md:flex-row justify-around items-center gap-5 w-[80vw] h-screen md:h-[90vh] py-[5vh] m-auto'>
      {/* IMAEG CONTAINER */}
      {singleProduct.img && (
        <div className='relative flex-1 w-full h-full bg-gray-400'>
          <Image src={singleProduct.img} alt={singleProduct.title} fill className='object-contain'/>
        </div>
      )}
      {/* TEXT CONTAINER */}
      <div className='flex-2 flex flex-col gap-5 text-orange-500 '>
        <div className="w-[60%] h-8">{singleProduct.title}</div>
        <div className="w-full h-8 bg-gray-400 rounded-4xl">{singleProduct.desc}</div>
        <div className="w-full h-8 bg-gray-400 rounded-4xl">{singleProduct.desc}</div>
        <div className="w-[30%] h-8 bg-gray-400 rounded-4xl">{singleProduct.desc}</div>
      </div>
    </div>
  )
}

export default ProductSkeleton
