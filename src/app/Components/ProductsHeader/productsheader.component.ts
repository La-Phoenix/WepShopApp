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
  @Output() sortChange = new EventEmitter<string>();
  @Output() itemsCountChange = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  onSortChange(value: string): void {
    this.sort = value;
    this.sortChange.emit(value);
  }

  onItemsUpdated(count: number): void {
    this.itemsShowCount = count;
    this.itemsCountChange.emit(count);
  }

  onColumnsUpdated(columns: number): void {
    this.columnsCountChange.emit(columns);
  }
}
