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
    this._snackbar.open(`${cartItem.name} added to cart`, 'OK', {
      duration: 3000,
    });
  }

  removeQuantity(item: CartItem): void {
    let itemForRemoval: CartItem | undefined;

    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }
      return _item;
    });
    if (itemForRemoval) {
      filteredItems = this.clearItem(itemForRemoval, false);
    }
    this.cart.next({
      items: filteredItems,
    });

    this._snackbar.open(`1 ${item.name} removed from cart`, 'OK', {
      duration: 3000,
    });
  }

  getTotal(items: CartItem[]): number {
    return items
      .map((item) => item.quantity * item.price)
      .reduce((prev, curr) => prev + curr, 0);
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackbar.open('Cart is cleared.', 'OK', {
      duration: 3000,
    });
  }

  clearItem(item: CartItem, update = true): CartItem[] {
    const items = [...this.cart.value.items];
    const filteredItems = items.filter((_item) => _item.id !== item.id);
    if (update) {
      this.cart.next({ items: filteredItems });
      this._snackbar.open(`${item.name} has been removed from the cart`, 'OK', {
        duration: 3000,
      });
    }
    return filteredItems;
  }
}
