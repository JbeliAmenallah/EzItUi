import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { Contact } from '../../../../shared/models/contact';
import { ContactService } from '../../../../core/http/contact.service';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  @ViewChild('form') contactForm: ContactFormComponent;
  private contact: Contact;
  messages: Message[] = [];

  constructor(
    private service: ContactService,
    private router: Router,
    private messageService: MessageService 
  ) { }

  ngOnInit(): void {
    this.contact = {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      phone: '',
      projectId: null
    };
  }

  save() {
    if (this.contactForm.form.valid) {
      this.contact.firstName = this.contactForm.form.get('firstName')?.value;
      this.contact.lastName = this.contactForm.form.get('lastName')?.value;
      this.contact.email = this.contactForm.form.get('email')?.value;
      this.contact.address = this.contactForm.form.get('address')?.value;
      this.contact.phone = this.contactForm.form.get('phone')?.value;
      this.contact.projectId = this.contactForm.form.get('projectId')?.value;
      this.service.create(this.contact).subscribe(
        (data) => {
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'L’employé a été ajouté avec succès.' });
          }, 100);
          this.router.navigate(['/contacts']);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message || 'Une erreur s’est produite lors de l’enregistrement de l’employé' });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erreur de validation ', detail: 'Veuillez remplir tous les champs obligatoires.' });
    }
  }
}
