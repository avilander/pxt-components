(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('pxt-component', ['exports', '@angular/core', 'rxjs', '@angular/common'], factory) :
    (factory((global['pxt-component'] = {}),global.ng.core,global.rxjs,global.ng.common));
}(this, (function (exports,core,rxjs,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var HeaderComponent = (function () {
        function HeaderComponent() {
            this.fornecedor = { codigo: 0, nome: "" };
            this.sbConfirmation = new rxjs.Subject();
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
            { type: core.Component, args: [{
                        selector: 'app-header',
                        template: "<header id=\"header\" class=\"page-topbar\">\n  <!-- start header nav-->\n  <div class=\"navbar-fixed\">\n    <nav class=\"navbar-color deep-orange darken-1 gradient-shadow\">\n      <div class=\"nav-wrapper\">\n        <div class=\"col s12\">\n          <div class=\"row\">\n            <div class=\"col s6\">\n\n           <div id='title-app' class=\"center title-app\" *ngIf=\"menuRoute!=''\" > \n              <a href=\"#!\" class=\"breadcrumb\" *ngIf=\"menuRoute!=''\">{{menuRoute}} </a>\n              <a href=\"#!\" class=\"breadcrumb\" *ngIf=\"isMenuAction\" >{{menuAction}}</a>\n           </div>\n            </div>\n            <div id=\"fornecedor-topo\" class=\"col s3 pointer-cursor\" *ngIf=\"showFilter && showFornecedor\" (click)=\"clickFornecedor()\">\n              <div class=\"float-left\">{{fornecedor.codigo + \" - \" + fornecedor.nome}}\n              </div>\n              <div class=\"\">\n                <i class=\"material-icons\">update</i>\n              </div>\n            </div>\n            <ul class=\"right hide-on-med-and-down\">\n                <li>\n                    <ul class=\"collapsible collapsible-user-header\">\n                        <li>\n                          <div class=\"collapsible-header collapsible-user\">\n                            <i class=\"material-icons\">account_circle</i>\n                            {{usuarioLogado}}\n                            </div>\n                        </li>\n                      </ul>\n                   \n                </li>\n                <li class=\"li-logout\">\n                  <a class=\"waves-effect waves-block waves-light chat-collapse\" (click)=\"logout()\">\n                    <i class=\"material-icons\">exit_to_app</i>\n                  </a>\n                </li>\n\n            </ul>\n            <!-- translation-button -->\n            <ul id=\"translation-dropdown\" class=\"dropdown-content\">\n              <li>\n                <a href=\"#!\" class=\"grey-text text-darken-1\">\n                  <i class=\"flag-icon flag-icon-gb\"></i> English</a>\n              </li>\n              <li>\n                <a href=\"#!\" class=\"grey-text text-darken-1\">\n                  <i class=\"flag-icon flag-icon-fr\"></i> French</a>\n              </li>\n              <li>\n                <a href=\"#!\" class=\"grey-text text-darken-1\">\n                  <i class=\"flag-icon flag-icon-cn\"></i> Chinese</a>\n              </li>\n              <li>\n                <a href=\"#!\" class=\"grey-text text-darken-1\">\n                  <i class=\"flag-icon flag-icon-de\"></i> German</a>\n              </li>\n            </ul>\n            <!-- notifications-dropdown -->\n            <ul id=\"notifications-dropdown\" class=\"dropdown-content\">\n              <li>\n                <h6>NOTIFICATIONS\n                  <span class=\"new badge\">5</span>\n                </h6>\n              </li>\n              <li class=\"divider\"></li>\n              <li>\n                <a href=\"#!\" class=\"grey-text text-darken-2\">\n                  <span class=\"material-icons icon-bg-circle cyan small\">add_shopping_cart</span> A new order has been placed!</a>\n                <time class=\"media-meta\" datetime=\"2015-06-12T20:50:48+08:00\">2 hours ago</time>\n              </li>\n              <li>\n                <a href=\"#!\" class=\"grey-text text-darken-2\">\n                  <span class=\"material-icons icon-bg-circle red small\">stars</span> Completed the task</a>\n                <time class=\"media-meta\" datetime=\"2015-06-12T20:50:48+08:00\">3 days ago</time>\n              </li>\n              <li>\n                <a href=\"#!\" class=\"grey-text text-darken-2\">\n                  <span class=\"material-icons icon-bg-circle teal small\">settings</span> Settings updated</a>\n                <time class=\"media-meta\" datetime=\"2015-06-12T20:50:48+08:00\">4 days ago</time>\n              </li>\n              <li>\n                <a href=\"#!\" class=\"grey-text text-darken-2\">\n                  <span class=\"material-icons icon-bg-circle deep-orange small\">today</span> Director meeting started</a>\n                <time class=\"media-meta\" datetime=\"2015-06-12T20:50:48+08:00\">6 days ago</time>\n              </li>\n              <li>\n                <a href=\"#!\" class=\"grey-text text-darken-2\">\n                  <span class=\"material-icons icon-bg-circle amber small\">trending_up</span> Generate monthly report</a>\n                <time class=\"media-meta\" datetime=\"2015-06-12T20:50:48+08:00\">1 week ago</time>\n              </li>\n            </ul>\n            <!-- profile-dropdown -->\n            <ul id=\"profile-dropdown\" class=\"dropdown-content\">\n              <li>\n                <a href=\"#\" class=\"grey-text text-darken-1\">\n                  <i class=\"material-icons\">face</i> Profile</a>\n              </li>\n              <li>\n                <a href=\"#\" class=\"grey-text text-darken-1\">\n                  <i class=\"material-icons\">settings</i> Settings</a>\n              </li>\n              <li>\n                <a href=\"#\" class=\"grey-text text-darken-1\">\n                  <i class=\"material-icons\">live_help</i> Help</a>\n              </li>\n              <li class=\"divider\"></li>\n              <li>\n                <a href=\"#\" class=\"grey-text text-darken-1\">\n                  <i class=\"material-icons\">lock_outline</i> Lock</a>\n              </li>\n              <li>\n                <a href=\"#\" class=\"grey-text text-darken-1\">\n                  <i class=\"material-icons\">keyboard_tab</i> Logout</a>\n              </li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </nav>\n  </div>\n</header>",
                        styles: [".title-app{float:left;margin-left:31%;list-style-type:none;font-size:22px}.title-app-unchecked{float:left;margin-left:20%;list-style-type:none;font-size:12px}.margin-top-fornecedor{margin-left:15%!important}.user-info{float:left;margin-left:23%;text-align:center}.float-left{float:left;font-size:11px;font-weight:900;padding-right:11px}.float-right{float:right}.span-usuario{font-size:11px;font-weight:900;margin-right:30px;margin-left:30px}.li-logout{background:#b80120}.li-usuario{background:#e73823}.collapsible-user{padding:inherit;line-height:inherit;padding-right:21px;padding-left:21px}.collapsible-user-header{border-bottom:inherit;border-top:inherit}"]
                    }] }
        ];
        /** @nocollapse */
        HeaderComponent.ctorParameters = function () { return []; };
        HeaderComponent.propDecorators = {
            menu: [{ type: core.Input }],
            fornecedores: [{ type: core.Output }]
        };
        return HeaderComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var HeaderModule = (function () {
        function HeaderModule() {
        }
        HeaderModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule
                        ],
                        declarations: [HeaderComponent],
                        exports: [
                            HeaderComponent
                        ]
                    },] }
        ];
        return HeaderModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.HeaderModule = HeaderModule;
    exports.ɵa = HeaderComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHh0LWNvbXBvbmVudC51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL3B4dC1jb21wb25lbnQvc3JjL2FwcC9tb2R1bGVzL2hlYWRlci9oZWFkZXIuY29tcG9uZW50LnRzIiwibmc6Ly9weHQtY29tcG9uZW50L3NyYy9hcHAvbW9kdWxlcy9oZWFkZXIvaGVhZGVyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT3V0cHV0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSwgTmF2aWdhdGlvbkVuZCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1oZWFkZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vaGVhZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vaGVhZGVyLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBIZWFkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBtZW51OiBhbnk7XG4gIEBPdXRwdXQoKSBmb3JuZWNlZG9yZXM6IGFueTtcbiAgZm9ybmVjZWRvcjogYW55ID0geyBjb2RpZ286IDAsIG5vbWU6IFwiXCIgfTtcbiAgc2JDb25maXJtYXRpb24gPSBuZXcgU3ViamVjdCgpO1xuICBtZW51Um91dGUgPSBcIlwiO1xuICBtZW51QWN0aW9uID0gXCJcIjtcbiAgc2hvd0ZpbHRlciA9IGZhbHNlO1xuICBzaG93Rm9ybmVjZWRvciA9IGZhbHNlO1xuICB1c3VhcmlvTG9nYWRvID0gXCJcIjtcbiAgaXNNZW51QWN0aW9uICA9IHRydWU7XG4gIHN0ckFjdGlvbiA9IFwiXCI7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuICBjbGlja0Zvcm5lY2Vkb3IoKXt9XG4gIGxvZ291dCgpIHtcbiAgIC8vIHRoaXMub3BlbkRpYWxvZyhcIkNvbmZpcm1hw4PCp8ODwqNvIGRlIExvZ291dFwiLCBcIkRlc2VqYSBzYWlyIGRvIFNpc3RlbWEgZGUgR2VzdMODwqNvIGRlIEVzdG9xdWU/XCIpXG4gIH1cblxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vaGVhZGVyLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbSGVhZGVyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1xuICAgIEhlYWRlckNvbXBvbmVudCAvLyA8LS0gdGhpcyFcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBIZWFkZXJNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsiU3ViamVjdCIsIkNvbXBvbmVudCIsIklucHV0IiwiT3V0cHV0IiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtRQXNCRTs4QkFWa0IsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7a0NBQ3hCLElBQUlBLFlBQU8sRUFBRTs2QkFDbEIsRUFBRTs4QkFDRCxFQUFFOzhCQUNGLEtBQUs7a0NBQ0QsS0FBSztpQ0FDTixFQUFFO2dDQUNGLElBQUk7NkJBQ1IsRUFBRTtTQUVHOzs7O1FBRWpCLGtDQUFROzs7WUFBUjthQUNDOzs7O1FBQ0QseUNBQWU7OztZQUFmLGVBQW1COzs7O1FBQ25CLGdDQUFNOzs7WUFBTjs7YUFFQzs7b0JBekJGQyxjQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLFlBQVk7d0JBQ3RCLGdyTEFBc0M7O3FCQUV2Qzs7Ozs7MkJBRUVDLFVBQUs7bUNBQ0xDLFdBQU07OzhCQVhUOzs7Ozs7O0FDQUE7Ozs7b0JBSUNDLGFBQVEsU0FBQzt3QkFDUixPQUFPLEVBQUU7NEJBQ1BDLG1CQUFZO3lCQUNiO3dCQUNELFlBQVksRUFBRSxDQUFDLGVBQWUsQ0FBQzt3QkFDL0IsT0FBTyxFQUFFOzRCQUNQLGVBQWU7eUJBQ2hCO3FCQUNGOzsyQkFaRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9