Mini E-Commerce Frontend

Live Demo:
https://mini-eco-nextjs.vercel.app

GitHub Repository:
https://github.com/IcGiveup/mini-eco-nextjs

📌 Project Overview

This project is a Mini E-Commerce Frontend built using Next.js (App Router) and React with TypeScript as part of a technical evaluation task.

The goal of this project was to design a clean, scalable, and responsive frontend application while following proper folder structure and reusable component patterns.

It demonstrates:

Dynamic routing using Next.js App Router

Client-side filtering (category & price range)

Pagination logic

Loading skeleton implementation

Proper error handling

Fully responsive UI using Tailwind CSS

Clean code structure with reusable components

🛠 Tech Stack

Next.js 16 (App Router)

React

TypeScript

Tailwind CSS

DummyJSON API

📂 Project Structure
app/
  ├── page.tsx                → Product listing page
  ├── product/[id]/page.tsx   → Dynamic product details page
components/
  ├── ProductCard.tsx
  ├── ProductSkeleton.tsx
services/
  └── api.ts                  → API logic
types/
  └── product.ts              → Type definitions

The project follows a modular structure to keep logic, UI, and API handling separated and maintainable.

⚙️ Features Implemented

✔ Product listing page
✔ Dynamic filtering (category & price range)
✔ Pagination
✔ Dynamic product details page
✔ Loading states & skeleton UI
✔ Error handling
✔ Responsive design (mobile, tablet, desktop)

🧠 Design Decisions

Used server-side data fetching with fetch and no-store for fresh data.

Implemented client-side filtering for smoother UX.

Created reusable UI components to avoid code duplication.

Used TypeScript interfaces for type safety and maintainability.

🚀 How to Run Locally
git clone https://github.com/IcGiveup/mini-eco-nextjs
cd mini-eco-nextjs
npm install
npm run dev

Then open:

http://localhost:3000
