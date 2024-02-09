import { ProductProps } from "@/utils/data/products";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import * as cartInMemory from "../helpers/cart-in-memory";

import asyncStorage from "@react-native-async-storage/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ProductCardProps = ProductProps & {
  quantity: number;
};

type StateProps = {
  products: ProductCardProps[];
  add: (product: ProductProps) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

export const useCardStore = create(
  persist<StateProps>(
    (set) => ({
      products: [],
      add: (product: any) =>
        set((state) => ({
          products: cartInMemory.add(state.products, product),
        })),

      remove: (productId: string) =>
        set((state) => ({
          products: cartInMemory.remove(state.products, productId),
        })),

      clear: () =>
        set(() => ({
          products: [],
        })),
    }),

    {
      name: "nlw-expert:card",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
