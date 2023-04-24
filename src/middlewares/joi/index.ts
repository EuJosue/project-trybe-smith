import joi from 'joi';

export const loginJoi = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
});

export const teste = '';