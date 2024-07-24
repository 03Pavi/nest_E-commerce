import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HTTPExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>()
        const status = exception.getStatus()
        const message = exception.message

        const body = {
            statusCode: status,
            message: message,
            timestamp: new Date().toISOString(),
            path: request.url
        }
        this.createLogs(body)
        return response.status(status).json(body);
    }
    private createLogs(exception: any) {
        console.log(exception)
    }
}