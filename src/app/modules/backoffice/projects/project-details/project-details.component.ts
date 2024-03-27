// import { Component, Input, OnInit } from '@angular/core';
// import { Project } from '../../../../shared/models/project';
// import { MessageService } from 'primeng/api';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ProjectService } from '../../../../core/http/project.service';

// @Component({
//   selector: 'app-project-details',
//   templateUrl: './project-details.component.html',
//   styleUrls: ['./project-details.component.css']
// })
// export class ProjectDetailsComponent implements OnInit {
//   project: Project;
//   id: number;
//   value = [
//     { label: 'Apps', color1: '#34d399', color2: '#fbbf24', value: 25, icon: 'pi pi-table' },
//     { label: 'Messages', color1: '#fbbf24', color2: '#60a5fa', value: 15, icon: 'pi pi-inbox' }

// ];
//   constructor(
//     private messageService: MessageService,
//     private route: ActivatedRoute,
//     private projectService: ProjectService,
//     private router: Router
//   ) { }

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       this.id = +params['id']; 
//       if (!isNaN(this.id)) {
//         this.projectService.read(this.id).subscribe(
//           (project: Project) => {
//             this.project = project;
//             console.log( "this.project:" , this.project)
//             console.log(this.project)
//           },
//           (error) => {
//             console.error('Erreur lors de la récupération des détails du projet :', error);
//           }
//         );

//       } else {
//         console.error('ID de projet invalide.');
//       }
//     });
//   }



  
// }
import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../../../shared/models/project';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../../core/http/project.service';
import { Functionality } from '../../../../shared/models/functionality';
import { FunctionalityService } from '../../../../core/auth/Functionality.service';
import { TaskService } from '../../../../core/auth/task.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  project: Project;
  id: number;
  data: any;
  options: any;
  value = [
    { label: 'Apps', color1: '#34d399', color2: '#fbbf24', value: 25, icon: 'pi pi-table' },
    { label: 'Messages', color1: '#fbbf24', color2: '#60a5fa', value: 15, icon: 'pi pi-inbox' }
  ];
  functionalities : Functionality[];

  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router,
    private functionalityService: FunctionalityService,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id']; 
      if (!isNaN(this.id)) {
        this.projectService.read(this.id).subscribe(
          (project: Project) => {
            this.project = project;
            console.log( "this.project:", this.project);
            console.log(this.project);
          },
          (error) => {
            console.error('Erreur lors de la récupération des détails du projet :', error);
          }
        );

        this.functionalityService.getFunctionalitiesByProjectId(this.id).subscribe(
          (data) => {
            this.functionalities = data;
            console.log("Liste des fonctionnalités du projet:", this.functionalities);
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            // Pour chaque fonctionnalité, récupérez les tâches associées
            for (let functionality of this.functionalities) {
              this.taskService.getTasksByFunctionalityId(functionality.id).subscribe(
                  (tasks) => {
                      functionality.tasks = tasks;
                      console.log("Liste des tâches pour la fonctionnalité", functionality.functionalityName, ":", tasks);
                      
                      // Définir les données du graphique pour chaque tâche
                      functionality.tasks.forEach(task => {
                          const data = {
                              labels: ['Total Duration', 'Remaining Duration'],
                              datasets: [
                                  {
                                      label: 'Duration',
                                      data: [task.totalDuration, task.duration* 3600 - task.totalDuration],
                                      backgroundColor: [documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--red-500')],
                                      hoverBackgroundColor: [documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--red-400')]
                                  }
                              ]
                          };
                          task.chartData = data; // Ajouter les données du graphique à la tâche
                      });
                  },
                (error) => {
                  console.error("Erreur lors de la récupération des tâches pour la fonctionnalité", functionality.functionalityName, ":", error);
                }
              );
            }
          }
        );
      } else {
        console.error('ID de projet invalide.');
      }
    });
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
}