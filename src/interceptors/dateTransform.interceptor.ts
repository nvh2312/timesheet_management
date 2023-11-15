import { NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus, UseInterceptors } from '@nestjs/common';
import { Observable } from 'rxjs';

export function DateTransform() {
    return UseInterceptors(new DateTransformInterceptor());
}
export class DateTransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        try {
            let request = context.switchToHttp().getRequest();
            if (request.body?.date) request.body.date = changeStringToDate(request.body.date)
            if (request.body?.startDate)request.body.startDate = changeStringToDate(request.body.startDate)
            if (request.body?.endDate) request.body.endDate = changeStringToDate(request.body.endDate)
            if (request.query?.startDate) request.query.endDate = changeStringToDate(request.query.startDate)
            if (request.query?.endDate) request.query.endDate = changeStringToDate(request.query.endDate)
            return next.handle();
        } catch (error) {

            throw new HttpException('Invalid date string', HttpStatus.BAD_REQUEST);
        }
    }
}

function changeStringToDate(date) {
    const revert = new Date(date);
    return revert.setHours(0, 0, 0, 0)
}