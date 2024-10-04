import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { EntityNotFoundError } from "@core/@shared/domain/error/entity-not-found.error";
import { Response } from "express";

@Catch(EntityNotFoundError)
export class NotFoundFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    response.status(404).json({
      statusCode: 404,
      error: "Not Found",
      message: exception.message,
    });
  }
}
