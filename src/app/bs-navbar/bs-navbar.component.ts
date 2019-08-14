import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  appUser ;
  cart;

  constructor(
              private authService: AuthService, 
              private shoppingCartService: ShoppingCartService) { 
  }

  async ngOnInit() { 
   this.shoppingCartService.cartEmitter
   .subscribe(
     (cart)=>{
this.cart=cart
     }
   )
  }

  logout() {
    this.authService.logout();
  }
}
