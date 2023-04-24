import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { NewOrder, Order } from '../interfaces/order.interface';
import { camelizeKeys } from '../utils/camelize';

export default class OrderModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  async findAll(): Promise<any[]> {
    const query = 'SELECT * FROM Trybesmith.orders';
    const [orders] = await this.connection.execute<RowDataPacket[]>(query);
    
    const ordersWithProductsIds = await Promise.all(orders.map(async (order) => {
      const { id } = order;

      const queryProducts = 'SELECT * FROM Trybesmith.products WHERE order_id = ?';
      const [products] = await this.connection.execute<RowDataPacket[]>(queryProducts, [id]);

      return {
        ...order,
        productsIds: products.map((product) => product.id),
      }
    }));

    return ordersWithProductsIds.map((data) => camelizeKeys(data)) as Order[];
  }

  async findById(id: number | string): Promise<Order> {
    const query = 'SELECT * FROM Trybesmith.orders WHERE id = ?';
    const [[order]] = await this.connection.execute<RowDataPacket[]>(query, [id]);

    return camelizeKeys(order) as Order;
  }

  async create(order: NewOrder): Promise<Order> {
    const { userId } = order;

    const query = 'INSERT INTO Trybesmith.orders (user_id) VALUES (?)';
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(query, [userId]);

    return camelizeKeys({ id: insertId, ...order }) as Order;
  }

  async update(id: number, order: NewOrder): Promise<Order> {
    const { userId } = order;

    const query = 'UPDATE Trybesmith.orders SET user_id = ? WHERE id = ?';
    await this.connection.execute<ResultSetHeader>(query, [userId, id]);

    return camelizeKeys({ id, ...order }) as Order;
  }

  async remove(id: number): Promise<void> {
    const query = 'DELETE FROM Trybesmith.orders WHERE id = ?';

    await this.connection.execute<ResultSetHeader>(query, [id]);
  }
}