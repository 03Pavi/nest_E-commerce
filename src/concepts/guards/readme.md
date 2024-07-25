# Guards

Just Like Middleware but , this is call nest to Middleware()  

#### The middlware do not have the excess to the next middleware or guard


# Guard have the access of the Excecution Context :

```typescript
getType()
getArgs( ) //args list
getArgByIndex(1) //to get the parameter route wise

getClass()   --> information about controller
getHandler() --> Instance of route handler

```
```typescript
const ctx = context.switchToHTTP()
```
lead to accessing of
```bash
 getRequest() ,
 getResponse(),
 getNext()
 ```