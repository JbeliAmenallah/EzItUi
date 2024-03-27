import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StopwatchService } from '../../../../core/auth/Stopwatch.service';
import { Task } from '../../../../shared/models/task';
import { TaskService } from '../../../../core/http/task.service';

@Component({
  selector: 'app-add-stopwatch',
  templateUrl: './add-stopwatch.component.html',
  styleUrls: ['./add-stopwatch.component.css']
})
export class AddStopwatchComponent implements OnInit {
  taskForm: FormGroup;
  tasks: Task[] = [];  
  selectedTaskId: number | null = null;
  
  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private chronService : StopwatchService
  ) { }

  ngOnInit(): void {
    this.taskService.list().subscribe(
      (data: any[]) => {
        this.tasks = data;
      }
    );

    this.taskForm = this.formBuilder.group({
      selectedTask: ['', Validators.required],
      equipeId: ['', Validators.required]
    });
  }

  onSubmit() {
    // Accédez aux valeurs sélectionnées dans le formulaire
    const selectedTaskId = this.taskForm.get('selectedTask').value;

const chron = {
  "taskId": selectedTaskId


}
    

   this.chronService.create(chron).subscribe(

   )
  }
}
