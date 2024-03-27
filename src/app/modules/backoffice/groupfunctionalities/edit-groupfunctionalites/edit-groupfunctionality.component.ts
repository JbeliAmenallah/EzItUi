import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GroupFunctionalityFormComponent } from '../groupfunctionalities-form/groupfunctionality-form.component';
import { ActivatedRoute, Router } from "@angular/router";
import { GroupFunctionality } from '../../../../shared/models/groupfunctionality';
import { GroupFunctionalityService } from '../../../../core/http/groupfunctionality.service';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-groupfunctionality',
  templateUrl: './edit-groupfunctionality.component.html',
  styleUrl: './edit-groupfunctionality.component.css'
})
export class EditGroupfunctionalityComponent {

  @ViewChild('form') groupfunctionalityForm:GroupFunctionalityFormComponent;
  @Input() groupfunctionality:GroupFunctionality;
  public messages:Message[] = [] ;
  id:any;
  constructor(
    private service:GroupFunctionalityService,
    private router:Router,
    private route: ActivatedRoute,
    private messageService: MessageService
     ) {
    if (this.route.snapshot.paramMap.get('id') != undefined) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.getgroupfunctionality();
    } else {
      this.route.queryParams.subscribe((params) => {
        if (params['id'] !== undefined) {
          this.id = params['id'];
          this.getgroupfunctionality();
        } else if (this.router.getCurrentNavigation() != null) {
          const extrasState = this.router.getCurrentNavigation()?.extras.state;
          if (extrasState !== undefined && extrasState['data'] !== undefined) {
            this.groupfunctionalityForm = extrasState['data'];
          } else {
            this.router.navigate(['/groupfunctionalities']);
          }
        }
      });
    }
  }

  ngOnInit(): void {
    this.getgroupfunctionality();
  }

  getgroupfunctionality() {
    this.service.read(this.id).subscribe({
      next: (item: GroupFunctionality) => {
        this.groupfunctionality = item;
        console.log(item);
      },
      error: (error) => {
        console.error("An error occurred while reading the Group Functionality:", error);
        this.goToList();
      }
    });
  }

  goToList() {
    this.router.navigate(['/groupfunctionalities']);
  }

  save() {
    if (this.groupfunctionalityForm.form.valid) {
    this.groupfunctionality.groupName = this.groupfunctionalityForm.form.get('groupName')?.value;
    this.groupfunctionality.startDate = this.groupfunctionalityForm.form.get('startDate')?.value;
    this.groupfunctionality.duration = this.groupfunctionalityForm.form.get('duration')?.value;
    this.groupfunctionality.endDate = this.groupfunctionalityForm.form.get('endDate')?.value;
    this.groupfunctionality.projectId = this.groupfunctionalityForm.form.get('projectId')?.value;
  
    
    
    this.service.create(this.groupfunctionality).subscribe(
      (data) => {
        setTimeout(() => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The groupfunctionality has been successfully added.' });
        }, 100);
        this.router.navigate(['/groupfunctionalities']);
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || 'An error occurred while saving the group functionality.' });
      }
    );
  } else {
    this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill in all required fields.' });
  }
  }
  }