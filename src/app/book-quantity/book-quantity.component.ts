import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-book-quantity',
  templateUrl: './book-quantity.component.html',
  styleUrls: ['./book-quantity.component.css']
})
export class BookQuantityComponent  {
  @Input() book
  @Input() shoppingCart
  @Input() quantity
  constructor(private shoppingCartService:ShoppingCartService) { }

  addToCart() {
    this.shoppingCartService.addToCart(this.book);
  }

  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.book);
  }

}
