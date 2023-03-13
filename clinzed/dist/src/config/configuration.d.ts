declare const DatabaseConfig: () => {
    NODE_ENV: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    JWTKEY: string;
    TOKEN_EXPIRATION: string;
    GOOGLE_CLIENT_ID: string;
    FACEBOOK_ACESS_TOKEN: string;
    FACEBOOK_APP_SECRET: string;
    SENDGRID_API_KEY: string;
    EMAIL_FROM: string;
    FRONT_END_BASE_URL: string;
    STRIPE_SECRET_KEY: string;
    MAIL_HOST: string;
    MAIL_PORT: string;
    STRIPE_API_VERSION: string;
    port: number;
    jwt: {
        secret: string;
        expiresIn: string;
    };
};
export default DatabaseConfig;
