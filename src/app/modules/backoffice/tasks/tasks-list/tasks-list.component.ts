import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../../../shared/models/task';
import { TaskService } from '../../../../core/http/task.service';
import { ConfirmationService, MessageService  } from 'primeng/api';
import { Functionality } from '../../../../shared/models/functionality';
import { FunctionalityService } from '../../../../core/http/functionality.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  tasks: Task[];
  loading: boolean = false;
  functionality :Functionality  ;

  constructor(
    private service: TaskService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private functionalityService : FunctionalityService
  )
{ }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.service.list().subscribe(
      (items: Task[]) => {
        this.tasks = items;

        this.tasks.forEach(task => {
          this.readFunctionality(task.functionalityId);
      });

      }
    );
  }

  editItem(item: Task) {
    console.log(item);
    this.router.navigate(['/tasks/edit/' + item.id], {
      state: { data: item }
    });
  }


  deleteItem(id: number) {
    this.confirmationService.confirm({
        message: 'Êtes-vous sûr de vouloir supprimer cet élément?',
        header: 'Confirmation de suppression',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: "p-button-danger p-button-text",
        rejectButtonStyleClass: "p-button-text p-button-text",
        acceptIcon: "pi pi-check",
        rejectIcon: "pi pi-times",
        accept: () => {
            if (id !== undefined) {
                this.service.delete(id).subscribe(
                    () => {
                        this.getList();
                        this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'Task supprimé avec succès' });
                    },
                    (error) => {
                        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la suppression' });
                    }
                );
            }
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Vous avez rejeté' });
        }
    });
}

  moveToDetails(taskId: number) {
    this.router.navigate(['/tasks/details/' + taskId]);
  }

  formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

readFunctionality(id: number) {
    this.functionalityService.read(id).subscribe((data) => {
        // Mettez à jour la propriété 'functionalities' de la tâche avec les données de la fonctionnalité
        const taskToUpdate = this.tasks.find(task => task.functionalityId === id);
        if (taskToUpdate) {
            taskToUpdate.functionalities = data;
        }
    });
  }
}
