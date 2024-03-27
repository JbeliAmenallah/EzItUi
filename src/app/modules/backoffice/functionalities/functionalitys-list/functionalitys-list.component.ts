import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Functionality } from '../../../../shared/models/functionality';
import { FunctionalityService } from '../../../../core/http/functionality.service';
import { ConfirmationService, MessageService  } from 'primeng/api';
import { Resource } from '../../../../shared/models/resource';
import { ResourceService } from '../../../../core/auth/Resource.service';
import { Project } from '../../../../shared/models/project';
import { ProjectService } from '../../../../core/http/project.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-functionalitys-list',
  templateUrl: './functionalitys-list.component.html',
  styleUrls: ['./functionalitys-list.component.css']
})
export class FunctionalitysListComponent implements OnInit {

  functionalities: Functionality[];
  resources: Resource[] = [];
  currentProject: Project = {} as Project;
  currentResource : Resource = {} as Resource;
  selectedResource: { id: number, firstName : string , lastName : string} | null = null;
  currentFunctionality: Functionality ;
  loading: boolean = false;
  visible: boolean = false;
  formGroup: FormGroup;

  visibleDetails: boolean = false;
  constructor(
    private serviceFunctionality: FunctionalityService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    public resourceService: ResourceService,
    public projectService : ProjectService

  ) { }

  ngOnInit(): void {
    this.getList();
    console.log("functionality.resources");

  
    this.formGroup = new FormGroup({
      selectedResources: new FormControl<any[]>([]),
  });
 
  
  }


  getList() {
    this.serviceFunctionality.list().subscribe(
      (items: Functionality[]) => {
        this.functionalities = items;
        console.log(this.functionalities);

      }
    );
  }

  showDialog(functionalityId: number) {
    this.visible = true;
  
    this.serviceFunctionality.read(functionalityId).subscribe(
      (data: Functionality) => {
        this.currentFunctionality = data;
         console.log(this.currentFunctionality.resources)
        // Assurez-vous que le service retourne un tableau de projets (Project[])
        this.projectService.read(this.currentFunctionality.projectId).subscribe(
          (data: Project) => {
            this.currentProject = data;
  
            this.resources = this.currentProject.resources ? this.currentProject.resources : [];
            this.currentFunctionality.resources = this.resources ;
            console.log("  this.currentProject : " ,   this.currentProject.projectName)
            console.log("  this.currentProject : " ,   this.currentProject.projectName)
            console.log("  this.currentFunctionality : " ,   this.currentFunctionality.resources)
          },
          (error) => {
            console.error('Erreur lors de la récupération du projet:', error);
          }
        );
      },
      (error) => {
        console.error('Erreur lors de la récupération de la fonctionnalité:', error);
  
        if (error instanceof HttpErrorResponse) {
          console.error('Message d\'erreur:', error.error.text);
        }
      }
    );
  }
  
  showDetails(id: number)
  {
   console.log(id);
   this.router.navigate(['/functionalities/details/' +id], {
     state: { data: id }
   });
 }

  
      
  editItem(item: Functionality)
   {
    console.log(item);
    this.router.navigate(['/functionalities/edit/' + item.id], {
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
                this.serviceFunctionality.delete(id).subscribe(
                    () => {
                        this.getList();
                        this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'Functionality supprimé avec succès' });
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
assignResourceToFunctionality() {
  console.log(this.resources);

  if (this.selectedResource && this.selectedResource.id !== undefined && this.selectedResource.id !== null) {
    console.log("Selected resource ID:", this.selectedResource.id);
    console.log("Selected functionality ID:", this.currentFunctionality.id);
    this.serviceFunctionality.assignResourceToFunctionality(this.currentFunctionality.id, this.selectedResource.id).subscribe(
      () => {
      
        this.messageService.clear();
        this.messageService.add({
          key: "toastAddResource", severity: 'success', summary: 'Success',
          detail: this.selectedResource.firstName + " " + this.selectedResource.lastName + ' successfully added to functionality: ' + this.currentFunctionality.functionalityName
        });
        console.log(this.selectedResource.firstName + " " + this.selectedResource.lastName + " successfully added to functionality:", this.currentFunctionality.functionalityName);
        this.resourceService.read(this.currentResource.id).subscribe(
          (data: Resource) => { 
            this.currentFunctionality.resources.push(data) ;
          }
        )
        console.log("this is the resources : ", this.currentFunctionality.resources)
      },
      (error) => {
        this.messageService.clear();
        this.messageService.add({
          key: "toastAddResource", severity: 'error', summary: 'Error',
          detail: "Resource already assigned to this functionality"
        });
      }
    );

  } else {
    this.messageService.add({
      key: "toastAddResource", severity: 'error', summary: 'Error',
      detail: "No resource selected"
    });
  }
}

assignResourcesToFunctionality() {
  const selectedResources = this.formGroup.get('selectedResources')?.value;

  if (selectedResources && selectedResources.length > 0) {
    for (const selectedResource of selectedResources) {
      const resourceId = selectedResource.id;

      if (!this.isResourceAssigned(resourceId)) {
        this.serviceFunctionality.assignResourceToFunctionality(this.currentFunctionality.id, resourceId).subscribe(
          () => {
            this.messageService.clear();
            this.messageService.add({
              key: "toastAddResource", severity: 'success', summary: 'Success',
              detail: selectedResource.firstName + " " + selectedResource.lastName + ' a été ajouté avec succès à la fonctionnalité : ' + this.currentFunctionality.functionalityName
            });

            // Ajouter la ressource à la liste des ressources de la fonctionnalité
            this.resourceService.read(resourceId).subscribe(
              (data: Resource) => { 
                this.currentFunctionality.resources.push(data);
              }
            );
          },
          (error) => {
            this.messageService.clear();
            this.messageService.add({
              key: "toastAddResource", severity: 'error', summary: 'Error',
              detail: "La ressource est déjà assignée à cette fonctionnalité"
            });
          }
        );
      }
    }

    // Rafraîchir la liste des ressources après chaque ajout
    this.refreshResourceList();
  } else {
    console.warn("Aucune ressource sélectionnée");
  }
}

refreshResourceList() {
  // Rafraîchir la liste des ressources en excluant celles déjà affectées à la fonctionnalité
  this.resourceService.list().subscribe(
    (resources: Resource[]) => {
      this.resources = resources;

      // Réinitialiser le formulaire et le contrôle après chaque ajout
      this.formGroup.get('selectedResources')?.reset([]);
    }
  );
}


isResourceAssigned(resourceId: number): boolean {
  // Vérifier si la ressource est déjà assignée au projet
  return this.currentFunctionality.resources.some(functionalityResource => functionalityResource.id === resourceId);
}


getUnassignedResources(): any[] {
  // Filtrer les ressources non assignées au projet
  return this.resources.filter(resource => !this.isResourceAssigned(resource.id));
}



}
