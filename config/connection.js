const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

const connectionUrl = process.env.DATABASE_URL || process.env.JAWSDB_URL;
const isPostgres = connectionUrl
  ? connectionUrl.startsWith('postgres://') || connectionUrl.startsWith('postgresql://')
  : false;

if (connectionUrl) {
  sequelize = new Sequelize(connectionUrl, {
    dialect: isPostgres ? 'postgres' : undefined,
    logging: false,
    dialectOptions:
      isPostgres && process.env.NODE_ENV === 'production'
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          }
        : {},
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;
