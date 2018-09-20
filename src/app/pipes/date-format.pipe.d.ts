import { PipeTransform } from "@angular/core";
import { DatePipe } from "@angular/common";
export declare class DateFormatPipe extends DatePipe implements PipeTransform {
    transform(value: any, args?: any): any;
}
