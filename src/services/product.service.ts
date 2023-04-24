import { NewProduct } from "../interfaces/product.interface";
import ProductModel from "../models/Product";
import connection from "../models/connection";
import httpError from "../utils/httpError";

const Product = new ProductModel(connection);

const findAll = async () => Product.findAll();

const findById = async (id: number) => {
  const product = await Product.findById(id);

  if (!product) throw httpError.notFound('Product does not exist');

  return product;
};

const create = async (product: NewProduct) => {
  const [newProduct, created] = await Product.findOrCreate(product);

  if (!created) throw httpError.badRequest('Product already exists');

  return newProduct;
};

const update = async (id: number, product: NewProduct) => {
  const foundProduct = await findById(id);

  if (!foundProduct) throw httpError.notFound('Product does not exist');

  const updatedProduct = await Product.update(id, product);

  return updatedProduct;
};

const remove = async (id: number) => {
  const foundProduct = await findById(id);

  if (!foundProduct) throw httpError.notFound('Product does not exist');

  await Product.remove(id);
};

export default {
  findAll,
  findById,
  create,
  update,
  remove,
};