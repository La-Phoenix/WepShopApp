import { Component, OnInit } from '@angular/core';
import { Cart } from './Models/cart.model';
import { CartService } from './Services/cart.service';

@Component({
  selector: 'app-root',
  template: `<app-header [cart]="cart"></app-header>
    <router-outlet></router-outlet>`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  cart: Cart = { items: [] };

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe({
      next: (_cart) => {
        this.cart = _cart;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
