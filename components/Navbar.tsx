"use client";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { useContext } from "react";
import { useGlobal } from "@/lib/context";
import Cart from "./Cart";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantity } = useGlobal();

  return (
    <header>
      <nav className="flex justify-between items-center p-4">
        <h2 className="text-xl font-semibold">
          <Link href="/">Home</Link>
        </h2>
        <button className="relative" onClick={() => setShowCart(true)}>
          <AiOutlineShopping size={32} />
          <span className="rounded-full bg-red-500 absolute -right-[4px] top-0 font-semibold text-white text-[11px] h-[19px] w-[19px] flex justify-center items-center">
            {totalQuantity}
          </span>
        </button>
      </nav>
      {showCart && <Cart />}
    </header>
  );
};
export default Navbar;
