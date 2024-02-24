import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { LastBlock, Transactions } from './dto/transactions.dto';
import { TransactionsRepository } from './app.repository';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly repository: TransactionsRepository,
  ) {}

  public async getMostChangeableAddress() {
    const p = await this.repository.getMostChangeableAddressPositive();
    const n = await this.repository.getMostChangeableAddressNegative();

    if (!p || !n) {
      throw new NotFoundException('Wallet not found');
    }

    return Number(p[0].count) > Number(n[0].count * -1)
      ? { ...p[0], count: Number(p[0].count) }
      : { ...n[0], count: Number(n[0].count) };
  }

  public async getLastInformation() {
    const lastBlock = await this.repository.getLastBlock();
    const { data } = await this.httpService
      .get<LastBlock>(
        `https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=3FF26T1F8VPWBKJ86Z63HM7JCATXI4JDJ6`,
      )
      .toPromise();

    if (data.result === lastBlock.block.toString(16)) {
      return;
    }

    let i = lastBlock.block - 10;

    while (i !== parseInt(data.result, 16)) {
      try {
        await this._sendRequest(i);
      } catch (e) {
        if (e === 'too many requests') {
          continue;
        } else {
          break;
        }
      }

      i++;
    }
  }

  public async addInformationToDb() {
    const lastBlock = await this.repository.getLastBlock();
    const { data } = await this.httpService
      .get<LastBlock>(
        `https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=3FF26T1F8VPWBKJ86Z63HM7JCATXI4JDJ6`,
      )
      .toPromise();

    let i = parseInt(data.result, 16);

    while (i !== lastBlock?.block || i !== 19000000) {
      try {
        await this._sendRequest(i);
      } catch (e) {
        if (e === 'too many requests') {
          continue;
        } else {
          break;
        }
      }
      i--;
    }
  }

  private async _sendRequest(i: number): Promise<void> {
    const hexString = i.toString(16);
    const { data } = await this.httpService
      .get<Transactions>(
        `https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=0x${hexString}&boolean=true&apikey=3FF26T1F8VPWBKJ86Z63HM7JCATXI4JDJ6`,
      )
      .toPromise();

    if (typeof data.result === 'string') {
      throw new Error('too many requests');
    }

    if (data.result === null) {
      throw new Error('empty response');
    }

    await Promise.all(
      data.result.transactions.map((e) => {
        if (e.from && e.to && e.value && e.hash) {
          return this.repository.save({
            id: e.hash,
            from: e.from,
            to: e.to,
            value: Number(
              (parseInt(e.value, 16) / Math.pow(10, 18)).toFixed(54),
            ),
            block: i,
          });
        }
      }),
    );
  }
}
