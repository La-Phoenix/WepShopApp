import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Cart, CartItem } from 'src/app/Models/cart.model';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cart: Cart = {
    items: [],
  };

  dataSource: CartItem[];
  displayedColumns: string[] = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];

  constructor(private cartService: CartService, private http: HttpClient) {
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe({
      next: (cart: Cart) => {
        console.log(cart);
        this.cart = cart;
        this.dataSource = cart.items;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onClearItem(item: CartItem): void {
    this.cartService.clearItem(item);
  }

  onAddItem(cartItem: CartItem): void {
    this.cartService.addToCart(cartItem);
  }

  onItemRemove(cartItem: CartItem): void {
    this.cartService.removeQuantity(cartItem);
  }

  onCheckOut(): void {
    this.http
      .post('http://localhost:4242/checkout', {
        items: this.cart.items,
      })
      .subscribe({
        next: async (res: any) => {
          let stripe = await loadStripe(
            'pk_test_51M99ksLEW99x4RKTvRJdP58DaxyUmpjuYEbHBTyBRfGEzZkL1nGueJH1MevmN4xKu2VjSsItxJdKvKehNI2eGFzq00ne1dduEw'
          );
          stripe?.redirectToCheckout({
            sessionId: res.id,
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
