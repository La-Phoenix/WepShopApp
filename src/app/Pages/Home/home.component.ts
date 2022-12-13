import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/Models/products.model';
import { CartService } from 'src/app/Services/cart.service';
import { StoreService } from 'src/app/Services/store.service';

const ROW_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  category: string | undefined;
  rowHeight: number = ROW_HEIGHT[this.cols];
  products: Product[] | undefined;
  sort = 'desc';
  count = '12';
  productsubscription: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productsubscription = this.storeService
      .getAllProducts(this.count, this.sort, this.category)
      .subscribe({
        next: (products: Product[]) => {
          this.products = products;
          console.log(products);
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }

  onSortChange(sort: string): void {
    this.sort = sort;
    this.getProducts();
  }

  onItemCountChange(count: number): void {
    this.count = count.toString();
    this.getProducts();
  }

  onColumnsCountChange(columns: number): void {
    this.cols = columns;
  }

  onShowCategory(category: string): void {
    this.category = category;
    this.rowHeight = ROW_HEIGHT[this.cols];
    this.getProducts();
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

  ngOnDestroy(): void {
    if (this.productsubscription) {
      this.productsubscription.unsubscribe();
    }
  }
}
