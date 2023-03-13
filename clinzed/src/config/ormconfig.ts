import { DataSourceOptions } from 'typeorm';

export const connectionOptions = (configService) => {
  const development: DataSourceOptions = {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: Number(configService.get('DB_PORT')),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),

    synchronize: true,
    logging: false,
    entities: [__dirname + '/../modules/**/entities/*.entity.{js,ts}'],
    migrations: [__dirname + '/../migration/*.{js,ts}'],
    subscribers: ['src/subscriber/**/*.ts'],
    //   cli: {
    //     entitiesDir: `${__dirname}/../modules/**/entities`,
    //     migrationsDir: 'src/migration',
    //     subscribersDir: 'src/subscriber',
    //   },
    dropSchema: false,
  };
  return development;
};
export default connectionOptions;
