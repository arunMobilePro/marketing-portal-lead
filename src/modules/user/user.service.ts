import { UserDocument } from './schemas/user.schema';
import { UserRepository } from './schemas/user.repository';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import 'dotenv/config';
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private configService: ConfigService,
    
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
      console.log(error)
    }
  }


}