import React from 'react'
import Menu from "./Menu"
import Link from 'next/link'
import CartIcon from './CartIcon'


const Navbar = () => {

    const user = true

  return (
    <div className='hight-12 flex justify-between items-center-safe p-4 text-orange-500 text-lg border-b-orange-500 border-b-2 font-bold md:h-16 md:px-12 lg:px-20 xl:px-40'>
        {/* LEFT LINKS */}
        <div className='md:flex flex-row items-center justify-start gap-4 hidden flex-1 '>
            <Link href={"/"}>HOME</Link>
            <Link href={"/menu"}>MENU</Link>
            <Link href={"/contact"}>CONTACT</Link>
        </div>
        {/* LOGO */}
        <div className='text-3xl flex-1 md:text-center font-extrabold mx-4'>
            <Link href={"../page.tsx"}>
                RESTORAN
            </Link>
        </div>
        {/* MOBILE MENU */}
        <div className='md:hidden'>
            <Menu/>
        </div>
        {/* RIGHT LINKS */}
        <div className='md:flex flex-row items-center justify-end gap-4 hidden flex-1'>
            {/* <div className='flex flew-row flex-nowrap items-center justify-center bg-orange-300 py-1 px-2 rounded-md'>
                <Image src={"/phone.png"} alt='' width={20} height={20}/>
                <span>123456789</span>
            </div> */}
            {! user ? (
                <Link href={"#"}>LOGIN</Link>
            ):(
                <Link href={"#"}>Orders</Link>)
            }
            <CartIcon/>
        </div>
    </div>
  )
}

export default Navbar
