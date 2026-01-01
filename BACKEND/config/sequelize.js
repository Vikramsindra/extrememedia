const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    logging: false, // set true if you want SQL logs
    dialectOptions: {
        ssl: process.env.NODE_ENV === "production"
            ? { require: true, rejectUnauthorized: false }
            : false,
    },
});

module.exports = sequelize;
