import { Component, Output, Input, NgModule } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class HeaderComponent {
    /**
     * @param {?} route
     */
    constructor(route) {
        this.route = route;
        this.fornecedor = { codigo: 0, nome: "" };
        this.sbConfirmation = new Subject();
        this.menuRoute = "";
        this.menuAction = "";
        this.showFilter = false;
        this.showFornecedor = false;
        this.usuarioLogado = "";
        this.isMenuAction = true;
        this.strAction = "";
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.route.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                /** @type {?} */
                let result = this.route.config.filter(x => x.path == event.url.replace('/', ''));
                if (result.length > 0) {
                    if (result[0].data !== undefined) {
                        this.menuRoute = result[0].data["text"].toUpperCase();
                    }
                }
            }
        });
    }
    /**
     * @return {?}
     */
    clickFornecedor() { }
    /**
     * @return {?}
     */
    logout() {
        // this.openDialog("Confirmação de Logout", "Deseja sair do Sistema de Gestão de Estoque?")
    }
}
HeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-header',
                template: "<header id=\"header\" class=\"page-topbar\">\n  <!-- start header nav-->\n  <div class=\"navbar-fixed\">\n    <nav class=\"navbar-color deep-orange darken-1 gradient-shadow\">\n      <div class=\"nav-wrapper\">\n        <div class=\"col s12\">\n          <div class=\"row\">\n            <div class=\"col s6\">\n\n           <div id='title-app' class=\"center title-app\" *ngIf=\"menuRoute!=''\" > \n              <a href=\"#!\" class=\"breadcrumb\" *ngIf=\"menuRoute!=''\">{{menuRoute}} </a>\n              <a href=\"#!\" class=\"breadcrumb\" *ngIf=\"isMenuAction\" >{{menuAction}}</a>\n           </div>\n            </div>\n            <div id=\"fornecedor-topo\" class=\"col s3 pointer-cursor\" *ngIf=\"showFilter && showFornecedor\" (click)=\"clickFornecedor()\">\n              <div class=\"float-left\">{{fornecedor.codigo + \" - \" + fornecedor.nome}}\n              </div>\n              <div class=\"\">\n                <i class=\"material-icons\">update</i>\n              </div>\n            </div>\n            <ul class=\"right hide-on-med-and-down\">\n                <li>\n                    <ul class=\"collapsible collapsible-user-header\">\n                        <li>\n                          <div class=\"collapsible-header collapsible-user\">\n                            <i class=\"material-icons\">account_circle</i>\n                            {{usuarioLogado}}\n                            </div>\n                        </li>\n                      </ul>\n                   \n                </li>\n                <li class=\"li-logout\">\n                  <a class=\"waves-effect waves-block waves-light chat-collapse\" (click)=\"logout()\">\n                    <i class=\"material-icons\">exit_to_app</i>\n                  </a>\n                </li>\n\n            </ul>\n            <!-- translation-button -->\n            <ul id=\"translation-dropdown\" class=\"dropdown-content\">\n              <li>\n                <a href=\"#!\" class=\"grey-text text-darken-1\">\n                  <i class=\"flag-icon flag-icon-gb\"></i> English</a>\n              </li>\n              <li>\n                <a href=\"#!\" class=\"grey-text text-darken-1\">\n                  <i class=\"flag-icon flag-icon-fr\"></i> French</a>\n              </li>\n              <li>\n                <a href=\"#!\" class=\"grey-text text-darken-1\">\n                  <i class=\"flag-icon flag-icon-cn\"></i> Chinese</a>\n              </li>\n              <li>\n                <a href=\"#!\" class=\"grey-text text-darken-1\">\n                  <i class=\"flag-icon flag-icon-de\"></i> German</a>\n              </li>\n            </ul>\n            <!-- notifications-dropdown -->\n            <ul id=\"notifications-dropdown\" class=\"dropdown-content\">\n              <li>\n                <h6>NOTIFICATIONS\n                  <span class=\"new badge\">5</span>\n                </h6>\n              </li>\n              <li class=\"divider\"></li>\n              <li>\n                <a href=\"#!\" class=\"grey-text text-darken-2\">\n                  <span class=\"material-icons icon-bg-circle cyan small\">add_shopping_cart</span> A new order has been placed!</a>\n                <time class=\"media-meta\" datetime=\"2015-06-12T20:50:48+08:00\">2 hours ago</time>\n              </li>\n              <li>\n                <a href=\"#!\" class=\"grey-text text-darken-2\">\n                  <span class=\"material-icons icon-bg-circle red small\">stars</span> Completed the task</a>\n                <time class=\"media-meta\" datetime=\"2015-06-12T20:50:48+08:00\">3 days ago</time>\n              </li>\n              <li>\n                <a href=\"#!\" class=\"grey-text text-darken-2\">\n                  <span class=\"material-icons icon-bg-circle teal small\">settings</span> Settings updated</a>\n                <time class=\"media-meta\" datetime=\"2015-06-12T20:50:48+08:00\">4 days ago</time>\n              </li>\n              <li>\n                <a href=\"#!\" class=\"grey-text text-darken-2\">\n                  <span class=\"material-icons icon-bg-circle deep-orange small\">today</span> Director meeting started</a>\n                <time class=\"media-meta\" datetime=\"2015-06-12T20:50:48+08:00\">6 days ago</time>\n              </li>\n              <li>\n                <a href=\"#!\" class=\"grey-text text-darken-2\">\n                  <span class=\"material-icons icon-bg-circle amber small\">trending_up</span> Generate monthly report</a>\n                <time class=\"media-meta\" datetime=\"2015-06-12T20:50:48+08:00\">1 week ago</time>\n              </li>\n            </ul>\n            <!-- profile-dropdown -->\n            <ul id=\"profile-dropdown\" class=\"dropdown-content\">\n              <li>\n                <a href=\"#\" class=\"grey-text text-darken-1\">\n                  <i class=\"material-icons\">face</i> Profile</a>\n              </li>\n              <li>\n                <a href=\"#\" class=\"grey-text text-darken-1\">\n                  <i class=\"material-icons\">settings</i> Settings</a>\n              </li>\n              <li>\n                <a href=\"#\" class=\"grey-text text-darken-1\">\n                  <i class=\"material-icons\">live_help</i> Help</a>\n              </li>\n              <li class=\"divider\"></li>\n              <li>\n                <a href=\"#\" class=\"grey-text text-darken-1\">\n                  <i class=\"material-icons\">lock_outline</i> Lock</a>\n              </li>\n              <li>\n                <a href=\"#\" class=\"grey-text text-darken-1\">\n                  <i class=\"material-icons\">keyboard_tab</i> Logout</a>\n              </li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </nav>\n  </div>\n</header>",
                styles: [".title-app{float:left;margin-left:31%;list-style-type:none;font-size:22px}.title-app-unchecked{float:left;margin-left:20%;list-style-type:none;font-size:12px}.margin-top-fornecedor{margin-left:15%!important}.user-info{float:left;margin-left:23%;text-align:center}.float-left{float:left;font-size:11px;font-weight:900;padding-right:11px}.float-right{float:right}.span-usuario{font-size:11px;font-weight:900;margin-right:30px;margin-left:30px}.li-logout{background:#b80120}.li-usuario{background:#e73823}.collapsible-user{padding:inherit;line-height:inherit;padding-right:21px;padding-left:21px}.collapsible-user-header{border-bottom:inherit;border-top:inherit}"]
            }] }
];
/** @nocollapse */
HeaderComponent.ctorParameters = () => [
    { type: Router }
];
HeaderComponent.propDecorators = {
    menu: [{ type: Input }],
    fornecedores: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class HeaderModule {
}
HeaderModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [HeaderComponent],
                exports: [
                    HeaderComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { HeaderModule, HeaderComponent as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHh0LWNvbXBvbmVudC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vcHh0LWNvbXBvbmVudC9zcmMvYXBwL21vZHVsZXMvaGVhZGVyL2hlYWRlci5jb21wb25lbnQudHMiLCJuZzovL3B4dC1jb21wb25lbnQvc3JjL2FwcC9tb2R1bGVzL2hlYWRlci9oZWFkZXIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPdXRwdXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlLCBOYXZpZ2F0aW9uRW5kIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWhlYWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9oZWFkZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9oZWFkZXIuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEhlYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIG1lbnU6IGFueTtcbiAgQE91dHB1dCgpIGZvcm5lY2Vkb3JlczogYW55O1xuICBmb3JuZWNlZG9yOiBhbnkgPSB7IGNvZGlnbzogMCwgbm9tZTogXCJcIiB9O1xuICBzYkNvbmZpcm1hdGlvbiA9IG5ldyBTdWJqZWN0KCk7XG4gIG1lbnVSb3V0ZSA9IFwiXCI7XG4gIG1lbnVBY3Rpb24gPSBcIlwiO1xuICBzaG93RmlsdGVyID0gZmFsc2U7XG4gIHNob3dGb3JuZWNlZG9yID0gZmFsc2U7XG4gIHVzdWFyaW9Mb2dhZG8gPSBcIlwiO1xuICBpc01lbnVBY3Rpb24gID0gdHJ1ZTtcbiAgc3RyQWN0aW9uID0gXCJcIjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlOiBSb3V0ZXIpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucm91dGUuZXZlbnRzLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMucm91dGUuY29uZmlnLmZpbHRlcih4ID0+IHgucGF0aCA9PSBldmVudC51cmwucmVwbGFjZSgnLycsICcnKSlcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgaWYgKHJlc3VsdFswXS5kYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubWVudVJvdXRlID0gcmVzdWx0WzBdLmRhdGEudGV4dC50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGNsaWNrRm9ybmVjZWRvcigpe31cbiAgbG9nb3V0KCkge1xuICAgLy8gdGhpcy5vcGVuRGlhbG9nKFwiQ29uZmlybWHDg8Knw4PCo28gZGUgTG9nb3V0XCIsIFwiRGVzZWphIHNhaXIgZG8gU2lzdGVtYSBkZSBHZXN0w4PCo28gZGUgRXN0b3F1ZT9cIilcbiAgfVxuXG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9oZWFkZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtIZWFkZXJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbXG4gICAgSGVhZGVyQ29tcG9uZW50IC8vIDwtLSB0aGlzIVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEhlYWRlck1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztJQXNCRSxZQUFvQixLQUFhO1FBQWIsVUFBSyxHQUFMLEtBQUssQ0FBUTswQkFWZixFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTs4QkFDeEIsSUFBSSxPQUFPLEVBQUU7eUJBQ2xCLEVBQUU7MEJBQ0QsRUFBRTswQkFDRixLQUFLOzhCQUNELEtBQUs7NkJBQ04sRUFBRTs0QkFDRixJQUFJO3lCQUNSLEVBQUU7S0FFd0I7Ozs7SUFFdEMsUUFBUTtRQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUs7WUFDaEMsSUFBSSxLQUFLLFlBQVksYUFBYSxFQUFFOztnQkFDbEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO2dCQUNoRixJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUNyQixJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO3dCQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQU0sV0FBVyxFQUFFLENBQUM7cUJBQ3BEO2lCQUNGO2FBQ0Y7U0FDRixDQUFDLENBQUM7S0FDSjs7OztJQUNELGVBQWUsTUFBSTs7OztJQUNuQixNQUFNOztLQUVMOzs7WUFuQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxZQUFZO2dCQUN0QixnckxBQXNDOzthQUV2Qzs7OztZQVBRLE1BQU07OzttQkFTWixLQUFLOzJCQUNMLE1BQU07Ozs7Ozs7QUNYVDs7O1lBSUMsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO2lCQUNiO2dCQUNELFlBQVksRUFBRSxDQUFDLGVBQWUsQ0FBQztnQkFDL0IsT0FBTyxFQUFFO29CQUNQLGVBQWU7aUJBQ2hCO2FBQ0Y7Ozs7Ozs7Ozs7Ozs7OzsifQ==