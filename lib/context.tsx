"use client";

import { createContext, useContext, useState, useReducer } from "react";
import { toast } from "react-hot-toast";
import { GlobalContextType } from "@/types/Context";
import { ProductItem } from "@/types/Product";

const GlobalContext = createContext<GlobalContextType | null>(null!);

export enum AmountActions {
  INCREASE_AMOUNT = "INCREASE_AMOUNT",
  DECREASE_AMOUNT = "DECREASE_AMOUNT",
  RESET_AMOUNT = "RESET_AMOUNT",
}

const reducer = (state: number, action: { type: AmountActions }) => {
  if (action.type === AmountActions.INCREASE_AMOUNT) return state + 1;
  if (action.type === AmountActions.DECREASE_AMOUNT) {
    if (state === 1) return 1;
    return state - 1;
  }
  if (action.type === AmountActions.RESET_AMOUNT) return 1;
  throw Error("Unknown action");
};

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<ProductItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  // FIXME: перенести в productdetails?? NOTE: хотя я тут добавил сброс amount
  const [amount, dispatch] = useReducer(reducer, 1);

  const addToCart = (product: ProductItem, amount: number) => {
    const productInCart = cartItems.find((item) => product._id === item._id);

    setTotalPrice((prev) => prev + product.price * amount);
    setTotalQuantity((prev) => prev + amount);

    if (productInCart) {
      setCartItems((prev) => {
        return prev.map((item) => {
          if (item._id === product._id)
            return { ...item, amount: (item.amount as number) + amount };
          else return item;
        });
      });
    } else {
      setCartItems((prev) => [...prev, { ...product, amount }]);
    }
    // FIXME: toast при большом кол-ве нажатий перекрывает экран
    toast.success(`${amount} ${product.title} added to the cart`);
    dispatch({ type: AmountActions.RESET_AMOUNT });
  };

  const changeCartQuantity = (
    product: ProductItem,
    action: "DECREASE" | "INCREASE" | "REMOVE"
  ) => {
    // Decrease
    if (action === "DECREASE") {
      setTotalPrice((prev) => prev - product.price);
      setTotalQuantity((prev) => prev - 1);

      if (product.amount === 1) {
        setCartItems((prev) => prev.filter((item) => item._id !== product._id));
        return;
      }

      setCartItems(() => {
        return cartItems.map((item) => {
          if (item._id === product._id) {
            return { ...item, amount: (item.amount as number) - 1 };
          } else return item;
        });
      });
    }
    // Increase
    if (action === "INCREASE") {
      setTotalPrice((prev) => prev + product.price);
      setTotalQuantity((prev) => prev + 1);
      setCartItems(() => {
        return cartItems.map((item) => {
          if (item._id === product._id) {
            return { ...item, amount: (item.amount as number) + 1 };
          } else return item;
        });
      });
    }
    // Remove
    if (action === "REMOVE") {
      setTotalPrice(
        (prev) => prev - product.price * (product.amount as number)
      );
      setTotalQuantity((prev) => prev - (product.amount as number));
      setCartItems((prev) => prev.filter((item) => item._id !== product._id));
      return;
    }
  };

  const context = {
    showCart,
    setShowCart,
    cartItems,
    setCartItems,
    totalPrice,
    setTotalPrice,
    totalQuantity,
    setTotalQuantity,
    amount,
    dispatch,
    addToCart,
    changeCartQuantity,
  };

  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  );
}

export const useGlobal = () => useContext(GlobalContext);
