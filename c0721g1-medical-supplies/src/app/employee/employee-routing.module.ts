import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DetailComponent} from './detail/detail.component';
import {ChangePasswordComponent} from "./change-password/change-password.component";


const routes: Routes = [
  {
    path: 'detail/:id',
    component: DetailComponent,
  },
  {
    path: 'change/:id',
    component: ChangePasswordComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {
}
