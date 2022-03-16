export interface WbtcOrder {
  amount: number;
  fromAddress: string;
  timestamp: number;
  type: 'mint' | 'burn';
  transaction: string;
}
