import { CallHandler, ExecutionContext } from "@nestjs/common";
import { tap } from "rxjs";

export class RecentSearchInterceptor {
    constructor(private readonly anyService: any) { }
    intercept(context: ExecutionContext, next: CallHandler) {
        //input
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const { query } = request.query;
        return next.handle().pipe( //output
            tap((data) => {
                this.anyService.addRecentSearch(query, data) //update
            })
        );
    }
}