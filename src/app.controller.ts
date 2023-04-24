import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
import { ApiOperation } from '@nestjs/swagger';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private healthCheck: HealthCheckService,
    private mongooseHealth: MongooseHealthIndicator,
  ) {}

  /**
   * This API return mongoose connection status
   * @returns healthcheckresult
   */
  @ApiOperation({
    summary: 'Helth checkup',
    description: 'This api used for check service is running or not.',
  })
  @Get('health')
  @HealthCheck()
  getHealth(): Promise<HealthCheckResult> {
    return this.healthCheck.check([
      () => this.mongooseHealth.pingCheck('mongoDB'),
    ]);
  }
  
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
