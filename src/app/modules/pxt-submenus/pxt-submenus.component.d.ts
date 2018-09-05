import { PxtButton } from './model/pxt-submenus.model';
import { PxtAppComponentService } from '../../services/pxt-app-components.service';
import { RequestBaseService } from '../../services/pxt-http/request-base.service';
export declare class PxtSubmenusComponent {
    _pxtAppService: PxtAppComponentService;
    _serviceBase: RequestBaseService;
    model?: any;
    controller?: String;
    save(): any;
    search(): void;
    clear(): void;
    add(): void;
    back(): void;
    delete(): void;
    buttons: PxtButton[];
    enableSave: boolean;
    enableBack: boolean;
    enableClear: boolean;
    enableSearch: boolean;
    enableAdd: boolean;
    enableDelete: boolean;
    constructor(_pxtAppService: PxtAppComponentService, _serviceBase: RequestBaseService);
}
