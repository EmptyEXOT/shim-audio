import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    // Возможно понадобится при ведении журнала.
    // const request = ctx.getRequest();

    if (response.headersSent) {
      return;
    }

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let messages = ['Internal server error'];

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseBody = exception.getResponse();

      if (typeof responseBody === 'object' && 'message' in responseBody) {
        messages = Array.isArray(responseBody.message)
          ? responseBody.message
          : [responseBody.message];
      } else {
        messages = [responseBody as string];
      }
    }

    response.status(status).json({
      statusCode: status,
      error: HttpStatus[status],
      messages: messages,
      /* 
        Возможно понадобится при ведении журнала. 
        Пользователю эти данные лучше не отдавать
      */
      /*
      timestamp: new Date().toISOString(),
      path: request.url,
      */
    });
  }
}
