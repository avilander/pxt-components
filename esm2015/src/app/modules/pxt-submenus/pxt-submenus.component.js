/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { PxtButton } from './model/pxt-submenus.model';
import { OptionsSubmenu } from './enum/option-submenu.enum';
import { PxtAppComponentService } from '../../services/pxt-app-components.service';
export class PxtSubmenusComponent {
    /**
     * @param {?} _pxtAppService
     */
    constructor(_pxtAppService) {
        this._pxtAppService = _pxtAppService;
        this.buttons = [];
        this.enableSave = true;
        this.enableBack = true;
        this.enableClear = true;
        this.enableSearch = true;
        this.enableAdd = true;
        this.buttons.push(new PxtButton("keyboard_backspace", "VOLTAR", true, OptionsSubmenu.VOLTAR));
        this.buttons.push(new PxtButton("add", "SALVAR", true, OptionsSubmenu.SALVAR));
        this.buttons.push(new PxtButton("add", "NOVO", true, OptionsSubmenu.NOVO));
        this.buttons.push(new PxtButton("delete", "LIMPAR", true, OptionsSubmenu.LIMPAR));
        this.buttons.push(new PxtButton("search", "PESQUISAR", true, OptionsSubmenu.PESQUISAR));
    }
    /**
     * @param {?=} object
     * @return {?}
     */
    save(object) {
        throw new Error("Method not implemented.");
    }
    /**
     * @param {?=} object
     * @return {?}
     */
    search(object) {
        throw new Error("Method not implemented.");
    }
    /**
     * @param {?=} object
     * @return {?}
     */
    clear(object) {
        throw new Error("Method not implemented.");
    }
    /**
     * @param {?=} object
     * @return {?}
     */
    add(object) {
        throw new Error("Method not implemented.");
    }
    /**
     * @param {?=} object
     * @return {?}
     */
    back(object) {
        throw new Error("Method not implemented.");
    }
}
PxtSubmenusComponent.decorators = [
    { type: Component, args: [{
                selector: 'pxt-submenus',
                template: "<mat-toolbar color=\"primary\">\n  <a (click)=\"back()\" mat-button *ngIf=\"enableBack\">\n    <mat-icon>{{buttons[0].icon}}</mat-icon> {{buttons[0].menu}}\n  </a>\n  <a (click)=\"save()\" mat-button *ngIf=\"enableSave\">\n    <mat-icon>{{buttons[1].icon}}</mat-icon> {{buttons[1].menu}}\n  </a>\n  <a (click)=\"add()\" mat-button *ngIf=\"enableAdd\">\n    <mat-icon>{{buttons[2].icon}}</mat-icon> {{buttons[2].menu}}\n  </a>\n  <a (click)=\"clear()\" mat-button *ngIf=\"enableClear\">\n    <mat-icon>{{buttons[3].icon}}</mat-icon> {{buttons[3].menu}}\n  </a>\n  <a (click)=\"search()\" mat-button *ngIf=\"enableSearch\">\n    <mat-icon>{{buttons[4].icon}}</mat-icon> {{buttons[4].menu}}\n  </a>\n  <ng-content></ng-content>\n</mat-toolbar>",
                styles: [""]
            }] }
];
/** @nocollapse */
PxtSubmenusComponent.ctorParameters = () => [
    { type: PxtAppComponentService }
];
if (false) {
    /** @type {?} */
    PxtSubmenusComponent.prototype.buttons;
    /** @type {?} */
    PxtSubmenusComponent.prototype.enableSave;
    /** @type {?} */
    PxtSubmenusComponent.prototype.enableBack;
    /** @type {?} */
    PxtSubmenusComponent.prototype.enableClear;
    /** @type {?} */
    PxtSubmenusComponent.prototype.enableSearch;
    /** @type {?} */
    PxtSubmenusComponent.prototype.enableAdd;
    /** @type {?} */
    PxtSubmenusComponent.prototype._pxtAppService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHh0LXN1Ym1lbnVzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9weHQtc3VibWVudXMvcHh0LXN1Ym1lbnVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBdUMsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQU1uRixNQUFNOzs7O0lBeUJKLFlBQW1CLGNBQXNDO1FBQXRDLG1CQUFjLEdBQWQsY0FBYyxDQUF3Qjt1QkFSbEMsRUFBRTswQkFFWixJQUFJOzBCQUNKLElBQUk7MkJBQ0gsSUFBSTs0QkFDSCxJQUFJO3lCQUNQLElBQUk7UUFJZCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzlGLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQy9FLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0tBQ3pGOzs7OztJQTlCRCxJQUFJLENBQUMsTUFBWTtRQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztLQUM1Qzs7Ozs7SUFDRCxNQUFNLENBQUMsTUFBWTtRQUNqQixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7S0FDNUM7Ozs7O0lBQ0QsS0FBSyxDQUFDLE1BQVk7UUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0tBQzVDOzs7OztJQUNELEdBQUcsQ0FBQyxNQUFZO1FBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0tBQzVDOzs7OztJQUNELElBQUksQ0FBQyxNQUFZO1FBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0tBQzVDOzs7WUFyQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixndkJBQTRDOzthQUU3Qzs7OztZQUxRLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB4dEJ1dHRvbiB9IGZyb20gJy4vbW9kZWwvcHh0LXN1Ym1lbnVzLm1vZGVsJztcbmltcG9ydCB7IE9wdGlvbnNTdWJtZW51IH0gZnJvbSAnLi9lbnVtL29wdGlvbi1zdWJtZW51LmVudW0nO1xuaW1wb3J0IHsgUHh0Q29udGVudEJvZHkgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3B4dC1jb250ZW50LWJvZHknO1xuaW1wb3J0IHsgUHh0QXBwQ29tcG9uZW50U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1hcHAtY29tcG9uZW50cy5zZXJ2aWNlJztcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3B4dC1zdWJtZW51cycsXG4gIHRlbXBsYXRlVXJsOiAnLi9weHQtc3VibWVudXMuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9weHQtc3VibWVudXMuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFB4dFN1Ym1lbnVzQ29tcG9uZW50IHtcblxuICBzYXZlKG9iamVjdD86IGFueSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk1ldGhvZCBub3QgaW1wbGVtZW50ZWQuXCIpO1xuICB9XG4gIHNlYXJjaChvYmplY3Q/OiBhbnkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2Qgbm90IGltcGxlbWVudGVkLlwiKTtcbiAgfVxuICBjbGVhcihvYmplY3Q/OiBhbnkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2Qgbm90IGltcGxlbWVudGVkLlwiKTtcbiAgfVxuICBhZGQob2JqZWN0PzogYW55KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC5cIik7XG4gIH1cbiAgYmFjayhvYmplY3Q/OiBhbnkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2Qgbm90IGltcGxlbWVudGVkLlwiKTtcbiAgfVxuICBidXR0b25zOiBQeHRCdXR0b25bXSA9IFtdO1xuXG4gIGVuYWJsZVNhdmUgPSB0cnVlO1xuICBlbmFibGVCYWNrID0gdHJ1ZTtcbiAgZW5hYmxlQ2xlYXIgPSB0cnVlO1xuICBlbmFibGVTZWFyY2ggPSB0cnVlO1xuICBlbmFibGVBZGQgPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBfcHh0QXBwU2VydmljZTogUHh0QXBwQ29tcG9uZW50U2VydmljZVxuICApIHtcbiAgICB0aGlzLmJ1dHRvbnMucHVzaChuZXcgUHh0QnV0dG9uKFwia2V5Ym9hcmRfYmFja3NwYWNlXCIsIFwiVk9MVEFSXCIsIHRydWUsIE9wdGlvbnNTdWJtZW51LlZPTFRBUikpO1xuICAgIHRoaXMuYnV0dG9ucy5wdXNoKG5ldyBQeHRCdXR0b24oXCJhZGRcIiwgXCJTQUxWQVJcIiwgdHJ1ZSwgT3B0aW9uc1N1Ym1lbnUuU0FMVkFSKSk7XG4gICAgdGhpcy5idXR0b25zLnB1c2gobmV3IFB4dEJ1dHRvbihcImFkZFwiLCBcIk5PVk9cIiwgdHJ1ZSwgT3B0aW9uc1N1Ym1lbnUuTk9WTykpO1xuICAgIHRoaXMuYnV0dG9ucy5wdXNoKG5ldyBQeHRCdXR0b24oXCJkZWxldGVcIiwgXCJMSU1QQVJcIiwgdHJ1ZSwgT3B0aW9uc1N1Ym1lbnUuTElNUEFSKSk7XG4gICAgdGhpcy5idXR0b25zLnB1c2gobmV3IFB4dEJ1dHRvbihcInNlYXJjaFwiLCBcIlBFU1FVSVNBUlwiLCB0cnVlLCBPcHRpb25zU3VibWVudS5QRVNRVUlTQVIpKTtcbiAgfVxufVxuIl19