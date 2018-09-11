/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialAngularModule } from '../material-angular/material-angular.module';
import { PxtSubmenusComponent } from './pxt-submenus.component';
import { RequestBaseService } from '../../services/pxt-http/request-base.service';
import { PxtHttpService } from '../../services/pxt-http/pxt-http.service';
import { HttpHelperService } from '../../services/pxt-http/HttpHelperService';
import { ConfigService } from '../../services/pxt-http/config.service';
var PxtSubmenusModule = /** @class */ (function () {
    function PxtSubmenusModule() {
    }
    PxtSubmenusModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MaterialAngularModule
                    ],
                    declarations: [PxtSubmenusComponent],
                    exports: [PxtSubmenusComponent],
                    providers: [PxtHttpService, RequestBaseService, HttpHelperService, ConfigService]
                },] }
    ];
    return PxtSubmenusModule;
}());
export { PxtSubmenusModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHh0LXN1Ym1lbnVzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3B4dC1zaGFyZWQtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9weHQtc3VibWVudXMvcHh0LXN1Ym1lbnVzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDcEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDbEYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQzs7Ozs7Z0JBQ3RFLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixxQkFBcUI7cUJBQ3RCO29CQUNELFlBQVksRUFBRSxDQUFDLG9CQUFvQixDQUFDO29CQUNwQyxPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztvQkFDL0IsU0FBUyxFQUFDLENBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFFLGlCQUFpQixFQUFFLGFBQWEsQ0FBQztpQkFDakY7OzRCQWhCRDs7U0FpQmEsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRlcmlhbEFuZ3VsYXJNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC1hbmd1bGFyL21hdGVyaWFsLWFuZ3VsYXIubW9kdWxlJztcbmltcG9ydCB7IFB4dFN1Ym1lbnVzQ29tcG9uZW50IH0gZnJvbSAnLi9weHQtc3VibWVudXMuY29tcG9uZW50JztcbmltcG9ydCB7IFJlcXVlc3RCYXNlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL3JlcXVlc3QtYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFB4dEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHh0LWh0dHAvcHh0LWh0dHAuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3B4dC1odHRwL0h0dHBIZWxwZXJTZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9weHQtaHR0cC9jb25maWcuc2VydmljZSc7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsQW5ndWxhck1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQeHRTdWJtZW51c0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQeHRTdWJtZW51c0NvbXBvbmVudF0sXG4gIHByb3ZpZGVyczpbUHh0SHR0cFNlcnZpY2UsIFJlcXVlc3RCYXNlU2VydmljZSwgSHR0cEhlbHBlclNlcnZpY2UsIENvbmZpZ1NlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIFB4dFN1Ym1lbnVzTW9kdWxlIHsgfVxuXG4iXX0=