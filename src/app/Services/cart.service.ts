import { Injectable, NgModule } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../Models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = new BehaviorSubject<Cart>({
    items: [],
  });

  constructor(private _snackbar: MatSnackBar) {}

  addToCart(cartItem: CartItem): void {
    const items = [...this.cart.value.items];
    const itemInCart = items.find((_item) => _item.id === cartItem.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(cartItem);
    }

    this.cart.next({
      items,
    });
    this._snackbar.open('1 item added to cart', 'OK', { duration: 3000 });
    console.log(this.cart.value);
  }

  getTotal(items: CartItem[]): number {
    return items
      .map((item) => item.quantity)
      .reduce((prev, curr) => prev + curr, 0);
  }
}
