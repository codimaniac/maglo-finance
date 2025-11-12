# 💼 Finance Management Dashboard

A responsive and interactive **Finance Management Dashboard** built with **React + Vite** for small businesses to manage invoices and track financial summaries — all in one place.

![Dashboard Preview](https://www.figma.com/design/TsA5OuR7NJfIqFGzZ2Drm1/Maglo---Financial-Management-Web-UI-Kit--Community---Copy-?node-id=0-1)

---

## 🚀 Project Overview

The **Finance Management Dashboard** helps small business owners create and manage invoices, calculate VAT automatically, mark payments as paid or unpaid, and visualize their financial health through charts and summaries — all from a single, user-friendly dashboard.

---

## 🎯 Objective

Create a single-page web application that allows a logged-in business owner to:

- 🧾 Create and manage invoices  
- ✅ Mark invoices as paid/unpaid  
- 💰 Calculate VAT automatically  
- 📊 View a live financial summary with totals and charts  

---

## ⚙️ Core Features

### 🔐 1️⃣ Authentication
- User signup and login using **Appwrite Auth**
- Redirects authenticated users to the main dashboard

### 📊 2️⃣ Dashboard Overview
- Display key metrics:
  - Total invoices created  
  - Total amount paid  
  - Pending payments  
  - Total VAT collected  
- Visualize data using **Recharts** or **Chart.js**
- Fully responsive layout for mobile and desktop

### 🧾 3️⃣ Invoice Management
- Create invoices with:
  - Client Name  
  - Client Email  
  - Amount (₦)  
  - VAT (%)  
  - Due Date  
  - Status (Paid / Unpaid)
- Auto-calculations:
  - `VAT Amount = Amount × (VAT / 100)`
  - `Total = Amount + VAT Amount`
- Save data to **Appwrite Database**
- Display all invoices in a filterable table (All / Paid / Unpaid)
- Edit, delete, or mark invoices as Paid

### 💰 4️⃣ Payments & VAT Summary
- Auto-update total revenue and VAT summary when invoices are marked as paid  
- Monthly VAT breakdown:
  - Output VAT (from paid invoices)
  - Total payable amount
- Highlight unpaid invoices and show due-date countdowns

---

## 🧩 Tech Stack

| Tool | Purpose |
|------|----------|
| **React + Vite** | Frontend framework and bundler |
| **TailwindCSS + ShadCN/UI** | Styling and UI components |
| **Appwrite** | Authentication & Database |
| **Recharts / Chart.js** | Data visualization |
| **Vercel / Netlify** | Deployment |

---

## 🧠 Technical Highlights

- Real-time calculations and status updates  
- Modular and reusable React components  
- State management using **React Hooks** or **Zustand**  
- Form validation and toast notifications  
- Optimized performance with **Vite’s fast HMR**  
- Fully mobile responsive design  

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- NPM or Yarn
- Appwrite project setup

### Setup Steps

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/finance-dashboard.git

# 2. Navigate to the project directory
cd finance-dashboard

# 3. Install dependencies
npm install

# 4. Create a .env file and add your Appwrite credentials
VITE_APPWRITE_ENDPOINT=your_endpoint
VITE_APPWRITE_PROJECT_ID=your_project_id

# 5. Run the app in development mode
npm run dev
