import { Request, Response } from "express";
import ProductService from "../services/product.service";
import { NewProduct } from "../interfaces/product.interface";

export default class ProductController {
  productService: ProductService;

  constructor(productService = new ProductService()) {
    this.productService = productService;

    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }

  async findAll(_req: Request, res: Response) {
    const products = await this.productService.findAll();

    return res.status(200).json(products);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    const product = await this.productService.findById(Number(id));

    return res.status(200).json(product);
  }

  async create(req: Request, res: Response) {
    const newProduct = req.body as NewProduct;
    
    const product = await this.productService.create(newProduct);

    return res.status(201).json(product);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const updatedProduct = req.body as NewProduct;

    const product = await this.productService.update(Number(id), updatedProduct);

    return res.status(200).json(product);
  }

  async remove(req: Request, res: Response) {
    const { id } = req.params;

    await this.productService.remove(Number(id));

    return res.status(204).end();
  }
};