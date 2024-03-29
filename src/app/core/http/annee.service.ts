import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Annee } from '../../shared/models/annee';

@Injectable({
  providedIn: 'root'
})
export class AnneeService {
  private apiUrl = 'http://localhost:8080/api/annees';

  constructor(private http: HttpClient) {}

  getAllAnnees(): Observable<Annee[]> {
    return this.http.get<Annee[]>(this.apiUrl);
  }

  getAnneeById(id: number): Observable<Annee> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Annee>(url);
  }

  createAnnee(annee: Annee): Observable<Annee> {
    return this.http.post<Annee>(this.apiUrl, annee);
  }

  updateAnnee(id: number, annee: Annee): Observable<Annee> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Annee>(url, annee);
  }

  patchAnnee(id: number, annee: Partial<Annee>): Observable<Annee> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Annee>(url, annee);
  }

  deleteAnnee(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
