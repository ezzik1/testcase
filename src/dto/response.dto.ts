import { ApiProperty } from '@nestjs/swagger';

export class changeableAddress {
  @ApiProperty()
  walletId: string;

  @ApiProperty()
  count: number;
}
