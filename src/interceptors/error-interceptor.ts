import { Observable } from 'rxjs/Rx';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
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
               
               return Observable.throw(errorObj);
           }) as any;
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};