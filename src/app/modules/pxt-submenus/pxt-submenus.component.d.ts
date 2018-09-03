import { PxtButton } from './model/pxt-submenus.model';
import { PxtAppComponentService } from '../../services/pxt-app-components.service';
export declare class PxtSubmenusComponent {
    _pxtAppService: PxtAppComponentService;
    save(): void;
    search(): void;
    clear(): void;
    add(): void;
    back(): void;
    buttons: PxtButton[];
    constructor(_pxtAppService: PxtAppComponentService);
}
