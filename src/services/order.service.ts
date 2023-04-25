import { NewOrder, Order, OrderWithProductsWithoutId } from '../interfaces/order.interface';
import OrderModel from '../models/Order';
import connection from '../models/connection';
import httpError from '../utils/httpError';

const orderNotExist = 'Order does not exist';

export default class OrderService {
  model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  async findAll(): Promise<Order[]> {
    const books = await this.model.findAll();
    return books;
  }

  async findById(id: number): Promise<Order> {
    const book = await this.model.findById(id);

    if (!book) throw httpError.notFound(orderNotExist);

    return book;
  }

  async create(order: NewOrder, userId: number): Promise<OrderWithProductsWithoutId> {
    const newOrder = await this.model.create(order, userId);

    return newOrder;
  }

  async update(id: number, order: NewOrder, userId: number): Promise<Order> {
    const foundOrder = await this.model.findById(id);

    if (!foundOrder) throw httpError.notFound(orderNotExist);

    const updatedOrder = await this.model.update(id, userId, order);

    return updatedOrder;
  }

  async remove(id: number): Promise<void> {
    const foundOrder = await this.model.findById(id);

    if (!foundOrder) throw httpError.notFound(orderNotExist);

    await this.model.remove(id);
  }
}