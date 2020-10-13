// eslint-disable-next-line
require('dotenv').config()

const rootDir = process.env.NODE_ENV === 'production' ? 'build' : 'src'

module.exports = {
  name: process.env.DB_DRIVER,
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [`${rootDir}/app/models/**/*.[tj]s`],
  migrations: [`${rootDir}/database/migrations/**/*.[tj]s`],
  cli: {
    migrationsDir: `${rootDir}/database/migrations`,
    entitiesDir: `${rootDir}/app/models`,
  },
}
