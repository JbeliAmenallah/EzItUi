import { Component } from '@angular/core';
import { SalaryService } from '../../../../core/http/salary.service';
import { AuthService } from '../../../../core/auth/auth.service';
@Component({
  selector: 'app-user-session',
  templateUrl: './user-session.component.html',
  styleUrl: './user-session.component.css'
})
export class UserSessionComponent {
  salaries: any[] = [];
  username:string;
  loading:boolean=true;
  

  constructor(private salaryService:SalaryService,private authService:AuthService){}


  ngOnInit(){
    this.username=this.authService.getAuthenticatedUsername();
    this.getSalariesByUsername(this.username)
  }


  getSalariesByUsername(username:string){
    this.salaryService.getPayslipByUsername(username).subscribe(
      (salaries)=>{
        this.salaries=salaries;
        this.loading=false;
        console.log(this.salaries)
      },
      (error)=>{
        console.log('error fetching salaries',error)
      }
    )

  }
}
