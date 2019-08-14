import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import 'rxjs/add/operator/map'
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
availableBooks=[]
nonAvailableBooks=[]
displayNonAvailableBooks=false
activeBook;
cart;
  constructor(private bookService:BookService ,private shoppingCartService:ShoppingCartService) { }

  ngOnInit() {
    this.initialiseCart();
    this.bookService.getAll()
    .map((books:any[])=>{
     return books.map(
       (book)=>{
         return  {
        ...book,
        quantity:0
      }
    }
     )
    })
    .subscribe(
      (books:any[])=>{
        console.log('in success')
        books.forEach(book => {
          if(book.stock>0){
          this.availableBooks.push(book)
          }else{
          this.nonAvailableBooks.push(book)
          }
        });
        this.activeBook=this.availableBooks[0]
      },
      (error)=>{
        console.log('in error')
      this.bookService.getDispo().subscribe((a:any)=>  this.availableBooks=a);
        this.activeBook=this.availableBooks[0]

      } )

  }
  initialiseCart() {
    this.cart=this.shoppingCartService.getCart()
    this.shoppingCartService.cartEmitter
    .subscribe(
      (cart)=>{
     this.cart=cart
      }
    )  }

}
