import { PxtFieldConfig } from "../interfaces/pxt-field-config";
import { Validator } from "../interfaces/field.interface";
export declare class PxtRadioButtonField implements PxtFieldConfig {
    position: number;
    label?: string;
    name?: string;
    options?: string[];
    value?: any;
    colspan?: number;
    validations?: Validator[];
    disabled?: boolean;
}
