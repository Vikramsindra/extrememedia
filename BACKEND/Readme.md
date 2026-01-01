# 📘 Task Management Backend

## 🚀 Overview

This is a **Node.js + Express + Sequelize** backend for managing tasks between managers/admins and technicians. It provides:

- User authentication with **JWT + cookies**
- Role-based access control (admin, manager, technician)
- Task assignment and verification workflow
- Rate limiting to protect the API from abuse

---

## 📦 Packages Used

| Package                | Purpose                                        |
| ---------------------- | ---------------------------------------------- |
| **express**            | Web framework for routing and middleware       |
| **sequelize**          | ORM for database modeling and queries          |
| **mysql2**             | Database driver for Sequelize (if using MySQL) |
| **bcryptjs / bcrypt**  | Password hashing                               |
| **jsonwebtoken**       | JWT generation and verification                |
| **cookie-parser**      | Parse cookies for JWT auth                     |
| **dotenv**             | Environment variable management                |
| **express-rate-limit** | Limit number of requests to prevent abuse      |

---

## 🗂️ Models & Schema

### **User Model**

| Field      | Type    | Constraints                              |
| ---------- | ------- | ---------------------------------------- |
| `id`       | INTEGER | PK, Auto Increment                       |
| `username` | STRING  | Unique, Required                         |
| `password` | STRING  | Required (hashed)                        |
| `role`     | ENUM    | Values: `manager`, `technician`, `admin` |
| `name`     | STRING  | Optional                                 |

### **Task Model**

| Field             | Type    | Constraints                                                                 |
| ----------------- | ------- | --------------------------------------------------------------------------- |
| `id`              | INTEGER | PK, Auto Increment                                                          |
| `title`           | STRING  | Required                                                                    |
| `description`     | TEXT    | Optional                                                                    |
| `priority`        | ENUM    | Values: `Low`, `Medium`, `High` (default: `Medium`)                         |
| `status`          | ENUM    | Values: `PENDING`, `SUBMITTED`, `VERIFIED`, `REJECTED` (default: `PENDING`) |
| `assignedById`    | INTEGER | FK → User.id (manager/admin)                                                |
| `assignedToId`    | INTEGER | FK → User.id (technician)                                                   |
| `rejectionReason` | TEXT    | Optional                                                                    |

---

## 🔗 Relationships

- **User → Task**
  - `User.hasMany(Task, { foreignKey: "assignedById", as: "AssignedTasks" })`
  - `User.hasMany(Task, { foreignKey: "assignedToId", as: "ReceivedTasks" })`
- **Task → User**
  - `Task.belongsTo(User, { foreignKey: "assignedById", as: "AssignedBy" })`
  - `Task.belongsTo(User, { foreignKey: "assignedToId", as: "AssignedTo" })`

---

## 🔐 JWT Authentication

### Flow

1. **Login**

   - Validate username, password, and role.
   - Generate JWT with payload `{ id, username, role }`.
   - Store JWT in **HTTP-only cookie** (`res.cookie("token", token, {...})`).

2. **Middleware**

   - `ensureAuth` verifies JWT from cookie or `Authorization: Bearer <token>`.
   - Attaches decoded user info to `req.user`.

3. **Role Middleware**

   - `ensureManager` ensures only managers/admins can assign tasks.

4. **Logout**
   - Clears cookie (`res.clearCookie("token")`).

---

## ⏱️ Rate Limiting

To protect the API from abuse, these rate limits are applied:

| Route            | Limit                           | Purpose                     |
| ---------------- | ------------------------------- | --------------------------- |
| All routes       | 200 requests per 15 minutes     | General API protection      |
| POST /auth/login | 5 login attempts per 15 minutes | Prevent brute-force attacks |
| POST /tasks      | 20 task creations per 1 minute  | Prevent task spam/flooding  |

**Example Error Response:**

```json
{ "error": "Too many requests. Try again later." }
```
