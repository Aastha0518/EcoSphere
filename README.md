# 🌿 EcoSphere — Enterprise ESG Management Platform

> A full-stack enterprise-grade ESG (Environmental, Social & Governance) and CSR (Corporate Social Responsibility) management platform built with React and Node.js.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Modules](#modules)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)

---

## 🌍 Overview

**EcoSphere** is an enterprise ERP-style platform designed to help organizations track, manage, and improve their ESG performance. It provides a unified dashboard for monitoring carbon emissions, CSR activities, employee engagement, governance compliance, and sustainability goals — all in one place.

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI Framework |
| Recharts | Data visualization (Area charts) |
| Lucide React | Icon library |
| Vanilla CSS | Styling & design system |
| React Scripts 5 | Build tooling |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express 5 | REST API framework |
| MongoDB + Mongoose | Database |
| JSON Web Token (JWT) | Authentication |
| bcryptjs | Password hashing |
| dotenv | Environment config |
| cors, helmet, morgan | Security & logging |
| multer, cloudinary | File/image uploads |

---

## 📁 Project Structure

```
EcoSphereMain/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   │   └── authRoutes.js
│   ├── db.js
│   ├── server.js
│   └── package.json
│
└── frontend/
    └── src/
        ├── components/
        │   └── SphereMark.jsx
        └── pages/
            ├── Dashboard.jsx        ← Main app shell + sidebar + navbar
            ├── Employees.jsx        ← Employee management module
            ├── Departments.jsx      ← Department management module
            ├── Badges.jsx           ← Gamification badges module
            ├── Challenges.jsx       ← ESG challenges module
            ├── Reports.jsx          ← Reports & export module
            ├── LoginScreen.jsx      ← Authentication screen
            └── EcoSphereApp.css     ← Global design system
```

---

## ✨ Features

- 🔐 **Authentication** — Secure login screen with JWT-based auth
- 📊 **Live Dashboard** — Real-time ESG stats, area charts, leaderboard, and activity feed
- 👥 **Employee Management** — Full CRUD with search, 7-filter system, and pagination
- 🏢 **Department Management** — Department-level ESG tracking
- 🏅 **Badge System** — Gamification badges with categories, search, filters, and pagination
- 🏆 **Challenges** — ESG challenge creation, management, filtering, and pagination
- 📄 **Reports** — Multi-type report generation with PDF/Excel/CSV export buttons
- 🎨 **Design System** — Consistent enterprise UI with cards, status badges, stat cards

---

## 📦 Modules

### 🏠 Dashboard
- 6 KPI stat cards (Employees, Departments, Carbon Emissions, CSR Activities, Challenges, Badges)
- Area chart: Monthly Carbon Emissions vs CSR Registrations (Recharts)
- ESG Overall Score radial dial (SVG)
- Department leaderboard (top 5)
- Sustainability goals progress bars
- Live activity feed

### 👤 Employees
- Employee directory table with avatar, code, name, email, department, designation, manager, status, joining date, XP, ESG score
- **Search** by name, code, or email
- **7 Filters**: Department, Designation, Employment Type, Status, Location, Manager, Date Joined
- **Add Employee** form
- **Employee Profile** detail view with tabbed sections
- **Delete** with confirmation
- **Pagination** — 8 employees per page

### 🏢 Departments
- Department cards with ESG scores and member counts
- Department detail view

### 🏅 Badges
- Badge collection table with icon, name, category, description, CSR points, status
- **Search** by badge name
- **3 Filters**: Category, Rarity, Status
- **Badge Detail** view with analytics
- **Pagination** — 8 badges per page

### 🏆 Challenges
- Challenge directory with title, category, difficulty, XP reward, participants, deadline, status
- **Create Challenge** form
- **4 Filters**: Category, Difficulty, Status, Department
- **Challenge Detail** view with mini leaderboard
- **Delete** with confirmation
- **Pagination** — 8 challenges per page

### 📄 Reports
- **8 Report Types**: Environmental, Social, Governance, ESG Summary, Employee, Department, Challenge, Badge
- **7 Filters**: Department, Employee, Challenge, Badge, Category, Status, Date Range
- Report preview table with live sample data
- **Export buttons**: PDF, Excel, CSV
- **Pagination** — 8 rows per page

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas cloud URI)
- npm

### Clone the Repository

```bash
git clone https://github.com/your-username/EcoSphereMain.git
cd EcoSphereMain
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `/backend` directory:

```env
MONGO_URI=mongodb://localhost:27017/ecosphere
PORT=5000
JWT_SECRET=your_jwt_secret_here
```

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

---

## ▶️ Running the App

### 1. Start the Backend

```bash
cd backend
npm install
node server.js
```

Backend runs on: `http://localhost:5000`

### 2. Start the Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on: `http://localhost:3000`

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and receive JWT token |

---

## 🎨 Design System

Key component classes in `EcoSphereApp.css`:

| Class | Purpose |
|---|---|
| `.es-card` | Standard card |
| `.es-stat-card` | KPI stat card |
| `.es-data-table` | Data table |
| `.es-filter-card` | Filter panel |
| `.es-status-badge` | Status pill |
| `.es-pagination` | Pagination bar |
| `.es-page-btn` | Pagination button |
| `.es-fade-up` | Entrance animation |

---

## 📌 Notes

- All data is currently **frontend mock data**. Backend integration is in progress.
- Pagination resets to page 1 automatically when search or filters change.
- Sidebar navigation is managed via `useState` in `Dashboard.jsx`.

---

> Built with 💚 for a sustainable future.

## 📸 Screens
- login:
  
  <img width="1242" height="705" alt="image" src="https://github.com/user-attachments/assets/91a1da87-17c1-4855-ac6a-311eb871f4d8" />
- Dashboard:
  
  <img width="1312" height="732" alt="image" src="https://github.com/user-attachments/assets/bd29f8be-a381-4efb-bc92-75ed767ae722" />
- Employee Management:
  
  <img width="1247" height="701" alt="image" src="https://github.com/user-attachments/assets/7157b11a-e2a2-42e4-9fa6-a81e65b24487" />
- Employee Details:
  
  <img width="1250" height="696" alt="image" src="https://github.com/user-attachments/assets/54f6b573-cfe9-4e0f-be9a-af0f40dfd7e1" />
- Departments:
  
  <img width="1247" height="697" alt="image" src="https://github.com/user-attachments/assets/67bd3997-94fb-4180-a3cd-dc7b2ab6a99b" />
  
  <img width="1242" height="697" alt="image" src="https://github.com/user-attachments/assets/db0398b5-d254-48ca-89be-6e92e50791d5" /> 
- Challenges:
  
  <img width="1590" height="772" alt="image" src="https://github.com/user-attachments/assets/172e168b-5090-4bfb-9fda-fc522df1f5fd" />

  <img width="1242" height="705" alt="image" src="https://github.com/user-attachments/assets/9cea71af-8ab6-465d-9831-78942a1371fd" />

- Badges:
  
  <img width="1247" height="705" alt="image" src="https://github.com/user-attachments/assets/4c097682-840b-4a0f-aa4a-a4c45ad081e9" />
- Rewards
  
  <img width="1240" height="697" alt="image" src="https://github.com/user-attachments/assets/03fb811e-0184-47ab-a568-5cbb723875e2" />
- Add User:

  <img width="1317" height="742" alt="image" src="https://github.com/user-attachments/assets/f4fdb98a-5764-4707-a74a-27880d3eb5b1" />
- User:
  
  <img width="1242" height="702" alt="image" src="https://github.com/user-attachments/assets/00ce0ae2-778e-4550-b934-b88703e66b4a" />
 

