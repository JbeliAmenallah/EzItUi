import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Employee } from '../../shared/models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8080/contacts';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getEmployeeById(id: number): Observable<Employee> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Employee>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateEmployee(id: number, updatedEmployee: Employee): Observable<Employee> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Employee>(url, updatedEmployee)
      .pipe(
        catchError(this.handleError)
      );
  }

  patchEmployee(id: number, patchedEmployee: Partial<Employee>): Observable<Employee> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Employee>(url, patchedEmployee)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteEmployee(contactId: number): Observable<void> {
    const url = `${this.apiUrl}/${contactId}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
}
