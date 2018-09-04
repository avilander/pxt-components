import { Observable } from 'rxjs';
export declare class PxtAppComponentService {
    private submenusItens;
    readonly submenusItensObservable: Observable<any>;
    private _loadComponent;
    readonly loadComponentObservable: Observable<any>;
    private _setUserLogged;
    readonly userLoggedObservable: Observable<any>;
    private _setInfoInit;
    readonly infoInitial: Observable<any>;
    setSubmenus(routes: any): void;
    setInitialInfo(infoInitial: any): void;
    loadComponent(component: any): void;
    setUser(user: any): void;
}
