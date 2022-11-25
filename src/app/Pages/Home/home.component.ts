import { Component } from '@angular/core';
import { Product } from 'src/app/Models/products.model';
import { CartService } from 'src/app/Services/cart.service';

const ROW_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  cols = 3;
  category: string | undefined;
  rowHeight: number = ROW_HEIGHT[this.cols];
  constructor(private cartService: CartService) {}

  onColumnsCountChange(columns: number): void {
    this.cols = columns;
  }

  onShowCategory(category: string): void {
    this.category = category;
    this.rowHeight = ROW_HEIGHT[this.cols];
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }
}
