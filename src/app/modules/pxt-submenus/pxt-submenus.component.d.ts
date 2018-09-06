import { EventEmitter } from '@angular/core';
import { PxtButton } from './model/pxt-submenus.model';
import { PxtAppComponentService } from '../../services/pxt-app-components.service';
import { RequestBaseService } from '../../services/pxt-http/request-base.service';
export declare class PxtSubmenusComponent<T> {
    _pxtAppService: PxtAppComponentService;
    _serviceBase: RequestBaseService<T>;
    model?: T;
    listing: EventEmitter<T[]>;
    controller?: String;
    save(): void;
    search(): void;
    delete(): void;
    clear(): void;
    add(): T;
    back(): void;
    buttons: PxtButton[];
    enableSave: boolean;
    enableBack: boolean;
    enableClear: boolean;
    enableSearch: boolean;
    enableAdd: boolean;
    enableDelete: boolean;
    constructor(_pxtAppService: PxtAppComponentService, _serviceBase: RequestBaseService<T>);
}
