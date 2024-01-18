import { DataSourceOptions, DataSource } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 33061,
  username: 'root',
  password: 'root',
  database: 'web_ocr',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  synchronize: false,
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
