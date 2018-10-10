import { PxtFieldConfig } from "../interfaces/pxt-field-config";
import { Validator } from "../interfaces/field.interface";
export declare class pxtRadioButtonField implements PxtFieldConfig {
    position: number;
    label?: string;
    name?: string;
    options?: string[];
    value?: any;
    colspan?: number;
    validations?: Validator[];
    disabled?: boolean;
}
