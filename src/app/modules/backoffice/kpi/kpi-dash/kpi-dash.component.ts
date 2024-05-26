import { Component, OnInit } from '@angular/core';
import { KpiService } from '../../../../core/http/kpi.service';

@Component({
  selector: 'app-kpi-dash',
  templateUrl: './kpi-dash.component.html',
  styleUrl: './kpi-dash.component.css'
})
export class KPIDashComponent implements OnInit {

  totalAbsences: number = 0;
  totalAutorisations: number = 0;
  totalConges: number = 0;
  averageSalary: number = 0.0;
  totalEnfants: number = 0;

  constructor(private kpiService: KpiService) { }

  ngOnInit(): void {
    const contactId = 1; // Replace with actual contact ID
    const gradeId = 1; // Replace with actual grade ID

    this.kpiService.getTotalAbsences(contactId).subscribe(data => this.totalAbsences = data);
    this.kpiService.getTotalAutorisations(contactId).subscribe(data => this.totalAutorisations = data);
    this.kpiService.getTotalConges(contactId).subscribe(data => this.totalConges = data);
    this.kpiService.getAverageSalaryByGrade(gradeId).subscribe(data => this.averageSalary = data);
    this.kpiService.getTotalEnfants(contactId).subscribe(data => this.totalEnfants = data);
  }

}
