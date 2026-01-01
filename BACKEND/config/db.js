const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env")
});
const { Sequelize } = require("sequelize");

if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL is missing in .env");
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connected via Sequelize");
  } catch (err) {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
