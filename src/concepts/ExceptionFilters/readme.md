# Exception Filters

 Two type recognised (HTTP Exceptions) or un-recognised ( internal server)

```jsx
unrecognised -> throw new Error()
recognised   -> 
throw new HTTpException("invalid Request",400) or 
throw new BadRequestException("Bad Request")  //code 400
```

usage
```typescript
@Delete(':id')
@UseFilters(IdExceptionFilter) //Catch the Exception
remove(@Param('id', ParseIntPipe) id: number) {
if (id < 0) {
    throw new IdException()
}
return this.userService.remove(+id);
}


```
```typescript
// user\exceptions\Id-exceptions.ts 

export class IdException extends Error {
    constructor(message?: string) {
        super(message || "Invalid id");
    }
}
```

```typescript 
// user\exceptions\exception-filter.ts

@Catch(IdException) //it will only handle the IdException 
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
```

## Handling exception for HTTP

```typescript
@Delete(':id')
@UseFilters(HTTPExceptionFilter)
remove(@Param('id', ParseIntPipe) id: number) {
if (id < 0) {
    throw new HttpException("invalid Request", 400)
}
return this.userService.remove(+id);
}
```

```typescript
\user\exceptions\http-exception.filter.ts

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

```

### Custom Universal Exception Filter

```typescript
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

```

#### Register Exception filter as global
```typescript
src\app.module.ts
providers: [{
    provide:APP_FILTER,
    useClass:AppExceptionFilter
  }],

```