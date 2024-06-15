import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { Employee } from '../../../../shared/models/employee';
import { EmployeeService } from '../../../../core/http/employee.service';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { MailingService } from '../../../../core/http/MailingService.service';
import { AppComponent } from '../../../../app.component';
import { NotificationService } from '../../../../core/http/notification.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  @ViewChild('form') employeeForm: EmployeeFormComponent;
  private employee: Employee;
  messages: Message[] = [];
  private appComponent: AppComponent // Inject AppComponent

    
  constructor(
    private service: EmployeeService,
    private router: Router,
    private messageService: MessageService,
    private mailingService: MailingService, // Inject MailingService
    private notificationService:NotificationService

  ) { }

  ngOnInit(): void {
    this.employee = {
      name: '',
      username: '',
      email: '',
      location: '',
      phone: '',
      fax: '',
      password: '',
      roles: '',
      nbEnfant: null,
      regime: '',
      chefDefamille: null,
      salaireDeBASE: null,
      numCompte: '',
      modeDePaiement: '',
      dateRecrutemnt: null,
    };
  }
  navigateToLogin() {
    window.open('http://localhost:4200/', '_blank');
  }


  save() {
    if (this.employeeForm.form.valid) {
      // Extract form values
      const formValues = this.employeeForm.form.value;

      // Create the employee object
      const employee: Employee = {
        name: formValues.name,
        username: formValues.username,
        email: formValues.email,
        location: formValues.location,
        phone: formValues.phone,
        fax: formValues.fax,
        password: formValues.password,
        roles: formValues.roles,
        nbEnfant: formValues.nbEnfant,
        regime: formValues.regime,
        chefDefamille: formValues.chefDefamille,
        salaireDeBASE: formValues.salaireDeBASE,
        numCompte: formValues.numCompte,
        modeDePaiement: formValues.modeDePaiement,
        dateRecrutemnt: formValues.dateRecrutemnt,
        entreprise: { entrepriseId: formValues.entrepriseId },
        category: { category_id: formValues.category },
        groupe: { groupe_id: formValues.groupe },
        grade: { grade_id: formValues.grade }
      };
      this.employee=employee;
      console.log('Employee to save:', employee);

      this.service.addEmployee(employee).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'L’employé a été ajouté avec succès.', life: 3000 });
                // Increment notification badge
                 this.notificationService.incrementBadge();

                // Push notification to the list
             this.notificationService.addNotification(`Employee ${employee.name} has been added`);


          // Send email when employee is added successfully
          this.sendEmail(employee.email);
          //send email to Rh 
          setTimeout(() => {
            this.router.navigate(['/employee/list']);
          }, 3000);
        },
        (error) => {
          console.error('Erreur lors de l’enregistrement de l’employé :', error);
          if (Array.isArray(error)) {
            error.forEach(err => {
              this.messageService.add({ severity: 'error', summary: 'Les champs ne sont pas valides', detail: err.message });
            });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de l’enregistrement de l’employé.' });
          }
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'La forme n’est pas valable.', life: 3000 });
    }
  }
  
  private sendEmail(to: string): void {
    const hamadi = this.employee.name;
    console.log("hello",hamadi)
    const username=this.employee.username;
    const password=this.employee.password;
    const emailData = {
        to: to,
        subject: `Votre compte a été créé avec succès, ${hamadi} !`,
        htmlContent: `
          <p>Bonjour ${hamadi},</p>
          <p>Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter en utilisant les identifiants <br>
          Nom d'utilisateur : ${username},
          Mot de Passe : ${password},
          </p>
          <p>Merci !</p>
        `
      };

    this.mailingService.sendHtmlEmail(emailData).subscribe(
      response => {
        console.log('Email sent successfully:', response);
      },
      error => {
        console.error('Failed to send email:', error);
      }
    );
  }

}