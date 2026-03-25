// Creates a type for what could be in the cart

export interface CartItem {
  bookID: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
}
