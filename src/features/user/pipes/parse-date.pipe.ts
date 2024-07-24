import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, Optional } from '@nestjs/common';


export class ParseDateOptions {
  errMSG: string
}
@Injectable()
export class ParseDatePipe implements PipeTransform {
  errMSG: any;

  // optional Decorator is used for making this options as optional
  constructor(options: ParseDateOptions) {
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
