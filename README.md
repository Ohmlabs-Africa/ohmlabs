This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Backend API

Set `NEXT_PUBLIC_API_BASE_URL` in `.env.local` to the backend origin (for local development, `http://localhost:4000`). Set the backend's `CLIENT_ORIGIN` to the exact frontend origin so credentialed CORS and the refresh-token cookie work. Configure both origins independently in each deployment.

The proposal form posts contact details and structured project fields to `POST /api/contact`; any selected supporting file is uploaded in the same multipart request. Font submissions are available at `/contact/font-submission` and post font/contact fields plus the file to `POST /api/submissions`.

The proposal wizard validates each step before proceeding: name and email format, optional phone number, text lengths/content, option-list values, non-past dates, and attachment type/content/size. The API repeats these validations, rejects unknown proposal-detail keys, applies rate limits, and uses a honeypot field to reject simple automated submissions.

Admin sign-in is at `/login`; password recovery uses `/forgot-password` and `/reset-password`. Admins can view backend statistics at `/dashboard`. The short-lived access token is kept in session storage; the refresh token remains in the backend's HTTP-only cookie.

For local development, the backend stores uploaded attachments in its ignored `uploads/` directory and exposes downloads only through the admin-authenticated API. Replace this storage with private object storage before production deployment. Zoho calendar bookings continue to use the existing embedded widget; configure Zoho (or Zoho Flow) to POST booking events to the backend's `/api/integrations/zoho/bookings` webhook.

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
