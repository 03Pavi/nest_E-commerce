# Custom Pipes
#### ParseDatePipe
```typescript
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';


interface ParseDateOptions {
  errMSG: string
}
@Injectable()
export class ParseDatePipe implements PipeTransform {
  errMSG: any;
  // optional Decorator is used for making this options as optional

  constructor(@Optional() options: ParseDateOptions) {
    this.errMSG = options?.errMSG || "invalid timestamp"
  }
  transform(value: any, metadata: ArgumentMetadata) {
    const { data: givenKey } = metadata
    console.log(givenKey, value)
    //meta type use case
    const { metatype } = metadata
    if (metatype === Date) {
      return this.parseDate(value)
    } else if (metatype === String) {
      return this.parseDate(value).toString()
    } else {
      return this.parseDate(value);
    }
  }
  private parseDate(value: string) {
    if (!value) {
      return value;
    }
    const timestamp = Number(value);
    if (isNaN(timestamp)) {
      throw new BadRequestException(this.errMSG);
    }

    return new Date(timestamp * 1000);
  }
}


```
Usage
```jsx
  @Post()
  @HttpCode(HttpStatus.OK)
  async getAll(@Body('date', ParseDatePipe) date: Date) {
    return { date };
  }


  // for options

    async getAll(@Body('date', new ParseDatePipe({errMSG:"Not a valid date"})) date: Date) {
    return { date };
  }


```


### Making it on the IOC level

 ```jsx

// modification 
from 

export interface ParseDateOptions {
  errMSG: string
}

to

export class ParseDateOptions{
  errMSG: string
}

// update providers
 Provider:[
  {
    provide: ParseDateOptions
    useValue:{
        errMSG: string
    }
  }
]


//benefits: by using this we can send separate value for the keys

 ```