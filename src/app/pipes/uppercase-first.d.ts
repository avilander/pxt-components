import { PipeTransform } from "@angular/core";
import { UpperCasePipe } from "@angular/common";
export declare class UpercaseFirst extends UpperCasePipe implements PipeTransform {
    transform(text: any, args?: any): any;
}
