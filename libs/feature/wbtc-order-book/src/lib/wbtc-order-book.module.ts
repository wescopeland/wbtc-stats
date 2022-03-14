import { CacheModule, Module } from '@nestjs/common';

import { EthereumModule } from '@wbtc-stats/data-access/ethereum';
import { WbtcOrderBookController } from './wbtc-order-book.controller';
import { WbtcOrderBookService } from './wbtc-order-book.service';

@Module({
  imports: [CacheModule.register(), EthereumModule],
  controllers: [WbtcOrderBookController],
  providers: [WbtcOrderBookService],
})
export class WbtcOrderBookModule {}
