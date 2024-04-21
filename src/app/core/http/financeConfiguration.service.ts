import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FinanceConfiguration } from '../../shared/models/financeConfiguration';

@Injectable({
  providedIn: 'root'
})
export class FinanceConfigurationService {
  private apiUrl = 'http://localhost:8080/api/finance-configurations';

  constructor(private http: HttpClient) {}

  getAllFinanceConfigurations(): Observable<FinanceConfiguration[]> {
    return this.http.get<FinanceConfiguration[]>(this.apiUrl);
  }

  getFinanceConfigurationById(id: number): Observable<FinanceConfiguration> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<FinanceConfiguration>(url);
  }

  createFinanceConfiguration(financeConfig: FinanceConfiguration): Observable<FinanceConfiguration> {
    return this.http.post<FinanceConfiguration>(this.apiUrl, financeConfig);
  }

  updateFinanceConfiguration(id: number, financeConfig: FinanceConfiguration): Observable<FinanceConfiguration> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<FinanceConfiguration>(url, financeConfig);
  }

  patchFinanceConfiguration(id: number, financeConfig: Partial<FinanceConfiguration>): Observable<FinanceConfiguration> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<FinanceConfiguration>(url, financeConfig);
  }

  deleteFinanceConfiguration(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
  getFinanceConfigurationOfCurrentOrPreviousYear(): Observable<FinanceConfiguration> {
    // Update the API URL to point to the endpoint for the current or previous year's finance configuration
    const currentOrPreviousYearUrl = `${this.apiUrl}/current-or-previous`;
    return this.http.get<FinanceConfiguration>(currentOrPreviousYearUrl);
  }
}
