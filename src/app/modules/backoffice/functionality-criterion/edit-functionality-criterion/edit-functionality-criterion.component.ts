// import { Component, Input, OnInit, ViewChild } from '@angular/core';
// import { FunctionalityCriterionFormComponent } from '../functionality-criterion-form/functionality-criterion-form.component';
// import { FunctionalityCriterion } from '../../../../shared/models/functionalityCriterion';
// import { Message, MessageService } from 'primeng/api';
// import { ActivatedRoute, Router } from '@angular/router';
// import { FunctionalityService } from '../../../../core/auth/Functionality.service';
// import { FunctionalityCriterionService } from '../../../../core/auth/functionalityCriterion.service';
// import { Functionality } from '../../../../shared/models/functionality';

// @Component({
//   selector: 'app-edit-functionality-criterion',
//   templateUrl: './edit-functionality-criterion.component.html',
//   styleUrl: './edit-functionality-criterion.component.css'
// })
// export class EditFunctionalityCriterionComponent implements OnInit {

//   @ViewChild('form') functionalityCriterionForm: FunctionalityCriterionFormComponent;
//   @Input() functionalityCriterion: FunctionalityCriterion;
//   messages: Message[] = [];
//   id: any;

//   constructor(
//     private serviceFunctionality: FunctionalityService,
//     private route: ActivatedRoute,
//     private router: Router,
//     private messageService: MessageService ,
//     private serviceFunctionalityCriterion : FunctionalityCriterionService


//   ){
//     if (this.route.snapshot.paramMap.get('id') != undefined) {
//       this.id = this.route.snapshot.paramMap.get('id');
//       this.getFunctionalityCriterion();
//     } else {
//       this.route.queryParams.subscribe((params) => {
//         if (params['id'] !== undefined) {
//           this.id = params['id'];
//           this.getFunctionalityCriterion();
//         } else if (this.router.getCurrentNavigation() != null) {
//           const extrasState = this.router.getCurrentNavigation()?.extras.state;
//           if (extrasState !== undefined && extrasState['data'] !== undefined) {
//             this.functionalityCriterionForm = extrasState['data'];
//           } else {
//             this.router.navigate(['/functionalityCriterion']);
//           }
//         }
//       });
//     }
//   }
//   getFunctionalityCriterion() {
//    this.serviceFunctionalityCriterion.read(this.id).subscribe(
//     {next:(item : FunctionalityCriterion)=>{
//       this.functionalityCriterion=item;
//       console.log(item)
//     } ,error: (error) => {
//       console.error("Une erreur s'est produite lors de la lecture de la critères de  fonctionnalité :", error);
//       this.goToList();
//     }
  
//   }
//    )
//   }
//   goToList() {
//     this.router.navigate(['/functionalityCriterion']);
//   }
//   ngOnInit(): void {
//     throw new Error('Method not implemented.');
//   }
//   save() {
//     if (this.functionalityCriterionForm.form.valid) {
//     this.functionalityCriterion.description = this.functionalityCriterionForm.form.get('description')?.value ;
//     this.functionalityCriterion.functionalityId = parseInt(this.functionalityCriterionForm.form.get('functionalityId')?.value);
//     this.serviceFunctionality.read(this.functionalityCriterion.functionalityId).subscribe(
//       (functionality: Functionality) => {
//         this.functionalityCriterion.functionalityId = functionality.id;})
//     this.serviceFunctionalityCriterion.update(this.functionalityCriterion).subscribe((data) => {
//       setTimeout(() => {
//         this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The functionality has been successfully update.' });
//       }, 300);
//       this.router.navigate(['/functionalityCriterion']);
//     },
//     (error) => {
//       this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || 'An error occurred while saving the functionality.' });

//     }
    
//     );
//   }else {
//       this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill in all required fields.' });
//     }


//   }
// }
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FunctionalityCriterionFormComponent } from '../functionality-criterion-form/functionality-criterion-form.component';
import { FunctionalityCriterion } from '../../../../shared/models/functionalityCriterion';
import { Message, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { FunctionalityService } from '../../../../core/auth/Functionality.service';
import { FunctionalityCriterionService } from '../../../../core/auth/functionalityCriterion.service';
import { Functionality } from '../../../../shared/models/functionality';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-edit-functionality-criterion',
  templateUrl: './edit-functionality-criterion.component.html',
  styleUrls: ['./edit-functionality-criterion.component.css']
})
export class EditFunctionalityCriterionComponent implements OnInit {

  @ViewChild('form') functionalityCriterionForm: FunctionalityCriterionFormComponent;
  @Input() functionalityCriterion: FunctionalityCriterion;
  messages: Message[] = [];
  id: any;
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private serviceFunctionality: FunctionalityService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private serviceFunctionalityCriterion: FunctionalityCriterionService
  ) {
    this.id = this.route.snapshot.paramMap.get('id') || this.route.queryParams['id'];
    if (this.id) {
      this.getFunctionalityCriterion();
    } else {
      this.router.navigate(['/functionalityCriterion']);
    }
  }

  getFunctionalityCriterion() {
    this.serviceFunctionalityCriterion.read(this.id).pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (item: FunctionalityCriterion) => {
        this.functionalityCriterion = item;
      },
      (error) => {
        console.error("An error occurred while reading the functionality criterion:", error);
        this.goToList();
      }
    );
  }

  goToList() {
    this.router.navigate(['/functionalityCriterion']);
  }

  ngOnInit(): void {
    // Optionally, implement initialization logic here
  }

  save() {
    if (this.functionalityCriterionForm.form.valid) {
      this.functionalityCriterion.description = this.functionalityCriterionForm.form.get('description')?.value;
      this.functionalityCriterion.functionalityId = parseInt(this.functionalityCriterionForm.form.get('functionalityId')?.value);

      this.serviceFunctionality.read(this.functionalityCriterion.functionalityId).pipe(
        takeUntil(this.destroy$)
      ).subscribe(
        (functionality: Functionality) => {
          this.functionalityCriterion.functionalityId = functionality.id;
          this.updateFunctionalityCriterion();
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Functionality not found.' });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill in all required fields.' });
    }
  }

  updateFunctionalityCriterion() {
    this.serviceFunctionalityCriterion.update(this.functionalityCriterion).pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The functionality has been successfully updated.' });
        this.router.navigate(['/functionalityCriterion']);
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || 'An error occurred while saving the functionality.' });
      }
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

