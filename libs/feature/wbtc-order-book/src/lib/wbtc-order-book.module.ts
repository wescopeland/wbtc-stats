import { CacheModule, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";

import { EthereumModule } from "@wbtc-stats/data-access/ethereum";
import { WbtcOrderBookController } from "./wbtc-order-book.controller";
import { WbtcOrderBookService } from "./wbtc-order-book.service";

@Module({
  imports: [CacheModule.register(), HttpModule, EthereumModule],
  controllers: [WbtcOrderBookController],
  providers: [WbtcOrderBookService]
})
export class WbtcOrderBookModule {}
