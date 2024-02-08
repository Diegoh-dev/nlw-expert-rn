import { ProductProps } from "@/utils/data/products";
import { create } from "zustand";
import * as cartInMemory from "../helpers/cart-in-memory";

export type ProductCardProps = ProductProps & {
  quantity: number;
};

type StateProps = {
  products: ProductCardProps[];
  add: (product: ProductProps) => void;
};

export const useCardStore = create<StateProps>((set) => ({
  products: [],
  add: (product: any) =>
        set((state) => ({
          products: cartInMemory.add(state.products, product),
        })),
}));
