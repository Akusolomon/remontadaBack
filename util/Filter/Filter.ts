import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
export class GlobalFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const req = http.getRequest<Request>();
    const res = http.getResponse<Response>();
    const next = http.getNext();
    let status;
    console.log(exception);
    try {
      status = exception.getStatus();
    } catch (err) {
      status = 400;
    }
    if (process.env.NODE_ENV === 'development') {
      res.status(status).json({
        statusCode: status,
        timeStamp: new Date().toISOString(),
        description: exception.message,
        stack: exception.stack,
      });
    } else if (process.env.NODE_ENV === 'production') {
      res.status(status).json({
        statusCode: status,
        timeStamp: new Date().toISOString(),
        path: req.url,
        description: exception.message,
      });
    }
  }
}
