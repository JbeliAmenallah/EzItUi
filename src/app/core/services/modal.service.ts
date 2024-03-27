import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private isOpen = new BehaviorSubject<boolean>(false);

  openModal(): void {
    this.isOpen.next(true);
  }

  closeModal(): void {
    this.isOpen.next(false);
  }

  getModalState(): Observable<boolean> {
    return this.isOpen.asObservable();
  }


}