import { Component, Input, OnInit } from '@angular/core';
import { SalaryService } from '../../../../core/http/salary.service';
import html2pdf from 'html2pdf.js';
import { MessageService } from 'primeng/api';
import { EmployeeService } from '../../../../core/http/employee.service';
import { catchError, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { EntrepriseService } from '../../../../core/http/entreprise.service';

@Component({
  selector: 'app-salary-list',
  templateUrl: './salary-list.component.html',
  styleUrls: ['./salary-list.component.css']
})
export class SalaryListComponent implements OnInit {
  salaries: any[] = [];
  selectedSalaries: any[] = [];
  loading: boolean = true;
  @Input() payslipData: any;
  


  constructor(
    private salaryService: SalaryService,
    private messageService: MessageService,
    private employeeService: EmployeeService,
    private entrepriseService:EntrepriseService,
  ) { }

  ngOnInit() {
    this.loadSalaries();
  }
  
  loadSalaries() {
    this.loading = true;
    this.salaryService.getSalaries().subscribe(
      (salaries) => {
        const fetchEmployeeDetails = salaries.map(salary => {
          return this.employeeService.getEmployeeById(salary.contactId).pipe(
            catchError(error => {
              console.error(`Error fetching employee for contactId ${salary.contactId}:`, error);
              return of({
                name: 'Unknown Employee',
                email: '',
                entreprise: { entrepriseId: null, nom: 'Unknown Entreprise' },
                grade: { libele: 'Unknown Grade' },
                groupe: { libele: 'Unknown Groupe' },
                category: { libele: 'Unknown Category' },
                dateRecrutemnt: 'Unknown Date'  
              });
            }),
            switchMap(employee => {
              if (employee.entreprise && employee.entreprise.entrepriseId) {
                return this.entrepriseService.getEntrepriseById(employee.entreprise.entrepriseId).pipe(
                  catchError(error => {
                    console.error(`Error fetching entreprise for entrepriseId ${employee.entreprise.entrepriseId}:`, error);
                    return of({ nom: 'Unknown Entreprise' });
                  }),
                  map(entreprise => ({
                    ...employee,
                    entrepriseNom: entreprise.nom
                  }))
                );
              } else {
                return of({
                  ...employee,
                  entrepriseNom: 'Unknown Entreprise'
                });
              }
            })
          );
        });
  
        forkJoin(fetchEmployeeDetails).subscribe(
          (results: any[]) => {
            this.salaries = salaries.map((salary, index) => {
              const result = results[index];
              return {
                ...salary,
                contactName: result.name,
                contactEmail: result.email,
                entrepriseNom: result.entrepriseNom,
                gradeLibele: result.grade?.libele,
                groupeLibele: result.groupe?.libele,
                categoryLibele: result.category?.libele,
                hireDate: result.dateRecrutemnt ,
                Fax:result.fax,
              };
            });
            this.loading = false;
          },
          (error) => {
            console.error('Error fetching employee and entreprise names:', error);
            this.loading = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error fetching employee and entreprise names.',
              life: 3000
            });
          }
        );
      },
      (error) => {
        console.error('Error fetching salaries:', error);
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error fetching salaries.',
          life: 3000
        });
      }
    );
  }
  
  
  

  downloadPDF(contactId: number) {
    this.salaryService.downloadPDF(contactId).subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `salary_${contactId}.pdf`;
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'PDF downloaded successfully.', life: 1000 });
      },
      (error) => {
        console.error('Error downloading PDF:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error downloading PDF.', life: 1000 });
      }
    );
  }

  downloadSelectedPDFs() {
    if (this.selectedSalaries.length === 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No salaries selected for download.', life: 1000 });
      return;
    }

    this.selectedSalaries.forEach(salary => {
      this.generatePayslipPDF(salary);
    });
  }

  generatePayslipPDF(salary: any) {
    console.log('Generating PDF for salary:', salary);
  
    const payload = {
      contactId: salary.contactId,
      contactName: salary.contactName,
      contactEmail: salary.contactEmail,
      entrepriseNom: salary.entrepriseNom,
      gradeLibele: salary.gradeLibele,
      groupeLibele: salary.groupeLibele,
      categoryLibele: salary.categoryLibele,
      hireDate: salary.hireDate,  
      Fax:salary.Fax,
      year: salary.year,
      month: salary.month,
      filePath: 'filePath' 
    };
  
    console.log('Payload for PDF generation:', payload); 
  
    // Assign the payload to the payslipData
    this.payslipData = { ...payload };
  
    this.salaryService.generateSalaryForContact(payload).subscribe(
      () => {
        const element = document.getElementById('payslip-template');
        console.log('Payslip template element:', element);
       
        if (element) {
          // Temporarily show the template for PDF generation
          element.classList.remove('hidden-template');
          element.classList.add('visible-template');
  
          const opt = {
            margin: 1,
            filename: `payslip_${salary.contactId}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
          };
  
          html2pdf().from(element).set(opt).save().then(() => {
            console.log(`PDF generated for contact ${salary.contactId}!`);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: `PDF generated for contact ${payload.contactId}!`, life: 1000 });
            // Hide the template again after PDF generation
            element.classList.remove('visible-template');
            element.classList.add('hidden-template');
          }).catch(error => {
            console.error(`Error generating PDF for contact ${salary.contactId}:`, error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: `Error generating PDF for contact ${payload.contactId}`, life: 1000 });
          });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Payslip template not found.', life: 1000 });
        }
      },
      (error) => {
        console.error(`Error generating PDF for contact ${salary.contactId}:`, error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Error generating PDF for contact ${payload.contactId}`, life: 1000 });
      }
    );
  }
  
}