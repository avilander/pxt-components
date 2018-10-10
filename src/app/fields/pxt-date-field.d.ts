import { PxtFieldConfig } from "../interfaces/pxt-field-config";
import { Validator } from "../interfaces/field.interface";
export declare class pxtDateField implements PxtFieldConfig {
    position: number;
    label?: string;
    name?: string;
    value?: any;
    colspan?: number;
    type?: string;
    validations?: Validator[];
    disabled: boolean;
}
