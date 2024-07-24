import { ForbiddenException, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

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