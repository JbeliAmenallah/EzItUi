import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _notificationBadge: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _notificationList: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  notificationBadge$ = this._notificationBadge.asObservable();
  notificationList$ = this._notificationList.asObservable();

  constructor() {}

  incrementBadge() {
    this._notificationBadge.next(this._notificationBadge.value + 1);
  }

  addNotification(notification: string) {
    const currentList = this._notificationList.value;
    currentList.push(notification);
    this._notificationList.next(currentList);
  }
}
