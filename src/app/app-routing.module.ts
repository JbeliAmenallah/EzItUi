import { NgModule, inject } from '@angular/core';
import { CanActivateFn, RouterModule, Routes } from '@angular/router';
import path from 'path';
import { AuthGuard } from './core/guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { title } from 'process';
import { NotallowedComponent } from './modules/backoffice/notallowed/notallowed.component';


const isAuthenticated: CanActivateFn = (route, state) => {
  return inject(AuthGuard).isAccessAllowed(route, state);
};

const routes: Routes = [
  { 
    path: '',  
    redirectTo: 'employee/details', pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
    data:{title:'Authentication'}
  },

  {
    path: 'resources',
    loadChildren: () => import('./modules/backoffice/resources/resource.module').then((m) => m.ResourceModule)
  },
  {
    path: 'projects',
    loadChildren: () => import('./modules/backoffice/projects/project.module').then((m) => m.ProjectModule)
  },
  {
    path: 'functionalities',
    loadChildren: () => import('./modules/backoffice/functionalities/functionality.module').then((m) => m.FunctionalityModule)
  },
  
  {
    path: 'tasks',
    loadChildren: () => import('./modules/backoffice/tasks/task.module').then((m)=>m.TaskModule)
  },
  
  {
    path: 'bugs',
    loadChildren: () => import('./modules/backoffice/bug/bug.module').then((m) => m.BugModule)
  },
  {
    path: 'contacts',
    loadChildren: () => import('./modules/backoffice/contact/contact.module').then((m) => m.ContactModule)
  },

  {
    path: 'stopwatchs',
    loadChildren: () => import('./modules/backoffice/stopwatchs/stopwatch.module').then((m) => m.StopwatchModule)
  },
  {
    path: 'groupfunctionalities',
    loadChildren: () => import('./modules/backoffice/groupfunctionalities/groupfunctionalities.module').then((m) => m.GroupfunctionalitiesModule)
  },
  {
    path: 'functionalityCriterion',
    loadChildren: () => import('./modules/backoffice/functionality-criterion/functionality-criterion.module').then((m) => m.FunctionalityCriterionModule)
  },
  {
    path:'conges',
    loadChildren:()=>import('./modules/backoffice/conge/conge.module').then((m)=>m.CongeModule)
  },
  {
    path:'autorisations',
    loadChildren:()=>import('./modules/backoffice/autorisation/autorisation.module').then((m)=>m.AutorisationModule)
  },
  {
    path:'employee',    canActivate:[isAuthenticated],
    loadChildren:()=>import('./modules/backoffice/employee/employee.module').then((m)=>m.EmployeeModule),
    // data:{title:'Employees',roles: ['ADMIN']}
  },
  {
    path:'absence',
    loadChildren:()=>import('./modules/backoffice/absence/absence.module').then((m)=>m.AbsenceModule)
  },
  {
    path:'financeconfiguration',
    loadChildren:()=>import('./modules/backoffice/financeconfiguration/financeconfiguration.module').then((m)=>m.FinanceconfigurationModule)
  },
  {
    path:'annee',
    loadChildren:()=>import('./modules/backoffice/annee/annee.module').then((m)=>m.AnneeModule)
  },
  {
    path:'publicholiday',
    loadChildren:()=>import('./modules/backoffice/publicholiday/publicholiday.module').then((m)=>m.PublicholidayModule)
  },
  {
    path:'grades',
    loadChildren:()=>import('./modules/backoffice/grade/grade.module').then((m)=>m.GradeModule)
  },
  {
    path:'category',
    loadChildren:()=>import('./modules/backoffice/category/category.module').then((m)=>m.CategoryModule)
  },
  {
    path:'groupe',
    loadChildren:()=>import('./modules/backoffice/groupe/groupe.module').then((m)=>m.GroupeModule)
  },
  {
    path:'entreprise',
    loadChildren:()=>import ('./modules/backoffice/entreprise/entreprise.module').then((m)=>m.EntrepriseModule)
  },
  {
    path:'typeprime',
    loadChildren:()=>import ('./modules/backoffice/typeprime/typeprime.module').then((m)=>m.TypeprimeModule)
  },
  {
    path:'prime',
    loadChildren:()=>import ('./modules/backoffice/prime/prime.module').then((m)=>m.PrimeModule)
  },
  {
    path:'enfant',
    loadChildren:()=>import('./modules/backoffice/enfant/enfant.module').then((m)=>m.EnfantModule)
  },
  {
    path:'salary',
    loadChildren:()=>import('./modules/backoffice/salary/salary.module').then((m)=>m.SalaryModule)
  },
  {
    path:'deduction',
    loadChildren:()=>import ('./modules/backoffice/deduction/deduction.module').then((m)=>m.DeductionModule)
  },
   {
     path:'not-allowed',
     component:NotallowedComponent,
   },
  {
    path:'kpi',
    loadChildren:()=>import ('./modules/backoffice/kpi/kpi.module').then((m)=>m.KPIModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes),BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
