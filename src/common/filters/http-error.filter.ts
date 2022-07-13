import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { ResponseData } from '../types/response-data';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const errorResponse = new ResponseData<any>();

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (typeof exception.getStatus === 'function') {
      status = exception.getStatus();
      errorResponse.errors = exception.getResponse().message;
    } else {
      errorResponse.errors = exception;
    }

    errorResponse.code = `${status}`;

    errorResponse.message =
      exception.message.error || exception.message || null;

    response.status(status).send(errorResponse);
  }
}
