import { Component, OnInit } from '@angular/core';
import { PoliciesService } from '../../../../core/http/policies.service';
import { Policies } from '../../../../shared/models/policies';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.css']
})
export class PolicyListComponent implements OnInit {

  policies: Policies[];
  loading: boolean = false;
  selectedPolicy: Policies;

  constructor(
    private policiesService: PoliciesService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.fetchPolicies();
  }

  fetchPolicies(): void {
    this.loading = true;
    this.policiesService.getPolicies().subscribe(
      (policies: Policies[]) => {
        this.policies = policies.reverse(); // Reverse the array if needed
        this.loading = false;
      },
      error => {
        console.error('Error fetching policies:', error);
        this.loading = false;
      }
    );
  }

  editPolicy(policy: Policies): void {
    console.log('Editing policy:', policy);
    this.router.navigate(['/policy/edit/' + policy.policyId], {
      state: { data: policy }
    });
  }

  deletePolicy(policyId: number): void {
    console.log('Deleting policy with ID:', policyId);
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cette politique ?',
      header: 'Confirmation de suppression',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      accept: () => {
        this.policiesService.deletePolicy(policyId).subscribe(
          () => {
            this.fetchPolicies(); // Refresh policies after deletion
            this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'La politique a été supprimée avec succès' });
          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la suppression de la politique' });
          }
        );
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejeté', detail: 'Vous avez rejeté la suppression de la politique' });
      }
    });
  }

  openPolicyDetails(policy: Policies): void {
    console.log('Opening details for policy:', policy);
    // Navigate to policy details page or show details dialog
  }
}
