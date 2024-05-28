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
    path: 'resources',canActivate:[isAuthenticated],
    loadChildren: () => import('./modules/backoffice/resources/resource.module').then((m) => m.ResourceModule)
  },
  {
    path: 'projects',canActivate:[isAuthenticated],
    loadChildren: () => import('./modules/backoffice/projects/project.module').then((m) => m.ProjectModule)
  },
  {
    path: 'functionalities',canActivate:[isAuthenticated],
    loadChildren: () => import('./modules/backoffice/functionalities/functionality.module').then((m) => m.FunctionalityModule)
  },
  
  {
    path: 'tasks',canActivate:[isAuthenticated],
    loadChildren: () => import('./modules/backoffice/tasks/task.module').then((m)=>m.TaskModule)
  },
  
  {
    path: 'bugs',canActivate:[isAuthenticated],
    loadChildren: () => import('./modules/backoffice/bug/bug.module').then((m) => m.BugModule)
  },
  {
    path: 'contacts',canActivate:[isAuthenticated],
    loadChildren: () => import('./modules/backoffice/contact/contact.module').then((m) => m.ContactModule)
  },

  {
    path: 'stopwatchs',canActivate:[isAuthenticated],
    loadChildren: () => import('./modules/backoffice/stopwatchs/stopwatch.module').then((m) => m.StopwatchModule)
  },
  {
    path: 'groupfunctionalities',canActivate:[isAuthenticated],
    loadChildren: () => import('./modules/backoffice/groupfunctionalities/groupfunctionalities.module').then((m) => m.GroupfunctionalitiesModule)
  },
  {
    path: 'functionalityCriterion',canActivate:[isAuthenticated],
    loadChildren: () => import('./modules/backoffice/functionality-criterion/functionality-criterion.module').then((m) => m.FunctionalityCriterionModule)
  },
  {
    path:'conges',canActivate:[isAuthenticated],
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
    path:'absence',canActivate:[isAuthenticated],
    loadChildren:()=>import('./modules/backoffice/absence/absence.module').then((m)=>m.AbsenceModule)
  },
  {
    path:'financeconfiguration',canActivate:[isAuthenticated],
    loadChildren:()=>import('./modules/backoffice/financeconfiguration/financeconfiguration.module').then((m)=>m.FinanceconfigurationModule)
  },
  {
    path:'annee',canActivate:[isAuthenticated],
    loadChildren:()=>import('./modules/backoffice/annee/annee.module').then((m)=>m.AnneeModule)
  },
  {
    path:'publicholiday',canActivate:[isAuthenticated],
    loadChildren:()=>import('./modules/backoffice/publicholiday/publicholiday.module').then((m)=>m.PublicholidayModule)
  },
  {
    path:'grades',canActivate:[isAuthenticated],
    loadChildren:()=>import('./modules/backoffice/grade/grade.module').then((m)=>m.GradeModule)
  },
  {
    path:'category',canActivate:[isAuthenticated],
    loadChildren:()=>import('./modules/backoffice/category/category.module').then((m)=>m.CategoryModule)
  },
  {
    path:'groupe',canActivate:[isAuthenticated],
    loadChildren:()=>import('./modules/backoffice/groupe/groupe.module').then((m)=>m.GroupeModule)
  },
  {
    path:'entreprise',canActivate:[isAuthenticated],
    loadChildren:()=>import ('./modules/backoffice/entreprise/entreprise.module').then((m)=>m.EntrepriseModule)
  },
  {
    path:'typeprime',canActivate:[isAuthenticated],
    loadChildren:()=>import ('./modules/backoffice/typeprime/typeprime.module').then((m)=>m.TypeprimeModule)
  },
  {
    path:'prime',canActivate:[isAuthenticated],
    loadChildren:()=>import ('./modules/backoffice/prime/prime.module').then((m)=>m.PrimeModule)
  },
  {
    path:'enfant',canActivate:[isAuthenticated],
    loadChildren:()=>import('./modules/backoffice/enfant/enfant.module').then((m)=>m.EnfantModule)
  },
  {
    path:'salary',canActivate:[isAuthenticated],
    loadChildren:()=>import('./modules/backoffice/salary/salary.module').then((m)=>m.SalaryModule)
  },
  {
    path:'deduction',canActivate:[isAuthenticated],
    loadChildren:()=>import ('./modules/backoffice/deduction/deduction.module').then((m)=>m.DeductionModule)
  },
   {
     path:'not-allowed',canActivate:[isAuthenticated],
     component:NotallowedComponent,
   },
  {
    path:'kpi',canActivate:[isAuthenticated],
    loadChildren:()=>import ('./modules/backoffice/kpi/kpi.module').then((m)=>m.KPIModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes),BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
