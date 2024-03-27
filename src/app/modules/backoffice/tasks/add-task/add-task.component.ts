import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Router } from '@angular/router';
import { Task } from '../../../../shared/models/task';
import { TaskService } from '../../../../core/http/task.service';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  @ViewChild('form') taskForm: TaskFormComponent;

  private task: Task;
  messages: Message[] = [];


  constructor(
    private service: TaskService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.task = {
      taskName: '',
      description: '',
      duration: 0,
      functionalityId: null,
    };
  }

  save() {
    if (this.taskForm.form.valid) { // Vérifier la validité du formulaire
      this.task.taskName = this.taskForm.form.get('taskName')?.value;
      this.task.description = this.taskForm.form.get('description')?.value;
      this.task.duration = parseInt(this.taskForm.form.get('duration')?.value);
      this.task.functionalityId = parseInt(this.taskForm.form.get('functionalityId')?.value);
  
      this.service.create(this.task).subscribe(
        (data) => {
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The task has been successfully added.' });
          }, 100);
          this.router.navigate(['/tasks']);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || 'An error occurred while saving the task.' });

        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill in all required fields.' });
    }
  }
  
}
