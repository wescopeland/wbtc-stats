import { useLayoutEffect } from "react";
import create from "zustand";
import createContext from "zustand/context";

import type { OrderBookState } from "../models";

let store: any;

const initialOrderBookState: OrderBookState = {
  currentBtcInCustody: 0,
  currentPage: 1,
  currentWbtcSupply: 0,
  allOrders: [],
  fetchStatus: "idle"
};

interface OrderBookActions {
  fetchNextPage: () => Promise<void>;
}

export type OrderBookStoreApi = OrderBookState & OrderBookActions;

const orderBookContext = createContext<OrderBookStoreApi>();
export const OrderBookHydratedStateProvider = orderBookContext.Provider;
export const useOrderBookStore = orderBookContext.useStore;

export const createOrderBookStore = (preloadedOrderBookState = {}) =>
  create<OrderBookStoreApi>((set, get) => ({
    ...initialOrderBookState,
    ...preloadedOrderBookState,

    fetchNextPage: async () => {
      const { allOrders, currentPage } = get();

      set({ fetchStatus: "loading" });

      const nextPage = currentPage + 1;

      const nextPageOrders = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL ?? ""
        }/api/wbtc/orders?pageSize=15&page=${nextPage}`
      ).then((res) => res.json());

      set({
        fetchStatus: "idle",
        currentPage: nextPage,
        allOrders: [...allOrders, ...nextPageOrders.orders]
      });
    }
  }));

export function useHydrateOrderBookState(
  initialOrderBookState?: Partial<OrderBookState>
) {
  const _store = store ?? createOrderBookStore(initialOrderBookState);

  // For SSR and SSG, always use a new store.
  if (typeof window !== "undefined") {
    // If initialOrderBookState changes, then merge states in the next render cycle.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLayoutEffect(() => {
      if (initialOrderBookState && store) {
        store.setState({
          ...store.getState(),
          ...initialOrderBookState
        });
      }
    }, [initialOrderBookState]);
  }

  return () => _store;
}
