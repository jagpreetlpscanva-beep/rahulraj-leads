# Rahul Raj — Astrology Course Lead Capture

## Deploy to Vercel (5 steps)

### 1. Push to GitHub
Create a new GitHub repo and push this folder.

### 2. Import in Vercel
Go to vercel.com → New Project → Import your GitHub repo.

### 3. Add Postgres Database
In your Vercel project → Storage → Create → Postgres.
Name it anything (e.g. `rahulraj-leads`).
Click **Connect** — Vercel auto-fills all POSTGRES_* env vars.

### 4. Add Admin Secret
In Vercel → Settings → Environment Variables:
```
ADMIN_SECRET = your_strong_password_here
```

### 5. Deploy
Click Deploy. Done.

---

## Pages

| Page | URL | Purpose |
|------|-----|---------|
| Landing page | `/` | Lead capture form |
| Admin panel | `/admin` | View & export all leads |

## Admin Panel
Go to `your-domain.vercel.app/admin` and enter your `ADMIN_SECRET` password.
You can export all leads as CSV from there.

## Local Development
```bash
npm install
# Copy .env.example to .env.local and fill in your Postgres values
npm run dev
```
