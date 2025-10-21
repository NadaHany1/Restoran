import { pizzas } from '@/data'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CategoryPage = () => {
  return (
    <div className='flex flex-row flex-wrap text-orange-500'>
      {pizzas.map((item) => (
        <Link 
        href={`/product/${item.id}`} 
        key={item.id}
        className='flex flex-col justify-between w-full sm:w-1/2 lg:w-1/3 h-[60vh] border-r-2 border-b-2 border-orange-500 p-6 group hover:cursor-auto'
        >
          {/* IMAGE CONTAINER */}
          {item.img && (
            <div className='relative flex-4'>
              <Image src={item.img} alt={`${item.title}`} fill className='object-contain'/>
            </div>
          )}
          {/* TEXT CONTAINER */}
          <div className='flex-1 flex justify-between gap-2 items-end font-bold'>
            <h1 className='text-2xl'>{item.title}</h1>
            <h2 className='text-xl'>{item.price}</h2>
            <button className='hidden group-hover:block capitalize bg-orange-500 text-white p-2 rounded-md cursor-pointer'>add to cart</button>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default CategoryPage
