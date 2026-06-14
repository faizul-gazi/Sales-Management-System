# 🛍️ TryUsBD — Premium Gadget Store

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)

A premium, high-fidelity gadget e-commerce storefront and administration panel designed with a state-of-the-art **glassmorphic UI**, supporting seamless **dark and light themes**, persistent client-side states, and automated database fail-safe fallbacks.

---

## 🌟 Key Highlights

*   **Premium Interactive Storefront**: Fully-featured catalog with instant filters, real-time live search, interactive specs drawers, persistent shopping cart, and custom wishlist syncing.
*   **Dual Light & Dark Themes**: Hand-crafted theme switcher that transitions colors, layouts, buttons, and panels instantly between a sleek tech-dark style and a clean, high-contrast light mode.
*   **Admin Dashboard Console**: Real-time sales analytics including monthly revenue timelines, regional distribution metrics, messages logs, and simple single-click order fulfillment.
*   **Robust Smart-Fallback Engine**: Auto-seeds 22 pre-configured catalog products on first load, and falls back to an offline JSON database (`src/data/local_db.json`) instantly if MongoDB is unavailable.

---

## 🚀 Storefront Features

### 🛒 Customer Storefront
*   **Curated Landing Page**: Showcases sliding highlights for *New Arrivals*, *Upcoming releases*, and *Top Rated* gadgets.
*   **Live Search & Dynamic Filters**: Live search query indexing, multi-select checkboxes for categories/brands, and interactive price range sliders.
*   **High-Fidelity Specs Drawer**: Centered overlay displaying precise dimensions, battery life, connectivity ports, warranty details, and user reviews.
*   **Responsive Checkout Flow**: Interactive cart drawer syncing shipping charges based on location (Inside Dhaka: ৳60 / Outside Dhaka: ৳110) with Cash on Delivery integration.

### 📊 Admin Console Dashboard
*   **Live Analytics KPI Cards**: Highlights key statistics including total orders, total revenue (৳), pending queue count, and completed transactions.
*   **Dynamic Visual Charts**: Clean custom-rendered SVG timeline graph representing earnings growth and regional delivery gauges.
*   **Order Manager Table**: Interactive logs featuring order searches, status badges, and single-click fulfillment buttons.
*   **Messages Feed**: Dedicated inbox logging customer emails, phone numbers, and messages submitted via the Contact portal.

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React 19, Next.js 16 (App Router), TypeScript | Responsive UI structure & fast client hydration |
| **Styling** | Tailwind CSS v4 | Curated glassmorphism, responsive utilities, HSL themes |
| **Icons** | Lucide React | High-quality minimalist stroke SVG icons |
| **Database** | MongoDB Atlas Node Driver | Enterprise-grade cloud data layer |
| **Database Fallback** | Local Node File System Engine | JSON-based storage engine for offline environments |

---

## ⚙️ Quick Start

### 1. Requirements
Install Node.js (version 18+) and npm:
```bash
node -v
npm -v
```

### 2. Setup
Clone the repository and install all node packages:
```bash
npm install
```

### 3. Database Settings (Optional)
To use MongoDB Atlas, create a `.env.local` file at the root of the project:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/tryusbd?retryWrites=true&w=majority
```
*Note: If omitted, the application will automatically initialize the local JSON file database.*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 5. Production Build
Ensure code compilation is warning-free:
```bash
npm run build
```

---

## 🔑 Admin Logins
Log in at [http://localhost:3000/admin/login](http://localhost:3000/admin/login) to access the control panel:
*   **Username**: `admin`
*   **Password**: `admin123`

---

## 📁 Directory Architecture
```text
├── legacy-php-version/     # Reference backup of the original PHP site files
├── public/                 # Favicons and static page assets
├── src/
│   ├── app/                # App Router Layouts & Pages
│   │   ├── api/            # Route Handlers (Products, Orders, Stats, Messages)
│   │   ├── admin/          # Dashboard controls, orders, login pages
│   │   ├── cart/           # Shopping cart checkout page
│   │   ├── shop/           # Catalog views, details modal
│   │   └── globals.css     # Global styles & tailwind configurations
│   ├── components/         # Reusable panels (Navbar, Footer, ProductCard, Modals)
│   ├── context/            # Shared state providers (Cart, Toasts, Theme Context)
│   └── lib/                # MongoDB Client & Local Db adapter
```

---

## 👨‍💻 Creator
**Gazi Faizul Islam** — *All Rights Reserved*
