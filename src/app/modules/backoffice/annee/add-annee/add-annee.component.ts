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

      // Maintenant, procédez à l'enregistrement
this.anneeService.createAnnee(newAnnee).subscribe(
  () => {
    console.log('Année ajoutée avec succès !');
    this.messages.push({ severity: 'success', summary: 'Succès', detail: 'Année ajoutée avec succès !' });
    this.form.form.reset();

    setTimeout(() => {
      this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'L\'année a été ajoutée avec succès.' });
    }, 100);
    this.router.navigate(['/annee/list']);
  },
  (error) => {
    console.error('Erreur lors de l\'ajout de l\'année :', error);
    this.messages.push({ severity: 'error', summary: 'Erreur', detail: 'Une erreur s\'est produite lors de l\'ajout de l\'année.' });
  }
);
} else {
  console.log("Le formulaire est invalide");
  this.messages.push({ severity: 'error', summary: 'Erreur', detail: 'Veuillez remplir tous les champs requis.' });
}

  }
}
