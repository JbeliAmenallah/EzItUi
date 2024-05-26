import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Prime } from '../../../../shared/models/prime';
import { TypePrimeService } from '../../../../core/http/typeprime.service';
import { AbsenceService } from '../../../../core/http/absence.service';
import { Annee } from '../../../../shared/models/annee';
import { AnneeService } from '../../../../core/http/annee.service';
import { CategoryService } from '../../../../core/http/category.service';
import { GroupeService } from '../../../../core/http/groupe.service';
import { GradeService } from '../../../../core/http/grade.service';
@Component({
  selector: 'app-prime-form',
  templateUrl: './prime-form.component.html',
  styleUrls: ['./prime-form.component.css']
})
export class PrimeFormComponent implements OnInit {

  form: FormGroup;
  employeeOptions: any[] = [];
  typePrimes: any[] = [];
  anneeOptions: Annee[] = [];
  months: { label: string; value: number; }[] = []; 
  categoryOptions: any[] = []; 
  groupeOptions:any[] = []; 
  gradeOptions: any[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private absenceService: AbsenceService,
    private typePrimeService: TypePrimeService,
    private anneeService: AnneeService,
    private categoryService: CategoryService ,
    private groupeService: GroupeService ,
    private gradeService:GradeService,
  ) { }

  ngOnInit(): void {
    this.form = this.createForm();
    this.loadEmployeeOptions();
    this.fetchTypePrimes();
    this.loadAnnees();
    this.loadMonths(); 
    this.loadCategories(); 
    this.loadGroupeOptions();
    this.loadGradeOptions();
  
  }
  loadCategories() {
    this.categoryService.getAllCategories().subscribe(
      categories => {
        this.categoryOptions = categories.map(category => ({
          label: category.libele, 
          value: category.category_id 
        }));
      },
      error => {
        console.error('Erreur lors de la récupération des catégories :', error);
      }
    );
  }
  
  loadGroupeOptions() {
    this.groupeService.getAllGroupes().subscribe(
        options => {
            this.groupeOptions = options.map(option => ({
                label: option.libele, 
                value: option.groupe_id 
            }));
        },
        error => {
            console.error('Erreur lors de la récupération des options de groupe :', error);
        }
    );
}
loadGradeOptions() {
  this.gradeService.getAllGrades().subscribe(
    grades => {
      this.gradeOptions = grades.map(grade => ({
        label: grade.libele, 
        value: grade.grade_id 
      }));
    },
    error => {
      console.error('Erreur lors de la récupération des options de grade :', error);
    }
  );
}
  createForm() {
    return this.formBuilder.group({
      contactId: [null],
      year: [null, Validators.required],
      month: [null, Validators.required],
      montant: [null, Validators.required],
      motif: [null, Validators.required],
      typePrimeId: [null],
      category: [null],
      groupe: [null],
      grade: [null]
    });
  }

  
  loadEmployeeOptions() {
    this.absenceService.getEmployeeOptions().subscribe(
      options => {
        this.employeeOptions = options;
        console.log('Employee Options:', this.employeeOptions); 
      },
      error => {
        console.error('Erreur lors de l’extraction des options de l’employée :', error);
      }
    );
  }

  fetchTypePrimes() {
    this.typePrimeService.fetchTypePrimes().subscribe(
      options => {
        this.typePrimes = options;
        console.log('type prime Options:', this.typePrimes);
      },
      error => {
        console.error('Erreur lors de la récupération des nombres premiers de type :', error);
      }
    );
  }

  loadAnnees() {
    this.anneeService.getAllAnnees().subscribe(
      (annees: Annee[]) => {
        this.anneeOptions = annees;
      },
      (error) => {
        console.error('Erreur de chargement des années :', error);
      }
    );
  }

  loadMonths() {
    for (let i = 1; i <= 12; i++) {
      this.months.push({ label: i.toString(), value: i });
    }
  }

}
