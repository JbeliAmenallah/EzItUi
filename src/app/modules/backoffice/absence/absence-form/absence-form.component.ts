import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Absence } from '../../../../shared/models/absence';
import { AbsenceService } from '../../../../core/http/absence.service';

@Component({
  selector: 'app-absence-form',
  templateUrl: './absence-form.component.html',
  styleUrls: ['./absence-form.component.css']
})
export class AbsenceFormComponent implements OnInit {

  @Input() form: FormGroup; 


  employeeOptions: any[] = [];
  justifiedOptions: any[] = [
    { label: 'Oui', value: 'true' },
    { label: 'Non', value: 'false' }
    
  ];

  constructor(
    private formBuilder: FormBuilder,
    private absenceService: AbsenceService
  ) { }

  ngOnInit(): void {
    this.form = this.createForm();
    this.loadEmployeeOptions();
  
    console.log('Initial justified value:', this.form.get('justified').value);
  
    if (this.form.get('justified').value !== null) {
      const justifiedValue = this.form.get('justified').value;
      console.log('Received justified value:', justifiedValue);
      
      const option = this.justifiedOptions.find(option => option.value === justifiedValue);
      console.log('Matching option:', option);
  
      if (option) {
        this.form.get('justified').setValue(option.value);
      }
    }
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
      ],
      justified: [
        null,
        Validators.compose([Validators.required]),
      ]
    });
  }

  loadEmployeeOptions() {
    this.absenceService.getEmployeeOptions().subscribe(
      options => {
        this.employeeOptions = options;
        console.log('Employee Options:', this.employeeOptions); 
      },
      error => {
        console.error('Erreur lors de l’extraction des options de l’employée :', error); // Log any errors
      }
    );
  }
  
}
