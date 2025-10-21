"use client"


import React, { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import CartIcon from './CartIcon';

const Menu = () => {

  const [open, setOpen] = useState(false);
  const user = false;

  const links = [
    {id:1 , title:"Home", path:"/"},
    {id:2 , title:"Menu", path:"/menu"},
    {id:3 , title:"Working Hours", path:""},
    {id:4 , title:"Contact", path:"/contact"},
  ]

  return (
    <div>
      {! open ? (
        <Image src={"/open.png"} alt={"open image"} width={20} height={20} onClick={()=>setOpen(true)}/>
      ) : (
        <Image src={"/close.png"} alt={"open image"} width={20} height={20} onClick={()=>setOpen(false)}/>
      )}
      {open && (<div className='absolute left-0 top-21 bg-orange-500 text-white flex flex-col w-full items-center justify-center h-[calc(100vh-6rem)] gap-6 font-bold text-2xl z-10'>
        {links.map(item => (
          <Link href={item.path} key={item.id} onClick={()=>setOpen(false)}>{item.title}</Link>
        ))}
        {! user ? (<Link href={"./Login"} onClick={()=>setOpen(false)}>Login</Link>) : <Link href={"./order"}>Oreders</Link>}

          <CartIcon/> 
      </div>)}
    </div>
  )
}

export default Menu
