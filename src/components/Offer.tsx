import React from 'react'
import CountDown from './CountDown'
import Image from 'next/image'

const Offer = () => {
  return (
    <div>
      {/* OFFER SECTION */}
      <div className="flex justify-center items-center w-screen flex-col gap-5 h-screen md:flex-row md:h-[70vh] bg-black p-10 md:justify-between md:bg-[url('/offerBg.png')]">
        {/* OFFER DETAILS */}
        <div className="flex-1 flex flex-col items-center gap-6 px-6 text-white justify-center text-center md:text-left md:items-start">
          <h1 className='text-4xl font-bold xl:text-5xl'>Delicious Burger & French Fry</h1>
          <p className='text-lg'>Progressively simplify effective e-toilers and process-centric methods of empowerment. Quickly pontificate parallel.</p>
          <CountDown/>
          <button className="bg-orange-500 rounded-md py-3 px-6 text-lg">Order Now</button>
        </div>
        {/* IMAGE CONTAINER */}
        <div className="flex-1 relative w-full h-full">
          <Image src={"/offerProduct.png"} alt='' fill className='object-contain'/>
        </div>
      </div>
    </div>
  )
}

export default Offer
