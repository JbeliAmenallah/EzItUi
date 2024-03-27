import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { TaskFormComponent } from '../task-form/task-form.component'; // Assurez-vous d'importer le bon composant pour le formulaire de tâche
import { Task } from '../../../../shared/models/task';
import { TaskService } from '../../../../core/http/task.service';
import { Message, MessageService } from 'primeng/api';



@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  @ViewChild('form') taskForm: TaskFormComponent;
  @Input() task: Task;
  messages: Message[] = [];


  id: any;

  constructor(
    private service: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService

  ) {
    if (this.route.snapshot.paramMap.get('id') != undefined) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.getTask();
    } else {
      this.route.queryParams.subscribe((params) => {
        if (params['id'] !== undefined) {
          this.id = params['id'];
          this.getTask();
        } else if (this.router.getCurrentNavigation() != null) {
          const extrasState = this.router.getCurrentNavigation()?.extras.state;
          if (extrasState !== undefined && extrasState['data'] !== undefined) {
            this.taskForm = extrasState['data'];
          } else {
            this.router.navigate(['/tasks']);
          }
        }
      });
    }
  }

  ngOnInit(): void {
    this.getTask();
  }

  getTask() {
    this.service.read(this.id).subscribe({
      next: (item: Task) => {
        this.task = item;
        console.log(item);
      },
      error: (error) => {
        console.error("Une erreur s'est produite lors de la lecture de la tâche :", error);
        this.goToList();
      }
    });
  }

  goToList() {
    this.router.navigate(['/tasks']);
  }

  save() {
    console.log(this.taskForm.form.valid) ;
    if (this.taskForm.form.valid){
      this.task.taskName = this.taskForm.form.get('taskName')?.value;
      this.task.description = this.taskForm.form.get('description')?.value;
      this.task.duration = parseInt(this.taskForm.form.get('duration')?.value);
      this.task.functionalityId = parseInt(this.taskForm.form.get('functionalityId')?.value);
      this.service.update(this.task).subscribe(
        (data) => {
      
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The task has been successfully edit.' });
  
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The task has been successfully edit.' });
          }, 100);
          this.router.navigate(['/tasks']);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || 'An error occurred while saving the task.' });
  
        }
      );
    }else {
      this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill in all required fields.' });
    }
    
  
    
  }
  
  
  
}
