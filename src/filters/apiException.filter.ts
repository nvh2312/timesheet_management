import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from '../services/logger.service';

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
    constructor(private logger: LoggerService) { }
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const req = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const message = typeof exception.getResponse() !== "object" ? exception.getResponse() : "error";
        if (status >= 500) {
            this.logger.error(`${new Date()} ${req.method} ${req.url} ${req.protocol} ${res.statusCode} `);
        }
        res
            .status(status)
            .json({
                statusCode: status,
                path: req.url,
                message
            });
    }
}