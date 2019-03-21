import { AuthService } from './../../Services/auth.service';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorResponse } from 'src/app/Models/Payload/Responses/ErrorResponse';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor
{
   constructor(private authService:AuthService)
   { }

   
   intercept(request:HttpRequest<any>, handler:HttpHandler): Observable<HttpEvent<any>>
   {
      return handler.handle(request).pipe(

         // Catch Http errors
         catchError(error => {

            // Logout if http status code 401 response is returned
            if(error.status === 401) {
               this.authService.logout();
               location.reload(true);
            }

            const errorResponse:ErrorResponse = {
               httpStatus: error.status,
               success: error.error.success,
               message: error.error.message
            };

            return throwError(errorResponse);
            
         })
      )
   }
}
