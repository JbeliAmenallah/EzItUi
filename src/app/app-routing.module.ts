import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'path';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule)
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
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
