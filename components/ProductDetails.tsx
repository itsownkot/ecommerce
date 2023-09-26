"use client";
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { AmountActions, useGlobal } from "@/lib/context";
import { urlFor } from "@/lib/client";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { ProductItem } from "@/types/Product";
import Link from "next/link";
import { GlobalContextType } from "@/types/Context";

type Props = {
  product: ProductItem;
};

const ProductDetails = ({ product }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { amount, dispatch, addToCart, cartItems } =
    useGlobal() as GlobalContextType;

  return (
    <div className="flex gap-3">
      {/* images container */}
      <div className="w-[400px]">
        <div>
          <img
            src={urlFor(product.images[currentIndex]).url()}
            alt={product.slug.current}
            className="bg-gray-100 rounded-md h-[400px] w-[400px]"
          />
        </div>
        <div className="flex justify-stretch flex-wrap gap-2 mt-4">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={urlFor(image).url()}
              alt={`${product.slug.current}_image_${index}`}
              width={75}
              height={75}
              className={`hover:bg-gray-200 hover:cursor-pointer transition border rounded-md ${
                index === currentIndex && "bg-red-500 hover:bg-red-400"
              }`}
              onMouseEnter={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
      {/* product details */}
      <div>
        <h1 className="font-extrabold text-2xl leading-normal">
          {product.title}
        </h1>
        {/* reviews */}
        <div className="flex gap-1 items-center">
          <div className="flex text-red-500">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
          </div>
          <p>(20)</p>
        </div>
        {/* review detail */}
        <h4 className="font-bold">Details:</h4>
        <p>{product.description}</p>
        {/* price */}
        <p className="font-bold text-red-500">${product.price}</p>
        {/* quantity */}
        <div className="flex gap-2">
          <h4 className="font-bold">Quantity:</h4>
          <div className="flex">
            <span
              onClick={() => dispatch({ type: AmountActions.DECREASE_AMOUNT })}
              className="flex justify-center items-center w-[35px] h-[35px] border hover:bg-red-500 transition"
            >
              <AiOutlineMinus />
            </span>
            <span className="flex justify-center items-center w-[35px] h-[35px] font-semibold text-lg">
              {amount}
            </span>
            <span
              onClick={() => dispatch({ type: AmountActions.INCREASE_AMOUNT })}
              className="flex justify-center items-center w-[35px] h-[35px] border hover:bg-red-500 transition"
            >
              <AiOutlinePlus />
            </span>
          </div>
        </div>
        {/* buttons */}
        <div className="flex gap-3 justify-evenly">
          <button className="text-white font-bold rounded-md bg-red-500 px-2 py-1 mt-4 hover:scale-105 transition">
            <Link href="/success">Buy now</Link>
          </button>
          <button
            onClick={() => addToCart(product, amount)}
            className="text-red-500 font-bold rounded-md border-red-500 border-2 px-2 py-1 mt-4 hover:scale-105 transition"
          >
            Add to card
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
