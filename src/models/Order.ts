import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { NewOrder, Order } from '../interfaces/order.interface';

export default class UserModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  async findAll(): Promise<Order[]> {
    const query = 'SELECT * FROM Trybesmith.orders';
    const [orders] = await this.connection.execute<RowDataPacket[]>(query);

    return orders as Order[];
  }

  async findById(id: number | string): Promise<Order> {
    const query = 'SELECT * FROM Trybesmith.orders WHERE id = ?';
    const [[order]] = await this.connection.execute<RowDataPacket[]>(query, [id]);

    return order as Order;
  }

  async create(order: NewOrder): Promise<Order> {
    const { userId } = order;

    const query = 'INSERT INTO Trybesmith.orders (user_id) VALUES (?)';
    const [{insertId}] = await this.connection.execute<ResultSetHeader>(query, [userId]);

    return { id: insertId, ...order };
  }

  async update(id: number, order: NewOrder): Promise<Order> {
    const { userId } = order;

    const query = 'UPDATE Trybesmith.orders SET user_id = ? WHERE id = ?';
    await this.connection.execute<ResultSetHeader>(query, [userId, id]);

    return { id, ...order };
  }

  async remove(id: number): Promise<void> {
    const query = 'DELETE FROM Trybesmith.orders WHERE id = ?';

    await this.connection.execute<ResultSetHeader>(query, [id]);
  }
}