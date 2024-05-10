import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { Employee } from '../../../../shared/models/employee';
import { EmployeeService } from '../../../../core/http/employee.service';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  @ViewChild('form') employeeForm: EmployeeFormComponent;
  private employee: Employee;
  messages: Message[] = [];


  constructor(
    private service: EmployeeService,
    private router: Router,
    private messageService: MessageService 
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
        category: {category_id:formValues.category},
        groupe:  {groupe_id:formValues.groupe},
        grade:  {grade_id:formValues.grade}
      };
  
      console.log('Employee to save:', employee);
  
      this.service.addEmployee(employee).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'L’employé a été ajouté avec succès.', life: 3000 });
  
   
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
  
  
  
}