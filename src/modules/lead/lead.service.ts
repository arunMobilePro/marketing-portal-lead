import { LeadDocument } from './schemas/lead.schema';
import { LeadRepository } from './schemas/lead.repository';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config';

@Injectable()
export class LeadService {
  constructor(
    private readonly leadRepository: LeadRepository,
    private configService: ConfigService,
  ) {}

  async editLeadGenerator(edit) {
    try {
      return true;
    } catch (error) {
      console.log(error);
    }
  }
}
