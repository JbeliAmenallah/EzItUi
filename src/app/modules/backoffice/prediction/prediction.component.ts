import { Component } from '@angular/core';
import { EmployeeService } from '../../../core/http/employee.service';
import { Employee } from '../../../shared/models/employee';
import { AuthService } from '../../../core/auth/auth.service';
import { AbsenceService } from '../../../core/http/absence.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KpiRhService } from '../../../core/http/Kpi_RH';
import { cl } from '@fullcalendar/core/internal-common';
import { PredictionService } from '../../../core/http/prediction.service';
import { Prediction } from '../../../shared/models/prediction';
import { KpiRh } from '../../../shared/models/KpiRh';


@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrl: './prediction.component.css'
})

export class PredictionComponent {

  employeeOptions: any[] = [];
  user: Employee;
  form: FormGroup; 
  kpiRh: KpiRh ;   
  prediction: Prediction;


  constructor(
    private absenceService: AbsenceService,
    private authService: AuthService,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private kpiRhService: KpiRhService ,
    private predictionService:PredictionService,

  ) { }

  ngOnInit(): void {
    this.loadEmployeeOptions();
    const username = this.authService.getAuthenticatedUsername();
    this.fetchEmployeeByUsername(username);
    this.form=this.createForm();
  }

  loadEmployeeOptions() {
    this.absenceService.getEmployeesOptions().subscribe(
      options => {
        this.employeeOptions = options;
        console.log('Employee Options:', this.employeeOptions); 
      },
      error => {
        console.error('Erreur lors de l’extraction des options de l’employée :', error); 
      }
    );
  }

  fetchEmployeeByUsername(username: string) {
    this.employeeService.getEmployeeByUsername(username).subscribe(
        (employee: Employee) => {
            this.user = employee;
        },
        error => {
            console.error('Error fetching employee data', error);
        }
    );
}

createForm() {
  return this.formBuilder.group({
    contactUserName: [
      null,
      Validators.compose([Validators.required]),
    ],
  
  });
}

generateKpiRh() {
  const username = this.form.get('contactUserName').value;
  console.log('username: ' , username)
  if (username) {
    this.kpiRhService.addKpiRhForContact(username).subscribe(
      (kpiRh: KpiRh) => {
        console.log('KpiRh generated:', kpiRh);
        this.kpiRh = kpiRh; 

        // You can handle the response here, such as showing a success message
      },
      error => {
        console.error('Error generating KpiRh:', error);
        // You can handle the error here, such as showing an error message
      }
    
    );
  } else {
    console.error('No username selected');
  }

}
generatePrediction() {
  const username = this.form.get('contactUserName').value;
  console.log('Username:', username);
  if (username) {
    this.predictionService.addPredictionForUsername(username).subscribe(
      (prediction: Prediction) => {
        console.log('Prediction generated:', prediction);
        this.prediction = prediction; // Set the prediction property
      },
      error => {
        console.error('Error generating prediction:', error);
        // Handle the error here, such as showing an error message to the user
      }
    );
  } else {
    console.error('No username selected');
    // You can handle this case by showing an error message to the user
  }
}
}
