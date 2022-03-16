import { Controller, Get, Query } from '@nestjs/common';
import chunk from 'chunk';
import type { Event } from 'ethers';
import { ethers } from 'ethers';

import type { WbtcOrder } from './models';
import { WbtcOrderBookService } from './wbtc-order-book.service';

@Controller('wbtc')
export class WbtcOrderBookController {
  #wbtcDigits = 8;

  constructor(private readonly orderBookService: WbtcOrderBookService) {}

  @Get('supply')
  async getSupply() {
    const wbtcSupply = await this.orderBookService.fetchMaxTotalSupply();
    const btcInCustody =
      await this.orderBookService.fetchCustodialReserveAmount();

    return { wbtcSupply, btcInCustody };
  }

  @Get('orders')
  async getOrders(
    @Query('pageSize') pageSize = '30',
    @Query('page') page = '1'
  ) {
    const sanitizedPageSize = Number(pageSize);
    const sanitizedPage = Number(page);

    // console.log({ pageSize, page });

    // const supply = await this.orderBookService.fetchMaxTotalSupply();

    const allOrders = await this.orderBookService.fetchAllOrders();

    let responseOrders: Event[] = [];
    if (sanitizedPageSize >= 1 && sanitizedPageSize >= 1) {
      const pages = chunk(allOrders, sanitizedPageSize);

      // The page query param is 1-indexed.
      const targetPageIndex = sanitizedPage - 1;

      const selectedPageOrders = pages[targetPageIndex];
      responseOrders = selectedPageOrders;
    } else {
      responseOrders = allOrders;
    }

    const mappedEvents = await this.mapOrderEventsToOrderModel(responseOrders);

    return { orders: mappedEvents };
  }

  private async mapOrderEventsToOrderModel(
    events: Event[]
  ): Promise<WbtcOrder[]> {
    const wbtcOrders: WbtcOrder[] = [];

    for (const event of events) {
      const timestamp = await this.orderBookService.fetchEventTimestamp(event);

      let type: 'mint' | 'burn' = 'mint';
      if (event.event === 'Burn') {
        type = 'burn';
      }

      const amount = Number(
        ethers.utils.formatUnits(event.args[1], this.#wbtcDigits)
      );

      wbtcOrders.push({
        timestamp,
        type,
        amount,
        fromAddress: event.args[0],
        transaction: event.transactionHash,
      });
    }

    return wbtcOrders;
  }
}
