import type { VFC } from 'react';
import { BsArrowUpRight } from 'react-icons/bs';

interface TransactionRecordProps {
  wbtcAmount: number;
  merchantName: string;
  txHref: string;
  txKind: 'mint' | 'burn';
  timestamp: string;
}

export const TransactionRecord: VFC<TransactionRecordProps> = ({
  wbtcAmount,
  merchantName,
  txHref,
  txKind,
  timestamp,
}) => {
  return (
    <div>
      <p className="text-xs text-gray-600">Mint</p>
      <div className="text-sm flex items-center gap-x-2 mb-2">
        <p>
          Created <span className="font-bold">123 WBTC</span> for{' '}
          <span className="font-bold">CoinList</span>
        </p>

        <BsArrowUpRight />
      </div>

      <p className="text-gray-600 text-xs">Sun, Mar 13, 2022, 6:00:46 PM</p>
    </div>
  );
};
