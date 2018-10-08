import { PxtFieldConfig } from "../interfaces/pxt-field-config";
import { Validator } from "../interfaces/field.interface";
export declare class pxtCheckboxField implements PxtFieldConfig {
    label?: string;
    name?: string;
    inputType?: string;
    filters?: any;
    type: string;
    value?: any;
    colspan?: number;
    validations?: Validator[];
    disabled?: boolean;
}