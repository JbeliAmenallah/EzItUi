import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypePrime } from '../../../../shared/models/typeprime';
import { TypePrimeService } from '../../../../core/http/typeprime.service';
import { PrimeService } from '../../../../core/http/prime.service';
import { Employee } from '../../../../shared/models/employee';
import { EmployeeService } from '../../../../core/http/employee.service';

@Component({
  selector: 'app-prime-form',
  templateUrl: './prime-form.component.html',
  styleUrls: ['./prime-form.component.css']
})
export class PrimeFormComponent implements OnInit {
  form: FormGroup;
  employees: Employee[] = [];
  typePrime: TypePrime[] = [];

  constructor(
    private fb: FormBuilder,
    private primeService: PrimeService,
    private employeeService: EmployeeService,
    private typePrimeService: TypePrimeService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      year: [null, Validators.required],
      month: [null, Validators.required],
      montant: [null, Validators.required],
      motif: [null, Validators.required],
      typePrime: [null, Validators.required],
      employee: [null, Validators.required]
    });

    this.fetchTypePrimes();
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.fetchEmployees().subscribe(
      (employees) => {
        this.employees = employees;
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  fetchTypePrimes() {
    this.typePrimeService.fetchTypePrimes().subscribe(
      (typePrimes) => {
        this.typePrime = typePrimes;
      },
      (error) => {
        console.error('Error fetching type primes:', error);
      }
    );
  }

}
