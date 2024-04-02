import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Entreprise } from '../../shared/models/Entreprise';
import { Grade } from '../../shared/models/grade';
import { Groupe } from '../../shared/models/groupe';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  private baseUrl = 'http://localhost:8080/entreprise';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getAllEntreprises(): Observable<Entreprise[]> {
    return this.http.get<Entreprise[]>(`${this.baseUrl}`);
  }

  createEntreprise(entreprise: Entreprise): Observable<Entreprise> {
    return this.http.post<Entreprise>(`${this.baseUrl}/add`, JSON.stringify(entreprise), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateEntreprise(id: number, entreprise: Entreprise): Observable<Entreprise> {
    return this.http.put<Entreprise>(`${this.baseUrl}/${id}`, JSON.stringify(entreprise), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteEntreprise(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  addGradeToEntreprise(entrepriseId: number, gradeId: number): Observable<Entreprise> {
    return this.http.post<Entreprise>(`${this.baseUrl}/${entrepriseId}/addGrade/${gradeId}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  getEntrepriseById(id: number): Observable<Entreprise> {
    return this.http.get<Entreprise>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  addGroupeToEntreprise(entrepriseId: number, groupeId: number): Observable<Entreprise> {
    return this.http.post<Entreprise>(`${this.baseUrl}/${entrepriseId}/addGroupe/${groupeId}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  addCategoryToEntreprise(entrepriseId: number, categoryId: number): Observable<Entreprise> {
    return this.http.post<Entreprise>(`${this.baseUrl}/${entrepriseId}/addCategory/${categoryId}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
