import { UserDocument } from './schemas/user.schema';
import { UserRepository } from './schemas/user.repository';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Logger } from 'winston';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
const web3 = require('web3');

import 'dotenv/config';
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private configService: ConfigService,
    @InjectSentry() private readonly sentryClient: SentryService,
  ) {
  }

  /**
   * @description update data in statistics
   * @param {object} condition
   * @param {object} data
   * @returns updated Statistics data
   */
  async findAndUpdateStatisticsModel(
    condition: object,
    data: object,
  ) {
    try {
      return true;
    } catch (error) {
      this.logger.error(
        `${UserService.name} findAndUpdateStatisticsModel ${error}`,
      );
    }
  }


}