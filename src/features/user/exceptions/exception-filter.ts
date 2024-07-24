import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { IdException } from "./Id-exceptions";
import { Response } from "express";

@Catch(IdException)
export class IdExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const body = {
            statusCode: 400,
            message: exception.message,
            error: "Id Error"
        }
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        response.status(HttpStatus.BAD_REQUEST).json(body);
    }
}