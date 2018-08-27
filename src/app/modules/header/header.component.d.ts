import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';
export declare class HeaderComponent implements OnInit {
    menu: any;
    fornecedores: any;
    fornecedor: any;
    sbConfirmation: Subject<{}>;
    menuRoute: string;
    menuAction: string;
    showFilter: boolean;
    showFornecedor: boolean;
    usuarioLogado: string;
    isMenuAction: boolean;
    strAction: string;
    constructor();
    ngOnInit(): void;
    clickFornecedor(): void;
    logout(): void;
}
