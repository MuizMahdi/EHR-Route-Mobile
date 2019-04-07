import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, interval, Subject, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, first, startWith, switchMap } from 'rxjs/operators';
import { Notification } from 'src/app/Models/Payload/Responses/Notification';


@Injectable({
  providedIn: 'root'
})


export class NotificationService 
{
   notificationsGetUrl:string = environment.apiUrl + "/notifications/current-user";
   notificationUrl:string = environment.apiUrl + "/notifications/";

   // initialize notifications as BehaviorSubject with an empty array of type Notification
   notifications = new BehaviorSubject<Notification[]>([]);

   // Indicates the state of user notifications
   hasNotifications: Subject<boolean> = new Subject<boolean>();

   // The selected notification (null as default if none are selected)
   activeNotification:BehaviorSubject<Notification> = new BehaviorSubject(null);


   constructor(private http:HttpClient) 
   { }


   getUserNotifications(): Observable<any>
   {
      return this.http.get(this.notificationsGetUrl).pipe(

         catchError(error => {
            return throwError(error);
         })

      );
   }


   deleteNotification(notificationID:number): Observable<any>
   {
      return this.http.delete(this.notificationUrl + notificationID).pipe(first(),
      
         catchError(error => {
            return throwError(error);
         })

      );
   }


   public pollNotifications(): Observable<any>
   {
      // Get/Poll user notifications every 5 seconds
      return interval(5000).pipe(
         startWith(0),
         switchMap(() => this.getUserNotifications())
      );
   }


   public setNotifications(notifications:Notification[])
   {
      this.notifications.next(notifications);
   }


   public setHasNotifications(hasNotifications:boolean)
   {
      this.hasNotifications.next(hasNotifications);
   }


   public setActiveNotification(notification:Notification)
   {
      this.activeNotification.next(notification);
   }
}
