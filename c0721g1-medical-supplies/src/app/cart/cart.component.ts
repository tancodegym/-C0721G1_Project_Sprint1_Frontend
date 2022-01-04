// @ts-ignore
import {Component, DoCheck, OnInit} from '@angular/core';
import {Supplies} from '../model/supplies';
import {SuppliesService} from '../service/supplies.service';
import {Cart} from '../model/cart';
import {Router} from '@angular/router';

// @ts-ignore
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  suppliesIdList: string[] = [];
  quantity: number [] = [];
  cartList: Cart[] = [];
  totalMoney = 0;

  constructor(
    private suppliesService: SuppliesService,
    private router: Router
  ) {
    this.suppliesIdList = Object.keys(localStorage);
    this.getQuantity();
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.suppliesIdList.length; i++) {
      this.suppliesService.findById(Number(this.suppliesIdList[i])).subscribe(
        value => {
          const cart = new Cart();
          cart.id = value.id;
          cart.name = value.name;
          cart.price = value.price;
          cart.image = value.image;
          cart.quantity = 1;
          this.cartList.push(cart);
          this.getTotalMoney();
        });
    }
  }

  getQuantity() {
    for (let i = 0; i < 15; i++) {
      this.quantity.push(i);
    }
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }


  getTotalMoney() {
    this.totalMoney = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.cartList.length; i++) {
      this.totalMoney += this.cartList[i].quantity * this.cartList[i].price;
    }
  }
  moveToPaymentPage() {
    this.suppliesService.saveCartListTemp(this.cartList);
  }
}
