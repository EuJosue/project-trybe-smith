import { Request, Response } from "express";
import UserService from "../services/user.service";
import { NewUser } from "../interfaces/user.interface";

export default class UserController {
  userService: UserService;

  constructor(userService = new UserService()) {
    this.userService = userService;

    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }

  async findAll(_req: Request, res: Response) {
    const users = await this.userService.findAll();

    return res.status(200).json(users);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    const user = await this.userService.findById(Number(id));

    return res.status(200).json(user);
  }

  async create(req: Request, res: Response) {
    const newUser = req.body as NewUser;

    const token = await this.userService.create(newUser);

    return res.status(201).json({ token });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const updatedUser = req.body as NewUser;

    const user = await this.userService.update(Number(id), updatedUser);

    return res.status(200).json(user);
  }

  async remove(req: Request, res: Response) {
    const { id } = req.params;

    await this.userService.remove(Number(id));

    return res.status(204).end();
  }
};