import { NewUser, User } from '../interfaces/user.interface';
import UserModel from '../models/User';
import connection from '../models/connection';
import { generateToken } from '../utils/auth/jwt';
import httpError from '../utils/httpError';

const userNotExist = 'User does not exist';

export default class UserService {
  model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  async findAll(): Promise<User[]> {
    const products = await this.model.findAll();
    return products;
  }

  async findById(id: number): Promise<User> {
    const user = await this.model.findById(id);

    if (!user) throw httpError.notFound(userNotExist);

    return user;
  }

  async create(user: NewUser): Promise<string> {
    const [newUser, created] = await this.model.findOrCreate(user);

    if (!created) throw httpError.badRequest('User already exists');

    const token = generateToken(newUser);

    return token;
  }

  async update(id: number, user: NewUser): Promise<User> {
    const foundProduct = await this.findById(id);

    if (!foundProduct) throw httpError.notFound(userNotExist);

    const updatedProduct = await this.model.update(id, user);

    return updatedProduct;
  }

  async remove(id: number): Promise<void> {
    const foundProduct = await this.findById(id);

    if (!foundProduct) throw httpError.notFound(userNotExist);

    await this.model.remove(id);
  }

  async login(username: string, password: string): Promise<string> {
    const user = await this.model.findByUsername(username);

    if (!user || user.password !== password) {
      throw httpError.unauthorized('Username or password invalid');
    }

    const token = generateToken(user);

    return token;
  }
}