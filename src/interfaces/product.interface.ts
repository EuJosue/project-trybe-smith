export interface NewProduct {
  name: string;
  amount: string;
  orderId: number | null;
}

export interface Product extends NewProduct {
  id: number;
}