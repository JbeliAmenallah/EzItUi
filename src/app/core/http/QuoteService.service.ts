// quote.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  private apiUrl = 'http://localhost:8080/api/quotes'; // Update URL if needed

  constructor(private http: HttpClient) { }

  // Method to fetch quotes from the Spring Boot backend
  getQuotes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
