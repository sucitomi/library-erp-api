import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/auth.decorator';

@Controller('api/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  initApi(): Object {
    return this.appService.initApiMessage();
  }
}
