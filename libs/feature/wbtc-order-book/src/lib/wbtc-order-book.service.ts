import {
  Injectable,
  Inject,
  CACHE_MANAGER,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { ethers } from 'ethers';
import type { Event } from 'ethers';
import { Cache } from 'cache-manager';

import { EthereumService } from '@wbtc-stats/data-access/ethereum';

@Injectable()
export class WbtcOrderBookService implements OnModuleInit {
  #logger = new Logger(WbtcOrderBookService.name);
  #ordersCacheKey = 'ALL_WBTC_ORDERS';

  contract: ethers.Contract | null = null;

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly ethereumService: EthereumService
  ) {}

  async onModuleInit() {
    this.contract = await this.ethereumService.getWbtcContract();
    this.#logger.log('Connected to the WBTC contract.');
  }

  async fetchAllOrders() {
    this.#logger.log(
      `Fetching all WBTC orders from cache key ${this.#ordersCacheKey}.`
    );
    const cachedAllOrders = await this.cacheManager.get<Event[]>(
      this.#ordersCacheKey
    );

    if (!cachedAllOrders) {
      this.#logger.log(`${this.#ordersCacheKey} cache miss.`);

      const blockMap = { genesis: 0, now: 'latest' };

      const mintEvents = await this.contract.queryFilter(
        this.contract.filters.Mint(),
        blockMap.genesis,
        blockMap.now
      );

      const burnEvents = await this.contract.queryFilter(
        this.contract.filters.Burn(),
        blockMap.genesis,
        blockMap.now
      );

      const allEvents = [...mintEvents, ...burnEvents].sort(
        // Sort by most recent transactions.
        (a, b) =>
          parseFloat(`${b.blockNumber}.${b.transactionIndex}`) -
          parseFloat(`${a.blockNumber}.${a.transactionIndex}`)
      );

      this.#logger.log(
        `Writing ${allEvents.length} orders to cache ${this.#ordersCacheKey}.`
      );
      await this.cacheManager.set(this.#ordersCacheKey, allEvents, {
        ttl: 300_000, // Five minutes
      });

      this.#logger.log(`Returning ${allEvents.length} fetched orders.`);
      return allEvents;
    }

    this.#logger.log(`${this.#ordersCacheKey} cache hit.`);
    this.#logger.log(
      `Returning ${cachedAllOrders?.length ?? 0} cached orders.`
    );
    return cachedAllOrders;
  }
}
