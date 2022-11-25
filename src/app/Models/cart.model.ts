export interface CartItem {
  id: number;
  name: string;
  price: number;
  product: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
}
