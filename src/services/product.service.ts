import { NewProduct, Product } from '../interfaces/product.interface';
import ProductModel from '../models/Product';
import connection from '../models/connection';
import httpError from '../utils/httpError';

const productNotExist = 'Product does not exist';

export default class ProductService {
  model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  async findAll(): Promise<Product[]> {
    const products = await this.model.findAll();
    return products;
  }

  async findById(id: number): Promise<Product> {
    const product = await this.model.findById(id);

    if (!product) throw httpError.notFound(productNotExist);

    return product;
  }

  async create(product: NewProduct): Promise<Product> {
    const [newProduct, created] = await this.model.findOrCreate(product);

    if (!created) throw httpError.badRequest('Product already exists');

    return newProduct;
  }

  async update(id: number, product: NewProduct): Promise<Product> {
    const foundProduct = await this.findById(id);

    if (!foundProduct) throw httpError.notFound(productNotExist);

    const updatedProduct = await this.model.update(id, product);

    return updatedProduct;
  }

  async remove(id: number): Promise<void> {
    const foundProduct = await this.findById(id);

    if (!foundProduct) throw httpError.notFound(productNotExist);

    await this.model.remove(id);
  }
}