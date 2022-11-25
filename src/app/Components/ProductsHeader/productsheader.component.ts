import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-productsheader',
  templateUrl: './productsheader.component.html',
  styleUrls: ['./productsheader.component.css'],
})
export class ProductsHeaderComponent {
  sort = 'desc';
  itemsShowCount = 12;
  @Output() columnsCountChange = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  onSortChange(value: string): void {
    this.sort = value;
  }

  onItemsUpdated(count: number): void {
    this.itemsShowCount = count;
  }

  onColumnsUpdated(columns: number): void {
    this.columnsCountChange.emit(columns);
  }
}
