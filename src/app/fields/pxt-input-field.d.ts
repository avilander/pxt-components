import { PxtFieldConfig } from "../interfaces/pxt-field-config";
import { Validator } from "../interfaces/field.interface";
export declare class pxtInputField implements PxtFieldConfig {
    position: number;
    label?: string;
    name?: string;
    inputType?: string;
    type: string;
    value?: any;
    colspan?: number;
    validations?: Validator[];
    disabled?: boolean;
}
