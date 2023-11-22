import { Module, Global } from '@nestjs/common';
import { LoggerService } from '../services/logger.service';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';

@Global()
@Module({
    providers: [LoggerService, LoggingInterceptor],
    exports: [LoggerService],
})
export class LoggerModule { }