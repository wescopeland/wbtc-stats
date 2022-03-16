import type { VFC } from 'react';
import Image from 'next/image';
import shallow from 'zustand/shallow';

import { Card } from '../Card';
import { CardHeader } from '../CardHeader';
import { useOrderBookStore } from '../../state/order-book.store';

export const TvlCard: VFC = () => {
  const [currentBtcInCustody, currentWbtcSupply] = useOrderBookStore(
    (state) => [state.currentBtcInCustody, state.currentWbtcSupply],
    shallow
  );

  return (
    <Card>
      <div className="grid md:grid-cols-2">
        <div>
          <CardHeader>Total network supply</CardHeader>

          <div className="flex mb-4 md:mb-0">
            <Image src="/svg/wbtc.svg" alt="WBTC" width={40} height={40} />
            <div className="ml-4">
              <p className="font-semibold">
                {currentWbtcSupply.toLocaleString()} WBTC
              </p>
              <a
                href="https://etherscan.io/token/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599"
                target="_blank"
                rel="noreferrer nofollow"
                className="text-orange-600"
              >
                ERC20 Token Contract
              </a>
            </div>
          </div>
        </div>

        <hr className="mt-4 mb-8 md:hidden" />

        <div>
          <CardHeader>Custodial reserve</CardHeader>

          <div className="flex">
            <Image src="/svg/btc.svg" alt="BTC" width={40} height={40} />
            <div className="ml-4">
              <p className="font-semibold">
                {currentBtcInCustody.toLocaleString()} BTC
              </p>
              <a
                href="https://wbtc.network/dashboard/audit"
                target="_blank"
                rel="noreferrer nofollow"
                className="text-orange-600"
              >
                On-chain Validation
              </a>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
