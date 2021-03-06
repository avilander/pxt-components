import { EventEmitter } from '@angular/core';
import { PxtButton } from './model/pxt-submenus.model';
import { PxtAppComponentService } from '../../services/pxt-app-components.service';
import { RequestBaseService } from '../../services/pxt-http/request-base.service';
import { HttpHelperService } from '../../services/pxt-http/http-helper-service';
import { ToastrService } from 'ngx-toastr';
export declare class PxtSubmenusComponent<T> {
    _pxtAppService: PxtAppComponentService;
    _serviceBase: RequestBaseService;
    helper: HttpHelperService;
    notificationService: ToastrService;
    model?: T;
    private urlService;
    listing: EventEmitter<T[]>;
    callbackSave: EventEmitter<T[]>;
    callbackDelete: EventEmitter<T[]>;
    controller?: String;
    save(): void;
    search(): void;
    delete(id: any): void;
    clear(): void;
    add(): void;
    back(): void;
    cols: number;
    colspan: number;
    buttons: PxtButton[];
    enableSave: boolean;
    enableBack: boolean;
    enableClear: boolean;
    enableSearch: boolean;
    enableAdd: boolean;
    enableDelete: boolean;
    constructor(_pxtAppService: PxtAppComponentService, _serviceBase: RequestBaseService, helper: HttpHelperService, notificationService: ToastrService);
    validationModel(): boolean;
}
