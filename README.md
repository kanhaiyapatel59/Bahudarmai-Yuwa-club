# 🇳🇵 Bahudarmai Yuwa Club (BYC) — Digital Platform & Community Management System

> **युवा • एकता • सेवा • प्रगति (Youth • Unity • Service • Progress)**  
> *Bahudarmai Municipality-02, Pipra (Parsa), Madhesh Pradesh, Nepal • Estd. 2080 BYC*  
> **Helpline:** +977 9767721133 | **Email:** info@byc.org.np

---

## 📌 Project Overview

**Bahudarmai Yuwa Club (BYC)** is a modern full-stack MERN application (MongoDB, Express, React, Node.js) designed for local youth development, sports tournaments, emergency community help, blood donor networks, social service, and committee administration.

Built with bilingual support (English 🇬🇧 & Devanagari Nepali 🇳🇵), dynamic live database counters, and a SaaS administrative dashboard.

---

## 🌟 Key Features

### 1. 🌐 Bilingual Engine (English & Nepali)
- Instant language toggle (English ↔ Devanagari Nepali) via Navbar.
- Dynamic Mongoose schemas (`title: { en, ne }`, `description: { en, ne }`) with automatic English fallback.
- Devanagari number localizer (e.g. `520` ➔ `५२०`) and date formatter.

### 2. 🏛️ Official Executive Committee Directory (`/leadership`)
- Features the official **BYC Executive Committee Poster Banner** (`/byc_committee_banner.jpg`) with interactive **Zoom Lightbox Modal**.
- 38 real executive officers & committee members parsed from official records:
  - **अध्यक्ष (President):** Dhananjay Patel (धनञ्जय पटेल)
  - **उपाध्यक्ष (Vice President):** Pooja Yadav (पूजा यादव)
  - **सचिव (Secretary):** Rajan Patel (राजन पटेल)
  - **सह-सचिव (Joint Secretary):** Aman Patel (अमन पटेल)
  - **कोषाध्यक्ष (Treasurer):** Arjun Gupta (अर्जुन गुप्ता)
  - **संयोजक (Coordinator):** Baliram Patel (बलिराम पटेल)
  - **३२ कार्यसमिति सदस्यहरू (32 Executive Committee Members)**

### 3. 🎯 Focus Areas & Activities (`/activities`)
- Dedicated modules for **Sports & Athletics**, **Education & Leadership**, **Social Service**, **Environment & Ecology**, **Youth Development**, and **Culture & Heritage**.

### 4. ⚽ Events Management & Online Registration (`/events`)
- Status filtering (Upcoming, Ongoing, Completed), details view, and online participant registration form.

### 5. 🩸 Privacy-First Blood Donor Network (`/blood-donation`)
- Blood group & ward filter. Phone numbers are masked from public view for donor privacy and routed via BYC emergency dispatch (+977 9767721133).

### 6. 🆘 Community Help Ticket System (`/help`)
- Direct ticket submission generating unique tracking IDs (e.g. `HELP-2026-0101`) for medical, food, disaster, or blood assistance. Admin can assign registered volunteers to tickets.

### 7. 🛡️ SaaS Admin Panel (`/admin`)
- Control panel with dual **Image URL Link** and **File Upload** support across all forms:
  - Members Approval & Digital Member ID Card issuance.
  - Volunteers directory & skill filters.
  - Events CRUD & Participant Roster exporter.
  - News & Notice announcements publisher.
  - Photo Gallery album manager.
  - Leadership Committee manager.
  - Site Settings & Hero text configurator.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18 (Vite), Tailwind CSS v4, Framer Motion, Lucide Icons, Axios, i18next |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose |
| **Authentication** | JSON Web Tokens (JWT), bcryptjs password hashing |
| **Security** | Helmet, CORS, Express Rate Limiting, Input Sanitization |

---

## ⚙️ Quick Start & Installation

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Community Server (`mongodb://127.0.0.1:27017`)

### 2. Backend Setup
```bash
cd backend
npm install
npm run seed  # Populates database with official 38 committee members & events
npm start     # Runs Express server on http://localhost:5001
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev   # Runs Vite development server on http://localhost:5173
```

---

## 🔑 Demo Access Credentials

| Role | Email | Password | Access Level |
|---|---|---|---|
| **Super Admin** | `admin@byc.org.np` | `adminpassword123` | Full access to `/admin` dashboard & site settings |
| **Active Member** | `rohan@example.com` | `memberpassword123` | Access to `/member` portal with approved digital ID badge |

---

## 📄 License & Attribution

Developed for **Bahudarmai Yuwa Club (BYC)**, Bahudarmai Municipality-02, Pipra (Parsa), Nepal. All rights reserved.
