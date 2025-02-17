import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
  @Get('version')
  version() {
    return 'v1.0.1'
  }
  // @Get('google-analytics')
  //   getGoogleAnalytics() {
  //     return this.appService.getGoogleAnalytics();
  //   }
}
