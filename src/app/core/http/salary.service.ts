import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  private baseUrl = 'http://localhost:8080';
  private url  = 'http://localhost:8080/api/fichesdepaie';

  constructor(private http: HttpClient) { }

  generateSalaryForContact(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/generate-salary`, payload);
  }

  generateSalaryForAllContacts(year: number, month: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/generate-salary-all?year=${year}&month=${month}`);
  }

  getSalaries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}`);
  }
  downloadPDF(salaryId: number): Observable<any> {
    // Use HttpClient to make a request to download the PDF for the specified salary ID
    const url = `${this.url}/${salaryId}`;
    return this.http.get(url, { responseType: 'blob' });
  }
    // Example method to fetch payslip data based on contactId
    getPayslipData(contactId: string): Observable<any> {
      // Adjust the URL to match your API endpoint
      return this.http.get<any>(`/api/payslip/${contactId}`);
    }
    getContactById(contactId: number): Observable<any> {
      return this.http.get(`/api/contacts/${contactId}`);
    }

    /* Method to generate and download PDF for a contact
    generateAndDownloadPDF(contactId: number, payload: any): void {
      this.generateSalaryForContact(payload).subscribe(
        () => {
          const element = document.getElementById('payslip');
          const opt = {
            margin: 1,
            filename: `payslip_${contactId}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
          };
    
          html2pdf().from(element).set(opt).save(); // Generate and save PDF
          console.log(`PDF generated for contact ${contactId}!`);
        },
        (error) => {
          console.error(`Error generating PDF for contact ${contactId}:`, error);
        }
      );
    }
  

  
  /*generatePDFForSingleContact(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/generate-salary`, payload);
  }

  generatePDFForAllContacts(year: number, month: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/generate-salary-all?year=${year}&month=${month}`);
  }
  downloadPDFAll(year: number, month: number): Observable<any> {
    // Use HttpClient to make a request to download the PDF for all contacts in the specified year and month
    const url = `${this.baseUrl}/generate-salary-all?year=${year}&month=${month}&download=true`;
    return this.http.get(url, { responseType: 'blob' });
  }*/
  
}

