import { Request, Response } from "express";
import OrderService from "../services/order.service";
import { NewOrder } from "../interfaces/order.interface";

export default class OrderController {
  orderService: OrderService;

  constructor(orderService = new OrderService()) {
    this.orderService = orderService;

    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }

  async findAll(_req: Request, res: Response) {
    const orders = await this.orderService.findAll();

    return res.status(200).json(orders);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    const order = await this.orderService.findById(Number(id));

    return res.status(200).json(order);
  }

  async create(req: Request, res: Response) {
    const newOrder = req.body as NewOrder;

    const order = await this.orderService.create(newOrder);

    return res.status(201).json(order);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const updatedUser = req.body as NewOrder;

    const order = await this.orderService.update(Number(id), updatedUser);

    return res.status(200).json(order);
  }

  async remove(req: Request, res: Response) {
    const { id } = req.params;

    await this.orderService.remove(Number(id));

    return res.status(204).end();
  }
};