# Twocents Next.js Web App

This is a React/Next.js implementation of the Twocents anonymous social network home feed and post details, built as a technical challenge for a frontend developer position.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Features

- Display the top 100 posts with filtering options (Top Today, New Today)
- Responsive card grid layout with consistent styling
- Post detail page showing full post content, nested comments, and animated poll results
- User profile page with user details and user-specific posts
- Navigation between posts, users, and filtered feeds
- Loading and error states handled gracefully
- Smooth animations on card load and poll bars (without external animation libraries)
- Fully responsive design using Tailwind CSS

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deploy on Vercel

Deployed in Netlify
