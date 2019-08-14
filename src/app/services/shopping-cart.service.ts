import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
 backendUrl='http://localhost:8080/';
 panierId;
cart:{
  items:any[],
  totalPrice:number,
}={
  items:[],
  totalPrice:0,
};

cartEmitter =new EventEmitter<any>()
 
  constructor(private http :HttpClient,
    private router :Router,
    private authService:AuthService) {
    this.createCart()
   }
  createCart(){
    this.http.post(this.backendUrl+'newPanier',{})
    .subscribe(
      (panier:any)=>{
        this.panierId=panier.id
        let cart=JSON.parse(localStorage.getItem('cart'))
        if(cart){
          this.cart=cart
          this.cartEmitter.emit(JSON.parse(JSON.stringify(this.cart)))
        }
        else{
          localStorage.setItem('cart',JSON.stringify(this.cart))
          this.cartEmitter.emit(JSON.parse(JSON.stringify(this.cart)))
        }
      }
    ,(error)=>{
      this.panierId=30
      let cart=JSON.parse(localStorage.getItem('cart'))
      if(cart){
        this.cart=cart
        this.cartEmitter.emit(JSON.parse(JSON.stringify(this.cart)))
      }
      else{
        localStorage.setItem('cart',JSON.stringify(this.cart))
        this.cartEmitter.emit(JSON.parse(JSON.stringify(this.cart)))
      }
    })
  }

  getCart(){
    return JSON.parse(JSON.stringify(this.cart))
  }
  

  getItem(bookId){
    let result= this.cart.items.findIndex(
      (book)=>book.id == bookId
)
 return result

  }
  removeItem(book){
    this.cart.items= this.cart.items.filter(
      (book)=>book.id != book.id
)
  }

  updateItem(book,change:number){
    let index=this.getItem(book.id)
    let quantity = book.quantity  + change;
    if (index!= -1){
      if (quantity == 0) this.removeItem(book)
      else this.cart.items[index]={ 
        ...this.cart.items[index],
        quantity:quantity 
      };
      localStorage.setItem('cart',JSON.stringify(this.cart))
      this.cartEmitter.emit(JSON.parse(JSON.stringify(this.cart)))
    }else{
      this.cart.items.push({ 
        ...book,
        quantity:quantity 
      })
      localStorage.setItem('cart',JSON.stringify(this.cart))
      this.cartEmitter.emit(JSON.parse(JSON.stringify(this.cart)))

    }
    }
    

  clearCart(){
  this.cart={
    items:[],
    totalPrice:0
  }
  localStorage.removeItem('cart')
  this.cartEmitter.emit(JSON.parse(JSON.stringify(this.cart)))
  }

 addToCart(book) { 
    this.updateItem(book, 1);
  }

   removeFromCart(book) {
    this.updateItem(book, -1);
  }

  async placeOrder(shipping) {
    let userId=this.authService.isAuthenticated().user.id
  let result =await Promise.all(this.cart.items.map((book )=> {
  return this.http.post(this.backendUrl +'newPanierCategorie/'+this.panierId+'/'+book.id+'/'+book.quantity+ 'user?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token,{}).toPromise() 
}
));
    // add panier to user
    let res= await this.http.post(this.backendUrl +'addCommande/'+userId+'/'+this.panierId+ 'user?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token,{} ).toPromise()     //redirect to order success
    this.router.navigate(['/order-success'],{queryParams:{shipping:shipping }});
  }

}
