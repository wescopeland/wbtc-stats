import type { VFC } from "react";

import { TvlCard } from "../TvlCard";
import { OrderBookCard } from "../OrderBookCard";

export const OrderBookRoot: VFC = () => {
  return (
    <div className="grid mt-8 mb-16 gap-y-8">
      <h1 className="mb-4 text-3xl font-bold uppercase">Order book</h1>

      <TvlCard />

      <h2 className="-mb-4 text-lg font-bold uppercase">Mint & burn history</h2>
      <OrderBookCard />
    </div>
  );
};
