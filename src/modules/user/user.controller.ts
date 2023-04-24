import { UserService } from './user.service';
import { User, UserDocument } from './schemas/user.schema';
import { UserRepository } from './schemas/user.repository';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  Controller,
  Patch,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  UseGuards,
  Req,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import { Query } from '@nestjs/common/decorators';
import { Request } from 'express';
@Controller('user')
@ApiTags('WALLET')
export class UserController {
  constructor(
    public readonly userService: UserService,
    public readonly userRepository: UserRepository,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @InjectSentry() private readonly sentryClient: SentryService,
  ) {}

  /**
   *
   * @description Turn on automation of user strategies
   * @return Boolean
   */
  @ApiOperation({
    summary: 'Automation ',
    description: 'This API helps to run all user automation.',
  })
  @Get('/test/is-automation')
  async testIsAutomation(): Promise<{ data: boolean; status: number }> {
    return { data: true, status: 200 };
  }
}