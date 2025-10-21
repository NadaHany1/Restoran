"use client"

import React from 'react'
import { singleProduct } from '@/data'
import Image from 'next/image'
import { useState } from 'react'
import Price from '@/components/Price'

const ProductPage = () => {
  const [selectedOption, setSelectedOption] = useState(0)

  return (
    <div className='flex flex-col md:flex-row justify-around items-center gap-5 w-[80vw] h-screen md:h-[90vh] py-[5vh] m-auto'>
      {/* IMAEG CONTAINER */}
      {singleProduct.img && (
        <div className='relative flex-1 w-full h-full'>
          <Image src={singleProduct.img} alt={singleProduct.title} fill className='object-contain'/>
        </div>
      )}
      {/* TEXT CONTAINER */}
      <div className='flex-2 flex flex-col gap-5 text-orange-500 '>
        <h1 className="text-3xl font-bold capitalize">{singleProduct.title}</h1>
        <p className="text-m">{singleProduct.desc}</p>
        <Price price={singleProduct.price} id={singleProduct.id} options={singleProduct.options}/>
        {/* <div className="text-xl font-bold">{singleProduct.price}</div>
        <div className="flex flex-row w-full justify-evenly items-center ">
          {singleProduct.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedOption(index)}
              className={selectedOption === index ? 'active' : ''}
            >
              {option.title}
            </button>
          ))}
        </div> */}
        
      </div>
    </div>
  )
}

export default ProductPage
