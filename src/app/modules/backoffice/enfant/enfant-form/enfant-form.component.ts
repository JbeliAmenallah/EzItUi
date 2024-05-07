import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Enfant } from '../../../../shared/models/Enfant';
import { EnfantService } from '../../../../core/http/enfant.service';

@Component({
  selector: 'app-enfant-form',
  templateUrl: './enfant-form.component.html',
  styleUrls: ['./enfant-form.component.css']
})
export class EnfantFormComponent implements OnInit {

  @Input() currentEnfant: Enfant;
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  employeeOptions: any[] = [];
  disabledOptions: any[] = [
    { label: 'Yes', value: true },
    { label: 'No', value: false }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private enfantService: EnfantService
  ) { }

  ngOnInit(): void {
    this.form = this.createForm();
    this.loadEmployeeOptions();
  }

  createForm() {
    return this.formBuilder.group({
      name: [
        this.currentEnfant ? this.currentEnfant.name : null,
        Validators.compose([Validators.required]),
      ],
      familyName: [
        this.currentEnfant ? this.currentEnfant.familyName : null,
        Validators.compose([Validators.required]),
      ],
      age: [
        this.currentEnfant ? this.currentEnfant.age : null,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      disabled: [
        this.currentEnfant ? this.currentEnfant.disabled : null,
        Validators.compose([Validators.required]),
      ],
      bourse:[
        this.currentEnfant ? this.currentEnfant.bourse : null,
        Validators.compose([Validators.required])
      ]
      ,
      educationGrade: [
        this.currentEnfant ? this.currentEnfant.educationGrade : null,
        Validators.compose([Validators.required]),
      ],
      contactId: [
        this.currentEnfant ? this.currentEnfant.contactId : null,
        Validators.compose([Validators.required]),
      ]
    });
  }

  loadEmployeeOptions() {
    this.enfantService.getEmployeeOptions().subscribe(
      options => {
        this.employeeOptions = options;
      },
      error => {
        console.error('Erreur lors de la récupération des options de l’employé :', error);
      }
    );
  }

  submitForm() {
    if (this.form.valid) {
      this.formSubmitted.emit(this.form.value);
    }
  }
}
