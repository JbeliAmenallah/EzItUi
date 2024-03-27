import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupFunctionality } from '../../../../shared/models/groupfunctionality';
import { GroupFunctionalityService } from '../../../../core/http/groupfunctionality.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-groupfunctionality-details',
  templateUrl: './groupfunctionality-details.component.html',
  styleUrl: './groupfunctionality-details.component.css'
})

export class GroupfunctionalityDetailsComponent {
 
    currentGroupFunctionality: GroupFunctionality;
  
    visible: boolean = false;
  
    constructor(
      private groupFunctionalityService: GroupFunctionalityService, 
      private route: ActivatedRoute
    ) {}
  
    ngOnInit(): void {
      this.showDetails(this.route.snapshot.params['id']);
    }
  
    showDetails(groupFunctionalityId: number) { 
      this.visible = true;
    
      this.groupFunctionalityService.read(groupFunctionalityId).subscribe( 
        (data: GroupFunctionality) => { 
          this.currentGroupFunctionality = data;
        },
        (error) => {
          console.error('Error fetching group functionality:', error);
          if (error instanceof HttpErrorResponse) {
            console.error('Error message:', error.error.text);
        
          }
        }
      );
    }
  }


