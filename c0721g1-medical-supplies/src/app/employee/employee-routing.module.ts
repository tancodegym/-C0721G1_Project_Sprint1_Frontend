import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DetailEditComponent} from './detail-edit/detail-edit.component';


const routes: Routes = [
  {path: 'edit-detail/:id', component: DetailEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {
}
