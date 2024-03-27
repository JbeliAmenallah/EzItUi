// import { HTTP_INTERCEPTORS, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import {
//     HttpInterceptor,
//     HttpHandler,
//     HttpRequest,
// } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { tap, catchError } from 'rxjs/operators';
// import { TokenStorageService } from '../auth/token-storage.service';
// const TOKEN_HEADER_KEY = 'Authorization';
// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//     constructor(private token: TokenStorageService) {}
//     intercept(
//         req: HttpRequest<any>,
//         next: HttpHandler
//     ): Observable<HttpEvent<any>> {
//         let authReq = req;
//         const token = this.token.getToken();
//         console.log(token);
//         if (token != null) {
//             authReq = req.clone({
//                 headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token),
//             });
//         }
//         return next.handle(authReq).pipe(

//             //console.log('pipe')
//             //if (evt instanceof HttpResponse) {
//             //console.log("erreurResponse")
//             // if (evt.body && evt.body.success)
//             //   this.toasterService.success(
//             //     evt.body.success.message,
//             //     evt.body.success.title,
//             //     { positionClass: 'toast-bottom-center' }
//             //   );
//             //}

//             catchError((err: any) => {
//                 if (err instanceof HttpErrorResponse) {
//                     try {
//                         console.log("error1");
//                     } catch (e) {
//                         console.log("error2");
//                     }
//                     //log error
//                 }
//                 return of(err);
//             })
//         );
//     }
// }
// export const authInterceptorProviders = [
//     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
// ];




import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenStorageService } from '../auth/token-storage.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private token: TokenStorageService) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.token.getToken();

        if (token != null) {
            authReq = req.clone({
                headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token),
            });
        }

        return next.handle(authReq).pipe(
            catchError((error: any) => {
                if (error instanceof HttpErrorResponse && error.status === 400) {
                    console.error('Error Message:', error.error.message);
                    // Handle the error message display here (e.g., show an alert or update a variable to display in the template)
                } else {
                    console.error('An error occurred:', error);
                }
                return throwError(error); // Rethrow the error to propagate it to the component
            })
        );
    }
}

export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
