// @ts-ignore
import {NgModule} from '@angular/core';
// @ts-ignore
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: ( ) => import('./home/home.module').then(module => module.HomeModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then(module => module.CartModule)
  },
  {
    path: 'payment/:total',
    loadChildren: () => import('./payment/payment.module').then(module => module.PaymentModule)
  }
];

// @ts-ignore
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
