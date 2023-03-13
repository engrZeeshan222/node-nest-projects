const DatabaseConfig = () => ({
  NODE_ENV: process.env.NODE_ENV,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  JWTKEY: process.env.JWTKEY,
  TOKEN_EXPIRATION: process.env.TOKEN_EXPIRATION,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  FACEBOOK_ACESS_TOKEN: process.env.FACEBOOK_ACESS_TOKEN,
  FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  EMAIL_FROM: process.env.EMAIL_FROM,
  FRONT_END_BASE_URL: process.env.FRONT_END_BASE_URL,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PORT: process.env.MAIL_PORT,
  STRIPE_API_VERSION: process.env.STRIPE_API_VERSION,
  port: parseInt(process.env.PORT, 10) || 3001,
  jwt: {
    secret: process.env.JWTKEY,
    expiresIn: process.env.TOKEN_EXPIRATION,
  },
});

export default DatabaseConfig;
