import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Groupe } from '../../shared/models/groupe';
@Injectable({
  providedIn: 'root'
})
export class GroupeService {

  private baseUrl = 'http://localhost:8080/api/groupes';

  constructor(private http: HttpClient) { }

  getAllGroupes(): Observable<Groupe[]> {
    return this.http.get<Groupe[]>(this.baseUrl);
  }

  getGroupeById(id: number): Observable<Groupe> {
    return this.http.get<Groupe>(`${this.baseUrl}/${id}`);
  }

  createGroupe(groupe: Groupe): Observable<Groupe> {
    return this.http.post<Groupe>(this.baseUrl, groupe);
  }

  updateGroupe(id: number, groupe: Groupe): Observable<Groupe> {
    return this.http.put<Groupe>(`${this.baseUrl}/${id}`, groupe);
  }

  updatePartialGroupe(id: number, groupe: Partial<Groupe>): Observable<Groupe> {
    return this.http.patch<Groupe>(`${this.baseUrl}/${id}`, groupe);
  }

  deleteGroupe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
