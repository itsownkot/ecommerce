import { useGlobal } from "@/lib/context";
import { urlFor } from "@/lib/client";
import { ProductItem } from "@/types/Product";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { FunctionExpression } from "typescript";
import Link from "next/link";
import { GlobalContextType } from "@/types/Context";

type Props = {
  product: ProductItem;
  changeQuantity: (
    product: ProductItem,
    action: "DECREASE" | "INCREASE" | "REMOVE"
  ) => void;
};

const CartItem = ({ product, changeQuantity }: Props) => {
  return (
    <div className="flex p-4 gap-4">
      <img
        src={urlFor(product.images[0]).url()}
        alt={product.slug.current}
        width={150}
        height={150}
        className="bg-gray-200 rounded-md"
      />
      <div className="flex flex-col flex-1 justify-between">
        <div className="flex justify-between">
          <span className="font-bold">{product.title}</span>
          <span className="font-bold">${product.price}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex">
            <span
              onClick={() => changeQuantity(product, "DECREASE")}
              className="flex justify-center items-center w-[35px] h-[35px] border hover:bg-red-500 transition"
            >
              <AiOutlineMinus />
            </span>
            <span className="flex justify-center items-center w-[35px] h-[35px] font-semibold text-lg">
              {product.amount}
            </span>
            <span
              onClick={() => changeQuantity(product, "INCREASE")}
              className="flex justify-center items-center w-[35px] h-[35px] border hover:bg-red-500 transition"
            >
              <AiOutlinePlus />
            </span>
          </div>
          <span
            onClick={() => changeQuantity(product, "REMOVE")}
            className="hover:text-red-500 hover:cursor-pointer transition"
          >
            <TiDeleteOutline size={20} />
          </span>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const {
    setShowCart,
    cartItems,
    totalPrice,
    totalQuantity,
    changeCartQuantity,
  } = useGlobal() as GlobalContextType;

  return (
    <div className="w-[100%] fixed top-0 left-0 z-10">
      <div className="relative w-[100%] h-[100vh]">
        <div
          className="w-[100%] h-[100%] bg-black opacity-50"
          onClick={() => setShowCart(false)}
        />
        {/* cart container */}
        <div className="w-[40%] h-[100%] absolute bg-white top-0 right-0 rounded-tl-sm rounded-bl-sm p-4 flex flex-col">
          {/* header */}
          <div
            className="flex items-center gap-1 cursor-pointer w-fit"
            onClick={() => setShowCart(false)}
          >
            <button>
              <AiOutlineLeft />
            </button>
            <span className="font-bold">Your cart</span>
            <span className="font-bold text-red-500">({totalQuantity})</span>
          </div>
          {/* cart items */}
          <div className="max-h-[90%] overflow-y-auto mt-4 mb-auto">
            {cartItems.length < 1 ? (
              <div className="flex flex-col justify-center items-center h-[100%]">
                <AiOutlineShopping size={150} />
                <h3 className="font-bold text-xl">Your bag is empty</h3>
              </div>
            ) : (
              cartItems.map((item) => (
                <CartItem
                  product={item}
                  key={item._id}
                  changeQuantity={changeCartQuantity}
                />
              ))
            )}
          </div>
          {/* footer */}
          <div className="pt-3 flex flex-col gap-2">
            <div>
              <span className="font-bold">Total cost: </span>
              <span className="font-bold text-red-500">${totalPrice}</span>
            </div>
            <div className="text-center rounded-md bg-red-500 hover:scale-105 transition text-white font-bold cursor-pointer w-[50%] self-center">
              <Link href="/success">Pay with ...</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
