/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpHelperService } from '../services/pxt-http/http-helper-service';
import { PxtHttpService } from '../services/pxt-http/pxt-http.service';
import { pxtAppConfig } from "../models/pxtConfiguration";
import * as i0 from "@angular/core";
import * as i1 from "./pxt-http/pxt-http.service";
import * as i2 from "./pxt-http/http-helper-service";
var UserService = /** @class */ (function () {
    function UserService(httpService, helper) {
        this.httpService = httpService;
        this.helper = helper;
        this.path = 'usuarios';
        this.path = this.helper.getApiSgi() + this.path;
    }
    /**
     * @return {?}
     */
    UserService.prototype.logout = /**
     * @return {?}
     */
    function () {
        localStorage.clear();
        window.location.href = this.helper.getFrontSgi() + '?sistema=' + pxtAppConfig.systemPath;
    };
    /**
     * @return {?}
     */
    UserService.prototype.getUsuarioLogado = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var usuario = {};
        if (localStorage.getItem('USRLGD') !== null) {
            /** @type {?} */
            var usuarioBase64 = atob(localStorage.getItem('USRLGD'));
            usuario = JSON.parse(usuarioBase64);
        }
        else {
            localStorage.clear();
            window.location.href = this.helper.getFrontSgi() + '?sistema=' + pxtAppConfig.systemPath;
            /*
                  const decoded = <any>jwt_decode(localStorage.getItem('token'));
                  usuario.identificacaoAcesso = decoded.sub;
                  usuario.codigoPessoa = decoded.person_id;
                  */
        }
        return usuario;
    };
    /**
     * @param {?} username
     * @return {?}
     */
    UserService.prototype.setUsuarioLogado = /**
     * @param {?} username
     * @return {?}
     */
    function (username) {
        this.buscarPorIdentificacaoAcesso(username).subscribe(function (val) {
            /** @type {?} */
            var usuario = {};
            usuario = val;
            if (usuario === null) {
                usuario = {};
            }
            /** @type {?} */
            var usuarioBase64 = btoa(JSON.stringify(usuario));
            localStorage.setItem('USRLGD', usuarioBase64);
        });
    };
    /**
     * @param {?} identificacaoAcesso
     * @return {?}
     */
    UserService.prototype.buscarPorIdentificacaoAcesso = /**
     * @param {?} identificacaoAcesso
     * @return {?}
     */
    function (identificacaoAcesso) {
        return this.httpService.doGet(this.path + '/?identificador=' + identificacaoAcesso);
    };
    UserService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    UserService.ctorParameters = function () { return [
        { type: PxtHttpService },
        { type: HttpHelperService }
    ]; };
    /** @nocollapse */ UserService.ngInjectableDef = i0.defineInjectable({ factory: function UserService_Factory() { return new UserService(i0.inject(i1.PxtHttpService), i0.inject(i2.HttpHelperService)); }, token: UserService, providedIn: "root" });
    return UserService;
}());
export { UserService };
if (false) {
    /** @type {?} */
    UserService.prototype.path;
    /** @type {?} */
    UserService.prototype.httpService;
    /** @type {?} */
    UserService.prototype.helper;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHh0LXNoYXJlZC1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9zZXJ2aWNlcy91c2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBRXZFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7SUFTeEQscUJBQW9CLFdBQTJCLEVBQVUsTUFBeUI7UUFBOUQsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7b0JBRm5FLFVBQVU7UUFHdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7S0FDakQ7Ozs7SUFFRCw0QkFBTTs7O0lBQU47UUFDRSxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDckIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsR0FBRyxXQUFXLEdBQUcsWUFBWSxDQUFDLFVBQVUsQ0FBQztLQUMxRjs7OztJQUVPLHNDQUFnQjs7Ozs7UUFDdEIsSUFBSSxPQUFPLEdBQVEsRUFBRSxDQUFDO1FBQ3RCLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQzs7WUFDNUMsSUFBSSxhQUFhLEdBQVcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNqRSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNyQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3JCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEdBQUcsV0FBVyxHQUFHLFlBQVksQ0FBQyxVQUFVLENBQUM7Ozs7OztTQU0xRjtRQUNELE1BQU0sQ0FBQyxPQUFPLENBQUM7Ozs7OztJQUdqQixzQ0FBZ0I7Ozs7SUFBaEIsVUFBaUIsUUFBZ0I7UUFDL0IsSUFBSSxDQUFDLDRCQUE0QixDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUc7O1lBQ3ZELElBQUksT0FBTyxHQUFRLEVBQUUsQ0FBQztZQUN0QixPQUFPLEdBQUcsR0FBRyxDQUFDO1lBQ2QsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLE9BQU8sR0FBRyxFQUFFLENBQUM7YUFDZDs7WUFDRCxJQUFJLGFBQWEsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzFELFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1NBQy9DLENBQUMsQ0FBQztLQUNKOzs7OztJQUNELGtEQUE0Qjs7OztJQUE1QixVQUE2QixtQkFBMkI7UUFDdEQsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsa0JBQWtCLEdBQUcsbUJBQW1CLENBQUMsQ0FBQztLQUNyRjs7Z0JBOUNGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBTlEsY0FBYztnQkFEZCxpQkFBaUI7OztzQkFEMUI7O1NBU2EsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcHh0LWh0dHAvaHR0cC1oZWxwZXItc2VydmljZSc7XG5pbXBvcnQgeyBQeHRIdHRwU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3B4dC1odHRwL3B4dC1odHRwLnNlcnZpY2UnO1xuaW1wb3J0IGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XG5pbXBvcnQgeyBweHRBcHBDb25maWcgfSBmcm9tIFwiLi4vbW9kZWxzL3B4dENvbmZpZ3VyYXRpb25cIjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVXNlclNlcnZpY2Uge1xuXG4gIHByaXZhdGUgcGF0aCA9ICd1c3Vhcmlvcyc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwU2VydmljZTogUHh0SHR0cFNlcnZpY2UsIHByaXZhdGUgaGVscGVyOiBIdHRwSGVscGVyU2VydmljZSkge1xuICAgIHRoaXMucGF0aCA9IHRoaXMuaGVscGVyLmdldEFwaVNnaSgpICsgdGhpcy5wYXRoO1xuICB9XG5cbiAgbG9nb3V0KCkge1xuICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy5oZWxwZXIuZ2V0RnJvbnRTZ2koKSArICc/c2lzdGVtYT0nICsgcHh0QXBwQ29uZmlnLnN5c3RlbVBhdGg7XG4gIH1cblxuICBwdWJsaWMgIGdldFVzdWFyaW9Mb2dhZG8oKTogYW55IHtcbiAgICBsZXQgdXN1YXJpbzogYW55ID0ge307XG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdVU1JMR0QnKSAhPT0gbnVsbCkge1xuICAgICAgbGV0IHVzdWFyaW9CYXNlNjQ6IHN0cmluZyA9IGF0b2IobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1VTUkxHRCcpKTtcbiAgICAgIHVzdWFyaW8gPSBKU09OLnBhcnNlKHVzdWFyaW9CYXNlNjQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy5oZWxwZXIuZ2V0RnJvbnRTZ2koKSArICc/c2lzdGVtYT0nICsgcHh0QXBwQ29uZmlnLnN5c3RlbVBhdGg7XG4gICAgICAvKlxuICAgICAgY29uc3QgZGVjb2RlZCA9IDxhbnk+and0X2RlY29kZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSk7XG4gICAgICB1c3VhcmlvLmlkZW50aWZpY2FjYW9BY2Vzc28gPSBkZWNvZGVkLnN1YjtcbiAgICAgIHVzdWFyaW8uY29kaWdvUGVzc29hID0gZGVjb2RlZC5wZXJzb25faWQ7XG4gICAgICAqL1xuICAgIH1cbiAgICByZXR1cm4gdXN1YXJpbztcbiAgfVxuXG4gIHNldFVzdWFyaW9Mb2dhZG8odXNlcm5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuYnVzY2FyUG9ySWRlbnRpZmljYWNhb0FjZXNzbyh1c2VybmFtZSkuc3Vic2NyaWJlKHZhbCA9PiB7XG4gICAgICBsZXQgdXN1YXJpbzogYW55ID0ge307XG4gICAgICB1c3VhcmlvID0gdmFsO1xuICAgICAgaWYgKHVzdWFyaW8gPT09IG51bGwpIHtcbiAgICAgICAgdXN1YXJpbyA9IHt9O1xuICAgICAgfVxuICAgICAgbGV0IHVzdWFyaW9CYXNlNjQ6IHN0cmluZyA9IGJ0b2EoSlNPTi5zdHJpbmdpZnkodXN1YXJpbykpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ1VTUkxHRCcsIHVzdWFyaW9CYXNlNjQpO1xuICAgIH0pO1xuICB9XG4gIGJ1c2NhclBvcklkZW50aWZpY2FjYW9BY2Vzc28oaWRlbnRpZmljYWNhb0FjZXNzbzogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZG9HZXQodGhpcy5wYXRoICsgJy8/aWRlbnRpZmljYWRvcj0nICsgaWRlbnRpZmljYWNhb0FjZXNzbyk7XG4gIH1cbn1cbiJdfQ==