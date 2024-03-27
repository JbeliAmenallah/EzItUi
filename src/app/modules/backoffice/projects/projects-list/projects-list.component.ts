import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Project } from '../../../../shared/models/project';
import { Resource } from '../../../../shared/models/resource';
import { ProjectService } from '../../../../core/auth/project.service';
import { ResourceService } from '../../../../core/auth/Resource.service';
import { ConfirmationService, MessageService , MenuItem  } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-projects-list',
    templateUrl: './projects-list.component.html',
    styleUrls: ['./projects-list.component.css'] ,
})

export class ProjectsListComponent implements OnInit {
    projects: Project[];
    resources: Resource[] = [];
    currentResource : Resource ;
    selectedResource: { id: number, firstName : string , lastName : string} | null = null;
    currentProject: Project ;
    loading: boolean = false;
    visible: boolean = false;
    items: MenuItem[] | undefined;
    formGroup: FormGroup;

    constructor(
        private service: ProjectService,
        private router: Router,
        public projectService: ProjectService,
        public resourceService: ResourceService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
    ) { }

    ngOnInit(): void {
        this.formGroup = new FormGroup({
            selectedResources: new FormControl<any[]>([]),
        }
        
        );

   
        this.getList();

        this.resourceService.list().subscribe(
            (data: any[]) => {
                this.resources = data;
            }
        );
        
    }

    getList() {
        this.service.list().subscribe(
            (items: Project[]) => {
                this.projects = items;
            }
        );
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
                            this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'Projet supprimé avec succès' });
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
    
 
   showDialog( projectId : number) {
        this.visible = true;
        this.projectService.read(projectId).subscribe( (data: Project)=>
        this.currentProject  = data 
        )
        
    }
    addResourceToProject() {
        console.log(this.resources)
        if (this.selectedResource.id) {
            console.log("ID de la ressource sélectionnée :", this.selectedResource.id);
            console.log("ID de la projet sélectionnée :", this.currentProject.id);
            

            this.projectService.addResource(this.currentProject.id, this.selectedResource.id).subscribe(
                () => {
                    this.resourceService.read(this.selectedResource.id).subscribe(
                        (data)=>{
                            this.currentResource = data ;
                        }
                    )
                    console.log(this.currentResource)
                    this.messageService.clear();
                    this.messageService.add({
                        key:"toastAddResource"  ,severity: 'success', summary: 'Success', detail: this.selectedResource.firstName + " " +  this.selectedResource.lastName+' ajoutée avec succès au projet : '+ this.currentProject.projectName
                    })
                    console.log( this.selectedResource.firstName + " " +  this.selectedResource.lastName+" ajoutée avec succès au projet :", this.currentProject.projectName);
                },
                (error) => {
                    this.messageService.clear();
                    this.messageService.add({
                        key:"toastAddResource"  ,severity: 'error', summary: 'Error', detail: "Ressource déjà assignée à ce projet "
                    })
                }
            );

        } else {
            console.warn("Aucune ressource sélectionnée");
        }
    }


    editItem(item: Project) {
        console.log(item);
        this.router.navigate(['/projects/edit/' + item.id], {
            state: { data: item },
        });
    }

    addResourcesToProject() {
        const selectedResources = this.formGroup.get('selectedResources')?.value;
    
        if (selectedResources && selectedResources.length > 0) {
            const projectID = this.currentProject.id;
    
            for (const selectedResource of selectedResources) {
                const resourceID = selectedResource.id;
    
                if (!this.isResourceAssigned(resourceID)) {
                    this.projectService.addResource(projectID, resourceID).subscribe(
                        () => {
                            this.resourceService.read(resourceID).subscribe(
                                (data) => {
                                    this.currentResource = data;
    
                                    // Rafraîchir la liste des ressources après chaque ajout
                                    this.resourceService.list().subscribe(
                                        (resources: Resource[]) => {
                                            this.resources = resources;
    
                                            // Réinitialiser le formulaire et le contrôle après chaque ajout
                                            this.formGroup.get('selectedResources')?.reset([]);
                                        }
                                    );
    
                                    this.messageService.clear();
                                    this.messageService.add({
                                        key: "toastAddResource",
                                        severity: 'success',
                                        summary: 'Success',
                                        detail: 'The operation has been successfully recorded for the project: ' + this.currentProject.projectName
                                    });
                                    setTimeout(() => {this.visible =false ; }, 100);
                                }
                            );
                        },
                        (error) => {
                            this.messageService.clear();
                            this.messageService.add({
                                key: "toastAddResource",
                                severity: 'error',
                                summary: 'Error',
                                detail: "Ressource déjà assignée à ce projet "
                            });
                        }
                    );
                }
            }
        } else {
            console.warn("Aucune ressource sélectionnée");
        }
    }
    
    
    
    getUnassignedResources(): any[] {
        // Filtrer les ressources non assignées au projet
        return this.resources.filter(resource => !this.isResourceAssigned(resource.id));
    }
    
    isResourceAssigned(resourceId: number): boolean {
        // Vérifier si la ressource est déjà assignée au projet
        return this.currentProject.resources.some(projectResource => projectResource.id === resourceId);
    }
    

    moveToDetails(projectId: number) {
        this.router.navigate(['/projects/details/' + projectId]);
      }
}
