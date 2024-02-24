export interface Transactions {
  jsonrpc: string;
  id: number;
  result: Result;
}

export interface LastBlock {
  jsonrpc: string;
  id: number;
  result: string;
}

export interface Result {
  baseFeePerGas: string;
  difficulty: string;
  extraData: string;
  gasLimit: string;
  gasUsed: string;
  hash: string;
  logsBloom: string;
  miner: string;
  mixHash: string;
  nonce: string;
  number: number;
  parentHash: string;
  receiptsRoot: string;
  sha3Uncles: string;
  size: string;
  stateRoot: string;
  timestamp: string;
  totalDifficulty: string;
  transactions: Transaction[];
  transactionsRoot: string;
  uncles: any[];
  withdrawals: Withdrawal[];
  withdrawalsRoot: string;
}

export interface Transaction {
  blockHash: string;
  blockNumber: number;
  from: string;
  gas: string;
  gasPrice: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
  hash: string;
  input: string;
  nonce: string;
  to: string;
  transactionIndex: string;
  value: string;
  type: string;
  accessList?: AccessList[];
  chainId: string;
  v: string;
  r: string;
  s: string;
  yParity?: string;
}

export interface AccessList {
  address: string;
  storageKeys: string[];
}

export interface Withdrawal {
  index: string;
  validatorIndex: string;
  address: string;
  amount: string;
}
