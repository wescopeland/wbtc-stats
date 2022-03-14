import { Controller, Get, Query } from '@nestjs/common';
import chunk from 'chunk';
import type { Event } from 'ethers';

import { WbtcOrderBookService } from './wbtc-order-book.service';

@Controller('wbtc')
export class WbtcOrderBookController {
  constructor(private readonly orderBookService: WbtcOrderBookService) {}

  @Get('orders')
  async getOrders(
    @Query('pageSize') pageSize = '30',
    @Query('page') page = '1'
  ) {
    const sanitizedPageSize = Number(pageSize);
    const sanitizedPage = Number(page);

    console.log({ pageSize, page });

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

    console.log(responseOrders[0]);

    return { orderCount: responseOrders?.length };
  }
}
