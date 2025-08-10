README.md (condensed)

Overview

Pay-first booking for 30-min Service Animal Evaluations with clinician-managed availability and Google Calendar sync. Clients get email conf + .ics; reminders at 24h/2h.

Quick start

Install deps, set .env, run prisma migrate dev, npm run dev.

Create Stripe price, set STRIPE_* envs, run webhook listener.

Create Google OAuth client; set redirect URL http://localhost:3000/api/auth/callback/google.

Open /checkout → pay → email arrives with /book/{token} → book a slot.

Deployment (Netlify)

Build: npm run build. Use Netlify Next.js runtime. Add env vars in dashboard.

Set NEXTAUTH_URL to your live domain.

Add Stripe webhook endpoint https://YOURDOMAIN/api/stripe/webhook.

Security

JWT sessions (NextAuth). Expiring booking tokens.

Rate-limit sensitive endpoints (add middleware as needed).

Testing

Run unit tests via npm test. Cypress E2E stub at tests/cypress/e2e/happy.cy.ts.
