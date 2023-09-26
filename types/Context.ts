import { Dispatch, SetStateAction } from "react";
import { ProductItem } from "./Product";
import { AmountActions } from "@/lib/context";

export interface GlobalContextType {
  showCart: boolean;
  setShowCart: Dispatch<SetStateAction<boolean>>;
  cartItems: ProductItem[];
  setCartItems: Dispatch<SetStateAction<ProductItem[]>>;
  totalPrice: number;
  setTotalPrice: Dispatch<SetStateAction<number>>;
  totalQuantity: number;
  setTotalQuantity: Dispatch<SetStateAction<number>>;
  amount: number;
  dispatch: Dispatch<{ type: AmountActions }>;
  addToCart: (product: ProductItem, amount: number) => void;
  changeCartQuantity: (
    product: ProductItem,
    action: "DECREASE" | "INCREASE" | "REMOVE"
  ) => void;
}
