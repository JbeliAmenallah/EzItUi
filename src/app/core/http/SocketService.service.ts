import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000'); // Connect to your Socket.io server
  }

  connect(userId: string) {
    this.socket.emit('userId', userId); // Send the user's ID to the server
  }

  listen(eventName: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }


  emitTyping(data: any) {
    this.socket.emit('typing', data);
  }

  emitStopTyping(data: any) {
    this.socket.emit('stopTyping', data);
  }
}