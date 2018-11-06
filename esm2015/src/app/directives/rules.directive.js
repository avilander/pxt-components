/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Input, ElementRef } from '@angular/core';
import { pxtConfiguration } from "../models/pxtConfiguration";
import jwt_decode from 'jwt-decode';
import { UserService } from '../services/user.service';
export class RulesDirective {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        debugger;
        /** @type {?} */
        let permissoes = this.getRules();
        this.el.nativeElement.style.display = permissoes.includes(this.rule) ? '' : 'none';
    }
    /**
     * @return {?}
     */
    getRules() {
        /** @type {?} */
        var tokenAuthorities = localStorage.getItem(pxtConfiguration.systemId + pxtConfiguration.systemPrex + UserService.getUsuarioLogado().login);
        if (tokenAuthorities !== null) {
            /** @type {?} */
            const authority = /** @type {?} */ (jwt_decode(tokenAuthorities));
            /** @type {?} */
            let permissoes = authority.authorities;
            return permissoes;
        }
        return [];
    }
}
RulesDirective.decorators = [
    { type: Directive, args: [{
                selector: '[isUserInRule]'
            },] }
];
/** @nocollapse */
RulesDirective.ctorParameters = () => [
    { type: ElementRef }
];
RulesDirective.propDecorators = {
    rule: [{ type: Input, args: ['isUserInRule',] }]
};
if (false) {
    /** @type {?} */
    RulesDirective.prototype.rule;
    /** @type {?} */
    RulesDirective.prototype.el;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZXMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9kaXJlY3RpdmVzL3J1bGVzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzlELE9BQU8sVUFBVSxNQUFNLFlBQVksQ0FBQztBQUNwQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFLdkQsTUFBTTs7OztJQUlKLFlBQW1CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO0tBQUs7Ozs7SUFFdEMsZUFBZTtRQUNiLFFBQVEsQ0FBQTs7UUFDUixJQUFJLFVBQVUsR0FBYSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7S0FDcEY7Ozs7SUFFTyxRQUFROztRQUNkLElBQUksZ0JBQWdCLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEdBQUcsZ0JBQWdCLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdJLEVBQUUsQ0FBQSxDQUFDLGdCQUFnQixLQUFLLElBQUksQ0FBQyxDQUFBLENBQUM7O1lBQzdCLE1BQU0sU0FBUyxxQkFBUSxVQUFVLENBQUMsZ0JBQWdCLENBQUMsRUFBQzs7WUFDcEQsSUFBSSxVQUFVLEdBQWEsU0FBUyxDQUFDLFdBQVcsQ0FBQztZQUNqRCxNQUFNLENBQUMsVUFBVSxDQUFDO1NBQ2xCO1FBQ0QsTUFBTSxDQUFDLEVBQUUsQ0FBQzs7OztZQXRCWixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjthQUMzQjs7OztZQVAwQixVQUFVOzs7bUJBVWxDLEtBQUssU0FBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcHh0Q29uZmlndXJhdGlvbiB9IGZyb20gXCIuLi9tb2RlbHMvcHh0Q29uZmlndXJhdGlvblwiO1xuaW1wb3J0IGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3VzZXIuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tpc1VzZXJJblJ1bGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBSdWxlc0RpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCdpc1VzZXJJblJ1bGUnKSBydWxlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgZGVidWdnZXJcbiAgICBsZXQgcGVybWlzc29lczogc3RyaW5nW10gPSB0aGlzLmdldFJ1bGVzKCk7XG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBwZXJtaXNzb2VzLmluY2x1ZGVzKHRoaXMucnVsZSkgPyAnJyA6ICdub25lJztcbiAgfVxuXG4gIHB1YmxpYyAgZ2V0UnVsZXMoKTogc3RyaW5nW10ge1xuICAgIHZhciB0b2tlbkF1dGhvcml0aWVzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0ocHh0Q29uZmlndXJhdGlvbi5zeXN0ZW1JZCArIHB4dENvbmZpZ3VyYXRpb24uc3lzdGVtUHJleCArIFVzZXJTZXJ2aWNlLmdldFVzdWFyaW9Mb2dhZG8oKS5sb2dpbik7XG4gICBpZih0b2tlbkF1dGhvcml0aWVzICE9PSBudWxsKXtcbiAgICBjb25zdCBhdXRob3JpdHkgPSA8YW55Pmp3dF9kZWNvZGUodG9rZW5BdXRob3JpdGllcyk7XG4gICAgbGV0IHBlcm1pc3NvZXM6IHN0cmluZ1tdID0gYXV0aG9yaXR5LmF1dGhvcml0aWVzO1xuICAgIHJldHVybiBwZXJtaXNzb2VzO1xuICAgfVxuICAgcmV0dXJuIFtdO1xuICAgIFxuICB9XG59XG4iXX0=