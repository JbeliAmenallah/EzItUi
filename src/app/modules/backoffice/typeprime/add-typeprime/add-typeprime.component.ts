import { Component, OnInit, ViewChild } from '@angular/core';
import { TypePrime } from '../../../../shared/models/typeprime';
import { TypePrimeService } from '../../../../core/http/typeprime.service';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { TypePrimeFormComponent } from '../typeprime-form/typeprime-form.component';

@Component({
  selector: 'app-add-typeprime',
  templateUrl: './add-typeprime.component.html',
  styleUrls: ['./add-typeprime.component.css']
})
export class AddTypeprimeComponent implements OnInit {

  @ViewChild('form') typeprimeForm: TypePrimeFormComponent;
  private typeprime: TypePrime;
  messages: Message[] = [];

  constructor(
    private service: TypePrimeService,
    private router: Router,
    private messageService: MessageService 
  ) { }

  ngOnInit(): void {
    this.typeprime = {

      code: '',
      libele: '',
      cnss: '',
      impo: null,
      montant:null ,
      type: '',
      abasedesalaire: false,
      categorie: '',
      grp: '',
      grade: '',
      obligatoire: false
    };
  }

  save() {
    if (this.typeprimeForm.form.valid) {
      this.typeprime.code = this.typeprimeForm.form.get('code')?.value;
      this.typeprime.libele = this.typeprimeForm.form.get('libele')?.value;
      this.typeprime.cnss = this.typeprimeForm.form.get('cnss')?.value;
      this.typeprime.impo = this.typeprimeForm.form.get('impo')?.value;
      this.typeprime.montant = this.typeprimeForm.form.get('montant')?.value;
      this.typeprime.type = this.typeprimeForm.form.get('type')?.value;
      this.typeprime.abasedesalaire = this.typeprimeForm.form.get('abasedesalaire')?.value === 'true';
      this.typeprime.categorie = this.typeprimeForm.form.get('categorie')?.value;
      this.typeprime.grp = this.typeprimeForm.form.get('grp')?.value;
      this.typeprime.grade = this.typeprimeForm.form.get('grade')?.value;
      this.typeprime.obligatoire = this.typeprimeForm.form.get('obligatoire')?.value === 'true';

      this.service.addTypePrime(this.typeprime).subscribe(
        (data) => {
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The typeprime has been successfully added.' });
          }, 100);
          this.router.navigate(['/typeprime/list']);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || 'An error occurred while saving the typeprime.' });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill in all required fields.' });
    }
}

}
