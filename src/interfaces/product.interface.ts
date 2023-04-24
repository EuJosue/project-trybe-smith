export interface NewProduct {
  title: string;
  price: number;
  orderId: number;
}

export interface Product extends NewProduct {
  id: number;
}