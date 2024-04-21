import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FinanceConfiguration } from '../../../../shared/models/financeConfiguration';
import { FinanceConfigurationService } from '../../../../core/http/financeConfiguration.service';

@Component({
  selector: 'app-financeconfiguration-edit',
  templateUrl: './financeconfiguration-edit.component.html',
  styleUrls: ['./financeconfiguration-edit.component.css']
})
export class FinanceConfigurationEditComponent implements OnInit {
  financeConfig: FinanceConfiguration;
  editForm: FormGroup;
  loading: boolean = false;
  error: string = null;
  
  @Input() formFinance: FormGroup; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private financeConfigService: FinanceConfigurationService
  ) { }

  ngOnInit(): void {
    this.loadFinanceConfiguration();
  }

  loadFinanceConfiguration(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.loading = true;
    this.financeConfigService.getFinanceConfigurationById(id).subscribe(
      (financeConfig: FinanceConfiguration) => {
        this.financeConfig = financeConfig;
        this.loading = false;
        this.initForm();
      },
      (error) => {
        console.error('Error fetching finance configuration:', error);
        this.error = 'Failed to fetch finance configuration. Please try again.';
        this.loading = false;
      }
    );
  }

  initForm(): void {
    this.editForm = this.formBuilder.group({
      cnss: [this.financeConfig.cnss],
      css1: [this.financeConfig.css1],
      css2: [this.financeConfig.css2],
      css3: [this.financeConfig.css3],
      css4: [this.financeConfig.css4],
      css5: [this.financeConfig.css5],
      irpp1: [this.financeConfig.irpp1],
      irpp2: [this.financeConfig.irpp2],
      irpp3: [this.financeConfig.irpp3],
      irpp4: [this.financeConfig.irpp4],
      irpp5: [this.financeConfig.irpp5],
      tva: [this.financeConfig.tva],
      deduction: [this.financeConfig.deduction],
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedFinanceConfig: FinanceConfiguration = { ...this.editForm.value };
      this.financeConfigService.updateFinanceConfiguration(this.financeConfig.id, updatedFinanceConfig).subscribe(
        () => {
          this.router.navigate(['/financeconfiguration/list']);
        },
        (error) => {
          console.error('Error updating finance configuration:', error);
          this.error = 'Failed to update finance configuration. Please try again.';
        }
      );
    }
  }

  onCancel(): void {
    this.router.navigate(['/financeconfiguration/list']);
  }
}
