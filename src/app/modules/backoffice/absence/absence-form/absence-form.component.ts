import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Absence } from '../../../../shared/models/absence';
import { AbsenceService } from '../../../../core/http/absence.service';

@Component({
  selector: 'app-absence-form',
  templateUrl: './absence-form.component.html',
  styleUrls: ['./absence-form.component.css']
})
export class AbsenceFormComponent implements OnInit {

  form: FormGroup;
  employeeOptions: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private absenceService: AbsenceService
  ) { }

  ngOnInit(): void {
    this.form = this.createForm();
    this.loadEmployeeOptions();
  }

  createForm() {
    return this.formBuilder.group({
      contactId: [
        null,
        Validators.compose([Validators.required]),
      ],
      dateDebutAbsence: [
        null,
        Validators.compose([Validators.required]),
      ],
      dateFinAbsence: [
        null,
        Validators.compose([Validators.required]),
      ],
      reason: [
        null,
        Validators.compose([Validators.required]),
      ]
    });
  }

  loadEmployeeOptions() {
    this.absenceService.getEmployeeOptions().subscribe(
      options => {
        this.employeeOptions = options;
        console.log('Employee Options:', this.employeeOptions); // Log options for troubleshooting
      },
      error => {
        console.error('Error fetching employee options:', error); // Log any errors
      }
    );
  }
}
