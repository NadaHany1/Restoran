"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'


const data = [
  {
    id: 1,
    title: "always fresh & always crispy & always hot",
    image: "/slide1.png",
  },
  {
    id: 2,
    title: "we deliver your order wherever you are in NY",
    image: "/slide2.png",
  },
  {
    id: 3,
    title: "the best pizza to share with your family",
    image: "/slide3.jpg",
  },
];

const Slider = () => {

  const [flag, setFlag] = useState(true);

  const handleButton = () => {
    setFlag(prev => {
      return !prev;
    });
  };

  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect( ()=> {
    const interval = setInterval( 
      ()=>setCurrentSlide((prev) => (prev+1) % data.length),
      2000);
    return ()=> clearInterval(interval)
  }, [])
  
  return (
    <div className='flex flex-col md:flex-row h-[calc(100vh-6rem)] items-center justify-center min-h-min'>
      {/* TEXT COTAINER */}
      <div className=' text-container flex flex-col h-1/2 px-8 items-center justify-center bg-orange-100 min-h-min md:h-full md:w-1/2'>
        <p className='text-5xl font-extrabold text-orange-500 text-center md:text-6xl xl:text-7xl uppercase'>
          {data[currentSlide].title}
        </p>
        <button onClick={handleButton} className='bg-orange-500 text-white cursor-pointer p-4 m-8 w-auto text-lg hover:bg-orange-700 transition duration-300 ease-in-out'>Order Now</button>
      </div>
      {/* IMAGE CONTAINER */}
      <div className='h-1/2 w-full relative overflow-hidden md:h-full md:w-1/2'>
        <Image src={data[currentSlide].image} alt='' fill className='object-cover'/>
      </div>
    </div>
  )
}

export default Slider
