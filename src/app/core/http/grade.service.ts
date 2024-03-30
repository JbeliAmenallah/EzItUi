import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grade } from '../../shared/models/grade';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private baseUrl = 'http://localhost:8080/api/grades';

  constructor(private http: HttpClient) { }

  getAllGrades(): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.baseUrl);
  }

  createGrade(grade: Grade): Observable<Grade> {
    return this.http.post<Grade>(this.baseUrl, grade);
  }

  getGradeById(id: number): Observable<Grade> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Grade>(url);
  }

  updateGrade(id: number, grade: Grade): Observable<Grade> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Grade>(url, grade);
  }

  updatePartialGrade(id: number, grade: Partial<Grade>): Observable<Grade> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.patch<Grade>(url, grade);
  }

  deleteGrade(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
