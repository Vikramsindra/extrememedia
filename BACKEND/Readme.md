# 📘 Task & Inventory Management Backend

## 🚀 Project Overview

This project is a **Node.js + Express + Sequelize** backend system designed to manage:

- Task assignment and verification between managers/admins and technicians
- Inventory transactions and batch tracking
- Inventory summaries with analytical insights
- Downloadable Excel reports for offline analysis

The backend is built with scalability and enterprise reporting in mind.

---

## 🧱 Technology Stack

- **Node.js**
- **Express.js**
- **Sequelize ORM**
- **MySQL**
- **React.js (Frontend)**
- **Material UI**
- **ExcelJS** (Excel report generation)

---

## 📦 Installed Packages

| Package            | Purpose                            |
| ------------------ | ---------------------------------- |
| express            | Backend framework                  |
| sequelize          | ORM for database operations        |
| mysql2             | MySQL driver                       |
| bcryptjs           | Password hashing                   |
| jsonwebtoken       | JWT authentication                 |
| cookie-parser      | Cookie-based auth handling         |
| dotenv             | Environment variable support       |
| express-rate-limit | API rate limiting                  |
| exceljs            | Generate `.xlsx` inventory reports |

---

## 🗂️ Database Models

### 👤 User Model

| Field    | Description                |
| -------- | -------------------------- |
| id       | Primary key                |
| username | Unique login identifier    |
| password | Encrypted password         |
| role     | admin, manager, technician |
| name     | User display name          |

### 📝 Task Model

| Field           | Description                               |
| --------------- | ----------------------------------------- |
| title           | Task title                                |
| description     | Task details                              |
| priority        | Low / Medium / High                       |
| status          | Pending / Submitted / Verified / Rejected |
| assignedById    | Manager/Admin                             |
| assignedToId    | Technician                                |
| rejectionReason | Optional                                  |

### 📦 Inventory Model

| Field        | Description                              |
| ------------ | ---------------------------------------- |
| tranDate     | Transaction date                         |
| batchNo      | Batch identifier                         |
| lotNo        | Lot identifier                           |
| tranType     | IN / DISPATCH / RETURN / REPAIR_DISPATCH |
| qty          | Quantity                                 |
| returnReason | Reason for return (if applicable)        |
| remarks      | Additional notes                         |

---

## 🔗 Model Relationships

- A **User** can assign many **Tasks**
- A **Task** belongs to one assigner and one receiver
- Inventory records are grouped by **batch + lot**

---

## 🔐 Authentication & Authorization

- JWT-based authentication
- Token stored in HTTP-only cookies
- Role-based route protection
- Secure login & logout flow

---

## ⏱️ API Rate Limiting

| Route Type    | Limit                     |
| ------------- | ------------------------- |
| General APIs  | 200 requests / 15 minutes |
| Login API     | 5 attempts / 15 minutes   |
| Task creation | 20 requests / minute      |

---

## 📊 Inventory Summary Features

The system provides detailed inventory analytics including:

- Batch-wise and lot-wise summaries
- Received, dispatched, returned, and re-dispatched quantities
- Balance quantity calculation
- Return percentage computation

### 📐 Calculation Logic

- **Balance Qty** = Received − Dispatch + Return − ReDispatch
- **Return %** = (Return Qty ÷ Dispatch Qty) × 100

---

## 🆕 Newly Added Feature: Excel Download Support

### 📥 Purpose

To allow users to download inventory data and summaries as Excel (`.xlsx`) files for:

- Offline analysis
- Sharing with stakeholders
- Audit and reporting requirements

---

## 📤 Excel Download APIs

### 1️⃣ Bulk Inventory Data Download

**Endpoint:**  
`POST /api/data/bulk/download`

**Functionality:**

- Accepts a date range
- Fetches all inventory transactions
- Generates a structured Excel file
- Returns the file as a downloadable response

**Excel Columns:**

- Transaction Date
- Batch No
- Lot No
- Transaction Type
- Quantity

---

### 2️⃣ Inventory Summary Excel Download

**Endpoint:**  
`POST /api/data/summary/download`

**Functionality:**

- Accepts a date range
- Aggregates inventory data by batch and lot
- Computes balances and return percentages
- Generates an Excel summary report

**Excel Columns:**

- Batch No
- Lot No
- Received Qty
- Dispatch Qty
- Return Qty
- Re-Dispatch Qty
- Balance Qty
- Return Percentage

---

## 🧠 Excel Generation Logic

- Uses **ExcelJS** to create workbooks
- Applies column headers and widths
- Streams the file directly to the client
- Sets proper response headers for browser download

---

## 🖥️ Frontend Enhancements

- Added **Download Excel** buttons in:
  - Bulk inventory view
  - Inventory summary page
- Buttons become active after data is loaded
- Uses **axios** with `responseType: "blob"` for file downloads
