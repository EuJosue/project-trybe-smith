export interface NewOrder {
  productsIds: number[];
}

export interface Order {
  userId: number;
  id: number;
}

export interface OrderWithProducts extends Order {
  productsIds: number[];
}

export interface OrderWithProductsWithoutId {
  productsIds: number[];
  userId: number;
}