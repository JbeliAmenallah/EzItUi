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
        console.error("An error occurred while getting the type prime:", error);
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
      this.typePrime.categorie = this.typePrimeForm.form.get('categorie')?.value;
      this.typePrime.grp = this.typePrimeForm.form.get('grp')?.value;
      this.typePrime.grade = this.typePrimeForm.form.get('grade')?.value;
      this.typePrime.obligatoire = this.typePrimeForm.form.get('obligatoire')?.value;
      
      this.service.updateTypePrime(this.typeId, this.typePrime).subscribe(
        (data) => {
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The type prime has been successfully updated.' });
          }, 100);
          this.router.navigate(['/typeprime/list']);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || 'An error occurred while updating the type prime.' });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill in all required fields.' });
    }
  }
}
