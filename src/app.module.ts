import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envValidation } from './shared/env-validate';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { devLogger, productionLogger } from './setup-logger';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidation,
    }),

    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 20,
    }),
    WinstonModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get('ENV') !== 'production'
          ? devLogger
          : productionLogger,
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
      }),
    }),
    TerminusModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
