import type { FC } from 'react';

import { AppBar } from '@/core/components/AppBar';

export const BaseLayout: FC = ({ children }) => {
  return (
    <>
      <div>
        <AppBar />

        <div className="container max-w-[800px] lg:max-w-[870px]">
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};
