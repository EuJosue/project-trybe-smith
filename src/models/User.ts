import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { NewUser, User } from '../interfaces/user.interface';

export default class UserModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  async findAll(): Promise<User[]> {
    const query = 'SELECT * FROM Trybesmith.users';
    const [users] = await this.connection.execute<RowDataPacket[]>(query);

    return users as User[];
  }

  async findById(id: number | string): Promise<User> {
    const query = 'SELECT * FROM Trybesmith.users WHERE id = ?';
    const [[user]] = await this.connection.execute<RowDataPacket[]>(query, [id]);

    return user as User;
  }

  async findByUsername(username: string): Promise<User> {
    const query = 'SELECT * FROM Trybesmith.users WHERE username = ?';
    const [[user]] = await this.connection.execute<RowDataPacket[]>(query, [username]);

    return user as User;
  }

  async create(user: NewUser): Promise<User> {
    const { level, password, username, vocation } = user;

    const query = `INSERT INTO Trybesmith.users (level, password, username, vocation)
      VALUES (?, ?, ?, ?)`;

    const [{ insertId }] = await this.connection
      .execute<ResultSetHeader>(query, [level, password, username, vocation]);

    return { id: insertId, ...user };
  }

  async findOrCreate(user: NewUser): Promise<[User, boolean]> {
    const { level, password, username, vocation } = user;

    const query = 'SELECT * FROM Trybesmith.users WHERE username = ?';
    const [[foundProduct]] = await this.connection
      .execute<RowDataPacket[]>(query, [level, password, username, vocation]);

    if (!foundProduct) {
      const queryInsert = `INSERT INTO Trybesmith.users (level, password, username, vocation)
        VALUES (?, ?, ?, ?)`;
      const [{ insertId }] = await this.connection
        .execute<ResultSetHeader>(queryInsert, [level, password, username, vocation]);

      return [{ id: insertId, ...user }, true];
    }

    return [foundProduct as User, false];
  }

  async update(id: number, user: NewUser): Promise<User> {
    const { level, password, username, vocation } = user;

    const query = `UPDATE Trybesmith.users
      SET level = ?, password = ?, username = ?, vocation = ? WHERE id = ?`;
    await this.connection
      .execute<ResultSetHeader>(query, [level, password, username, vocation, id]);

    return { id, ...user };
  }

  async remove(id: number): Promise<void> {
    const query = 'DELETE FROM Trybesmith.users WHERE id = ?';

    await this.connection.execute<ResultSetHeader>(query, [id]);
  }
}