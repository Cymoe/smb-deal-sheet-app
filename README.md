# SMB Deal Sheet

A curated newsletter platform for SMB acquisitions, featuring vetted deals with real financials and seller financing opportunities.

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Weekly deal newsletter powered by Beehiiv
- Deal database with Supabase
- Google OAuth authentication
- Admin dashboard for managing deals
- Newsletter signup integration

## Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
BEEHIIV_API_KEY=your_beehiiv_api_key
BEEHIIV_PUBLICATION_ID=your_beehiiv_publication_id
BLUEPRINT_DOWNLOAD_URL=your_blueprint_download_url
```

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Supabase (Database & Auth)
- Beehiiv (Newsletter)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.# smb-deal-sheet-app
