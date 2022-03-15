import type { VFC } from 'react';
import cc from 'classcat';

export const LoadMoreButton: VFC = () => {
  return (
    <button
      className={cc([
        'min-w-[33%] rounded-full h-14 flex items-center justify-center',
        'bg-gray-900 font-medium text-white',
        'active:scale-95 transition',
      ])}
    >
      Load more
    </button>
  );
};
