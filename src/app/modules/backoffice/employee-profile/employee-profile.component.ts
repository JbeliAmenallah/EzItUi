import { Component } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { Employee } from '../../../shared/models/employee';
import { EmployeeService } from '../../../core/http/employee.service';
import { error } from 'console';
@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrl: './employee-profile.component.css'
})
export class EmployeeProfileComponent {


  username:string;
  user:Employee;
  contactId:number;
  constructor(
    private authService:AuthService,
    private employeeService:EmployeeService
  ){}



  ngOnInit(){
      this.username=this.authService.getAuthenticatedUsername();
      this.fetchEmployeeByUsername(this.username);

  }


  fetchEmployeeByUsername(username:string){
    this.employeeService.getEmployeeByUsername(username).subscribe(
      (item:Employee)=>{
        this.user=item;
        this.contactId=item.contactId;
        console.log(`Current User ${username} current User Id  ${this.contactId}` )
        console.log("fetched user in the profule component",this.user)
      },
      (error)=>{
        console.log("Error fetching the employee with the username",error)
      }    
    )
  }

}
