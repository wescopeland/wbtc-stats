import type { ReactElement } from 'react';

import type { AppPage } from '../core/models';
import { BaseLayout } from '../core/layouts/BaseLayout';
import { OrderBookRoot } from '../order-book/components/+root';
import {
  useHydrateOrderBookState,
  OrderBookHydratedStateProvider,
} from '../order-book/state/order-book.store';
import { OrderBookState } from '../order-book/models';

interface HomePageProps {
  initialPageState: OrderBookState;
}

const HomePage: AppPage<HomePageProps> = ({ initialPageState }) => {
  const store = useHydrateOrderBookState(initialPageState);

  return (
    <OrderBookHydratedStateProvider createStore={store}>
      <OrderBookRoot />
    </OrderBookHydratedStateProvider>
  );
};

HomePage.getLayout = (page: ReactElement) => {
  return <BaseLayout>{page}</BaseLayout>;
};

export async function getServerSideProps() {
  const ordersResponse = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_BASE_URL ?? ''
    }/api/wbtc/orders?pageSize=15&page=1`
  ).then((res) => res.json());

  const supplyResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL ?? ''}/api/wbtc/supply`
  ).then((res) => res.json());

  return {
    props: {
      initialPageState: {
        currentBtcInCustody: supplyResponse.btcInCustody,
        currentPage: 1,
        currentWbtcSupply: supplyResponse.wbtcSupply,
        allOrders: ordersResponse.orders,
      },
    },
  };
}

export default HomePage;
