import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";

@Catch()
export class GenericErrorFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = 500;

    response.status(status).json({
      statusCode: status,
      error: "Internal Server Error",
      message: "Erro desconhecido, entre em contato com o suporte",
    });
  }
}
