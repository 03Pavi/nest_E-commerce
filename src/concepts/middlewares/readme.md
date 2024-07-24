# Middleware


#### Register
```typescript

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
Reponse if faild
```bash
{
  "statusCode": 403,
  "timestamp": "2024-07-24T10:47:27.835Z",
  "message": "Invalid User Agent"
}
```