import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/oauth')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}


  //   http://localhost:3000/api/v1/auth/oauth
  // http://localhost:3000/api/v1/auth/oauth/redirect
  @Get('/oauth/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request) {
    const data = await this.authService.googleLogin(req);
    return data;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/user')
  async user(@Request() req): Promise<any> {
    return req.user;
  }
}
