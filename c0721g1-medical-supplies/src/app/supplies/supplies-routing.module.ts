import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CreateComponent} from './create/create.component';
import {EditComponent} from './edit/edit.component';
import {ListComponent} from './list/list.component';


const routes: Routes = [
  {
    path: 'create', component: CreateComponent
  },
  {
    path: 'edit/:id', component: EditComponent
  },
  {
    path: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliesRoutingModule {
}
