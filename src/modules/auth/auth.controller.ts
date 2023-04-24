import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

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
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
   

    return this.authService.googleLogin(req)
  }
}
