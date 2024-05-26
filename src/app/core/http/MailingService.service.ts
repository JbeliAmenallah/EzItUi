import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailingService {
  private baseUrl = 'http://localhost:8080'; // Replace with your backend base URL

  constructor(private http: HttpClient) { }

  sendHtmlEmail(emailData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/send-html-email`, emailData, { responseType: 'text' as 'json' }); // Set responseType to 'text'
  }

}
