import joi from 'joi';

export const loginJoi = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
});

export const productJoi = joi.object({
  name: joi.string().min(3).required(),
  amount: joi.string().min(3).required(),
});
