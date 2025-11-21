# Bubrolinguo Deployment Guide

This guide covers deploying Bubrolinguo to production environments.

---

## Prerequisites

Before deploying, ensure you have:

- [ ] PostgreSQL database (Railway, Supabase, or any managed PostgreSQL)
- [ ] Redis instance (optional, for caching - Railway, Upstash, or Redis Cloud)
- [ ] API deployed and accessible
- [ ] Environment variables configured

---

## Deployment Options

### Option 1: Railway (Recommended)

**Why Railway?**
- Easy PostgreSQL + Redis provisioning
- Automatic HTTPS and custom domains
- Git-based deployments
- Free tier available

#### Deploying API to Railway

1. **Create Railway Project**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli

   # Login
   railway login

   # Initialize project
   cd apps/api
   railway init
   ```

2. **Provision Database**
   ```bash
   # Add PostgreSQL
   railway add postgresql

   # Add Redis (optional)
   railway add redis
   ```

3. **Set Environment Variables**

   Railway automatically provides `DATABASE_URL` and `REDIS_URL`. Add these manually:

   ```bash
   railway variables set JWT_SECRET=<your-secure-secret>
   railway variables set JWT_REFRESH_SECRET=<your-secure-refresh-secret>
   railway variables set CORS_ORIGIN=https://your-web-app.vercel.app
   railway variables set NODE_ENV=production
   railway variables set PORT=3001
   ```

4. **Deploy**
   ```bash
   railway up
   ```

5. **Run Migrations**
   ```bash
   railway run npm run db:migrate
   railway run npm run db:seed
   ```

6. **Get Your API URL**
   ```bash
   railway domain
   # Example: bubrolinguo-api.railway.app
   ```

#### Deploying Web App to Vercel

1. **Install Vercel CLI** (optional)
   ```bash
   npm install -g vercel
   ```

2. **Deploy via GitHub Integration** (Recommended)
   - Go to https://vercel.com
   - Click "Import Project"
   - Select your GitHub repository
   - Configure project:
     - **Framework Preset:** Next.js
     - **Root Directory:** `apps/web`
     - **Build Command:** `npm run build`
     - **Output Directory:** `.next`

3. **Set Environment Variables in Vercel**
   - Go to Project Settings → Environment Variables
   - Add:
     ```
     NEXT_PUBLIC_API_URL=https://your-api-url.railway.app
     ```

4. **Deploy**
   - Push to `main` branch → automatic deployment
   - Or run: `vercel --prod`

---

### Option 2: Render

**Why Render?**
- Similar to Railway with free tier
- Built-in PostgreSQL and Redis
- Easy configuration

#### Deploying API to Render

1. **Create Web Service**
   - Go to https://render.com
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name:** bubrolinguo-api
     - **Root Directory:** `apps/api`
     - **Environment:** Docker
     - **Dockerfile Path:** `apps/api/Dockerfile`
     - **Plan:** Free or Starter

2. **Add PostgreSQL Database**
   - Click "New" → "PostgreSQL"
   - Connect it to your web service
   - Render provides `DATABASE_URL` automatically

3. **Add Redis** (optional)
   - Click "New" → "Redis"
   - Connect it to your web service

4. **Set Environment Variables**
   ```
   JWT_SECRET=<your-secure-secret>
   JWT_REFRESH_SECRET=<your-secure-refresh-secret>
   CORS_ORIGIN=https://your-web-app.vercel.app
   NODE_ENV=production
   PORT=3001
   ```

5. **Deploy**
   - Render automatically deploys on git push

6. **Run Migrations**
   - Use Render Shell or run migrations via a startup script

---

### Option 3: Heroku

**Note:** Heroku removed free tier but is still a solid option for paid deployments.

#### API Deployment

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Create App**
   ```bash
   cd apps/api
   heroku create bubrolinguo-api
   ```

3. **Add PostgreSQL**
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

4. **Add Redis**
   ```bash
   heroku addons:create heroku-redis:mini
   ```

5. **Set Environment Variables**
   ```bash
   heroku config:set JWT_SECRET=<secret>
   heroku config:set JWT_REFRESH_SECRET=<refresh-secret>
   heroku config:set CORS_ORIGIN=https://your-web-app.vercel.app
   heroku config:set NODE_ENV=production
   ```

6. **Deploy**
   ```bash
   git push heroku main
   ```

7. **Run Migrations**
   ```bash
   heroku run npm run db:migrate
   heroku run npm run db:seed
   ```

---

## Environment Variables Reference

### API Server (apps/api)

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `NODE_ENV` | Environment mode | Yes | `production` |
| `PORT` | Server port | Yes | `3001` |
| `DATABASE_URL` | PostgreSQL connection string | Yes | `postgresql://user:pass@host:5432/db` |
| `REDIS_URL` | Redis connection string | No | `redis://host:6379` |
| `JWT_SECRET` | JWT signing secret | Yes | `<random-256-bit-string>` |
| `JWT_REFRESH_SECRET` | Refresh token secret | Yes | `<random-256-bit-string>` |
| `CORS_ORIGIN` | Allowed frontend origin | Yes | `https://bubrolinguo.vercel.app` |
| `LOG_LEVEL` | Logging level | No | `info` |

### Web App (apps/web)

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_API_URL` | API server URL | Yes | `https://api.bubrolinguo.com` |

---

## Post-Deployment Checklist

After deploying both API and web app:

- [ ] Test health endpoint: `GET https://your-api-url.com/`
- [ ] Run API tests: `npm run test:api` with `API_URL` env var
- [ ] Verify user registration works
- [ ] Verify lessons load correctly
- [ ] Check database has seeded data (lessons, vocabulary, achievements)
- [ ] Test authentication flow
- [ ] Verify CORS is working (no console errors in browser)
- [ ] Test on mobile devices
- [ ] Set up monitoring (optional: Sentry, LogRocket)
- [ ] Configure custom domain (optional)

---

## Database Migrations

### Running Migrations

**Development:**
```bash
cd apps/api
npm run db:migrate
```

**Production (Railway):**
```bash
railway run npm run db:migrate
```

**Production (Render):**
Use Render Shell or add to startup script

**Production (Heroku):**
```bash
heroku run npm run db:migrate
```

### Seeding Database

**⚠️ Warning:** Only seed on first deployment or after database reset.

```bash
# Development
npm run db:seed

# Railway
railway run npm run db:seed

# Heroku
heroku run npm run db:seed
```

---

## Troubleshooting

### API Health Check Fails

```bash
# Check logs
railway logs  # Railway
heroku logs --tail  # Heroku

# Common issues:
# - DATABASE_URL not set
# - Port binding issues (ensure PORT env var is set)
# - Migrations not run
```

### CORS Errors

```bash
# Ensure CORS_ORIGIN matches your web app URL exactly
# Example: https://bubrolinguo.vercel.app (no trailing slash)

railway variables set CORS_ORIGIN=https://your-domain.vercel.app
```

### Database Connection Errors

```bash
# Verify DATABASE_URL is set
railway variables get DATABASE_URL

# Test connection
railway run node -e "const pg = require('pg'); const client = new pg.Client(process.env.DATABASE_URL); client.connect().then(() => console.log('Connected')).catch(console.error)"
```

### Migrations Failed

```bash
# Reset and re-run migrations
railway run npm run db:migrate:reset
railway run npm run db:seed
```

---

## Monitoring & Logs

### Railway
```bash
railway logs
railway logs --follow
```

### Render
- Dashboard → Service → Logs tab
- Real-time streaming available

### Heroku
```bash
heroku logs --tail
heroku logs --source app
```

---

## Scaling

### Railway
- Project Settings → Scale to higher tier
- Adjust resources as needed

### Render
- Service Settings → Change plan
- Auto-scaling available on Pro plans

### Heroku
- Scale dynos: `heroku ps:scale web=2`
- Upgrade database: `heroku addons:upgrade heroku-postgresql:standard-0`

---

## Security Checklist

Before going to production:

- [ ] Generate strong JWT secrets (use `openssl rand -base64 64`)
- [ ] Enable HTTPS (automatic on Railway/Render/Vercel)
- [ ] Set `NODE_ENV=production`
- [ ] Configure rate limiting
- [ ] Set secure CORS origin (no wildcards in production)
- [ ] Enable database SSL connections
- [ ] Review and update `.env.example`
- [ ] Add API monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Configure backup strategy for database

---

## Next Steps

After successful deployment:

1. **Configure Custom Domain**
   - Vercel: Settings → Domains
   - Railway: Settings → Domains

2. **Set Up CI/CD**
   - Already automatic with GitHub integration

3. **Add Monitoring**
   - Railway: Built-in metrics
   - Consider: Sentry, LogRocket, DataDog

4. **Database Backups**
   - Railway: Automatic backups on paid plans
   - Manual: `pg_dump` via railway/heroku CLI

---

## Support

For deployment issues:
- Check logs first
- Review environment variables
- Verify migrations ran successfully
- Test API endpoints directly (use Postman/curl)

For platform-specific help:
- Railway: https://railway.app/help
- Render: https://render.com/docs
- Vercel: https://vercel.com/docs
- Heroku: https://devcenter.heroku.com

---

**Happy Deploying! 🚀**
