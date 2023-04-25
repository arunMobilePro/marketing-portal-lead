import { Lead, leadSchema } from './schemas/lead.schema';
import { LeadService } from './lead.service';
import { LeadController } from './lead.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { LeadRepository } from './schemas/lead.repository';
import { UserRepository } from '../user/schemas/user.repository';
import { User, userSchema } from '../user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Lead.name,
        schema: leadSchema,
      },
      {
        name: User.name,
        schema: userSchema,
      },
    ]),
  ],
  providers: [
    LeadService, LeadRepository, UserRepository
  ],
  controllers: [LeadController],
  exports: [LeadService],
})
export class LeadModule {}