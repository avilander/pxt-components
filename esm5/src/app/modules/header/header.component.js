/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Output, Input } from '@angular/core';
import { Subject } from 'rxjs';
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent() {
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
    HeaderComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    HeaderComponent.prototype.clickFornecedor = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    HeaderComponent.prototype.logout = /**
     * @return {?}
     */
    function () {
        // this.openDialog("Confirmação de Logout", "Deseja sair do Sistema de Gestão de Estoque?")
    };
    HeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-header',
                    template: "<header id=\"header\" class=\"page-topbar\">\n  <!-- start header nav-->\n  <div class=\"navbar-fixed\">\n    <nav class=\"navbar-color deep-orange darken-1 gradient-shadow\">\n      <div class=\"nav-wrapper\">\n        <div class=\"col s12\">\n          <div class=\"row\">\n            <div class=\"col s6\">\n\n           <div id='title-app' class=\"center title-app\" *ngIf=\"menuRoute!=''\" > \n              <a href=\"#!\" class=\"breadcrumb\" *ngIf=\"menuRoute!=''\">{{menuRoute}} </a>\n              <a href=\"#!\" class=\"breadcrumb\" *ngIf=\"isMenuAction\" >{{menuAction}}</a>\n           </div>\n            </div>\n            <div id=\"fornecedor-topo\" class=\"col s3 pointer-cursor\" *ngIf=\"showFilter && showFornecedor\" (click)=\"clickFornecedor()\">\n              <div class=\"float-left\">{{fornecedor.codigo + \" - \" + fornecedor.nome}}\n              </div>\n              <div class=\"\">\n                <i class=\"material-icons\">update</i>\n              </div>\n            </div>\n            <ul class=\"right hide-on-med-and-down\">\n                <li>\n                    <ul class=\"collapsible collapsible-user-header\">\n                        <li>\n                          <div class=\"collapsible-header collapsible-user\">\n                            <i class=\"material-icons\">account_circle</i>\n                            {{usuarioLogado}}\n                            </div>\n                        </li>\n                      </ul>\n                   \n                </li>\n                <li class=\"li-logout\">\n                  <a class=\"waves-effect waves-block waves-light chat-collapse\" (click)=\"logout()\">\n                    <i class=\"material-icons\">exit_to_app</i>\n                  </a>\n                </li>\n\n            </ul>\n            <!-- translation-button -->\n            <ul id=\"translation-dropdown\" class=\"dropdown-content\">\n              <li>\n                <a href=\"#!\" class=\"grey-text text-darken-1\">\n                  <i class=\"flag-icon flag-icon-gb\"></i> English</a>\n              </li>\n              <li>\n                <a href=\"#!\" class=\"grey-text text-darken-1\">\n                  <i class=\"flag-icon flag-icon-fr\"></i> French</a>\n              </li>\n              <li>\n                <a href=\"#!\" class=\"grey-text text-darken-1\">\n                  <i class=\"flag-icon flag-icon-cn\"></i> Chinese</a>\n              </li>\n              <li>\n                <a href=\"#!\" class=\"grey-text text-darken-1\">\n                  <i class=\"flag-icon flag-icon-de\"></i> German</a>\n              </li>\n            </ul>\n            <!-- notifications-dropdown -->\n            <ul id=\"notifications-dropdown\" class=\"dropdown-content\">\n              <li>\n                <h6>NOTIFICATIONS\n                  <span class=\"new badge\">5</span>\n                </h6>\n              </li>\n              <li class=\"divider\"></li>\n              <li>\n                <a href=\"#!\" class=\"grey-text text-darken-2\">\n                  <span class=\"material-icons icon-bg-circle cyan small\">add_shopping_cart</span> A new order has been placed!</a>\n                <time class=\"media-meta\" datetime=\"2015-06-12T20:50:48+08:00\">2 hours ago</time>\n              </li>\n              <li>\n                <a href=\"#!\" class=\"grey-text text-darken-2\">\n                  <span class=\"material-icons icon-bg-circle red small\">stars</span> Completed the task</a>\n                <time class=\"media-meta\" datetime=\"2015-06-12T20:50:48+08:00\">3 days ago</time>\n              </li>\n              <li>\n                <a href=\"#!\" class=\"grey-text text-darken-2\">\n                  <span class=\"material-icons icon-bg-circle teal small\">settings</span> Settings updated</a>\n                <time class=\"media-meta\" datetime=\"2015-06-12T20:50:48+08:00\">4 days ago</time>\n              </li>\n              <li>\n                <a href=\"#!\" class=\"grey-text text-darken-2\">\n                  <span class=\"material-icons icon-bg-circle deep-orange small\">today</span> Director meeting started</a>\n                <time class=\"media-meta\" datetime=\"2015-06-12T20:50:48+08:00\">6 days ago</time>\n              </li>\n              <li>\n                <a href=\"#!\" class=\"grey-text text-darken-2\">\n                  <span class=\"material-icons icon-bg-circle amber small\">trending_up</span> Generate monthly report</a>\n                <time class=\"media-meta\" datetime=\"2015-06-12T20:50:48+08:00\">1 week ago</time>\n              </li>\n            </ul>\n            <!-- profile-dropdown -->\n            <ul id=\"profile-dropdown\" class=\"dropdown-content\">\n              <li>\n                <a href=\"#\" class=\"grey-text text-darken-1\">\n                  <i class=\"material-icons\">face</i> Profile</a>\n              </li>\n              <li>\n                <a href=\"#\" class=\"grey-text text-darken-1\">\n                  <i class=\"material-icons\">settings</i> Settings</a>\n              </li>\n              <li>\n                <a href=\"#\" class=\"grey-text text-darken-1\">\n                  <i class=\"material-icons\">live_help</i> Help</a>\n              </li>\n              <li class=\"divider\"></li>\n              <li>\n                <a href=\"#\" class=\"grey-text text-darken-1\">\n                  <i class=\"material-icons\">lock_outline</i> Lock</a>\n              </li>\n              <li>\n                <a href=\"#\" class=\"grey-text text-darken-1\">\n                  <i class=\"material-icons\">keyboard_tab</i> Logout</a>\n              </li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </nav>\n  </div>\n</header>",
                    styles: [".title-app{float:left;margin-left:31%;list-style-type:none;font-size:22px}.title-app-unchecked{float:left;margin-left:20%;list-style-type:none;font-size:12px}.margin-top-fornecedor{margin-left:15%!important}.user-info{float:left;margin-left:23%;text-align:center}.float-left{float:left;font-size:11px;font-weight:900;padding-right:11px}.float-right{float:right}.span-usuario{font-size:11px;font-weight:900;margin-right:30px;margin-left:30px}.li-logout{background:#b80120}.li-usuario{background:#e73823}.collapsible-user{padding:inherit;line-height:inherit;padding-right:21px;padding-left:21px}.collapsible-user-header{border-bottom:inherit;border-top:inherit}"]
                }] }
    ];
    /** @nocollapse */
    HeaderComponent.ctorParameters = function () { return []; };
    HeaderComponent.propDecorators = {
        menu: [{ type: Input }],
        fornecedores: [{ type: Output }]
    };
    return HeaderComponent;
}());
export { HeaderComponent };
if (false) {
    /** @type {?} */
    HeaderComponent.prototype.menu;
    /** @type {?} */
    HeaderComponent.prototype.fornecedores;
    /** @type {?} */
    HeaderComponent.prototype.fornecedor;
    /** @type {?} */
    HeaderComponent.prototype.sbConfirmation;
    /** @type {?} */
    HeaderComponent.prototype.menuRoute;
    /** @type {?} */
    HeaderComponent.prototype.menuAction;
    /** @type {?} */
    HeaderComponent.prototype.showFilter;
    /** @type {?} */
    HeaderComponent.prototype.showFornecedor;
    /** @type {?} */
    HeaderComponent.prototype.usuarioLogado;
    /** @type {?} */
    HeaderComponent.prototype.isMenuAction;
    /** @type {?} */
    HeaderComponent.prototype.strAction;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3B4dC1jb21wb25lbnQvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvaGVhZGVyL2hlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOztJQW9CN0I7MEJBVmtCLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFOzhCQUN4QixJQUFJLE9BQU8sRUFBRTt5QkFDbEIsRUFBRTswQkFDRCxFQUFFOzBCQUNGLEtBQUs7OEJBQ0QsS0FBSzs2QkFDTixFQUFFOzRCQUNGLElBQUk7eUJBQ1IsRUFBRTtLQUVHOzs7O0lBRWpCLGtDQUFROzs7SUFBUjtLQUNDOzs7O0lBQ0QseUNBQWU7OztJQUFmLGVBQW1COzs7O0lBQ25CLGdDQUFNOzs7SUFBTjs7S0FFQzs7Z0JBekJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtvQkFDdEIsZ3JMQUFzQzs7aUJBRXZDOzs7Ozt1QkFFRSxLQUFLOytCQUNMLE1BQU07OzBCQVhUOztTQVNhLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT3V0cHV0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSwgTmF2aWdhdGlvbkVuZCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1oZWFkZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vaGVhZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vaGVhZGVyLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBIZWFkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBtZW51OiBhbnk7XG4gIEBPdXRwdXQoKSBmb3JuZWNlZG9yZXM6IGFueTtcbiAgZm9ybmVjZWRvcjogYW55ID0geyBjb2RpZ286IDAsIG5vbWU6IFwiXCIgfTtcbiAgc2JDb25maXJtYXRpb24gPSBuZXcgU3ViamVjdCgpO1xuICBtZW51Um91dGUgPSBcIlwiO1xuICBtZW51QWN0aW9uID0gXCJcIjtcbiAgc2hvd0ZpbHRlciA9IGZhbHNlO1xuICBzaG93Rm9ybmVjZWRvciA9IGZhbHNlO1xuICB1c3VhcmlvTG9nYWRvID0gXCJcIjtcbiAgaXNNZW51QWN0aW9uICA9IHRydWU7XG4gIHN0ckFjdGlvbiA9IFwiXCI7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuICBjbGlja0Zvcm5lY2Vkb3IoKXt9XG4gIGxvZ291dCgpIHtcbiAgIC8vIHRoaXMub3BlbkRpYWxvZyhcIkNvbmZpcm1hw6fDo28gZGUgTG9nb3V0XCIsIFwiRGVzZWphIHNhaXIgZG8gU2lzdGVtYSBkZSBHZXN0w6NvIGRlIEVzdG9xdWU/XCIpXG4gIH1cblxuXG59XG4iXX0=