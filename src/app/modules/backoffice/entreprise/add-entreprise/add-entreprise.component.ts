import { Component, OnInit, ViewChild } from '@angular/core';
import { EntrepriseFormComponent } from '../entreprise-form/entreprise-form.component';
import { Entreprise } from '../../../../shared/models/Entreprise';
import { EntrepriseService } from '../../../../core/http/entreprise.service'; // Import Entreprise service
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-entreprise',
  templateUrl: './add-entreprise.component.html',
  styleUrls: ['./add-entreprise.component.css']
})
export class AddEntrepriseComponent implements OnInit {

  @ViewChild('form') entrepriseForm: EntrepriseFormComponent;
  private entreprise: Entreprise;
  messages: Message[] = [];

  constructor(
    private service: EntrepriseService, // Update to your Entreprise service
    private router: Router,
    private messageService: MessageService 
  ) { }

  ngOnInit(): void {
    this.entreprise = {
      entrepriseId: null,
      nom: '',
      matricule: '',
      siegesociale: '',
      raisonSociale: '',
      adresseDeSiege: '',
      matriculeFiscale: '',
      numCnss: '',
      regimeSalariale: '',
      nbrJourConge: null
    };
  }

  save() {
    if (this.entrepriseForm.form.valid) {
      this.entreprise.nom = this.entrepriseForm.form.get('nom')?.value;
      this.entreprise.matricule = this.entrepriseForm.form.get('matricule')?.value;
      this.entreprise.siegesociale = this.entrepriseForm.form.get('siegesociale')?.value;
      this.entreprise.raisonSociale = this.entrepriseForm.form.get('raisonSociale')?.value;
      this.entreprise.adresseDeSiege = this.entrepriseForm.form.get('adresseDeSiege')?.value;
      this.entreprise.matriculeFiscale = this.entrepriseForm.form.get('matriculeFiscale')?.value;
      this.entreprise.numCnss = this.entrepriseForm.form.get('numCnss')?.value;
      this.entreprise.regimeSalariale = this.entrepriseForm.form.get('regimeSalariale')?.value;
      this.entreprise.nbrJourConge = this.entrepriseForm.form.get('nbrJourConge')?.value;

      this.service.createEntreprise(this.entreprise).subscribe(
        (data) => {
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The entreprise has been successfully added.' });
          }, 100);
          this.router.navigate(['/entreprise/list']); // Update route to entreprise list
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || 'An error occurred while saving the entreprise.' });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill in all required fields.' });
    }
  }
}

