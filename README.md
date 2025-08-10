# Service Animal Bureau Booking App

Production-ready scheduling for 30-minute Service Animal Evaluations. Clients pay via Stripe then book a slot with a clinician. Clinicians manage availability and sync to Google Calendar. Emails sent through Resend include `.ics` attachments. Built with Next.js App Router, Prisma, and Tailwind.

## Features
- Pay-first gating with Stripe Checkout and webhook generated booking tokens
- Tokenized booking link valid 10 days
- Clinician availability rules with weekly template
- Booking confirmation emails with ICS attachment
- Google Calendar two-way sync (insert events)
- Admin and clinician portals (basic stubs)
- EN/ES language toggle, brand colors `#62984D`, `#C7D7E4`, `#053F6F`

## Getting Started

### 1. Install
```bash
npm install
```

### 2. Configure environment
Copy `.env.example` to `.env` and fill in credentials:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/sab
NEXTAUTH_SECRET=changeme
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URL=http://localhost:3000/api/auth/callback/google
STRIPE_SECRET_KEY=sk_test_yourkey
STRIPE_PRICE_ID=price_123
STRIPE_WEBHOOK_SECRET=whsec_123
RESEND_API_KEY=re_yourkey
EMAIL_FROM="Service Animal Bureau <noreply@serviceanimalbureau.org>"
DEFAULT_BUFFER_MIN=0
LEAD_TIME_HOURS=12
```

### 3. Database
```bash
npx prisma migrate dev
```

### 4. Run
```bash
npm run dev
```
Visit http://localhost:3000/checkout to pay and receive a booking link.

## Testing
- Unit tests: `npm test`
- Cypress e2e: `npx cypress run`

## Deployment (Netlify)
- Build command: `npm run build`
- Output directory: `.next`
- Set all environment variables in Netlify dashboard
- Set `NEXTAUTH_URL` to your live domain
- Add Stripe webhook endpoint: `https://YOURDOMAIN/api/stripe/webhook`

## Google OAuth
1. Create a project at [Google Cloud Console](https://console.cloud.google.com)
2. Enable Calendar API
3. Create OAuth client ID (Web application)
4. Authorized redirect URI: `https://YOURDOMAIN/api/auth/callback/google`
5. Use client ID/secret in `.env`

## Stripe Setup
1. Create a Price for the evaluation session
2. Put the Price ID in `STRIPE_PRICE_ID`
3. Run Stripe CLI and forward webhooks:
```powershell
stripe listen --events checkout.session.completed --forward-to localhost:3000/api/stripe/webhook
```

## Notes
- Booking links expire after 10 days and are single-use.
- Default session duration 30 minutes; adjust buffer via admin settings.

