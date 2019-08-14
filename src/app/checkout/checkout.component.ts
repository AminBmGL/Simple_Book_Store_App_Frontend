import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  shipping = {}; 
  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService :ShoppingCartService
    ) {
  }

  ngOnInit() {
    this.cartService.cartEmitter
  }

  placeOrder() {
   this.cartService.placeOrder(this.shipping)
  }    
}
