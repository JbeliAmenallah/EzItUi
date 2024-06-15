import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../../shared/models/message';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private url: string = "http://localhost:3000/api";
  private endpoint: string = 'messages';
  private httpClient: HttpClient; // Declare a separate HttpClient

  constructor(private handler: HttpBackend) {
    this.httpClient = new HttpClient(handler); // Create a new HttpClient that bypasses the interceptor
  }

  public create(message: Message): Observable<Message> {
    return this.httpClient.post<Message>(`${this.url}/${this.endpoint}`, message);
  }

  public list(id:any): Observable<Message[]> {
    return this.httpClient.get<Message[]>(`${this.url}/${this.endpoint}/${id}`);
  }


  public lastMessage(id:any): Observable<Message> {
    return this.httpClient.get<Message>(`${this.url}/${this.endpoint}/${id}/last`);
  }

  uploadFile(formData: FormData): Observable<Message> {
    return this.httpClient.post<Message>(`${this.url}/${this.endpoint}`, formData);
  }

  markMessagesAsSeen(conversationId: string, userId: string): Observable<void> {
    return this.httpClient.put<void>(`${this.url}/${this.endpoint}/mark-seen`, { conversationId, userId });
  }

 
}