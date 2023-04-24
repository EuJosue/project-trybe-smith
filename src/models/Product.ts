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
    const { name, amount, orderId = null } = product;

    const query = 'INSERT INTO Trybesmith.products (name, amount, order_id) VALUES (?, ?, ?)';
    const [{insertId}] = await this.connection.execute<ResultSetHeader>(query, [name, amount, orderId]);

    return { id: insertId, ...product };
  }

  async findOrCreate(product: NewProduct): Promise<[Product, boolean]> {
    const { name, amount, orderId = null } = product;

    const query = 'SELECT * FROM Trybesmith.products WHERE name = ? AND amount = ? AND order_id = ?';
    const [[foundProduct]] = await this.connection.execute<RowDataPacket[]>(query, [name, amount, orderId]);

    if (!foundProduct) {
      const query = 'INSERT INTO Trybesmith.products (name, amount, order_id) VALUES (?, ?, ?)';
      const [{insertId}] = await this.connection.execute<ResultSetHeader>(query, [name, amount, orderId]);

      return [{ id: insertId, ...product }, true];
    }

    return [foundProduct as Product, false];
  }

  async update(id: number, product: NewProduct): Promise<Product> {
    const { name, amount, orderId = null } = product;

    const query = 'UPDATE Trybesmith.products SET name = ?, amount = ?, order_id = ? WHERE id = ?';
    await this.connection.execute<ResultSetHeader>(query, [name, amount, orderId, id]);

    return { id, ...product };
  }

  async remove(id: number): Promise<void> {
    const query = 'DELETE FROM Trybesmith.products WHERE id = ?';

    await this.connection.execute<ResultSetHeader>(query, [id]);
  }
}