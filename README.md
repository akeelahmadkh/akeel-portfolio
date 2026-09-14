# Akeel — AI + Mobile Application Developer Portfolio

Full-stack production-grade MERN portfolio application for **Akeel — AI + Mobile Application Developer**, featuring a 60fps scroll-driven canvas background animation using 192 cinematic PNG video frames (`frame_000000.png` through `frame_000191.png`), selective 3D elements, dynamic MongoDB project management, secure Admin Panel, and a dark-gold luxury editorial magazine aesthetic.

---

## 🌟 Key Features

1. **Frame-Based 60fps Scroll Canvas Engine**:
   - Preloads 192 cinematic PNG frames into memory with a luxury gold preloader screen.
   - Pinned background `<canvas>` with linear interpolation (Lerp) and `requestAnimationFrame` for lag-free scroll scrubbing.

2. **Flagship Project Spotlight — Nexa Bank**:
   - Dedicated technical breakdown for Nexa Bank (digital banking app simulation: authentication, OTP verification, role-based workflows, backend architecture).

3. **MERN Stack Architecture**:
   - **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, Three.js / React Three Fiber.
   - **Backend**: Node.js, Express.js REST API with CORS and JWT authentication.
   - **Database**: MongoDB & Mongoose schemas (`Project`, `User`, `Contact`).

4. **Dynamic Project Discovery & Admin Management**:
   - `/projects` page with category filtering (*AI / ML*, *Mobile*, *Full Stack*, *Backend*).
   - Private `/admin` dashboard allowing CRUD operations to add, edit, and feature projects dynamically without touching frontend code.

5. **Honest & Scalable Engineering**:
   - No fake percentages or metrics.
   - Categorized skills: *Working With*, *Learning*, *Exploring*.
   - Zero hardcoded secrets (`.env.example` provided).

---

## 📁 Repository Structure

```text
portfolio/
├── client/                     # Frontend React + Vite + TS Application
│   ├── public/
│   │   └── video_frames_30fps_png/  (192 frames)
│   ├── src/
│   │   ├── components/         # ScrollCanvas, Hero3D, Navbar, ProjectCard, Testimonials, Footer
│   │   ├── pages/              # Home, Projects, ProjectDetail, About, Skills, Contact, Admin
│   │   ├── services/           # REST API Client with fallback data support
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.ts
├── server/                     # Backend Node.js + Express + MongoDB REST API
│   ├── src/
│   │   ├── config/             # MongoDB connection setup
│   │   ├── models/             # Project, User, Contact Mongoose models
│   │   ├── routes/             # Project, Auth, and Contact routes
│   │   ├── middleware/         # JWT auth protection middleware
│   │   └── server.ts           # Main Express server
│   ├── .env.example
│   └── package.json
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Quick Start & Installation

### 1. Prerequisites
- Node.js `v18+` or `v20+`
- npm `v9+`
- MongoDB (local or MongoDB Atlas cluster URL)

### 2. Environment Setup
Create a `.env` file inside `server/`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/akeel_portfolio
JWT_SECRET=your_custom_jwt_secret_key_here
ADMIN_EMAIL=akeel@developer.com
ADMIN_PASSWORD=adminpassword123
```

### 3. Install Dependencies
In the root directory, run:
```bash
npm run install:all
```
*(Or install inside `client/` and `server/` separately via `npm install`).*

---

## 🏃 Running the Application

### Start Express Backend Server:
```bash
cd server
npm run dev
```
Backend API will start at: `http://localhost:5000`

### Start React Frontend Client:
```bash
cd client
npm run dev
```
Frontend Web App will start at: `http://localhost:5173`

---

## 🔐 Admin Dashboard Access

- **Public Route**: Access `/admin` in the browser URL.
- **Default Login Credentials**:
  - Email: `akeel@developer.com`
  - Password: `adminpassword123` *(or value configured in `ADMIN_PASSWORD`)*

---

## 🛠️ Deployment Instructions

1. **Frontend (Vercel / Netlify)**:
   - Build command: `npm run build`
   - Output directory: `client/dist`
2. **Backend (Render / Railway)**:
   - Command: `npm run build && npm start`
   - Environment variables: Set `MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`.
