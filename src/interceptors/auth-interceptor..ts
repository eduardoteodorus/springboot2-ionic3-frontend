import { API_CONFIG } from './../config/api.config';
import { StorageService } from './../services/storage.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private storage: StorageService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let localUser = this.storage.getLocalUser();

        let size = API_CONFIG.baseUrl.length;
        let isRequestToAPI = req.url.substring(0, size) == API_CONFIG.baseUrl;

        if (localUser && isRequestToAPI) {
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
            return next.handle(authReq);
        } else {
            return next.handle(req);  
        }            
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};