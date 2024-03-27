import { Component, OnInit } from '@angular/core';
import { Resource } from '../../../../shared/models/resource'; // Importer la classe Resource
import { ResourceService } from '../../../../core/http/resource.service'; // Importer le service ResourceService
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resource-details',
  templateUrl: './resource-details.component.html',
  styleUrls: ['./resource-details.component.css']
})
export class ResourceDetailsComponent implements OnInit {
  
  currentResource: Resource; 
  visible: boolean = false;

  constructor(
    private resourceService: ResourceService, 
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.showDetails(this.route.snapshot.params['id']);
  }

  showDetails(resourceId: number) {
    this.visible = true;
  
    this.resourceService.read(resourceId).subscribe(
      (data: Resource) => {
        this.currentResource = data; 
      },
      (error) => {
        console.error('Erreur lors de la récupération de la ressource:', error);
        if (error instanceof HttpErrorResponse) {
          console.error('Message d\'erreur:', error.error.text);
        }
      }
    );
  }
}
