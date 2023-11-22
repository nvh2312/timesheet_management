import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiTransform } from './interceptors/apiTransform.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ApiExceptionFilter } from './filters/apiException.filter';
import { LoggerService } from './services/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useGlobalInterceptors(app.get(LoggingInterceptor));
  app.useGlobalFilters(new ApiExceptionFilter(app.get(LoggerService)));
  app.useGlobalInterceptors(new ApiTransform(new Reflector()))
  const config = new DocumentBuilder()
    .setTitle('Timesheet Management')
    .setDescription('Api for project training')
    .setVersion('1.0')
    .addTag('List Api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
