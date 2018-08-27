/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Output, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(route) {
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
    HeaderComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.route.events.subscribe(function (event) {
            if (event instanceof NavigationEnd) {
                /** @type {?} */
                var result = _this.route.config.filter(function (x) { return x.path == event.url.replace('/', ''); });
                if (result.length > 0) {
                    if (result[0].data !== undefined) {
                        _this.menuRoute = result[0].data["text"].toUpperCase();
                    }
                }
            }
        });
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
    HeaderComponent.ctorParameters = function () { return [
        { type: Router }
    ]; };
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
    /** @type {?} */
    HeaderComponent.prototype.route;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3B4dC1jb21wb25lbnQvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvaGVhZGVyL2hlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsTUFBTSxFQUFrQixhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOztJQW9CN0IseUJBQW9CLEtBQWE7UUFBYixVQUFLLEdBQUwsS0FBSyxDQUFROzBCQVZmLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFOzhCQUN4QixJQUFJLE9BQU8sRUFBRTt5QkFDbEIsRUFBRTswQkFDRCxFQUFFOzBCQUNGLEtBQUs7OEJBQ0QsS0FBSzs2QkFDTixFQUFFOzRCQUNGLElBQUk7eUJBQ1IsRUFBRTtLQUV3Qjs7OztJQUV0QyxrQ0FBUTs7O0lBQVI7UUFBQSxpQkFXQztRQVZDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQUs7WUFDaEMsRUFBRSxDQUFDLENBQUMsS0FBSyxZQUFZLGFBQWEsQ0FBQyxDQUFDLENBQUM7O2dCQUNuQyxJQUFJLE1BQU0sR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQyxDQUFBO2dCQUNoRixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDakMsS0FBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFNLFdBQVcsRUFBRSxDQUFDO3FCQUNwRDtpQkFDRjthQUNGO1NBQ0YsQ0FBQyxDQUFDO0tBQ0o7Ozs7SUFDRCx5Q0FBZTs7O0lBQWYsZUFBbUI7Ozs7SUFDbkIsZ0NBQU07OztJQUFOOztLQUVDOztnQkFuQ0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO29CQUN0QixnckxBQXNDOztpQkFFdkM7Ozs7Z0JBUFEsTUFBTTs7O3VCQVNaLEtBQUs7K0JBQ0wsTUFBTTs7MEJBWFQ7O1NBU2EsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPdXRwdXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlLCBOYXZpZ2F0aW9uRW5kIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWhlYWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9oZWFkZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9oZWFkZXIuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEhlYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIG1lbnU6IGFueTtcbiAgQE91dHB1dCgpIGZvcm5lY2Vkb3JlczogYW55O1xuICBmb3JuZWNlZG9yOiBhbnkgPSB7IGNvZGlnbzogMCwgbm9tZTogXCJcIiB9O1xuICBzYkNvbmZpcm1hdGlvbiA9IG5ldyBTdWJqZWN0KCk7XG4gIG1lbnVSb3V0ZSA9IFwiXCI7XG4gIG1lbnVBY3Rpb24gPSBcIlwiO1xuICBzaG93RmlsdGVyID0gZmFsc2U7XG4gIHNob3dGb3JuZWNlZG9yID0gZmFsc2U7XG4gIHVzdWFyaW9Mb2dhZG8gPSBcIlwiO1xuICBpc01lbnVBY3Rpb24gID0gdHJ1ZTtcbiAgc3RyQWN0aW9uID0gXCJcIjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlOiBSb3V0ZXIpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucm91dGUuZXZlbnRzLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMucm91dGUuY29uZmlnLmZpbHRlcih4ID0+IHgucGF0aCA9PSBldmVudC51cmwucmVwbGFjZSgnLycsICcnKSlcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgaWYgKHJlc3VsdFswXS5kYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubWVudVJvdXRlID0gcmVzdWx0WzBdLmRhdGEudGV4dC50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGNsaWNrRm9ybmVjZWRvcigpe31cbiAgbG9nb3V0KCkge1xuICAgLy8gdGhpcy5vcGVuRGlhbG9nKFwiQ29uZmlybWHDp8OjbyBkZSBMb2dvdXRcIiwgXCJEZXNlamEgc2FpciBkbyBTaXN0ZW1hIGRlIEdlc3TDo28gZGUgRXN0b3F1ZT9cIilcbiAgfVxuXG5cbn1cbiJdfQ==