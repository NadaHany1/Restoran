"use client"

import React, { useEffect, useState } from 'react'

type Props = {
    price:number,
    id:number, 
    options?: {title:string, additionalPrice:number}[]
}

const Price = ({price, id, options} : Props )=> {

    const [total, setTotal] = useState(price);
    const [quantity, setQuantity] = useState(1);
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        setTotal(quantity * (options ? price + options[selected].additionalPrice : price));
    },[options, quantity, price, selected])

  return (
    <div className='flex flex-col gap-4'>
        <h2 className='text-lg font-bold'>${total.toFixed(2)}</h2>
        {/* OPTIONS CONTAINER */}
        <div className='flex flex-row w-full gap-2 items-center'>
            {options?.map((option, index) => (
                // <button key={option.title} className='p-2 border-2 border-orange-500 rounded-md hover:text-white hover:bg-orange-500'>{option.title}</button>
                <button 
                key={option.title}
                className='p-2 ring-1 ring-orange-500 rounded-md'
                style={{
                    background: selected === index ? "oklch(83.7% 0.128 66.29)" : "white",
                    color: selected === index ? "white" : "oklch(70.5% 0.213 47.604)"
                }}
                onClick={()=> setSelected(index)}
                >
                    {option.title}
                </button>
            ))}
        </div>
        {/* QUANTITY CONTAINER */}
        <div className="w-full flex flex-col">
          <label htmlFor="quantity" className='font-bold text-lg capitalize'>quantity</label>
          <div className='ring-1 ring-orange-500 flex'>
            <input 
            type="number" 
            id='quantity' 
            min={1} 
            max={20} 
            defaultValue={quantity} 
            onChange={(e) => setQuantity(Number(e.target.value))} 
            // onKeyDown={(e) => e.preventDefault()} // Prevent typing
            className='flex-2 p-2 focus:outline-none accent-amber-600'/>
            <button className='flex-1 bg-orange-500 text-white p-2 hover:bg-orange-700 cursor-pointer'>Add To Cart</button>
            {/* <input type="submit" className='flex-1 bg-orange-500 text-white p-2'/> */}
          </div>


        </div>
    </div>
  )
}

export default Price
