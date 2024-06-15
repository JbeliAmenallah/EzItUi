import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { Employee } from '../../../shared/models/employee';
import { EmployeeService } from '../../../core/http/employee.service';
import { KeycloakProfile } from 'keycloak-js';


@Component({
    selector: 'app-employee-profile',
    templateUrl: './employee-profile.component.html',
    styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {

    employeeForm: FormGroup;
    user: Employee;
    public profile: KeycloakProfile | undefined;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private employeeService: EmployeeService
    ) { }

    ngOnInit(): void {
        this.profile=this.authService.profile;
        // Initialize the form and fetch employee data
        this.initializeForm();
        const username = this.authService.getAuthenticatedUsername();
        this.fetchEmployeeByUsername(username);
    }

    initializeForm() {
        // Define form controls and validators
        this.employeeForm = this.fb.group({
            username: [{ value: '', disabled: true }, Validators.required],
            firstName: ['', Validators.required],
            lastName: ['',],
            email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            fax: [''],
            location: ['', Validators.required],
            modeDePaiement: ['', Validators.required],
            numCompte: ['', Validators.required],
            password: [{ value: '', disabled: true }]
        });
    }

    fetchEmployeeByUsername(username: string) {
        // Fetch employee data based on username
        this.employeeService.getEmployeeByUsername(username).subscribe(
            (employee: Employee) => {
                this.user = employee;
                this.populateForm(employee);
            },
            error => {
                console.error('Error fetching employee data', error);
            }
        );
    }

    populateForm(employee: Employee) {
        // Populate form fields with employee data
        let firstName = '';
        let lastName = '';
        const nameParts = employee.name.split(' ');

        if (nameParts.length === 1) {
            firstName = nameParts[0];
        } else if (nameParts.length > 1) {
            firstName = nameParts[0];
            lastName = nameParts.slice(1).join(' ');
        }

        this.employeeForm.patchValue({
            username: employee.username,
            firstName: firstName,
            lastName: lastName,
            email: employee.email,
            phone: employee.phone,
            fax: employee.fax,
            location: employee.location,
            modeDePaiement: employee.modeDePaiement,
            numCompte: employee.numCompte,
            password: employee.password
        });
    }

    patchEmployee() {
        if (this.employeeForm.valid) {
            const updatedEmployee: Partial<Employee> = {
                name: `${this.employeeForm.value.firstName} ${this.employeeForm.value.lastName}`,
                phone: this.employeeForm.value.phone,
                fax: this.employeeForm.value.fax,
                location: this.employeeForm.value.location,
                modeDePaiement: this.employeeForm.value.modeDePaiement,
                numCompte: this.employeeForm.value.numCompte
            };

            this.employeeService.patchEmployee(this.user.contactId, updatedEmployee).subscribe(
                response => {
                    console.log('Employee updated successfully', response);
                    // Optionally, you can fetch the updated data again after successful update
                    // this.fetchEmployeeByUsername(this.user.username);
                },
                error => {
                    console.error('Error updating employee', error);
                }
            );
        } else {
            // Form is invalid, handle accordingly
            console.log('Form is invalid');
        }
    }
}