import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
    // Make the response platform agnostic, not dependent on the framework
    constructor(private httpAdapterHost: HttpAdapterHost) { }
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = "Internal Server Error";
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            message = exception.message;
        } else if (exception instanceof Error) {
            message = exception.message;
        }
        const { httpAdapter } = this.httpAdapterHost;
        const body = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            message,
        };

        httpAdapter.reply(ctx.getResponse(), body, status);
    }
}
