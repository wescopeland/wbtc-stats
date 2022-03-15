import type { ReactElement } from 'react';

import type { AppPage } from '@/core/models';
import { BaseLayout } from '@/core/layouts/BaseLayout';
import { OrderBookRoot } from '@/order-book/components/+root';

const HomePage: AppPage = () => <OrderBookRoot />;

HomePage.getLayout = (page: ReactElement) => {
  return <BaseLayout>{page}</BaseLayout>;
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default HomePage;
