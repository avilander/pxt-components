import { Injector } from '@angular/core';
export declare class ConfigService {
    private injector;
    config: any;
    constructor(injector: Injector);
    load(url: string): Promise<{}>;
    getConfiguration(element: string, dataList?: string): any;
    verifyUrl(typeModel: any): any;
}
