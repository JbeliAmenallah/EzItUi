import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FunctionalityCriterion } from '../../../../shared/models/functionalityCriterion';
import { MessageService } from 'primeng/api';
import { Functionality } from '../../../../shared/models/functionality';
import { FunctionalityService } from '../../../../core/auth/Functionality.service';

@Component({
  selector: 'app-functionality-criterion-form',
  templateUrl: './functionality-criterion-form.component.html',
  styleUrls: ['./functionality-criterion-form.component.css']
})
export class FunctionalityCriterionFormComponent implements OnInit {
  
  form: FormGroup;
  functionalities: Functionality[] = [];
  functionalityOptions: any[] = [];
  @Input() currentItemForm: FunctionalityCriterion; 

  constructor(
    private formBuilder: FormBuilder,
    public messageService: MessageService,
    private serviceFunctionality: FunctionalityService
  ) { }

  ngOnInit(): void {
    if (this.currentItemForm === undefined) {
      this.form = this.createForm();  
    } else {
      this.form = this.updateForm();   
    } 

    this.serviceFunctionality.list().subscribe(
      (data: Functionality[]) => {
        this.functionalities = data;
        console.log(data);
        // Correction : map functionality pour créer les options correctement
        this.functionalityOptions = this.functionalities.map(functionality => ({ label: functionality.functionalityName, value: functionality.id }));
      }
    );
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      description: [null ,   
        Validators.compose([Validators.required]),
    ],
      functionalityId: [null,
        Validators.compose([Validators.required]),
      ]
    });
  }

  updateForm(){
    return this.formBuilder.group({
      description: [this.currentItemForm.description ,
        Validators.compose([Validators.required])]
        ,
      functionalityId: [this.currentItemForm.functionalityId,
        Validators.compose([Validators.required])]
    });
  }
}
