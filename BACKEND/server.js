require("dotenv").config(); // ✅ MUST BE FIRST

const app = require("./app");
const { connectDB, sequelize } = require("./config/db");
const port = process.env.PORT || 8000;

connectDB();

// Create tables if not exists
sequelize.sync({ alter: true })
  .then(() => console.log("✅ Models synced"))
  .catch(console.error);

app.listen(port, () => {
  console.log("Server is Running on ", port);
});
