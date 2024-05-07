import { Component, OnInit, ViewChild } from '@angular/core';
import { EnfantFormComponent } from '../enfant-form/enfant-form.component'; 
import { Enfant } from '../../../../shared/models/Enfant';
import { EnfantService } from '../../../../core/http/enfant.service'; 
import { ContactService } from '../../../../core/http/contact.service'; 
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-enfant-add',
  templateUrl: './enfant-add.component.html',
  styleUrls: ['./enfant-add.component.css']
})
export class EnfantAddComponent implements OnInit {

  @ViewChild('form') enfantForm: EnfantFormComponent;
  private enfant: Enfant;
  messages: Message[] = [];

  constructor(
    private enfantService: EnfantService, 
    private contactService: ContactService, 
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.enfant = {
      id: null,
      name: '',
      familyName: '',
      age: null,
      disabled: false,
      bourse:false,
      educationGrade: '',
      contactId: null
    };
  }

  save() {
    console.log('Form Valid:', this.enfantForm.form.valid);
  
    if (this.enfantForm.form.valid) {
      this.enfant.id = this.enfantForm.form.get('id')?.value;
      this.enfant.name = this.enfantForm.form.get('name')?.value;
      this.enfant.familyName = this.enfantForm.form.get('familyName')?.value;
      this.enfant.age = this.enfantForm.form.get('age')?.value;
      this.enfant.disabled = this.enfantForm.form.get('disabled')?.value;
      this.enfant.bourse = this.enfantForm.form.get('bourse').value;
      this.enfant.educationGrade = this.enfantForm.form.get('educationGrade')?.value;
      this.enfant.contactId = this.enfantForm.form.get('contactId')?.value;
      console.log('Enfant Object:', this.enfant);
  
      this.enfantService.createEnfant(this.enfant).subscribe(
        (data) => {
          console.log('Enfant creation successful:', data);
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'L’enfant a été ajouté avec succès.' });
          }, 100);
          this.router.navigate(['/enfant/list']);
        },
        (error) => {
          console.error('Erreur de création d’enfant :', error);
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message || 'Une erreur s’est produite lors de l’enregistrement de l’enfant.' });
        }
      );
    } else {
      console.log('Form Invalid');
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Le formulaire doit être valide.' });
    }
  }
  
  
}
