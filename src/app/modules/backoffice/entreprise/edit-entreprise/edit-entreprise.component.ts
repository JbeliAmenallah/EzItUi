import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EntrepriseFormComponent } from '../entreprise-form/entreprise-form.component';
import { Entreprise } from '../../../../shared/models/Entreprise';
import { EntrepriseService } from '../../../../core/http/entreprise.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-entreprise',
  templateUrl: './edit-entreprise.component.html',
  styleUrls: ['./edit-entreprise.component.css']
})
export class EditEntrepriseComponent implements OnInit {

  @ViewChild('form') entrepriseForm: EntrepriseFormComponent;
  @Input() entreprise: Entreprise;
  entrepriseId: any;
  messages: Message[] = [];

  constructor(
    private service: EntrepriseService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
  ) {
    if (this.route.snapshot.paramMap.get('id') !== undefined) {
      this.entrepriseId = this.route.snapshot.paramMap.get('id');
      this.getEntreprise();
    } else {
      this.route.queryParams.subscribe((params) => {
        if (params['id'] !== undefined) {
          this.entrepriseId = params['id'];
          this.getEntreprise();
        } else if (this.router.getCurrentNavigation() != null) {
          const extrasState = this.router.getCurrentNavigation()?.extras.state;
          if (extrasState !== undefined && extrasState['data'] !== undefined) {
            this.entrepriseForm = extrasState['data'];
          } else {
            this.router.navigate(['/entreprise/list']);
          }
        }
      });
    }
  }

  ngOnInit(): void {
    this.getEntreprise();
  }

  getEntreprise() {
    this.service.getEntrepriseById(this.entrepriseId).subscribe({
      next: (item: Entreprise) => {
        this.entreprise = item;
        console.log(item);
      },
      error: (error) => {
        console.error("An error occurred while getting the entreprise:", error);
        this.goToList();
      }
    });
  }

  goToList() {
    this.router.navigate(['/entreprise/list']);
  }

  save() {
    console.log("hello")
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
<<<<<<< HEAD

=======
>>>>>>> d14d4fefa4db62a38a7037e69242b5b96bdd34b3

      this.service.updateEntreprise(this.entrepriseId, this.entreprise).subscribe(
        (data) => {
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The entreprise has been successfully updated.' });
          }, 100);
          this.router.navigate(['/entreprise/list']);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || 'An error occurred while updating the entreprise.' });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill in all required fields.' });
    }
  }
}
