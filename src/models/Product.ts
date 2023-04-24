import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { NewProduct, Product } from '../interfaces/product.interface';

export default class ProductModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  async findAll(): Promise<Product[]> {
    const query = 'SELECT * FROM Trybesmith.products';
    const [products] = await this.connection.execute<RowDataPacket[]>(query);

    return products as Product[];
  }

  async findById(id: number | string): Promise<Product> {
    const query = 'SELECT * FROM Trybesmith.products WHERE id = ?';
    const [[product]] = await this.connection.execute<RowDataPacket[]>(query, [id]);

    return product as Product;
  }

  async create(product: NewProduct): Promise<Product> {
    const { title, price, orderId } = product;

    const query = 'INSERT INTO Trybesmith.products (title, price, order_id) VALUES (?, ?, ?)';
    const [{insertId}] = await this.connection.execute<ResultSetHeader>(query, [title, price, orderId]);

    return { id: insertId, ...product };
  }

  async update(id: number, product: NewProduct): Promise<Product> {
    const { title, price, orderId } = product;

    const query = 'UPDATE Trybesmith.products SET title = ?, price = ?, order_id = ? WHERE id = ?';
    await this.connection.execute<ResultSetHeader>(query, [title, price, orderId, id]);

    return { id, ...product };
  }

  async remove(id: number): Promise<void> {
    const query = 'DELETE FROM Trybesmith.products WHERE id = ?';

    await this.connection.execute<ResultSetHeader>(query, [id]);
  }
}