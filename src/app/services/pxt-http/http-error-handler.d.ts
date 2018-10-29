import { HttpErrorResponse } from "@angular/common/http";
import { ErrorService } from './error.service';
import { Observable } from 'rxjs';
export declare type HandleError = <T>(operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;
/** Handles HttpClient errors */
export declare class HttpErrorHandler {
    private errorService;
    constructor(errorService: ErrorService);
    /** Create handleError function that already knows the service name */
    createHandleError: (serviceName?: string) => <T>(operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;
    /**
     * @param serviceName: name of the data service
     * @param operation: name of the failed operation
     * @param result: optional value to return as the observable result
     */
    handleError<T>(serviceName?: string, operation?: string, result?: T): (error: HttpErrorResponse) => Observable<T>;
}
