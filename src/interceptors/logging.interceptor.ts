import { ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { LoggerService } from '../services/logger.service';
import { tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private loggerService: LoggerService) { }
    intercept(context: ExecutionContext, next) {
        const now = Date.now();
        const req = context.switchToHttp().getRequest();
        const method = req.method;
        const url = req.url;

        return next.handle().pipe(
            tap(() => {
                const res = context.switchToHttp().getResponse();
                const delay = Date.now() - now;
                this.loggerService.log(
                    `${req.ip} ${new Date()} ${method} ${url} ${req.protocol} ${res.statusCode} ${req.headers['content-length'] || '0'
                    } ${req.headers.host.split(':')[1]} ${delay}ms`,
                );
            }),
        );
    }
}