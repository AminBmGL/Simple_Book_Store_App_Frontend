import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
cart ;
  constructor(private shoppingCartService:ShoppingCartService) { }

  ngOnInit() {
    this.cart=this.shoppingCartService.getCart()
    this.shoppingCartService.cartEmitter
    .subscribe(
      (cart)=>{
        console.log(cart)
      this.cart=cart
      }
    )
  }

  totalPrice(unitPrice, quantity){
return unitPrice *quantity
  }

  totalCartPrice(){
    let somme=0
    for(let i=0 ;i<this.cart.items.length;i++){
     somme=somme+this.totalPrice(this.cart.items[i].prix,this.cart.items[i].quantity)
    }
    return somme
  }

  clearCart(){
    this.shoppingCartService.clearCart()
  }
}
