import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { Contact } from '../../../../shared/models/contact';
import { ContactService } from '../../../../core/auth/contact.service';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  @ViewChild('form') contactForm: ContactFormComponent;
  @Input() contact: Contact;
  
  id: any;
  messages: Message[] = [];

  constructor(
    private service: ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
  ) {
    if (this.route.snapshot.paramMap.get('id') != undefined) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.getContact();
    } else {
      this.route.queryParams.subscribe((params) => {
        if (params['id'] !== undefined) {
          this.id = params['id'];
          this.getContact();
        } else if (this.router.getCurrentNavigation() != null) {
          const extrasState = this.router.getCurrentNavigation()?.extras.state;
          if (extrasState !== undefined && extrasState['data'] !== undefined) {
            this.contactForm = extrasState['data'];
          } else {
            this.router.navigate(['/contacts']);
          }
        }
      });
    }
  }

  ngOnInit(): void {
    this.getContact();
  }

  getContact() {
    this.service.read(this.id).subscribe({
      next: (item: Contact) => {
        this.contact = item;
        console.log(item);
      },
      error: (error) => {
        console.error("Une erreur s’est produite lors de la lecture du contact :", error);
        this.goToList();
      }
    });
  }

  goToList() {
    this.router.navigate(['/contacts']);
  }

  save() {
    if (this.contactForm.form.valid) {
      this.contact.firstName = this.contactForm.form.get('firstName')?.value;
      this.contact.lastName = this.contactForm.form.get('lastName')?.value;
      this.contact.email = this.contactForm.form.get('email')?.value;
      this.contact.address = this.contactForm.form.get('address')?.value;
      this.contact.phone = this.contactForm.form.get('phone')?.value;
      this.contact.projectId = this.contactForm.form.get('projectId')?.value;
      this.service.update(this.contact).subscribe(
        (data) => {
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'L’employée a été mise à jour avec succès' });
          }, 100);
          this.router.navigate(['/contacts']);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message || 'Une erreur s’est produite lors de la mise à jour de l’employé.' });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erreur de validation', detail: 'Veuillez remplir tous les champs obligatoires.' });
    }
  }
  }
