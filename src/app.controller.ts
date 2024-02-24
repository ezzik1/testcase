import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { changeableAddress } from './dto/response.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('most_changeable')
  @ApiOkResponse({ type: () => changeableAddress })
  public async mostChangeable() {
    return this.appService.getMostChangeableAddress();
  }
}
