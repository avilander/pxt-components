import { DatePipe } from "@angular/common";
import { PipeTransform } from "@angular/core";
export declare class DateTimeFormatPipe extends DatePipe implements PipeTransform {
    transform(value: any, args?: any): any;
}
