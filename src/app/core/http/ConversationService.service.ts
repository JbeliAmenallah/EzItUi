import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SocketService } from './SocketService.service';
import { Observable } from 'rxjs';
import { Conversation } from '../../shared/models/conversation';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  private url: string = "http://localhost:3000/api";
  private endpoint: string = 'conversations';
  private httpClient: HttpClient; // Declare a separate HttpClient

  constructor(private handler: HttpBackend) {
    this.httpClient = new HttpClient(handler); // Create a new HttpClient that bypasses the interceptor
  }

  // Method to create a new conversation
  public create(conversation: any): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/${this.endpoint}`, conversation);
  }

  // Method to list all conversations
  public list(id:any): Observable<Conversation[]> {
    return this.httpClient.get<Conversation[]>(`${this.url}/${this.endpoint}/${id}`);
  }


  public listImage(id:any): Observable<Conversation[]> {
    return this.httpClient.get<Conversation[]>(`${this.url}/${this.endpoint}/${id}/images`);
  }

 
}