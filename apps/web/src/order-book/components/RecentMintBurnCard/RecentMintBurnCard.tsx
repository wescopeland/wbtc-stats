import type { VFC } from 'react';

import { Card } from '../Card';
import { CardHeader } from '../CardHeader';

export const RecentMintBurnCard: VFC = () => {
  return (
    <Card>
      <CardHeader>WBTC Mint (72hr)</CardHeader>

      <p className="font-semibold text-lg">
        100,000 <span className="text-sm text-gray-400">WBTC</span>
      </p>
      <p className="font-semibold text-lg">
        1,000,000 <span className="text-sm text-gray-400">USD</span>
      </p>

      <hr className="my-8" />

      <CardHeader>WBTC Burn (72hr)</CardHeader>

      <p className="font-semibold text-lg">
        100,000 <span className="text-sm text-gray-400">WBTC</span>
      </p>
      <p className="font-semibold text-lg">
        1,000,000 <span className="text-sm text-gray-400">USD</span>
      </p>
    </Card>
  );
};
