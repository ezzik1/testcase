import { Injectable } from '@nestjs/common';
import { AppService } from './app.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AppSchedulle {
  constructor(private readonly service: AppService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  public async addInformationToDb() {
    await this.service.getLastInformation();
  }
}
