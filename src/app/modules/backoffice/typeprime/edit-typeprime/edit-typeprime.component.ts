import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TypePrimeFormComponent } from '../typeprime-form/typeprime-form.component';
import { TypePrime } from '../../../../shared/models/typeprime';
import { TypePrimeService } from '../../../../core/http/typeprime.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-typeprime',
  templateUrl: './edit-typeprime.component.html',
  styleUrls: ['./edit-typeprime.component.css']
})
export class EditTypePrimeComponent implements OnInit {

  @ViewChild('form') typePrimeForm: TypePrimeFormComponent;
  @Input() typePrime: TypePrime;
  typeId: any;
  messages: Message[] = [];

  constructor(
    private service: TypePrimeService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
  ) {
    if (this.route.snapshot.paramMap.get('id') !== undefined) {
      this.typeId = this.route.snapshot.paramMap.get('id');
      this.getTypePrime();
    } else {
      this.route.queryParams.subscribe((params) => {
        if (params['id'] !== undefined) {
          this.typeId = params['id'];
          this.getTypePrime();
        } else if (this.router.getCurrentNavigation() != null) {
          const extrasState = this.router.getCurrentNavigation()?.extras.state;
          if (extrasState !== undefined && extrasState['data'] !== undefined) {
            this.typePrimeForm = extrasState['data'];
          } else {
            this.router.navigate(['/typeprime/list']);
          }
        }
      });
    }
  }

  ngOnInit(): void {
    this.getTypePrime();
  }

  getTypePrime() {
    this.service.getTypePrimeById(this.typeId).subscribe({
      next: (item: TypePrime) => {
        this.typePrime = item;
        console.log(item);
      },
      error: (error) => {
        console.error("Une erreur s’est produite lors de l’obtention du type premier :", error);
        this.goToList();
      }
    });
  }

  goToList() {
    this.router.navigate(['/typeprime/list']);
  }

  save() {
    if (this.typePrimeForm.form.valid) {
      this.typePrime.code = this.typePrimeForm.form.get('code')?.value;
      this.typePrime.libele = this.typePrimeForm.form.get('libele')?.value;
      this.typePrime.cnss = this.typePrimeForm.form.get('cnss')?.value;
      this.typePrime.impo = this.typePrimeForm.form.get('impo')?.value;
      this.typePrime.montant = this.typePrimeForm.form.get('montant')?.value;
      this.typePrime.type = this.typePrimeForm.form.get('type')?.value;
      this.typePrime.abasedesalaire = this.typePrimeForm.form.get('abasedesalaire')?.value;
      this.typePrime.obligatoire = this.typePrimeForm.form.get('obligatoire')?.value;
      
      this.service.updateTypePrime(this.typeId, this.typePrime).subscribe(
        (data) => {
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Le type prime a été mis à jour avec succès.' });
          }, 100);
          this.router.navigate(['/typeprime/list']);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message || 'Une erreur s’est produite lors de la mise à jour du type d’amorce.' });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erreur de validation', detail: 'Veuillez remplir tous les champs obligatoires.' });
    }
  }
}
