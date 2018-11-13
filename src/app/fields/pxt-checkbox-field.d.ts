import { PxtFieldConfig } from "../interfaces/pxt-field-config";
import { Validator } from "../interfaces/field.interface";
export declare class PxtCheckboxField implements PxtFieldConfig {
    position: number;
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
