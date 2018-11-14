/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { HttpHelperService } from './services/pxt-http/http-helper-service';
import { AuthorityService } from './services/authority.service';
import { pxtAppConfig } from "./models/pxtConfiguration";
import { UserService } from './services/user.service';
import { MatDialog } from '@angular/material';
import { PxtDialogComponent } from './modules/pxt-dialog/pxt-dialog.component';
export class VisibleInRolesGuard {
    /**
     * @param {?} router
     * @param {?} httpHelper
     * @param {?} authorityService
     * @param {?} userService
     * @param {?} dialog
     * @param {?} urlHelper
     */
    constructor(router, httpHelper, authorityService, userService, dialog, urlHelper) {
        this.router = router;
        this.httpHelper = httpHelper;
        this.authorityService = authorityService;
        this.userService = userService;
        this.dialog = dialog;
        this.urlHelper = urlHelper;
    }
    /**
     * @param {?} next
     * @param {?} state
     * @return {?}
     */
    canActivate(next, state) {
        /** @type {?} */
        const token = localStorage.getItem('token');
        debugger;
        if (token !== 'undefined' && token !== '' && token !== null) {
            try {
                /** @type {?} */
                const decoded = /** @type {?} */ (jwt_decode(token));
                /** @type {?} */
                var tokenAuthorities = localStorage.getItem(pxtAppConfig.systemId + pxtAppConfig.systemPrex + decoded.user_name);
                if (tokenAuthorities === 'undefined' || tokenAuthorities === '' || tokenAuthorities === null) {
                    this.authorityService.buscarAuthorities(pxtAppConfig.systemId).subscribe(data => {
                        localStorage.setItem(pxtAppConfig.systemId + pxtAppConfig.systemPrex + decoded.user_name, data.authority);
                    });
                }
                else {
                    /** @type {?} */
                    const authority = jwt_decode(tokenAuthorities);
                    if (decoded.exp === undefined) {
                        return false;
                    }
                }
                this.userService.setUsuarioLogado(decoded.user_name); // envia username
                //----------------------------------------------------------------------------------------------------------------------
            }
            catch (err) {
                window.location.href = this.urlHelper.getFrontSgi() + "?erro=401&sistema=" + pxtAppConfig.systemPath;
                ;
                console.log(err);
                return false;
            }
        }
        else {
            window.location.href = this.urlHelper.getFrontSgi() + "?erro=401&sistema=" + pxtAppConfig.systemPath;
            return false;
        }
    }
    /**
     * @param {?} erro
     * @return {?}
     */
    openDialog(erro) {
        /** @type {?} */
        var contentDialog = "Você será redirecionado a tela de autenticação!";
        debugger;
        /** @type {?} */
        let dialogRef = this.dialog.open(PxtDialogComponent, {
            width: '600px',
            panelClass: 'pxt-dialog',
            data: { titleDialog: "Erro - " + erro, contentDialog: contentDialog }
        });
        dialogRef.afterClosed().subscribe(result => {
            //console.log(this.urlHelper.getFrontSgi());
            window.location.href = this.urlHelper.getFrontSgi() + "?erro=" + erro;
        });
    }
}
VisibleInRolesGuard.decorators = [
    { type: Injectable }
];
/** @nocollapse */
VisibleInRolesGuard.ctorParameters = () => [
    { type: Router },
    { type: HttpHelperService },
    { type: AuthorityService },
    { type: UserService },
    { type: MatDialog },
    { type: HttpHelperService }
];
if (false) {
    /** @type {?} */
    VisibleInRolesGuard.prototype.router;
    /** @type {?} */
    VisibleInRolesGuard.prototype.httpHelper;
    /** @type {?} */
    VisibleInRolesGuard.prototype.authorityService;
    /** @type {?} */
    VisibleInRolesGuard.prototype.userService;
    /** @type {?} */
    VisibleInRolesGuard.prototype.dialog;
    /** @type {?} */
    VisibleInRolesGuard.prototype.urlHelper;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaWJsZS1pbi1yb2xlcy5ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlzaWJsZS1pbi1yb2xlcy5ndWFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUE0RCxNQUFNLGlCQUFpQixDQUFDO0FBQ25HLE9BQU8sVUFBVSxNQUFNLFlBQVksQ0FBQztBQUVwQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUE7QUFDeEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUkvRSxNQUFNOzs7Ozs7Ozs7SUFDSixZQUFvQixNQUFjLEVBQ3hCLFlBQ0Esa0JBQ0EsYUFDQSxRQUNBO1FBTFUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUN4QixlQUFVLEdBQVYsVUFBVTtRQUNWLHFCQUFnQixHQUFoQixnQkFBZ0I7UUFDaEIsZ0JBQVcsR0FBWCxXQUFXO1FBQ1gsV0FBTSxHQUFOLE1BQU07UUFDTixjQUFTLEdBQVQsU0FBUztLQUF3Qjs7Ozs7O0lBQzNDLFdBQVcsQ0FBQyxJQUE0QixFQUN0QyxLQUEwQjs7UUFDMUIsTUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxRQUFRLENBQUM7UUFDVCxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssV0FBVyxJQUFJLEtBQUssS0FBSyxFQUFFLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDOztnQkFDSCxNQUFNLE9BQU8scUJBQVEsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFDOztnQkFDdkMsSUFBSSxnQkFBZ0IsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ2pILEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixLQUFLLFdBQVcsSUFBSSxnQkFBZ0IsS0FBSyxFQUFFLElBQUksZ0JBQWdCLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDN0YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7d0JBQzlFLFlBQVksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO3FCQUMxRyxDQUFDLENBQUM7aUJBQ0o7Z0JBRUQsSUFBSSxDQUFDLENBQUM7O29CQUNKLE1BQU0sU0FBUyxHQUFRLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUVwRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7d0JBQzlCLE1BQU0sQ0FBQyxLQUFLLENBQUM7cUJBQ2Q7aUJBQ0Y7Z0JBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7O2FBRXREO1lBQ0QsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ1gsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxvQkFBb0IsR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDO2dCQUFBLENBQUM7Z0JBQ3RHLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLE1BQU0sQ0FBQyxLQUFLLENBQUM7YUFDZDtTQUNGO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxHQUFHLG9CQUFvQixHQUFHLFlBQVksQ0FBQyxVQUFVLENBQUM7WUFDckcsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUNkO0tBQ0Y7Ozs7O0lBRUQsVUFBVSxDQUFDLElBQUk7O1FBQ2IsSUFBSSxhQUFhLEdBQUcsaURBQWlELENBQUE7UUFDckUsUUFBUSxDQUFBOztRQUNSLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQ25ELEtBQUssRUFBRSxPQUFPO1lBQ2QsVUFBVSxFQUFFLFlBQVk7WUFDeEIsSUFBSSxFQUFFLEVBQUUsV0FBVyxFQUFFLFNBQVMsR0FBRyxJQUFJLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRTtTQUN0RSxDQUFDLENBQUM7UUFDSCxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFOztZQUV6QyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDdkUsQ0FBQyxDQUFDO0tBQ0o7OztZQXZERixVQUFVOzs7O1lBWEYsTUFBTTtZQUdOLGlCQUFpQjtZQUNqQixnQkFBZ0I7WUFFaEIsV0FBVztZQUNYLFNBQVM7WUFKVCxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciwgQ2FuQWN0aXZhdGUsIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIFJvdXRlclN0YXRlU25hcHNob3QgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgand0X2RlY29kZSBmcm9tICdqd3QtZGVjb2RlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvcHh0LWh0dHAvaHR0cC1oZWxwZXItc2VydmljZSc7XHJcbmltcG9ydCB7IEF1dGhvcml0eVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2F1dGhvcml0eS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgcHh0QXBwQ29uZmlnIH0gZnJvbSBcIi4vbW9kZWxzL3B4dENvbmZpZ3VyYXRpb25cIlxyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvdXNlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBQeHREaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL21vZHVsZXMvcHh0LWRpYWxvZy9weHQtZGlhbG9nLmNvbXBvbmVudCc7XHJcblxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVmlzaWJsZUluUm9sZXNHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgcHJpdmF0ZSBodHRwSGVscGVyOiBIdHRwSGVscGVyU2VydmljZSxcclxuICAgIHByaXZhdGUgYXV0aG9yaXR5U2VydmljZTogQXV0aG9yaXR5U2VydmljZSxcclxuICAgIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZyxcclxuICAgIHByaXZhdGUgdXJsSGVscGVyOiBIdHRwSGVscGVyU2VydmljZSkgeyB9XHJcbiAgY2FuQWN0aXZhdGUobmV4dDogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCxcclxuICAgIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxib29sZWFuPiB8IFByb21pc2U8Ym9vbGVhbj4gfCBib29sZWFuIHtcclxuICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJyk7XHJcbiAgICBkZWJ1Z2dlcjtcclxuICAgIGlmICh0b2tlbiAhPT0gJ3VuZGVmaW5lZCcgJiYgdG9rZW4gIT09ICcnICYmIHRva2VuICE9PSBudWxsKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgZGVjb2RlZCA9IDxhbnk+and0X2RlY29kZSh0b2tlbik7XHJcbiAgICAgICAgdmFyIHRva2VuQXV0aG9yaXRpZXMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShweHRBcHBDb25maWcuc3lzdGVtSWQgKyBweHRBcHBDb25maWcuc3lzdGVtUHJleCArIGRlY29kZWQudXNlcl9uYW1lKTtcclxuICAgICAgICBpZiAodG9rZW5BdXRob3JpdGllcyA9PT0gJ3VuZGVmaW5lZCcgfHwgdG9rZW5BdXRob3JpdGllcyA9PT0gJycgfHwgdG9rZW5BdXRob3JpdGllcyA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgdGhpcy5hdXRob3JpdHlTZXJ2aWNlLmJ1c2NhckF1dGhvcml0aWVzKHB4dEFwcENvbmZpZy5zeXN0ZW1JZCkuc3Vic2NyaWJlKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShweHRBcHBDb25maWcuc3lzdGVtSWQgKyBweHRBcHBDb25maWcuc3lzdGVtUHJleCArIGRlY29kZWQudXNlcl9uYW1lLCBkYXRhLmF1dGhvcml0eSlcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IGF1dGhvcml0eTogYW55ID0gand0X2RlY29kZSh0b2tlbkF1dGhvcml0aWVzKTtcclxuXHJcbiAgICAgICAgICBpZiAoZGVjb2RlZC5leHAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXNlclNlcnZpY2Uuc2V0VXN1YXJpb0xvZ2FkbyhkZWNvZGVkLnVzZXJfbmFtZSk7IC8vIGVudmlhIHVzZXJuYW1lXHJcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgIH1cclxuICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy51cmxIZWxwZXIuZ2V0RnJvbnRTZ2koKSArIFwiP2Vycm89NDAxJnNpc3RlbWE9XCIgKyBweHRBcHBDb25maWcuc3lzdGVtUGF0aDs7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy51cmxIZWxwZXIuZ2V0RnJvbnRTZ2koKSArIFwiP2Vycm89NDAxJnNpc3RlbWE9XCIgKyBweHRBcHBDb25maWcuc3lzdGVtUGF0aDtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb3BlbkRpYWxvZyhlcnJvKSB7XHJcbiAgICB2YXIgY29udGVudERpYWxvZyA9IFwiVm9jw6ogc2Vyw6EgcmVkaXJlY2lvbmFkbyBhIHRlbGEgZGUgYXV0ZW50aWNhw6fDo28hXCJcclxuICAgIGRlYnVnZ2VyXHJcbiAgICBsZXQgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihQeHREaWFsb2dDb21wb25lbnQsIHtcclxuICAgICAgd2lkdGg6ICc2MDBweCcsXHJcbiAgICAgIHBhbmVsQ2xhc3M6ICdweHQtZGlhbG9nJyxcclxuICAgICAgZGF0YTogeyB0aXRsZURpYWxvZzogXCJFcnJvIC0gXCIgKyBlcnJvLCBjb250ZW50RGlhbG9nOiBjb250ZW50RGlhbG9nIH1cclxuICAgIH0pO1xyXG4gICAgZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgIC8vY29uc29sZS5sb2codGhpcy51cmxIZWxwZXIuZ2V0RnJvbnRTZ2koKSk7XHJcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy51cmxIZWxwZXIuZ2V0RnJvbnRTZ2koKSArIFwiP2Vycm89XCIgKyBlcnJvO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==