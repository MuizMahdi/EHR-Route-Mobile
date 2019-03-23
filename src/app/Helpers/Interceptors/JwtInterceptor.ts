import { HttpRequest, HttpInterceptor, HttpEvent, HttpHandler } from '@angular/common/http';
import { AuthService } from './../../Services/auth.service';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Toast } from '@ionic-native/toast/ngx';


@Injectable()
export class JwtInterceptor implements HttpInterceptor
{
   constructor(private authService: AuthService)
   { }


   // Adds the saved JsonWebToken (JWT) to the Authorization header of all requests
   intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>>
   {
      // Get the token from local storage
      let Jwt = localStorage.getItem('accessToken');

      // If it exists
      if (Jwt) 
      {
         // Clone the request and set its authorization header with the token
         request = request.clone({
            setHeaders: {
               Authorization: "Bearer " + Jwt
            }
         });
      }

      // Handle the request and move into next interceptor if available
      return handler.handle(request); 
   }
}