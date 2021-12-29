import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListComponent} from './list/list.component';
import {AuthAdminGuard} from '../security/auth.admin.guard';


const routes: Routes = [
  {
    path: 'list',
    component: ListComponent,
    canActivate: [AuthAdminGuard],
    data: {expectedRole: ['ROLE_ADMIN']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
