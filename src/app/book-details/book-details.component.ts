import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnChanges {

 @Input() book
 @Input() shoppingCart
  constructor(private shoppingCartService:ShoppingCartService) { }
ngOnChanges(simpleChange:SimpleChanges){
  if(this.book && this.shoppingCart){
    console.log(this.book)
    console.log(this.shoppingCart)
let book =this.shoppingCart.items.find(
  (book)=> {
return book.id === this.book.id
  }
)
if(book) this.book.quantity=book.quantity
  }
}
  
addToCart(){
  this.shoppingCartService.addToCart(this.book)
}

}
