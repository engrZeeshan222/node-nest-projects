import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid(
    'development',
    'production',
    'test',
    'provision',
  ),
  DB_DIALECT: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.string().required(),
  DB_USER: Joi.string().required(),
  PORT: Joi.number().default(3000),
  DB_PASSWORD: Joi.string().default(3000),
  DB_NAME: Joi.string().default(3000),
  JWTKEY: Joi.string().default(3000),
  TOKEN_EXPIRATION: Joi.string().default(3000),
  GOOGLE_CLIENT_ID: Joi.string().default(3000),
  FACEBOOK_ACESS_TOKEN: Joi.string().default(3000),
  FACEBOOK_APP_SECRET: Joi.string().default(3000),
  SENDGRID_API_KEY: Joi.string().default(3000),
  EMAIL_FROM: Joi.string().default(3000),
  FRONT_END_BASE_URL: Joi.string().default(3000),
});
