import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/Models/products.model';

@Component({
  selector: 'app-productbox',
  templateUrl: './productsbox.component.html',
  styleUrls: ['./productsbox.component.css'],
})
export class ProductBoxComponent implements OnInit {
  @Input() fullWidthMode: boolean = false;
  @Input() product: Product | undefined;
  @Output() addToCart = new EventEmitter<Product>();

  ngOnInit(): void {}

  constructor() {}

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
