import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autorisation } from '../../shared/models/autorisation';

@Injectable({
  providedIn: 'root'
})
export class AutorisationService {
  private apiUrl = 'http://localhost:8080/api/autorisations';

  constructor(private http: HttpClient) {}

  getAllAutorisations(): Observable<Autorisation[]> {
    return this.http.get<Autorisation[]>(this.apiUrl);
  }

  saveAutorisation(autorisation: Autorisation): Observable<Autorisation> {
    return this.http.post<Autorisation>(this.apiUrl, autorisation);
  }

  updateAutorisation(autorisationId: number, autorisation: Autorisation): Observable<Autorisation> {
    const url = `${this.apiUrl}/${autorisationId}`;
    return this.http.put<Autorisation>(url, autorisation);
  }

  patchAutorisation(autorisationId: number, autorisation: Partial<Autorisation>): Observable<Autorisation> {
    const url = `${this.apiUrl}/${autorisationId}`;
    return this.http.patch<Autorisation>(url, autorisation);
  }

  deleteAutorisation(autorisationId: number): Observable<void> {
    const url = `${this.apiUrl}/${autorisationId}`;
    return this.http.delete<void>(url);
  }

  getAutorisationsByContactId(contactId: number): Observable<Autorisation[]> {
    const url = `${this.apiUrl}/contact/${contactId}`;
    return this.http.get<Autorisation[]>(url);
  }

  getAutorisationsWithDurationMoreThanTwoHours(): Observable<Autorisation[]> {
    const url = `${this.apiUrl}/duration-more-than-two-hours`;
    return this.http.get<Autorisation[]>(url);
  }
  
  submitAutorisationRequest(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/demande`, formData);
  }
  
}
