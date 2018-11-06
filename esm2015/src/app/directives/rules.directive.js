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
        setTimeout(() => {
            /** @type {?} */
            let permissoes = this.getRules();
            this.el.nativeElement.style.display = permissoes.includes(this.rule) ? '' : 'none';
        }, 200);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZXMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9kaXJlY3RpdmVzL3J1bGVzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzlELE9BQU8sVUFBVSxNQUFNLFlBQVksQ0FBQztBQUNwQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFLdkQsTUFBTTs7OztJQUlKLFlBQW1CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO0tBQUs7Ozs7SUFFdEMsZUFBZTtRQUNiLFVBQVUsQ0FBQyxHQUFHLEVBQUU7O1lBQ2QsSUFBSSxVQUFVLEdBQWEsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzNDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1NBQ3BGLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FFVDs7OztJQUVNLFFBQVE7O1FBQ2IsSUFBSSxnQkFBZ0IsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDLGdCQUFnQixFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUksRUFBRSxDQUFDLENBQUMsZ0JBQWdCLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQzs7WUFDOUIsTUFBTSxTQUFTLHFCQUFRLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFDOztZQUNwRCxJQUFJLFVBQVUsR0FBYSxTQUFTLENBQUMsV0FBVyxDQUFDO1lBQ2pELE1BQU0sQ0FBQyxVQUFVLENBQUM7U0FDbkI7UUFDRCxNQUFNLENBQUMsRUFBRSxDQUFDOzs7O1lBeEJiLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2FBQzNCOzs7O1lBUDBCLFVBQVU7OzttQkFVbEMsS0FBSyxTQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBweHRDb25maWd1cmF0aW9uIH0gZnJvbSBcIi4uL21vZGVscy9weHRDb25maWd1cmF0aW9uXCI7XG5pbXBvcnQgand0X2RlY29kZSBmcm9tICdqd3QtZGVjb2RlJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvdXNlci5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2lzVXNlckluUnVsZV0nXG59KVxuZXhwb3J0IGNsYXNzIFJ1bGVzRGlyZWN0aXZlIHtcblxuICBASW5wdXQoJ2lzVXNlckluUnVsZScpIHJ1bGU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYpIHsgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGxldCBwZXJtaXNzb2VzOiBzdHJpbmdbXSA9IHRoaXMuZ2V0UnVsZXMoKTtcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gcGVybWlzc29lcy5pbmNsdWRlcyh0aGlzLnJ1bGUpID8gJycgOiAnbm9uZSc7XG4gICAgfSwgMjAwKTtcblxuICB9XG5cbiAgcHVibGljIGdldFJ1bGVzKCk6IHN0cmluZ1tdIHtcbiAgICB2YXIgdG9rZW5BdXRob3JpdGllcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHB4dENvbmZpZ3VyYXRpb24uc3lzdGVtSWQgKyBweHRDb25maWd1cmF0aW9uLnN5c3RlbVByZXggKyBVc2VyU2VydmljZS5nZXRVc3VhcmlvTG9nYWRvKCkubG9naW4pO1xuICAgIGlmICh0b2tlbkF1dGhvcml0aWVzICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBhdXRob3JpdHkgPSA8YW55Pmp3dF9kZWNvZGUodG9rZW5BdXRob3JpdGllcyk7XG4gICAgICBsZXQgcGVybWlzc29lczogc3RyaW5nW10gPSBhdXRob3JpdHkuYXV0aG9yaXRpZXM7XG4gICAgICByZXR1cm4gcGVybWlzc29lcztcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9XG59XG4iXX0=