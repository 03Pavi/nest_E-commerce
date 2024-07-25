# Middleware
ONLY WORK FOR REQUEST PHASE

#### Register
```typescript
src\features\user\user.module.ts

controllers: [UserController],

export class UserModule implements NestModule { 
  configure(consumer: MiddlewareConsumer) {
     consumer.apply(UserAgentMiddware).forRoutes("user"); 
     or 
     consumer.apply(UserAgentMiddware).forRoutes(UserController);
  }
}

or 

export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserAgentMiddware).exclude({
      method:RequestMethod.GET,
      path: '/users'
    }).forRoutes({
      method: RequestMethod.POST,
      path: '/users',
    })
  }
}
```
chaining

```typescript
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware,UserAgentMiddware).forRoutes({ //here authmiddleware will run first the the UserAgent
      method: RequestMethod.POST,
      path: '/users',
    })
  }
}
```
```typescript
src/middlewares/user-agent.middleware.ts

export class UserAgentMiddware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const userAgent = req.headers['user-agent'];
        if (this.isUserAgentValid(userAgent)) {
            next();
        } else {
            throw new ForbiddenException('Invalid User Agent')
        }
    }
    private isUserAgentValid(userAgent: string) {
        return userAgent.includes('Chrome');
    }
}

```
For Global

```typescript
src\app.module.ts

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserAgentMiddware).forRoutes({
      path: "*",
      method: RequestMethod.ALL
    }) //for all the routes 
  }
}

```



Reponse if faild
```bash
{
  "statusCode": 403,
  "timestamp": "2024-07-24T10:47:27.835Z",
  "message": "Invalid User Agent"
}
```