import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import hpp from 'hpp';
import {xss} from 'xss-clean';
import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { HttpExceptionFilter } from './shared/providers/HttpExceptionFilter';
import { setupSwagger } from './setup-swagger';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  const configService = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix('/api/v1');
  app.use((req: any, res: any, next: any) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type',
    );
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Content-Security-Policy', "frame-ancestors 'none'");
    next();
  });
  app.enableCors({
    origin: '*',
    methods: 'GET, PATCH, PUT, POST',
    credentials: true,
  });
  app.use(helmet.crossOriginEmbedderPolicy());
  app.use(helmet.crossOriginOpenerPolicy());
  app.use(helmet.crossOriginResourcePolicy());
  app.use(helmet.dnsPrefetchControl());
  app.use(helmet.expectCt());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.ieNoOpen());
  app.use(helmet.noSniff());
  app.use(helmet.originAgentCluster());
  app.use(
    helmet.permittedCrossDomainPolicies({
      permittedPolicies: 'by-content-type',
    }),
  );
  app.use(helmet.referrerPolicy());
  app.use(helmet.xssFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      },
    }),
  );
  // app.use(xss());
  // app.use(hpp());
  if (!['production'].includes(configService.get('ENV'))) {
    setupSwagger(app);
  }

  const port = process.env.PORT;
  await app.listen(port);
  console.info(
    `server running on port ${port} ENV ${configService.get('ENV')}`,
  );
}

bootstrap();
