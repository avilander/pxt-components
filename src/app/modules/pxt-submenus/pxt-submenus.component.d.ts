import { EventEmitter } from '@angular/core';
import { PxtButton } from './model/pxt-submenus.model';
import { PxtAppComponentService } from '../../services/pxt-app-components.service';
import { RequestBaseService } from '../../services/pxt-http/request-base.service';
import { HttpHelperService } from '../../services/pxt-http/HttpHelperService';
export declare class PxtSubmenusComponent<T> {
    _pxtAppService: PxtAppComponentService;
    _serviceBase: RequestBaseService<T>;
    helper: HttpHelperService;
    model?: T;
    type: (new () => T);
    private urlService;
    listing: EventEmitter<T[]>;
    controller?: String;
    save(): void;
    search(): void;
    delete(): void;
    clear(): void;
    add(): void;
    back(): void;
    buttons: PxtButton[];
    enableSave: boolean;
    enableBack: boolean;
    enableClear: boolean;
    enableSearch: boolean;
    enableAdd: boolean;
    enableDelete: boolean;
    constructor(_pxtAppService: PxtAppComponentService, _serviceBase: RequestBaseService<T>, helper: HttpHelperService);
}
