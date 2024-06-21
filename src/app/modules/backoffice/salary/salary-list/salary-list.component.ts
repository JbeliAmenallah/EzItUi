import { Component, Input, OnInit } from '@angular/core';
import { SalaryService } from '../../../../core/http/salary.service';
import html2pdf from 'html2pdf.js';
import { MessageService } from 'primeng/api';
import { EmployeeService } from '../../../../core/http/employee.service';
import { catchError, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { EntrepriseService } from '../../../../core/http/entreprise.service';
import { PublicHolidayService } from '../../../../core/http/publicholiday.service';
import { PrimeService } from '../../../../core/http/prime.service';
import { Prime } from '../../../../shared/models/prime';
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
  currentYearSalariesCount: number = 0;
  currentyear = new Date().getFullYear();
  publicHolidays: any[] = [];

  constructor(
    private salaryService: SalaryService,
    private messageService: MessageService,
    private employeeService: EmployeeService,
    private entrepriseService:EntrepriseService,
    private publicHolidayService:PublicHolidayService,
    private primeService: PrimeService // Inject PrimeService
  ) { }

  ngOnInit() {
    this.loadSalaries();
    this.loadPublicHolidays();
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
                location: 'Unknown Location',
                numCompte: 'Unknown Account',
                nbEnfant: 0,
                modeDePaiement: 'Unknown Payment Mode',
                salaireDeBASE: 0,
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
                    return of({
                      nom: 'Unknown Entreprise',
                      matriculeFiscale: 'Unknown Matricule Fiscale',
                      numCnss: 'Unknown Num CNSS'
                    });
                  }),
                  map(entreprise => ({
                    ...employee,
                    entrepriseNom: entreprise.nom,
                    entrepriseMatriculeFiscale: entreprise.matriculeFiscale,
                    entrepriseNumCnss: entreprise.numCnss
                  }))
                );
              } else {
                return of({
                  ...employee,
                  entrepriseNom: 'Unknown Entreprise',
                  entrepriseMatriculeFiscale: 'Unknown Matricule Fiscale',
                  entrepriseNumCnss: 'Unknown Num CNSS'
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
                location: result.location,
                numCompte: result.numCompte,
                nbEnfant: result.nbEnfant,
                modeDePaiement: result.modeDePaiement,
                salaireDeBASE: result.salaireDeBASE,
                entrepriseNom: result.entrepriseNom,
                entrepriseMatriculeFiscale: result.entrepriseMatriculeFiscale,
                entrepriseNumCnss: result.entrepriseNumCnss,
                gradeLibele: result.grade?.libele,
                groupeLibele: result.groupe?.libele,
                categoryLibele: result.category?.libele,
                hireDate: result.dateRecrutemnt,
                Fax: result.fax,
              };
            });
            this.loading = false;
            console.log(salaries);
            this.countCurrentYearSalaries(); // Call countCurrentYearSalaries() here
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
  
  countCurrentYearSalaries() {
    this.currentYearSalariesCount = this.countSalariesForCurrentYear();
  }

  
  
  countSalariesForCurrentYear(): number {
    const currentYear = new Date().getFullYear();
    return this.salaries.filter(salary => salary.year === currentYear).length;
  }
  
  
  // countCurrentYearSalaries() {
  //   this.currentYearSalariesCount = this.countSalariesForCurrentYear();
  // }


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
  
  loadPublicHolidays() {
    this.publicHolidayService.getAllPublicHolidays().subscribe(
      (holidays) => {
        this.publicHolidays = holidays;
        console.log("public holidays",this.publicHolidays)
      },
      (error) => {
        console.error('Error fetching public holidays:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error fetching public holidays.',
          life: 3000
        });
      }
    );
  }
  
  getJoursFeriesInMonth(month: number): number {
    // Filter public holidays by the same month as the salary
    const publicHolidaysInMonth = this.publicHolidays.filter(holiday => holiday.mois=== month);
    console.log("public holidays fel month ",this.publicHolidays)
    console.log(publicHolidaysInMonth)
    return publicHolidaysInMonth.length;
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
    const joursFeries = this.getJoursFeriesInMonth(salary.month);
    console.log("salary motn",salary.month)
    console.log("nombre jf",joursFeries)
    console.log("console css",salary.erpp)
    console.log("console css",salary.css)
    const heuresTravail = ((31 * 7) - joursFeries * 7).toFixed(2);

    // Fetch relevant primes for the same month and year as the salary
    this.primeService.getPrimesByContactId(salary.contactId).subscribe(
      (primes: any[]) => {
        console.log('Primes:', primes);

        // Extract montant and motif from primes
        const montants = primes.map(prime => prime.montant);
        const motifs = primes.map(prime => prime.motif);

        const payload = {
          contactId: salary.contactId,
          contactName: salary.contactName,
          contactEmail: salary.contactEmail,
          entrepriseNom: salary.entrepriseNom,
          entrepriseMatriculeFiscale: salary.entrepriseMatriculeFiscale,
          entrepriseNumCnss: salary.entrepriseNumCnss,
          modeDePaiement: salary.modeDePaiement,
          salaireDeBASE: salary.salaireDeBASE,
          gradeLibele: salary.gradeLibele,
          groupeLibele: salary.groupeLibele,
          categoryLibele: salary.categoryLibele,
          hireDate: salary.hireDate,
          Fax: salary.Fax,
          year: salary.year,
          month: salary.month,
          filePath: 'filePath',
          location: salary.location,
          numCompte: salary.numCompte,
          nbEnfant: salary.nbEnfant,
          joursFeries: joursFeries, // Include number of public holidays in the payload
          css: salary.css,
          erpp: salary.erpp,
          conges: salary.nbrconge,
          salaireNet: salary.salaireNet,
          heurestravail: heuresTravail,
          primes: primes // Include primes data in the payload
        };

        console.log('Payload for PDF generation:', payload);

        // Assign the payload to the payslipData
        this.payslipData = { ...payload };

        // Generate salary PDF
        this.salaryService.generateSalaryForContact(payload).subscribe(
          () => {
            const element = document.getElementById('payslip-template');
            console.log('Payslip template element:', element);

            if (element) {
            
              // Temporarily show the template for PDF generation
              element.classList.remove('hidden-template');

              const opt = {
                margin: 1,
                filename: `payslip_${salary.contactName}.pdf`,
                image: { type: 'png', quality: 1.0 }, // PNG format with maximum quality
                html2canvas: { scale: 4 }, // Increase the scale for better quality
                jsPDF: { unit: 'in', format: 'ledger', orientation: 'landscape' } // Set landscape orientation
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
      },
      (error) => {
        console.error('Error fetching primes:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error fetching primes.',
          life: 3000
       
        });
      }
      );
      }
  
}