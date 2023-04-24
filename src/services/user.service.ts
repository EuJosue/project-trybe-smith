import { NewUser } from "../interfaces/user.interface";
import UserModel from "../models/User";
import connection from "../models/connection";
import httpError from "../utils/httpError";

const User = new UserModel(connection);

const findAll = async () => User.findAll();

const findById = async (id: number) => {
  const user = User.findById(id);

  if (!user) throw httpError.notFound('User does not exist');

  return user;
};

const create = async (user: NewUser) => {
  const [newUser, created] = await User.findOrCreate(user);

  if (!created) throw httpError.badRequest('User already exists');

  return newUser;
};

const update = async (id: number, user: NewUser) => {
  const foundUser = await findById(id);

  if (!foundUser) throw httpError.notFound('User does not exist');

  const updatedUser = await User.update(id, user);

  return updatedUser;
};

const remove = async (id: number) => {
  const foundUser = await findById(id);

  if (!foundUser) throw httpError.notFound('User does not exist');

  await User.remove(id);
};

export default {
  findAll,
  findById,
  create,
  update,
  remove,
};