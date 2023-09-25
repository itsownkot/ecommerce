"use client";

import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useGlobal } from "@/lib/context";
import { useEffect } from "react";
import { shoot } from "@/lib/confetti";

const SuccessPage = () => {
  const { setCartItems, setTotalPrice, setTotalQuantity } = useGlobal();

  useEffect(() => {
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantity(0);

    setTimeout(shoot, 0);
    setTimeout(shoot, 200);
  }, []);

  return (
    <div className="p-10 flex justify-center">
      <div className="bg-gray-300 rounded-md p-5 text-center w-[450px]">
        <span className="text-green-600 flex justify-center">
          <BsBagCheckFill size={75} />
        </span>
        <h3 className="font-bold text-xl">Thank you for your order!</h3>
        <p>Chek your email for the recipt.</p>
        <button className="bg-red-500 rounded-md text-white font-semibold w-[300px] p-1 hover:scale-105 transition mt-5">
          <Link href="/">Continue shopping</Link>
        </button>
      </div>
    </div>
  );
};
export default SuccessPage;
