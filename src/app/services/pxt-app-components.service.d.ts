import { Observable } from 'rxjs';
export declare class PxtAppComponentService {
    private submenusItens;
    readonly submenusItensObservable: Observable<any>;
    private _loadComponent;
    readonly loadComponentObservable: Observable<any>;
    setSubmenus(routes: any): void;
    loadComponent(component: any): void;
}
