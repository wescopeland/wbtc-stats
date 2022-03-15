import type { VFC } from 'react';
import { TransactionRecord } from './TransactionRecord';

import { Card } from '../Card';
import { LoadMoreButton } from '../LoadMoreButton';

export const OrderBookCard: VFC = () => {
  return (
    <Card>
      <div className="flex flex-col gap-y-8 mb-8">
        <TransactionRecord
          txKind="mint"
          merchantName="CoinList"
          wbtcAmount={123}
          timestamp={new Date().toISOString()}
          txHref="#"
        />
        <hr className="" />
        <TransactionRecord
          txKind="mint"
          merchantName="CoinList"
          wbtcAmount={123}
          timestamp={new Date().toISOString()}
          txHref="#"
        />
      </div>

      <div className="w-full flex justify-center items-center">
        <LoadMoreButton />
      </div>
    </Card>
  );
};
