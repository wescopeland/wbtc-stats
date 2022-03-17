import type { VFC } from "react";
import { TransactionRecord } from "./TransactionRecord";
import shallow from "zustand/shallow";
import { Fragment } from "react";

import { useOrderBookStore } from "../../state/order-book.store";
import { Card } from "../Card";
import { LoadMoreButton } from "../LoadMoreButton";

export const OrderBookCard: VFC = () => {
  const [allOrders] = useOrderBookStore((state) => [state.allOrders], shallow);

  return (
    <Card>
      <div className="flex flex-col mb-8 gap-y-8">
        {allOrders.map((order) => (
          <Fragment key={order.timestamp}>
            <TransactionRecord
              txKind={order.type}
              fromAddress={order.fromAddress}
              wbtcAmount={order.amount}
              timestamp={order.timestamp}
              txHref={`https://etherscan.io/tx/${order.transaction}`}
            />
            <hr />
          </Fragment>
        ))}
      </div>

      <div className="flex items-center justify-center w-full">
        <LoadMoreButton />
      </div>
    </Card>
  );
};
