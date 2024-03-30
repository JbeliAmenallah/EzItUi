import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PublicHoliday } from '../../shared/models/publicholiday';

@Injectable({
  providedIn: 'root'
})
export class PublicHolidayService {
  private baseUrl = 'http://localhost:8080/api/jourferies';
 // private anneeUrl = 'http://localhost:8080/api/anees'; // URL for contacts endpoint
  constructor(private http: HttpClient) { }

  getAllPublicHolidays(): Observable<PublicHoliday[]> {
    return this.http.get<PublicHoliday[]>(this.baseUrl);
  }

  createPublicHoliday(publicHoliday: PublicHoliday): Observable<PublicHoliday> {
    return this.http.post<PublicHoliday>(this.baseUrl, publicHoliday);
  }

  updatePublicHoliday(id: number, publicHoliday: PublicHoliday): Observable<PublicHoliday> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<PublicHoliday>(url, publicHoliday);
  }

  partialUpdatePublicHoliday(id: number, partialPublicHoliday: Partial<PublicHoliday>): Observable<PublicHoliday> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.patch<PublicHoliday>(url, partialPublicHoliday);
  }

  deletePublicHoliday(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
