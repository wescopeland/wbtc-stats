import {
  Injectable,
  Inject,
  CACHE_MANAGER,
  OnModuleInit,
  Logger
} from "@nestjs/common";
import { ethers } from "ethers";
import { HttpService } from "@nestjs/axios";
import type { Event } from "ethers";
import { Cache } from "cache-manager";
import { lastValueFrom } from "rxjs";

import { EthereumService } from "@wbtc-stats/data-access/ethereum";

@Injectable()
export class WbtcOrderBookService implements OnModuleInit {
  #logger = new Logger(WbtcOrderBookService.name);
  #ordersCacheKey = "ALL_WBTC_ORDERS";

  contract: ethers.Contract | null = null;

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly httpService: HttpService,
    private readonly ethereumService: EthereumService
  ) {}

  async onModuleInit() {
    this.contract = await this.ethereumService.getWbtcContract();
    this.#logger.log("Connected to the WBTC contract.");
  }

  async fetchMaxTotalSupply() {
    this.#logger.log("Fetching WBTC max total supply.");

    const decimals = await this.contract.decimals();
    const totalSupply = await this.contract.totalSupply();

    const sanitizedTotalSupply = ethers.utils.formatUnits(
      totalSupply,
      decimals
    );

    this.#logger.log(`Fetched ${sanitizedTotalSupply} WBTC max total supply.`);
    return Number(sanitizedTotalSupply);
  }

  async fetchCustodialReserveAmount() {
    this.#logger.log("Fetching BTC custodial reserve amount.");

    // TODO: A better way to do this would be to query the list of all
    // custodial native BTC wallet addresses. This is a lazy approach.
    const { data: custodialReserveResponse } = await lastValueFrom(
      this.httpService.get<{ holdings: string }>(
        "https://wbtc.network/api/chain/eth/token/wbtc"
      )
    );

    const sanitizedHoldingsAmount =
      Number(custodialReserveResponse.holdings) / 100_000_000;

    this.#logger.log(
      `Fetched ${sanitizedHoldingsAmount} WBTC max total supply.`
    );
    return sanitizedHoldingsAmount;
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

      const blockMap = { genesis: 0, now: "latest" };

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
        ttl: 300_000 // Five minutes
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

  async fetchEventTimestamp(event: ethers.Event) {
    const eventTimestampCacheKey = `${event.transactionHash}-timestamp`;

    const cachedEventTimestamp = await this.cacheManager.get<number>(
      eventTimestampCacheKey
    );

    if (!cachedEventTimestamp) {
      const eventBlock = await event.getBlock();
      const sanitizedTimestamp = eventBlock.timestamp * 1000;

      await this.cacheManager.set<number>(
        eventTimestampCacheKey,
        sanitizedTimestamp,
        {
          ttl: 3.6e6 // One hour
        }
      );

      return sanitizedTimestamp;
    }

    return cachedEventTimestamp;
  }
}
