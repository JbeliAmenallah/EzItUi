import { Component } from '@angular/core';
import { PoliciesService } from '../../../../core/http/policies.service';
import { Policies } from '../../../../shared/models/policies';

@Component({
  selector: 'app-add-policy',
  templateUrl: './add-policy.component.html',
  styleUrl: './add-policy.component.css'
})
export class AddPolicyComponent {
  policies: any[] = [];
  loading: boolean = true;
policy:Policies;
  constructor(private policiesService: PoliciesService) {}

  ngOnInit() {
    
  }


}
