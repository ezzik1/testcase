import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('transactions')
export class TransactionsEntity {
  @PrimaryColumn()
  public id: string;

  @Column()
  public block: number;

  @Column()
  public from: string;

  @Column()
  public to: string;

  @Column({ type: 'numeric' })
  public value: number;
}
