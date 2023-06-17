import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  LoggerService,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log(
      '🚀 ~ file: http-exception.file.ts:11 ~ HttpExceptionFilter ~ host:',
      host,
    );
    console.log(
      '🚀 ~ file: http-exception.file.ts:11 ~ HttpExceptionFilter ~ exception:',
      exception,
    );
    const ctx = host.switchToHttp();
    // 响应和请求对象
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    this.logger.error(exception.message, exception.stack);

    response.status(status).json({
      code: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: exception.message || exception.name,
    });
  }
}
