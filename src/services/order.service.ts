import { Order } from "../interfaces/order.interface";
import OrderModel from "../models/Order";
import connection from "../models/connection";
import httpError from "../utils/httpError";

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

    if (!book) throw httpError.notFound('Order does not exist');

    return book;
  }

  async create(order: Order): Promise<Order> {
    const newOrder = await this.model.create(order);

    return newOrder;
  }

  async update(id: number, order: Order): Promise<Order> {
    const foundOrder = await this.model.findById(id);

    if (!foundOrder) throw httpError.notFound('Order does not exist');

    const updatedOrder = await this.model.update(id, order);

    return updatedOrder;
  }

  async remove(id: number): Promise<void> {
    const foundOrder = await this.model.findById(id);

    if (!foundOrder) throw httpError.notFound('Order does not exist');

    await this.model.remove(id);
  }
}