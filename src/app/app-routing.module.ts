import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeesListComponent } from './components/employee-list/employee-list.component';
import { EmployeesAddComponent } from './components/employee-add/employee-add.component';

// import { EmployeesPageComponent } from './containers/employee-page/employee-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  // { path: 'page', component: EmployeesPageComponent },
  { path: 'list', component: EmployeesListComponent },
  { path: 'add', component: EmployeesAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }