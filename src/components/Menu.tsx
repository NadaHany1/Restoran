"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const links = [
    { id: 1, title: "Home", path: "/" },
    { id: 2, title: "Menu", path: "/menu" },
    { id: 3, title: "Contact", path: "/contact" },
  ];

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div>
      {!open ? (
        <Image
          src={"/open.png"}
          alt={"open image"}
          width={20}
          height={20}
          onClick={() => setOpen(true)}
        />
      ) : (
        <Image
          src={"/close.png"}
          alt={"open image"}
          width={20}
          height={20}
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`absolute left-0 top-[10vh] bg-orange-500 text-white flex flex-col w-full items-center justify-center h-[90vh] gap-6 font-bold text-2xl z-8 transition-all duration-500 ease-in-out
        ${open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}`}
      >
        {" "}
        {links.map((item) => (
          <Link href={item.path} key={item.id} onClick={() => setOpen(false)}>
            {item.title}
          </Link>
        ))}
        {!user ? (
          <Link href={"./login"} onClick={() => setOpen(false)}>
            Login
          </Link>
        ) : (
          <>
            <Link href={"./order"} onClick={() => setOpen(false)}>
              Oreders
            </Link>
            <Link href={"./cart"} onClick={() => setOpen(false)}>
              Cart
            </Link>
            <button
              className={`text-white p-1 rounded-md cursor-pointer`}
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              disabled={loading}
            >
              {loading ? "Logging out..." : "Logout"}
            </button>{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;
