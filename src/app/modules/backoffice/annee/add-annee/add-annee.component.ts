import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Annee } from '../../../../shared/models/annee';
import { AnneeService } from '../../../../core/http/annee.service';
import { MessageService } from 'primeng/api';
import { AnneeFormComponent } from '../annee-form/annee-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-annee',
  templateUrl: './add-annee.component.html',
  styleUrls: ['./add-annee.component.css']
})
export class AddAnneeComponent implements OnInit {
  @ViewChild('form', { static: true }) form: AnneeFormComponent;
  messages: any[] = [];
  

  constructor(
    private anneeService: AnneeService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  save(): void {
    console.log("Inside save function");
    if (this.form.form.valid) {
      const formData = this.form.form.value;
      const newAnnee: Annee = {
        id: null,
        dateDebutExercice: formData.dateDebutExercice,
        libele: formData.libele
      };

      console.log("New Annee:", newAnnee);

      // Now proceed with saving
      this.anneeService.createAnnee(newAnnee).subscribe(
        () => {
          console.log('Annee added successfully!');
          this.messages.push({ severity: 'success', summary: 'Success', detail: 'Annee added successfully!' });
          this.form.form.reset();

          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The Annee has been successfully added.' });
          }, 100);
          this.router.navigate(['/annee/list']);
        },
        (error) => {
          console.error('Error adding Annee:', error);
          this.messages.push({ severity: 'error', summary: 'Error', detail: 'An error occurred while adding Annee.' });
        }
      );
    } else {
      console.log("Form is invalid");
      this.messages.push({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields.' });
    }
  }
}
