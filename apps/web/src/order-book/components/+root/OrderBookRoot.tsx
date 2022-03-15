import type { VFC } from 'react';

import { TvlCard } from '../TvlCard';
import { RecentMintBurnCard } from '../RecentMintBurnCard';
import { OrderBookCard } from '../OrderBookCard';

export const OrderBookRoot: VFC = () => {
  return (
    <div className="mt-8 grid gap-y-8">
      <h1 className="uppercase text-3xl font-bold mb-4">Order book</h1>

      <div className="grid md:grid-cols-2 gap-x-8">
        <TvlCard />
        <RecentMintBurnCard />
      </div>

      <h2 className="uppercase text-lg font-bold -mb-4">Mint & burn history</h2>
      <OrderBookCard />
    </div>
  );
};
