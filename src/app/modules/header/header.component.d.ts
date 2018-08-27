import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
export declare class HeaderComponent implements OnInit {
    private route;
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
    constructor(route: Router);
    ngOnInit(): void;
    clickFornecedor(): void;
    logout(): void;
}
