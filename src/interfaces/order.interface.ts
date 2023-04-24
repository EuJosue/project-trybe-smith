export interface NewOrder {
  userId: number;
}

export interface Order extends NewOrder {
  id: number;
}

export interface OrderWithProducts extends Order {
  productsIds: number[];
}