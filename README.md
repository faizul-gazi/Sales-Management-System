# TryUsBD — Premium Gadget Store

TryUsBD is a modern, high-fidelity gadget e-commerce platform built as a Single Page Application (SPA) using **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **MongoDB Atlas** (with an automatic local file database fallback).

This project features a glassmorphic dark-tech design system, customer storefront catalog, wishlist drawer, real-time cart counts, checkout processing, and an administrator dashboard with sales analytics.

---

## 🚀 Key Features

### For Customers
- **Curated Storefront**: Sleek slides and sections for *New Arrivals*, *Upcoming releases*, and *Top Rated* items.
- **Dynamic Catalog Filters**: Live search as you type, multi-select checkboxes for categories and brands, and price range filters.
- **Interactive Specs Modal**: Centered modal overlay listing item colors, connectivity, battery, warranty specs, and verified user reviews.
- **Wishlist Sync**: Persistent wishlist collection matching user interest.
- **Checkout Form**: Detailed validation fields for shipping location charges (Dhaka inside ৳60 vs outside ৳110) and cash on delivery submission.

### For Administrators
- **Console Analytics**: Stat blocks representing total order counts, net earnings (৳), pending queues, and completions.
- **Visual Chart Widgets**: SVG-drawn monthly transaction bar charts and delivery shipping regional gauges.
- **Orders Manager**: Searchable orders list with status indicators and an option to mark orders completed.
- **Message Logs**: Feeds displaying name, telephone, email logs from user contacts.

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Lucide React Icons.
- **Backend & Database**: Next.js Route Handlers (APIs), MongoDB Node Driver.
- **Fallback Architecture**: File-based database engine (`src/data/local_db.json`) for offline runtime.

---

## 💡 Smart Fallback System
To prevent setup hurdles, **TryUsBD** implements a fail-fast local database fallback:
1. If no `MONGODB_URI` environment variable is defined or if the database is offline, the MongoDB connection fails in **1 second** (configured via short client timeouts).
2. The server instantly switches to local fallback database files (`src/data/local_db.json`) and populates the store with all **22 pre-seeded gadget products** from `src/lib/seed.ts`.
3. Checkout submissions, contacts, and orders status updates write directly to the local JSON file database, ensuring **100% functionality** even without MongoDB Atlas!

---

## ⚙️ Getting Started

### 1. Prerequisites
Ensure you have **Node.js** (v18+) and **npm** installed on your system:
```bash
node -v
npm -v
```

### 2. Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 3. Database Configuration (Optional)
If you want to use MongoDB Atlas, create a `.env.local` file at the root of the project and provide your connection string:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/tryusbd?retryWrites=true&w=majority
```
*Note: If omitted, the application will run in local file-fallback mode automatically.*

### 4. Running the Development Server
Start the local server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) inside your web browser.

### 5. Building for Production
Verify typescript safety and compile the project bundle:
```bash
npm run build
```

---

## 🔒 Administrator Authentication

Access the dashboard console at [http://localhost:3000/admin/login](http://localhost:3000/admin/login).
- **Username**: `admin`
- **Password**: `admin123`

---

## 📁 Project Structure

```text
├── legacy-php-version/     # Isolated backup of the old PHP/HTML files
├── public/                 # Static public assets
├── src/
│   ├── app/                # Next.js App Router Page components
│   │   ├── api/            # API endpoints (Orders, Stats, Contact, Products)
│   │   ├── admin/          # Admin pages (Login, Dashboard, Orders, Messages)
│   │   ├── cart/           # Cart and Checkout flow
│   │   ├── shop/           # Search and Category catalog
│   │   ├── wishlist/       # Client wishlist
│   │   └── globals.css     # Tailwind imports and glassmorphic presets
│   ├── components/         # Shared components (Navbar, Footer, ProductCard, Modals)
│   ├── context/            # React AppContext (Cart, Toast contexts)
│   └── lib/                # MongoDB connections and local JSON database wrappers
├── package.json
└── tsconfig.json
```

---

## 👨‍💻 Author
**Gazi Faizul Islam** — *All Rights Reserved.*
