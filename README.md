# E-Commerce Website with Admin Dashboard

A responsive e-commerce website built with **React + Vite** for the frontend and **Firebase** (Authentication + Firestore + Storage) for the backend.  
This project includes a customer storefront and an admin dashboard for managing products, orders and users.

---

## Badges
[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)](https://react.dev)  
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)  
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com)  
[![JavaScript](https://img.shields.io/badge/JavaScript-323330?logo=javascript&logoColor=F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## Table of contents
- [Project overview](#project-overview)  
- [Features](#features)  
- [Tech stack](#tech-stack)  
- [Repository structure](#repository-structure)  
- [Prerequisites](#prerequisites)  
- [Install & Run (local)](#install--run-local)  
- [Firebase setup](#firebase-setup)  
- [Environment variables / config](#environment-variables--config)  
- [Build & Deployment](#build--deployment)  
- [Admin credentials & usage](#admin-credentials--usage)  
- [Contributing](#contributing)  
- [License & contact](#license--contact)

---

## Project overview
This project implements an e-commerce storefront plus an admin dashboard using a modern React + Vite frontend and Firebase services (Authentication for users/admins, Firestore for data, Storage for product images). It is designed to be simple to run locally and easy to deploy to static hosts or Firebase Hosting. :contentReference[oaicite:2]{index=2}

---

## Features
- Customer storefront: browse categories, view product details, add to cart.  
- Shopping cart and order creation (orders stored in Firestore).  
- Firebase Authentication: register/login, protected routes.  
- Admin dashboard: create / edit / delete products, view orders, manage users.  
- Product image upload to Firebase Storage.  
- Responsive UI built with React components and Vite tooling.  
*(Adjust this list to match exact implemented features in your repo.)* :contentReference[oaicite:3]{index=3}

---

## Tech stack
- Frontend: **React** (Vite)  
- Backend: **Firebase** (Firestore, Auth, Storage, Functions optional)  
- Tooling: npm, Vite, ES Lint (config present), plain JavaScript / JSX.  
- Hosting: (suggestion) Firebase Hosting, Netlify, or Vercel for the client build.

---

## Repository structure (typical)
```

.
├── public/                # static assets, index.html
├── src/                   # React source
│   ├── components/        # UI components
│   ├── pages/             # Storefront & Admin pages
│   ├── routes/            # Client-side routing
│   ├── firebase/          # firebase init & helpers (or src/firebase.js)
│   ├── utils/             # helper functions
│   └── main.jsx
├── .gitignore
├── package.json
├── vite.config.js
└── README.md

````
(Your repo contains `public`, `src`, `package.json`, `vite.config.js` and related files.) :contentReference[oaicite:4]{index=4}

---

## Prerequisites
- Node.js (v16+ recommended) and npm (or yarn).  
- A Firebase project (Firestore, Authentication, Storage enabled).  
- Optional: Firebase CLI for local emulators & deployment.

---

## Install & Run (local)

1. **Clone repo**
```bash
git clone https://github.com/mehtabali05/ecommerce-website-with-admin-dashboard.git
cd ecommerce-website-with-admin-dashboard
````

2. **Install dependencies**

```bash
npm install
```

3. **Add Firebase config**
   Create a client config file (see **Firebase setup** below). Typical file is `src/firebase.js` or use environment variables (examples below).

4. **Run dev server**

```bash
npm run dev
```

By default Vite serves on `http://localhost:5173` (or the port Vite prints). Open the storefront and the admin dashboard routes defined by the app.

---

## Firebase setup

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com) and create a new project (or use an existing one).

2. Enable **Authentication** (Email/Password or providers you want).

3. Create a **Firestore** database (start in test mode for development, then lock rules in production).

4. Enable **Storage** if you want image uploads.

5. (Optional) Configure **Firebase Functions** if your app uses server-side logic.

6. Obtain the Firebase SDK config (found in project settings — a JS object with `apiKey`, `authDomain`, `projectId`, etc.). Example:

```js
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "PROJECT.firebaseapp.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

If your repo expects environment variables, place them into `.env` / `.env.local` and load them into the firebase init file.

---

## Environment variables / config

You can either place Firebase values directly into `src/firebase.js` (not recommended for production) or use environment variables.

Example `.env.local`:

```
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx
VITE_FIREBASE_PROJECT_ID=xxx
VITE_FIREBASE_STORAGE_BUCKET=xxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxx
VITE_FIREBASE_APP_ID=xxx
```

Then in `src/firebase.js` use `import.meta.env.VITE_FIREBASE_API_KEY` etc.

**Important:** do **not** commit real secrets. Add `.env.local` to `.gitignore`.

---

## Scripts

Typical Vite project scripts (verify in your `package.json`):

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

Use `npm run dev` to develop, `npm run build` to create a production build, and `npm run preview` to preview the production build locally.

---

## Build & Deployment

1. Build frontend:

```bash
npm run build
```

2. Deploy options:

* **Firebase Hosting:** integrate the build folder or configure hosting to serve the Vite build. Use `firebase init hosting` and `firebase deploy`.
* **Vercel / Netlify:** connect the repo and set build command `npm run build` with publish directory `dist`.

3. Ensure environment variables (Firebase config) are added in the host’s dashboard (Vercel environment variables or Netlify, or use Firebase project settings if using Firebase Hosting).

---

## Admin credentials & usage

* If you have a seeded admin user or an admin role flag in Firestore, use that account to access the admin dashboard.
* If not, create an admin user via the Authentication console and set an `isAdmin` flag (or similar) in the Firestore `users` collection so the admin UI can authorize access.

*(Adapt this section to the exact authorization method your app uses.)*

---

## Notes on security & production

* Lock Firestore rules before going to production — do not leave test mode on.
* Secure Storage rules so only authenticated admins can upload product images (if required).
* Do not commit `.env` or actual Firebase API secrets to the repo. Use environment variables in your deployment platform.

---

## Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feat/your-feature`
3. Commit and push, then open a pull request.

---

[1]: https://github.com/mehtabali05/ecommerce-website-with-admin-dashboard "GitHub - mehtabali05/ecommerce-website-with-admin-dashboard: This is my Ecommerce website with Admin dashboard that I have made Using React.JS and Implemented Firebase in Backend"
