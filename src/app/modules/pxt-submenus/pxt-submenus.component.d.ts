import { PxtButton } from './model/pxt-submenus.model';
import { PxtAppComponentService } from '../../services/pxt-app-components.service';
export declare class PxtSubmenusComponent {
    _pxtAppService: PxtAppComponentService;
    save(object?: any): void;
    search(object?: any): void;
    clear(object?: any): void;
    add(object?: any): void;
    back(object?: any): void;
    buttons: PxtButton[];
    disableSave: boolean;
    disableBack: boolean;
    disableClear: boolean;
    disableSearch: boolean;
    disableAdd: boolean;
    constructor(_pxtAppService: PxtAppComponentService);
}
