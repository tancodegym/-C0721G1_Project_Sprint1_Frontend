// @ts-ignore
import { NgModule } from '@angular/core';
// @ts-ignore
import { Routes, RouterModule } from '@angular/router';
import {PaymentComponent} from './payment.component';


const routes: Routes = [
  {
    path: '',
    component: PaymentComponent
  }
];

// @ts-ignore
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
