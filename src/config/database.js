require('dotenv/config');

module.exports = {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  logging: false,
  define: {
    timestamps: false,
    underscored: true,
    underscoredAll: true,
  },
};
