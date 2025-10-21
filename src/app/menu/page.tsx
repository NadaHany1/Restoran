import React from 'react'
import { menu } from '@/data'
import Link from 'next/link'

const MenuPage = () => {
  return (
    // CONTAINER
    <div className='flex flex-col justify-center items-center p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-11rem)] md:flex-row text-black text-lg min-h-fit'>
      {menu.map((category) =>(
        <Link
        href={`/menu/${category.slug}`}
        key={category.id}
        className='w-full h-1/3 bg-cover p-8 md:h-1/2  min-h-fit'
        style={{backgroundImage: `url(${category.img})`, backgroundSize:"cover", backgroundPosition: "center",}}
        >
          <div className={`text-${category.color} w-1/2 flex flex-col gap-2 justify-start min-h-fit`}>
            <h1 className='text-3xl font-bold'>{category.title}</h1>
            <p className='text-sm'>{category.desc}</p>
            <button className={`hidden lg:block border-2 border-${category.color} rounded-lg cursor-pointer`}>Explore</button>
          </div>

        </Link>
      ))}
      
    </div>
  )
}

export default MenuPage
