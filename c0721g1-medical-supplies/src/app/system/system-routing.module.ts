import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SystemPageComponent} from './system-page/system-page.component';
import {AuthGuard} from '../security/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: SystemPageComponent,
    canActivate: [AuthGuard],
    data: {expectedRole: ['ROLE_USER']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
