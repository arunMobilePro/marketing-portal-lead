import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Req,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/schemas/user.repository';
import { RegisterUserDto } from '../user/Dto/RegisterUser.dto';
import { ConfigService } from '@nestjs/config';
import { UserDocument } from '../user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async googleLogin(
    @Req() req: Request,
  ): Promise<
    { data: any; msg: string; error: null } | InternalServerErrorException
  > {
    let status: boolean = false;
    if (!req['user']) {
      throw new BadRequestException('Unauthenticated');
    }
    const reqUser: RegisterUserDto = req['user'];
    let userExists: UserDocument = await this.userRepository.findOne({
      email: reqUser.email,
    });
    if (!userExists) {
      try {
        userExists = await this.userRepository.create(reqUser);
        status = true;
      } catch {
        throw new InternalServerErrorException();
      }
    }
    const token: string = await this.generateJwt({
      sub: userExists.id,
      email: userExists.email,
      role: userExists.role,
    });
    return { data: { token, newUser: status }, msg: 'OK', error: null };
  }

  async generateJwt(payload: any): Promise<string> {
    const token: string = this.jwtService.sign(
      { ...payload },
      {
        secret: this.configService.get('JWT_SECRET_KEY'),
        expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
      },
    );
    return token;
  }
}
