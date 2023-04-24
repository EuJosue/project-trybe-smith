export interface NewOrder {
  userId: number;
}

export interface Order extends NewOrder {
  id: number;
}