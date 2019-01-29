import { StorageService } from './../services/storage.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private storage: StorageService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(req)
           .catch((error, caught) => {
               let errorObj = error;

               if (errorObj.error) {
                   errorObj = errorObj.error;
               }

               //se erro vier em forma de string, faz um parse para um obj json
               if (!errorObj.status) {
                   errorObj = JSON.parse(errorObj);
               }

               console.log("Erro capturado pelo interceptor:");
               console.log(errorObj);

               switch(errorObj.status) {
                   case 403:
                   this.handle403();
                   break;
               }
               
               return Observable.throw(errorObj);
           }) as any;
    }

    handle403(){
        this.storage.setLocalUser(null);
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};