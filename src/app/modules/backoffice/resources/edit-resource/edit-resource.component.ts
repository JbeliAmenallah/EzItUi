import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ResourceFormComponent } from '../resource-form/resource-form.component';
import { Resource } from '../../../../shared/models/resource';
import { ResourceService } from '../../../../core/http/resource.service';

@Component({
  selector: 'app-edit-resource',
  templateUrl: './edit-resource.component.html',
  styleUrls: ['./edit-resource.component.css']
})
export class EditResourceComponent implements OnInit {

  @ViewChild('form') resourceForm: ResourceFormComponent;
  @Input() resource: Resource;

  id: any;

  constructor(
    private service: ResourceService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    if (this.route.snapshot.paramMap.get('id') != undefined) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.getResource();
    } else {
      this.route.queryParams.subscribe((params) => {
        if (params['id'] !== undefined) {
          this.id = params['id'];
          this.getResource();
        } else if (this.router.getCurrentNavigation() != null) {
          const extrasState = this.router.getCurrentNavigation()?.extras.state;
          if (extrasState !== undefined && extrasState['data'] !== undefined) {
            this.resourceForm = extrasState['data'];
          } else {
            this.router.navigate(['/resources']);
          }
        }
      });
    }
  }

  ngOnInit(): void {
    this.getResource();
  }

  getResource() {
    this.service.read(this.id).subscribe({
      next: (item: Resource) => {
        this.resource = item;
        console.log(item);
      },
      error: (error) => {
        console.error("An error occurred while reading the resource:", error);
        this.goToList();
      }
    });
  }

  goToList() {
    this.router.navigate(['/resources']);
  }

  save() {
    this.resource.firstName = this.resourceForm.form.get('firstName')?.value;
    this.resource.lastName = this.resourceForm.form.get('lastName')?.value;
    this.resource.email = this.resourceForm.form.get('email')?.value;
    this.resource.phoneNumber = this.resourceForm.form.get('phoneNumber')?.value;
    this.resource.address = this.resourceForm.form.get('address')?.value;
    this.resource.position = this.resourceForm.form.get('position')?.value;
    this.resource.role = this.resourceForm.form.get('role')?.value;
    this.resource.hireDate = this.resourceForm.form.get('hireDate')?.value;
    this.service.update(this.resource).subscribe((data) => {
      this.router.navigate(["/resources"])
    });
  }

}
