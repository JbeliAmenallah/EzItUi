import { Component, Input, OnInit } from '@angular/core';
import { SalaryService } from '../../../../core/http/salary.service';

@Component({
  selector: 'app-salary-template',
  templateUrl: './salary-template.component.html',
  styleUrl: './salary-template.component.css'
})
export class SalaryTemplateComponent implements OnInit {
  
  @Input() contactId: string; // Define contactId as an input property
  @Input()  payslipData: any;

  constructor(private salaryService: SalaryService) { }

  ngOnInit() {
    // Call a service method to fetch payslip data based on the contactId
    if (this.contactId) {
      this.salaryService.getPayslipData(this.contactId).subscribe(
        (data) => {
          this.payslipData = data;
        },
        (error) => {
          console.error('Error fetching payslip data:', error);
          // Handle error as needed
        }
      );
    }
  }
}
