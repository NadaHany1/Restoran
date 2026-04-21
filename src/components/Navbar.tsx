"use client"
import React from 'react'
import Menu from "./Menu"
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useState } from 'react'
import { useRouter } from 'next/navigation'


const Navbar = () => {

  const {logout, user} = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      router.push("/")
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="h-[10vh] sticky top-0 flex justify-between items-center-safe p-4 bg-white text-orange-500 text-lg border-b-orange-500 border-b-2 font-bold md:h-16 md:px-12 lg:px-20 xl:px-40 z-10">
      {/* LEFT LINKS */}
      <div className="md:flex flex-row items-center justify-start gap-4 hidden flex-1 ">
        <Link href={"/"}>HOME</Link>
        <Link href={"/menu"}>MENU</Link>
        <Link href={"/contact"}>CONTACT</Link>
      </div>
      {/* LOGO */}
      <div className="text-3xl flex-1 md:text-center font-extrabold mx-4">
        <Link href={"/"}>RESTORAN</Link>
      </div>
      {/* MOBILE MENU */}
      <div className="md:hidden">
        <Menu />
      </div>
      {/* RIGHT LINKS */}
      <div className="md:flex flex-row items-center justify-end gap-4 hidden flex-1">
        {!user ? (
          <Link href={"/login"}>LOGIN</Link>
        ) : (
          <>
            <Link href={"/order"}>ORDERS</Link>
            <Link href={"/cart"}>CART</Link>
            {/* <CartIcon /> */}
            <button
              className={`text-orange-500 p-1 rounded-md cursor-pointer`}
              onClick={handleLogout}
              disabled={loading} // prevents multiple clicks
            >
              {loading ? "Logging out" : "LOGOUT"}
            </button>{" "}
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar
