import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { Enfant } from '../../../../shared/models/Enfant';
import { EnfantService } from '../../../../core/http/enfant.service';
import { EnfantFormComponent } from '../enfant-form/enfant-form.component';

@Component({
  selector: 'app-edit-enfant',
  templateUrl: './enfant-edit.component.html',
  styleUrls: ['./enfant-edit.component.css']
})
export class EditEnfantComponent implements OnInit {
  @ViewChild(EnfantFormComponent, { static: false }) enfantForm: EnfantFormComponent;
  @Input() enfant: Enfant;
  enfantId: any;
  enfantFormGroup: FormGroup;
  messages: Message[] = [];



  constructor(
    private service: EnfantService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getEnfant();
  }

  getEnfant() {
    if (this.route.snapshot.paramMap.has('id')) {
      this.enfantId = this.route.snapshot.paramMap.get('id');
      this.service.getEnfantById(this.enfantId).subscribe({
        next: (item: Enfant) => {
          this.enfant = item;
          this.initializeForm();
          console.log(this.enfant);
        },
        error: (error) => {
          console.error("An error occurred while getting the enfant:", error);
          this.goToList();
        }
      });
    } else {
      console.error("Enfant ID not provided in URL");
      this.goToList();
    }
  }

  initializeForm() {
    this.enfantFormGroup = this.formBuilder.group({
      id: [this.enfant.id],
      name: [this.enfant.name, Validators.required],
      familyName: [this.enfant.familyName, Validators.required],
      age: [this.enfant.age, Validators.required],
      disabled: [this.enfant.disabled, Validators.required],
      bourse:[this.enfant.bourse,Validators.required],
      educationGrade: [this.enfant.educationGrade, Validators.required],
      contactId: [this.enfant.contactId, Validators.required]
    });
  }

  goToList() {
    this.router.navigate(['/enfant/list']);
  }

save() {
    if (this.enfantFormGroup.valid) {
      // Update form values
      this.enfantFormGroup.patchValue({
        name: this.enfantForm.form.get('name').value,
        familyName: this.enfantForm.form.get('familyName').value,
        age: this.enfantForm.form.get('age').value,
        disabled: this.enfantForm.form.get('disabled').value,
        bourse:this.enfantForm.form.get('bourse').value,
        educationGrade: this.enfantForm.form.get('educationGrade').value,
        contactId: this.enfantForm.form.get('contactId').value
      });
  
      const enfantData: Enfant = this.enfantFormGroup.value;
      console.log("This the updated object", enfantData);
  
      this.service.updateEnfant(this.enfantId, enfantData).subscribe(
        (data) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The employee has been successfully updated.' });
          setTimeout(() => {
            this.goToList(); 
          }, 1000);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || 'An error occurred while updating the enfant.' });
        }
      );

      // Clear messages after displaying
      this.messages = [];
    } else {
      this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill in all required fields.' });
    }
  }

  
}
