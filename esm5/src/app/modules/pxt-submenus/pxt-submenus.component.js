/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Output, Input, EventEmitter } from '@angular/core';
import { PxtButton } from './model/pxt-submenus.model';
import { OptionsSubmenu } from './enum/option-submenu.enum';
import { PxtAppComponentService } from '../../services/pxt-app-components.service';
import { RequestBaseService } from '../../services/pxt-http/request-base.service';
import { HttpHelperService } from '../../services/pxt-http/http-helper-service';
import { ControllerPipe } from '../../pipes/controller.pipe';
import { ToastrService } from 'ngx-toastr';
/**
 * @template T
 */
var PxtSubmenusComponent = /** @class */ (function () {
    function PxtSubmenusComponent(_pxtAppService, _serviceBase, helper, notificationService) {
        var _this = this;
        this._pxtAppService = _pxtAppService;
        this._serviceBase = _serviceBase;
        this.helper = helper;
        this.notificationService = notificationService;
        this.model = /** @type {?} */ ({});
        this.urlService = "";
        this.listing = new EventEmitter();
        this.callbackSave = new EventEmitter();
        this.callbackDelete = new EventEmitter();
        this.cols = 3;
        this.colspan = 1;
        this.buttons = [];
        this.enableSave = true;
        this.enableBack = true;
        this.enableClear = true;
        this.enableSearch = true;
        this.enableAdd = true;
        this.enableDelete = true;
        this.buttons.push(new PxtButton("keyboard_backspace", "VOLTAR", true, OptionsSubmenu.VOLTAR));
        this.buttons.push(new PxtButton("add", "SALVAR", true, OptionsSubmenu.SALVAR));
        this.buttons.push(new PxtButton("add", "NOVO", true, OptionsSubmenu.NOVO));
        this.buttons.push(new PxtButton("delete", "LIMPAR", true, OptionsSubmenu.LIMPAR));
        this.buttons.push(new PxtButton("search", "PESQUISAR", true, OptionsSubmenu.PESQUISAR));
        this.buttons.push(new PxtButton("delete", "EXCLUIR", true, OptionsSubmenu.EXCLUIR));
        setTimeout(function () {
            debugger;
            _this.urlService = helper.getApi() + new ControllerPipe().transform(_this.model.constructor.name);
            _this._serviceBase.urlServiceAuto = _this.urlService;
        }, 100);
    }
    /**
     * @return {?}
     */
    PxtSubmenusComponent.prototype.save = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.validationModel()) {
            this._serviceBase.save(this.model).subscribe(function (result) {
                _this.callbackSave.emit(result);
            });
        }
    };
    ;
    /**
     * @return {?}
     */
    PxtSubmenusComponent.prototype.search = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._serviceBase.load().subscribe(function (result) {
            _this.listing.emit(result);
        });
    };
    ;
    /**
     * @param {?} id
     * @return {?}
     */
    PxtSubmenusComponent.prototype.delete = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        var _this = this;
        this._serviceBase.delete(id).subscribe(function (result) {
            _this.callbackDelete.emit(result);
        });
    };
    ;
    /**
     * @return {?}
     */
    PxtSubmenusComponent.prototype.clear = /**
     * @return {?}
     */
    function () {
        this.model = /** @type {?} */ ({});
    };
    ;
    /**
     * @return {?}
     */
    PxtSubmenusComponent.prototype.add = /**
     * @return {?}
     */
    function () {
        throw new Error("Method 'add()' not implemented.");
    };
    ;
    /**
     * @return {?}
     */
    PxtSubmenusComponent.prototype.back = /**
     * @return {?}
     */
    function () {
        throw new Error("Method 'back()' not implemented.");
    };
    ;
    /**
     * @return {?}
     */
    PxtSubmenusComponent.prototype.validationModel = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (Object.keys(this.model).length > 0) {
            Object.keys(this.model).forEach(function (key) {
                if (_this.model[key] != undefined && _this.model[key] != "") {
                    _this.notificationService.error("Campo Obrigatório", key.toString().toLocaleUpperCase());
                    return false;
                }
            });
            return true;
        }
        else {
            debugger;
            this.notificationService.warning("Nenhum campo preenchido.", "Aviso!");
            return false;
        }
    };
    ;
    PxtSubmenusComponent.decorators = [
        { type: Component, args: [{
                    selector: 'pxt-submenus',
                    template: "<mat-toolbar color=\"primary\">\n  <a (click)=\"back()\" mat-button *ngIf=\"enableBack\">\n    <mat-icon>{{buttons[0].icon}}</mat-icon> {{buttons[0].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"save()\" mat-button *ngIf=\"enableSave\">\n    <mat-icon>{{buttons[1].icon}}</mat-icon> {{buttons[1].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"add()\" mat-button *ngIf=\"enableAdd\">\n    <mat-icon>{{buttons[2].icon}}</mat-icon> {{buttons[2].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"clear()\" mat-button *ngIf=\"enableClear\">\n    <mat-icon>{{buttons[3].icon}}</mat-icon> {{buttons[3].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"search()\" mat-button *ngIf=\"enableSearch\">\n    <mat-icon>{{buttons[4].icon}}</mat-icon> {{buttons[4].menu | uppercaseFirst}}\n  </a>\n  <a (click)=\"delete(0)\" mat-button *ngIf=\"enableDelete\">\n      <mat-icon>{{buttons[5].icon}}</mat-icon> {{buttons[5].menu | uppercaseFirst}}\n  </a>\n  <ng-content></ng-content>\n</mat-toolbar>",
                    styles: [".btn-input-file{position:absolute;right:0;bottom:0}"]
                }] }
    ];
    /** @nocollapse */
    PxtSubmenusComponent.ctorParameters = function () { return [
        { type: PxtAppComponentService },
        { type: RequestBaseService },
        { type: HttpHelperService },
        { type: ToastrService }
    ]; };
    PxtSubmenusComponent.propDecorators = {
        model: [{ type: Input }],
        listing: [{ type: Output }],
        callbackSave: [{ type: Output }],
        callbackDelete: [{ type: Output }],
        controller: [{ type: Input }]
    };
    return PxtSubmenusComponent;
}());
export { PxtSubmenusComponent };
if (false) {
    /** @type {?} */
    PxtSubmenusComponent.prototype.model;
    /** @type {?} */
    PxtSubmenusComponent.prototype.urlService;
    /** @type {?} */
    PxtSubmenusComponent.prototype.listing;
    /** @type {?} */
    PxtSubmenusComponent.prototype.callbackSave;
    /** @type {?} */
    PxtSubmenusComponent.prototype.callbackDelete;
    /** @type {?} */
    PxtSubmenusComponent.prototype.controller;
    /** @type {?} */
    PxtSubmenusComponent.prototype.cols;
    /** @type {?} */
    PxtSubmenusComponent.prototype.colspan;
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
    PxtSubmenusComponent.prototype.enableDelete;
    /** @type {?} */
    PxtSubmenusComponent.prototype._pxtAppService;
    /** @type {?} */
    PxtSubmenusComponent.prototype._serviceBase;
    /** @type {?} */
    PxtSubmenusComponent.prototype.helper;
    /** @type {?} */
    PxtSubmenusComponent.prototype.notificationService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHh0LXN1Ym1lbnVzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9weHQtc3VibWVudXMvcHh0LXN1Ym1lbnVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBdUMsTUFBTSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUcsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNuRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUVsRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUVoRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQzs7Ozs7SUFzRHpDLDhCQUFtQixjQUFzQyxFQUNoRCxjQUNBLFFBQ0E7UUFIVCxpQkFnQkM7UUFoQmtCLG1CQUFjLEdBQWQsY0FBYyxDQUF3QjtRQUNoRCxpQkFBWSxHQUFaLFlBQVk7UUFDWixXQUFNLEdBQU4sTUFBTTtRQUNOLHdCQUFtQixHQUFuQixtQkFBbUI7dUNBL0NQLEVBQU87MEJBQ1AsRUFBRTt1QkFFZ0IsSUFBSSxZQUFZLEVBQUU7NEJBQ2IsSUFBSSxZQUFZLEVBQUU7OEJBQ2hCLElBQUksWUFBWSxFQUFFO29CQTZCekQsQ0FBQzt1QkFDRSxDQUFDO3VCQUNZLEVBQUU7MEJBQ1osSUFBSTswQkFDSixJQUFJOzJCQUNILElBQUk7NEJBQ0gsSUFBSTt5QkFDUCxJQUFJOzRCQUNELElBQUk7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LGlCQWNDO1FBYkMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztnQkFDakMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxTQUFTLElBQUksS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUMxRCxLQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLG1CQUFtQixFQUFFLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7b0JBQ3hGLE1BQU0sQ0FBQyxLQUFLLENBQUM7aUJBQ2Q7YUFDRixDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2I7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLFFBQVEsQ0FBQztZQUNULElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsMEJBQTBCLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDdkUsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUNkO0tBQ0Y7SUFBQSxDQUFDOztnQkFuRkgsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO29CQUN4QixpK0JBQTRDOztpQkFFN0M7Ozs7Z0JBYlEsc0JBQXNCO2dCQUN0QixrQkFBa0I7Z0JBRWxCLGlCQUFpQjtnQkFHakIsYUFBYTs7O3dCQVVuQixLQUFLOzBCQUdMLE1BQU07K0JBQ04sTUFBTTtpQ0FDTixNQUFNOzZCQUNOLEtBQUs7OytCQTFCUjs7U0FrQmEsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgT3V0cHV0LCBJbnB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQeHRCdXR0b24gfSBmcm9tICcuL21vZGVsL3B4dC1zdWJtZW51cy5tb2RlbCc7XG5pbXBvcnQgeyBPcHRpb25zU3VibWVudSB9IGZyb20gJy4vZW51bS9vcHRpb24tc3VibWVudS5lbnVtJztcbmltcG9ydCB7IFB4dENvbnRlbnRCb2R5IH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9weHQtY29udGVudC1ib2R5JztcbmltcG9ydCB7IFB4dEFwcENvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtYXBwLWNvbXBvbmVudHMuc2VydmljZSc7XG5pbXBvcnQgeyBSZXF1ZXN0QmFzZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9yZXF1ZXN0LWJhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL2h0dHAtaGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgVXBlcmNhc2VGaXJzdCB9IGZyb20gJy4uLy4uL3BpcGVzL3VwcGVyY2FzZS1maXJzdCc7XG5pbXBvcnQgeyBDb250cm9sbGVyUGlwZSB9IGZyb20gJy4uLy4uL3BpcGVzL2NvbnRyb2xsZXIucGlwZSc7XG5pbXBvcnQgeyBUb2FzdHJTZXJ2aWNlIH0gZnJvbSAnbmd4LXRvYXN0cic7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHh0LXN1Ym1lbnVzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3B4dC1zdWJtZW51cy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3B4dC1zdWJtZW51cy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHh0U3VibWVudXNDb21wb25lbnQ8VD4ge1xuXG4gIEBJbnB1dCgpIG1vZGVsPzogVCA9IHt9IGFzIFQ7XG4gIHByaXZhdGUgdXJsU2VydmljZSA9IFwiXCI7XG5cbiAgQE91dHB1dCgpIGxpc3Rpbmc6IEV2ZW50RW1pdHRlcjxUW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgY2FsbGJhY2tTYXZlOiBFdmVudEVtaXR0ZXI8VFtdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGNhbGxiYWNrRGVsZXRlOiBFdmVudEVtaXR0ZXI8VFtdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQElucHV0KCkgY29udHJvbGxlcj86IFN0cmluZztcblxuICBzYXZlKCkge1xuICAgIGlmICh0aGlzLnZhbGlkYXRpb25Nb2RlbCgpKSB7XG4gICAgICB0aGlzLl9zZXJ2aWNlQmFzZS5zYXZlKHRoaXMubW9kZWwpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICB0aGlzLmNhbGxiYWNrU2F2ZS5lbWl0KHJlc3VsdCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIHNlYXJjaCgpIHtcbiAgICB0aGlzLl9zZXJ2aWNlQmFzZS5sb2FkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICB0aGlzLmxpc3RpbmcuZW1pdChyZXN1bHQpO1xuICAgIH0pO1xuICB9O1xuICBkZWxldGUoaWQpIHtcbiAgICB0aGlzLl9zZXJ2aWNlQmFzZS5kZWxldGUoaWQpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgdGhpcy5jYWxsYmFja0RlbGV0ZS5lbWl0KHJlc3VsdCk7XG4gICAgfSk7XG4gIH07XG4gIGNsZWFyKCkge1xuICAgIHRoaXMubW9kZWwgPSB7fSBhcyBUO1xuICB9O1xuICBhZGQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kICdhZGQoKScgbm90IGltcGxlbWVudGVkLlwiKTtcbiAgfTtcbiAgYmFjaygpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2QgJ2JhY2soKScgbm90IGltcGxlbWVudGVkLlwiKTtcbiAgfTtcbiAgY29scyA9IDM7XG4gIGNvbHNwYW4gPSAxO1xuICBidXR0b25zOiBQeHRCdXR0b25bXSA9IFtdO1xuICBlbmFibGVTYXZlID0gdHJ1ZTtcbiAgZW5hYmxlQmFjayA9IHRydWU7XG4gIGVuYWJsZUNsZWFyID0gdHJ1ZTtcbiAgZW5hYmxlU2VhcmNoID0gdHJ1ZTtcbiAgZW5hYmxlQWRkID0gdHJ1ZTtcbiAgZW5hYmxlRGVsZXRlID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgX3B4dEFwcFNlcnZpY2U6IFB4dEFwcENvbXBvbmVudFNlcnZpY2UsXG4gICAgcHVibGljIF9zZXJ2aWNlQmFzZTogUmVxdWVzdEJhc2VTZXJ2aWNlLFxuICAgIHB1YmxpYyBoZWxwZXI6IEh0dHBIZWxwZXJTZXJ2aWNlLFxuICAgIHB1YmxpYyBub3RpZmljYXRpb25TZXJ2aWNlOiBUb2FzdHJTZXJ2aWNlKSB7XG4gICAgdGhpcy5idXR0b25zLnB1c2gobmV3IFB4dEJ1dHRvbihcImtleWJvYXJkX2JhY2tzcGFjZVwiLCBcIlZPTFRBUlwiLCB0cnVlLCBPcHRpb25zU3VibWVudS5WT0xUQVIpKTtcbiAgICB0aGlzLmJ1dHRvbnMucHVzaChuZXcgUHh0QnV0dG9uKFwiYWRkXCIsIFwiU0FMVkFSXCIsIHRydWUsIE9wdGlvbnNTdWJtZW51LlNBTFZBUikpO1xuICAgIHRoaXMuYnV0dG9ucy5wdXNoKG5ldyBQeHRCdXR0b24oXCJhZGRcIiwgXCJOT1ZPXCIsIHRydWUsIE9wdGlvbnNTdWJtZW51Lk5PVk8pKTtcbiAgICB0aGlzLmJ1dHRvbnMucHVzaChuZXcgUHh0QnV0dG9uKFwiZGVsZXRlXCIsIFwiTElNUEFSXCIsIHRydWUsIE9wdGlvbnNTdWJtZW51LkxJTVBBUikpO1xuICAgIHRoaXMuYnV0dG9ucy5wdXNoKG5ldyBQeHRCdXR0b24oXCJzZWFyY2hcIiwgXCJQRVNRVUlTQVJcIiwgdHJ1ZSwgT3B0aW9uc1N1Ym1lbnUuUEVTUVVJU0FSKSk7XG4gICAgdGhpcy5idXR0b25zLnB1c2gobmV3IFB4dEJ1dHRvbihcImRlbGV0ZVwiLCBcIkVYQ0xVSVJcIiwgdHJ1ZSwgT3B0aW9uc1N1Ym1lbnUuRVhDTFVJUikpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBkZWJ1Z2dlcjtcbiAgICAgIHRoaXMudXJsU2VydmljZSA9IGhlbHBlci5nZXRBcGkoKSArIG5ldyBDb250cm9sbGVyUGlwZSgpLnRyYW5zZm9ybSh0aGlzLm1vZGVsLmNvbnN0cnVjdG9yLm5hbWUpO1xuICAgICAgdGhpcy5fc2VydmljZUJhc2UudXJsU2VydmljZUF1dG8gPSB0aGlzLnVybFNlcnZpY2U7XG4gICAgfSwgMTAwKTtcbiAgfVxuXG4gIHZhbGlkYXRpb25Nb2RlbCgpIHtcbiAgICBpZiAoT2JqZWN0LmtleXModGhpcy5tb2RlbCkubGVuZ3RoID4gMCkge1xuICAgICAgT2JqZWN0LmtleXModGhpcy5tb2RlbCkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBpZiAodGhpcy5tb2RlbFtrZXldICE9IHVuZGVmaW5lZCAmJiB0aGlzLm1vZGVsW2tleV0gIT0gXCJcIikge1xuICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihcIkNhbXBvIE9icmlnYXTDs3Jpb1wiLCBrZXkudG9TdHJpbmcoKS50b0xvY2FsZVVwcGVyQ2FzZSgpKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlYnVnZ2VyO1xuICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLndhcm5pbmcoXCJOZW5odW0gY2FtcG8gcHJlZW5jaGlkby5cIiwgXCJBdmlzbyFcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xufVxuIl19