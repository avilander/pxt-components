import { PxtFieldConfig } from "../interfaces/pxt-field-config";
import { Validator } from "../interfaces/field.interface";
export declare class pxtSelectField implements PxtFieldConfig {
    label?: string;
    name?: string;
    inputType?: string;
    options?: string[];
    type: string;
    value?: any;
    colspan?: number;
    validations?: Validator[];
    disabled?: boolean;
}
