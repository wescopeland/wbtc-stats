import { Module } from "@nestjs/common";

import { WbtcOrderBookModule } from "@wbtc-stats/feature/wbtc-order-book";

@Module({
  imports: [WbtcOrderBookModule]
})
export class AppModule {}
