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

 

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getEmployeesAddedThisYear(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/employees-added-this-year`);
  }

   // Method to get the count of employees


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
  getAverageBaseSalary(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/average-base-salary`);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error:', error);
    if (error.status === 400 && error.error && error.error.message === 'Validation Error') {
      const validationErrors = error.error.errors;
      const formattedErrors = Object.entries(validationErrors).map(([field, errorMessage]) => ({
        field,
        message: errorMessage
      }));
      return throwError(formattedErrors);
    } else {
      return throwError('Something bad happened; please try again later.');
    }
  }



  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Employee>(url, employee)
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

  fetchEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }
 
}
