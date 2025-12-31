const mysql = require("mysql2");

const DEV_MODE = process.env.NODE_ENV === "development";

let db = null;

if (!DEV_MODE) {
  db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  db.connect((err) => {
    if (err) {
      console.error("DB connection failed:", err);
    } else {
      console.log("MySQL connected");
    }
  });
} else {
  console.log("DEV MODE: DB connection skipped");
}

module.exports = db;
