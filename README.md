# 🗄️ Database Setup & Connection

This document explains how the **database is deployed, configured, and connected** to the Task Management Backend in this branch.

---

## 📌 Supported Database

- **MySQL** (via `mysql2` package for Sequelize)
- Can also work with **MariaDB** if needed.

---

## 🔧 Deployment Options

The database can be deployed in multiple ways:

### 1. Local MySQL Server
- Install MySQL locally.
- Create a database:
```sql
CREATE DATABASE task_management;
