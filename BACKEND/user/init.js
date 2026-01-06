require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { sequelize } = require("../config/db");

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    // Helper to create user if not exists
    const createUserIfNotExists = async ({ username, password, role, name }) => {
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        console.log(`✅ User "${username}" already exists`);
        return;
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({ username, password: hashedPassword, role, name });
      console.log(`✅ User "${username}" created`);
    };

    // Managers
    await createUserIfNotExists({
      username: "manager",
      password: "manager123",
      role: "manager",
      name: "Manager User",
    });

    await createUserIfNotExists({
      username: "manager2",
      password: "manager456",
      role: "manager",
      name: "Second Manager",
    });

    // Technicians
    await createUserIfNotExists({
      username: "tech1",
      password: "tech123",
      role: "technician",
      name: "Technician One",
    });

    await createUserIfNotExists({
      username: "tech2",
      password: "tech456",
      role: "technician",
      name: "Technician Two",
    });

    await createUserIfNotExists({
      username: "tech3",
      password: "tech789",
      role: "technician",
      name: "Technician Three",
    });

    process.exit();
  } catch (err) {
    console.error("❌ Error creating users:", err);
    process.exit(1);
  }
})();
