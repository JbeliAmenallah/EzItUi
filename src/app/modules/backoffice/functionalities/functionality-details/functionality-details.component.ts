// import { Component, Input, OnInit, ViewChild } from '@angular/core';
// import { Functionality } from '../../../../shared/models/functionality';
// import { FunctionalityService } from '../../../../core/http/functionality.service';
// import { ConfirmationService, MenuItem, Message, MessageService } from 'primeng/api';
// import { HttpErrorResponse } from '@angular/common/http';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Resource } from '../../../../shared/models/resource';
// import { Task } from '../../../../shared/models/task'; 
// import { FunctionalityCriterion } from '../../../../shared/models/functionalityCriterion';
// import { FunctionalityCriterionService } from '../../../../core/auth/functionalityCriterion.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { FunctionalityCriterionDetailsComponent } from '../../functionality-criterion/functionality-criterion-details/functionality-criterion-details.component';

// @Component({
//   selector: 'app-functionality-details',
//   templateUrl: './functionality-details.component.html',
//   styleUrls: ['./functionality-details.component.css']
// })
// export class FunctionalityDetailsComponent implements OnInit {
//   @ViewChild('form') functionalityCriterionForm: FormGroup;
//   messages: Message[] = [];
//   currentFunctionality: Functionality;
//   resources: Resource[] = [];
//   tasks: Task[] = [];
//   visible: boolean = false;
//   selectedTask: Task | null = null;
//   loading: boolean = true;
//   functionalityCriteria: FunctionalityCriterion[] = [];
//   functionalityCriteriaIdBug: number[] = [];
//   items: MenuItem[] | undefined;
//   visibleDialog: boolean = false;
//   form : FormGroup ;
//   @Input() currentItemForm: FunctionalityCriterion; 
//   private functionalityCriterion: FunctionalityCriterion;

//     showDialog() {
        
//         this.visibleDialog = true;
//     }
//   constructor(
//     private serviceFunctionality: FunctionalityService,
//     private confirmationService: ConfirmationService,
//     private messageService: MessageService,
//     private route: ActivatedRoute,
//     private router: Router,
//     private serviceFunctionalityCriterion: FunctionalityCriterionService,
//     private formBuilder: FormBuilder,
//   ) {}

//   ngOnInit(): void {
//     this.getList();
//     this.showDetails(this.route.snapshot.params['id']);
//     if (this.currentItemForm === undefined) {
//       this.form = this.createForm();  
//     }  
//   }

//   showDetails(functionalityId: number) {
//     this.visible = true;
  
//     this.serviceFunctionality.read(functionalityId).subscribe(
//       (data: Functionality) => {
//         this.currentFunctionality = data;
        
//         if (this.currentFunctionality.resources && this.currentFunctionality.resources.length > 0) {
//           this.resources = this.currentFunctionality.resources;
//         }

//         if (this.currentFunctionality.tasks && this.currentFunctionality.tasks.length > 0) {
//           this.tasks = this.currentFunctionality.tasks;
//         }
//       },
//       (error) => {
//         console.error('Error while fetching functionality:', error);
//         if (error instanceof HttpErrorResponse) {
//           console.error('Message d\'erreur:', error.error.text);
//         }
//       }
//     );
//   }

//   selectTask(task: Task) {
//     this.selectedTask = task;
//   }
//   getList() {
//     this.serviceFunctionalityCriterion.listByFunctionalityId(this.route.snapshot.params['id']).subscribe(
//       (items: FunctionalityCriterion[]) => {
//         this.functionalityCriteria = items;
//         this.loading = false;
//       },
//       (error) => {
//         console.error('Erreur lors de la récupération des données : ', error);
//         this.loading = false;
//       }
//     );
//   }
//   deleteItem(id: number) {
//     this.confirmationService.confirm({
//         message: 'Êtes-vous sûr de vouloir supprimer cet élément?',
//         header: 'Confirmation de suppression',
//         icon: 'pi pi-info-circle',
//         acceptButtonStyleClass: "p-button-danger p-button-text",
//         rejectButtonStyleClass: "p-button-text p-button-text",
//         acceptIcon: "pi pi-check",
//         rejectIcon: "pi pi-times",
        
//         accept: () => {
//             if (id !== undefined) {
//                 this.serviceFunctionalityCriterion.delete(id).subscribe(
//                     () => {
//                       console.log("this is : ",id)
//                       this.getList();
//                         this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'critère de fonctionnalité supprimé avec succès' });
//                     },
//                     (error) => {
//                         this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la suppression' });
//                     }
//                 );
//             }
//         },
//         reject: () => {
//             this.messageService.add({ severity: 'error', summary: 'Rejeté', detail: 'Vous avez rejeté' });
//         }
//     });
//   }

//   editItem(item: FunctionalityCriterion) {
//    console.log(item);
//    this.router.navigate(['/functionalityCriterion/edit/' + item.id], {
//      state: { data: item }
//    });
//  }
//  createForm(): FormGroup {
//   return this.formBuilder.group({
//     description: [null ,   
//       Validators.compose([Validators.required]),
//   ],
//     functionalityId: [null,
//       Validators.compose([Validators.required]),
//     ]
//   });
// }

// }
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Functionality } from '../../../../shared/models/functionality';
import { FunctionalityService } from '../../../../core/http/functionality.service';
import { ConfirmationService, MenuItem, Message, MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Resource } from '../../../../shared/models/resource';
import { Task } from '../../../../shared/models/task';
import { FunctionalityCriterion } from '../../../../shared/models/functionalityCriterion';
import { FunctionalityCriterionService } from '../../../../core/auth/functionalityCriterion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FunctionalityCriterionDetailsComponent } from '../../functionality-criterion/functionality-criterion-details/functionality-criterion-details.component';

@Component({
  selector: 'app-functionality-details',
  templateUrl: './functionality-details.component.html',
  styleUrls: ['./functionality-details.component.css']
})
export class FunctionalityDetailsComponent implements OnInit {
  @ViewChild('formSaveCriterion') functionalityCriterionForm!: FormGroup;
  form!: FormGroup;
  formSaveCriterion!: FormGroup;

  messages: Message[] = [];
  currentFunctionality!: Functionality;
  resources: Resource[] = [];
  tasks: Task[] = [];
  visible = false;
  selectedTask: Task | null = null;
  loading = true;
  functionalityCriteria: FunctionalityCriterion[] = [];
  functionalityCriteriaIdBug: number[] = [];
  items: MenuItem[] | undefined;
  visibleDialog = false;
  editMode :boolean = true; // Indiquer que nous sommes en mode édition

  @Input() currentItemForm: FunctionalityCriterion;
  private functionalityCriterion: FunctionalityCriterion = { description: '', functionalityId: 0 };

  showDialog() {
    this.visibleDialog = true;
  }

  constructor(
    private serviceFunctionality: FunctionalityService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private serviceFunctionalityCriterion: FunctionalityCriterionService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.getList();
    this.showDetails(this.route.snapshot.params['id']);
    if (this.currentItemForm === undefined) {
      this.formSaveCriterion = this.createForm();
    }
  }

  showDetails(functionalityId: number) {
    this.visible = true;

    this.serviceFunctionality.read(functionalityId).subscribe(
      (data: Functionality) => {
        this.currentFunctionality = data;

        if (this.currentFunctionality.resources && this.currentFunctionality.resources.length > 0) {
          this.resources = this.currentFunctionality.resources;
        }

        if (this.currentFunctionality.tasks && this.currentFunctionality.tasks.length > 0) {
          this.tasks = this.currentFunctionality.tasks;
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération de la fonctionnalité :', error);
        if (error instanceof HttpErrorResponse) {
          console.error('Message d\'erreur :', error.error.text);
        }
      }
    );
  }

  selectTask(task: Task) {
    this.selectedTask = task;
  }

  getList() {
    this.serviceFunctionalityCriterion.listByFunctionalityId(this.route.snapshot.params['id']).subscribe(
      (items: FunctionalityCriterion[]) => {
        this.functionalityCriteria = items;
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors de la récupération des données : ', error);
        this.loading = false;
      }
    );
  }

  deleteItem(id: number) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cet élément?',
      header: 'Confirmation de suppression',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',

      accept: () => {
        if (id !== undefined) {
          this.serviceFunctionalityCriterion.delete(id).subscribe(
            () => {
              console.log("C'est : ", id)
              this.getList();
              this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'Critère de fonctionnalité supprimé avec succès' });
            },
            (error) => {
              this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la suppression' });
            }
          );
        }
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejeté', detail: 'Vous avez rejeté' });
      }
    });
  }


//   editItem(item: FunctionalityCriterion) {
//     this.functionalityCriterion = item; 
//     this.formSaveCriterion.patchValue({ description: item.description }); 
//     this.showDialog(); 

// }
editItem(item: FunctionalityCriterion) {
  this.functionalityCriterion = item; 
  this.formSaveCriterion.patchValue({ description: item.description }); 
  this.showDialog(); 
  this.editMode = true; // Indiquer que nous sommes en mode édition
}

  createForm(): FormGroup {
    return this.formBuilder.group({
      description: [null, Validators.required],
      functionalityId: [this.route.snapshot.params['id']]
    });
  }

  // save(): void {
  //   this.functionalityCriterion.description = this.formSaveCriterion.get('description')?.value;
  //   this.functionalityCriterion.functionalityId = this.route.snapshot.params['id'];

  //   this.serviceFunctionalityCriterion.create(this.functionalityCriterion).subscribe(
  //     (data) => {
  //       setTimeout(() => {
  //         this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Le critère de validation de la fonctionnalité a été ajouté avec succès.' });
  //       }, 300);
  //       this.getList()
  //       this.router.navigate([`/functionalities/details/${this.route.snapshot.params['id']}`]);
  //     },
  //     (error) => {
  //       this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message || 'Une erreur s\'est produite lors de l\'enregistrement du critère de validation de la fonctionnalité.' });
  //     }
  //   );

  //   // Réinitialiser le formulaire après l'enregistrement
  //   this.formSaveCriterion.reset();
  // }
  save(): void {
    if (this.editMode) {
      // Effectuer l'édition du critère existant
      this.functionalityCriterion.description = this.formSaveCriterion.get('description')?.value;
      this.functionalityCriterion.functionalityId = this.route.snapshot.params['id'];
  
      this.serviceFunctionalityCriterion.update(this.functionalityCriterion).subscribe(
        (data) => {
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Le critère de validation de la fonctionnalité a été mis à jour avec succès.' });
          }, 300);
          this.getList();
          this.router.navigate([`/functionalities/details/${this.route.snapshot.params['id']}`]);
          this.visibleDialog = false; // Désactiver la boîte de dialogue après l'édition
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message || 'Une erreur s\'est produite lors de la mise à jour du critère de validation de la fonctionnalité.' });
        }
      );
  
      // Réinitialiser le formulaire après l'enregistrement
      this.formSaveCriterion.reset();
      this.editMode = false; // Remettre l'état en mode nouveau critère
    } else {
      // Effectuer l'ajout d'un nouveau critère
      this.functionalityCriterion.description = this.formSaveCriterion.get('description')?.value;
      this.functionalityCriterion.functionalityId = this.route.snapshot.params['id'];
  
      this.serviceFunctionalityCriterion.create(this.functionalityCriterion).subscribe(
        (data) => {
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Le critère de validation de la fonctionnalité a été ajouté avec succès.' });
          }, 300);
          this.getList();
          this.router.navigate([`/functionalities/details/${this.route.snapshot.params['id']}`]);
          this.visibleDialog = false; // Désactiver la boîte de dialogue après l'ajout
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message || 'Une erreur s\'est produite lors de l\'enregistrement du critère de validation de la fonctionnalité.' });
        }
      );
  
      // Réinitialiser le formulaire après l'enregistrement
      this.formSaveCriterion.reset();
    }
  }

}
