import { WbtcOrder } from "@wbtc-stats/feature/wbtc-order-book";

export interface OrderBookState {
  allOrders: WbtcOrder[];
  currentBtcInCustody: number;
  currentPage: number;
  currentWbtcSupply: number;
  fetchStatus: "idle" | "loading";
}
