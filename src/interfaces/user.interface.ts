export interface NewUser {
  username: string;
  vocation: string;
  level: number;
  password: string;
}

export interface User extends NewUser {
  id: number;
}