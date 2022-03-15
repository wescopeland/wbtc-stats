import type { VFC } from 'react';
import Image from 'next/image';

import { Card } from '../Card';
import { CardHeader } from '../CardHeader';

export const TvlCard: VFC = () => {
  return (
    <Card>
      <CardHeader>Total network supply</CardHeader>

      <div className="flex mb-4">
        <Image src="/svg/wbtc.svg" width={40} height={40} />
        <div className="ml-4">
          <p className="font-semibold">272,729 WBTC</p>
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

      <hr className="my-8" />

      <CardHeader>Custodial reserve</CardHeader>

      <div className="flex">
        <Image src="/svg/btc.svg" width={40} height={40} />
        <div className="ml-4">
          <p className="font-semibold">272,729 BTC</p>
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
    </Card>
  );
};
