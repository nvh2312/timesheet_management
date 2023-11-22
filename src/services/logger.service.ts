import { LoggerService as NestLoggerService } from '@nestjs/common';

export class LoggerService implements NestLoggerService {

    log(message: any, ...optionalParams: any[]) {
        console.log(`[LOG] ${message}`);
    }


    error(message: any, ...optionalParams: any[]) {
        console.log(`[ERROR] ${message}`);
    }


    warn(message: any, ...optionalParams: any[]) {
        console.log(`[WARN] ${message}`);
    }

}