import { LeadService } from './lead.service';
import { Lead, LeadDocument } from './schemas/lead.schema';
import { LeadRepository } from './schemas/lead.repository';
import { ApiCreatedResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Post,
  Patch,
  Get,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EditLeadGeneratorDto } from './Dto/editLeadGenerator.dto';
@Controller('lead')
@ApiTags('Lead')
@ApiSecurity('bearer')
@UseGuards(JwtAuthGuard)
export class LeadController {
  constructor(
    public readonly leadService: LeadService,
    public readonly leadRepository: LeadRepository,
  ) {}

  
  @ApiOperation({
    summary: 'Add Lead ',
    description: 'This Api help for add Lead.',
  })
  @ApiCreatedResponse({ description: 'The lead that got created' })
  @Post('/add')
  @UsePipes(ValidationPipe)
  @UseGuards(RolesGuard)
  @Roles('LEAD_GENERATOR')
  async addLead(): Promise<{ data: boolean; status: number }> {
    return { data: true, status: 200 };
  }

  @ApiOperation({
    summary: 'Edit Lead ',
    description: 'This Api help for edit Lead.',
  })
  @ApiCreatedResponse({ description: 'Edit Lead' })
  @Patch('/edit')
  @UsePipes(ValidationPipe)
  @UseGuards(RolesGuard)
  @Roles('LEAD_GENERATOR')
  async editLeadGenerator(@Body() EditLeadGeneratorDto: EditLeadGeneratorDto ): Promise<any> {
    console.log("EditLeadGeneratorDto", EditLeadGeneratorDto)
    return await this.leadService.editLeadGenerator(EditLeadGeneratorDto)
  }
}
