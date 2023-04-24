import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/schemas/user.repository';
import { RegisterUserDto } from '../user/Dto/RegisterUser.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
      ) {
      }
    
  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google'
    }
    const token = await this.signIn(req.user);

    // res.cookie('access_token', token, {
    //   maxAge: 2592000000,
    //   sameSite: true,
    //   secure: false,
    // });

    return { token };

    return {
      message: 'User information from google',
      user: req.user
    }
  }

  generateJwt(payload) {
    
    // const token = this.jwtService.sign(payload);
    const token: string = this.jwtService.sign(
        { data: payload },
        {
          secret: this.configService.get('JWT_SECRET_KEY'),
          expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
        },
      );
    console.log("return", token);
    return token
  }

  async signIn(user) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }
    console.log("user", user)
    const userExists = await this.userRepository.findOne({email:user.email});
    console.log("userExists", userExists);
    if (!userExists) {
      return this.registerUser(user);
    }

    return this.generateJwt({
      sub: userExists.id,
      email: userExists.email,
    });
  }

  async registerUser(user: RegisterUserDto) {
    try {
      const newUser = await this.userRepository.create(user);
      console.log("newUser", newUser)
      return this.generateJwt({
        sub: newUser._id,
        email: newUser.email,
      });
    } catch {
      throw new InternalServerErrorException();
    }
  }
}