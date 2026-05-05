# SecureSight — CCTV Selling Website

Next.js 15 + Tailwind CSS + TypeScript + PostgreSQL + Prisma.

## Quick start

```bash
npm install
cp .env.example .env   # then edit DATABASE_URL
npx prisma db push
npm run db:seed
npm run dev
```

> The site works **without** Postgres — it falls back to seed data in `lib/products.ts` so you can preview the UI immediately. Set up Postgres + Prisma to enable the real DB and contact-form persistence.

## Pages

- `/` — Landing (hero, categories, featured products, CTA)
- `/products` — Catalog with category filter
- `/products/[slug]` — Product detail
- `/services` — Services overview
- `/about` — Company info
- `/contact` — Contact form (POST `/api/contact`)

## Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS 3
- TypeScript 5
- Prisma 5 + PostgreSQL
