import { UserService } from './user.service';
import { User, UserDocument } from './schemas/user.schema';
import { UserRepository } from './schemas/user.repository';
import { ApiCreatedResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@Controller('user')
@ApiTags('User')
@ApiSecurity('bearer')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    public readonly userService: UserService,
    public readonly userRepository: UserRepository,
  ) {}

  
  @ApiOperation({
    summary: 'Add User ',
    description: 'This Api help for add User.',
  })
  @ApiCreatedResponse({ description: 'The user that got created' })
  @Post('/add-user')
  @UsePipes(ValidationPipe)
  @UseGuards(RolesGuard)
  @Roles('ADMIN',)
  async addUser(): Promise<{ data: boolean; status: number }> {
    return { data: true, status: 200 };
  }
}
