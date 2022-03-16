import type { VFC } from 'react';
import { BsArrowUpRight } from 'react-icons/bs';
import dayjs from 'dayjs';

interface TransactionRecordProps {
  wbtcAmount: number;
  fromAddress: string;
  txHref: string;
  txKind: 'mint' | 'burn';
  timestamp: number;
}

export const TransactionRecord: VFC<TransactionRecordProps> = ({
  wbtcAmount,
  fromAddress,
  txHref,
  txKind,
  timestamp,
}) => {
  return (
    <a
      href={txHref}
      target="_blank"
      rel="noreferrer nofollow"
      className="flex flex-col transition md:flex-row md:justify-between group"
    >
      <div>
        <p className="text-xs text-gray-600">
          {txKind === 'mint' ? 'Mint' : 'Burn'}
        </p>
        <div className="flex items-center mb-2 text-sm gap-x-2">
          <p>
            {txKind === 'mint' ? 'Created' : 'Burned'}{' '}
            <span className="font-bold">
              {wbtcAmount.toLocaleString()} WBTC
            </span>{' '}
            for{' '}
            <span className="font-bold">
              {truncateWalletAddress(fromAddress)}
            </span>
          </p>

          <BsArrowUpRight className="transition group-hover:translate-x-2" />
        </div>
      </div>

      <p className="text-xs text-gray-600">
        {dayjs(timestamp).format('ddd, MMM D, YYYY, h:mma')}
      </p>
    </a>
  );
};

const truncateWalletAddress = (walletAddress: string) => {
  // This really shouldn't ever happen.
  if (walletAddress.length <= 9) {
    return walletAddress;
  }

  const firstThreeCharacters =
    walletAddress[0] + walletAddress[1] + walletAddress[2];

  const reversed = walletAddress.split('').reverse().join('');
  const lastThreeCharacters = reversed[0] + reversed[1] + reversed[2];

  return `${firstThreeCharacters}...${lastThreeCharacters}`;
};
