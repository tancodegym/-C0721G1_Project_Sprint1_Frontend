import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListComponent} from './list/list.component';

import {CreateEmployeeComponent} from './create-employee/create-employee.component';
import {EditEmployeeComponent} from './edit-employee/edit-employee.component';


const routes: Routes = [
  {
    path: 'list', component: ListComponent
  },
  {
    path: 'create', component: CreateEmployeeComponent
  },
  {
    path: 'edit', component: EditEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
