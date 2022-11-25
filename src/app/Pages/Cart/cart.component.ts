import { Component } from '@angular/core';
import { Cart, CartItem } from 'src/app/Models/cart.model';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cart: Cart = {
    items: [
      {
        id: 1,
        name: 'Sneakers',
        price: 150,
        product: 'https://via.placeholder.com/150',
        quantity: 1,
      },
      {
        id: 1,
        name: 'Sneakers',
        price: 150,
        product: 'https://via.placeholder.com/150',
        quantity: 1,
      },
    ],
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

  constructor(private cartService: CartService) {
    this.dataSource = this.cart.items;
  }

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }
}
