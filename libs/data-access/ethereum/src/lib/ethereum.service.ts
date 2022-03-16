import { Injectable, Logger } from '@nestjs/common';
import { ethers } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';

import wbtcAbi from './abis/wbtc.json';

@Injectable()
export class EthereumService {
  #logger = new Logger(EthereumService.name);
  #provider = new JsonRpcProvider(
    `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY ?? ''}`
  );

  getBlockNumber() {
    return this.#provider.getBlockNumber();
  }

  async getBlockTimestamp(blockNumber: string) {
    const block = await this.#provider.getBlock(blockNumber);

    console.log({ block });
  }

  async getWbtcContract() {
    const contractAddress = '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599';

    const contract = new ethers.Contract(
      contractAddress,
      wbtcAbi,
      this.#provider
    );

    const name = await contract.name();
    if (name === 'Wrapped BTC') {
      this.#logger.log('Successfully connected to the WBTC contract.');
    } else {
      const errorMessage =
        'There was a problem connecting to the WBTC contract.';

      this.#logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    return contract;
  }
}
