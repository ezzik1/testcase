import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionsEntity } from './entities/transactions.entity';
import { WRITE_CONNECTION_NAME } from '../config/database/typeorm/connection-names.const';
import { Repository } from 'typeorm';
import { changeableAddress } from './dto/response.dto';

@Injectable()
export class TransactionsRepository {
  constructor(
    @InjectRepository(TransactionsEntity, WRITE_CONNECTION_NAME)
    private readonly repository: Repository<TransactionsEntity>,
  ) {}

  public async save(data: Partial<TransactionsEntity>) {
    return this.repository.save(data);
  }

  public async getMostChangeableAddressPositive(): Promise<
    changeableAddress[]
  > {
    return this.repository.query(`
        select
        u as "walletId",
        sum(tt.v) as "count"
    from (
            select
            "to" as u,
            sum(value) as v
        from transactions t
        right join (
            select
                t.block as b1
            from transactions t
            group by 1
            order by 1 desc
            limit 100
        )t1 on t1.b1 = t.block
        group by 1
        union all
        select
            "from" as u,
            sum(value*(-1)) as v
        from transactions t
        right join (
            select
                t.block as b1
            from transactions t
            group by 1
            order by 1 desc
            limit 100
        )t1 on t1.b1 = t.block
        group by 1
    )tt
    group by 1
    order by 2 desc
    limit 1
    `);
  }

  public async getMostChangeableAddressNegative(): Promise<
    changeableAddress[]
  > {
    return this.repository.query(`
        select
        u as "walletId",
        sum(tt.v) as "count"
    from (
            select
            "to" as u,
            sum(value) as v
        from transactions t
        right join (
            select
                t.block as b1
            from transactions t
            group by 1
            order by 1 desc
            limit 100
        )t1 on t1.b1 = t.block
        group by 1
        union all
        select
            "from" as u,
            sum(value*(-1)) as v
        from transactions t
        right join (
            select
                t.block as b1
            from transactions t
            group by 1
            order by 1 desc
            limit 100
        )t1 on t1.b1 = t.block
        group by 1
    )tt
    group by 1
    order by 2 asc
    limit 1
    `);
  }

  public async getLastBlock() {
    return this.repository
      .createQueryBuilder('tx')
      .orderBy('tx.block', 'DESC')
      .getOne();
  }
}
