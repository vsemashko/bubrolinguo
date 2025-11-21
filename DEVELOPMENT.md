# 🛠️ Development Guide - Bubrolinguo

Complete guide for setting up and developing Bubrolinguo locally.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [Detailed Setup](#detailed-setup)
4. [Development Workflow](#development-workflow)
5. [Database Management](#database-management)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)
8. [Common Tasks](#common-tasks)

---

## 🔧 Prerequisites

### Required Software

- **Node.js 20+** and npm 10+
  ```bash
  node --version  # Should be v20.x or higher
  npm --version   # Should be 10.x or higher
  ```

- **Docker Desktop** (recommended) OR manually installed:
  - PostgreSQL 15+
  - Redis 7+ (optional but recommended)

- **Git**
  ```bash
  git --version
  ```

### Optional but Recommended

- **VS Code** with extensions:
  - ESLint
  - Prettier
  - TypeScript
  - Tailwind CSS IntelliSense
  - Docker

- **Postman** or **Insomnia** for API testing

---

## 🚀 Quick Start

### Option 1: Using Docker (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/vsemashko/bubrolinguo.git
cd bubrolinguo

# 2. Start database services
docker-compose up -d

# 3. Install dependencies
cd apps/api && npm install && cd ../..
cd apps/web && npm install && cd ../..

# 4. Set up environment variables
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local

# 5. Initialize database
cd apps/api
npm run db:init

# 6. Start development servers
cd ../..
npm run dev
```

The app is now running:
- **Web App:** http://localhost:3000
- **API Server:** http://localhost:3001
- **PgAdmin:** http://localhost:5050 (if using --profile tools)

### Option 2: Manual Setup (Without Docker)

```bash
# 1. Install PostgreSQL and Redis manually
# macOS: brew install postgresql@15 redis
# Ubuntu: apt install postgresql-15 redis
# Windows: Download from official websites

# 2. Start services
# macOS: brew services start postgresql@15 redis
# Ubuntu: systemctl start postgresql redis

# 3. Create database
createdb bubrolinguo

# 4. Follow steps 3-6 from Option 1
```

---

## 📚 Detailed Setup

### 1. Environment Variables

#### API Server (`apps/api/.env`)

Create from example and update values:

```bash
cd apps/api
cp .env.example .env
```

**Important variables to set:**

```env
# Server
NODE_ENV=development
PORT=3001

# Database (if using Docker Compose, these are correct)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bubrolinguo
DB_USER=postgres
DB_PASSWORD=postgres

# JWT Secrets (generate secure ones for production)
JWT_SECRET=your-dev-secret-here
JWT_REFRESH_SECRET=your-dev-refresh-secret-here

# CORS
CORS_ORIGIN=http://localhost:3000
```

#### Web App (`apps/web/.env.local`)

```bash
cd apps/web
cp .env.example .env.local
```

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 2. Docker Compose Services

#### Start all services:

```bash
docker-compose up -d
```

This starts:
- **PostgreSQL** on port 5432
- **Redis** on port 6379

#### Start with PgAdmin (database UI):

```bash
docker-compose --profile tools up -d
```

Access PgAdmin at http://localhost:5050:
- Email: `admin@bubrolinguo.local`
- Password: `admin`

#### Stop services:

```bash
docker-compose down
```

#### Reset everything (⚠️ deletes all data):

```bash
docker-compose down -v
```

### 3. Database Initialization

```bash
cd apps/api

# Initialize database (runs migrations + seeding)
npm run db:init

# Or step by step:
npm run db:migrate  # Create tables
npm run db:seed     # Add initial data

# Verify database
npm run db:check
```

**What gets seeded:**
- 15 lessons (A1-A2 level)
- 425 vocabulary words
- 58 achievements
- Database schema with all tables

### 4. Verify Setup

```bash
# Check database health
cd apps/api
npm run db:check

# Test API endpoints
npm run test:api

# Check if services are running
docker-compose ps
```

Expected output:
```
✅ Database connection successful
✅ Found 8 tables
✅ 15 lessons
✅ 425 vocabulary words
✅ 58 achievements
```

---

## 💻 Development Workflow

### Running Development Servers

#### Option 1: Run both apps together (from root)

```bash
# From project root
npm run dev
```

This starts both web and API servers.

#### Option 2: Run separately

```bash
# Terminal 1 - API Server
cd apps/api
npm run dev
# Running on http://localhost:3001

# Terminal 2 - Web App
cd apps/web
npm run dev
# Running on http://localhost:3000
```

### File Structure

```
bubrolinguo/
├── apps/
│   ├── api/                  # Express API server
│   │   ├── src/
│   │   │   ├── controllers/  # Route handlers
│   │   │   ├── db/          # Database (migrations, seeds)
│   │   │   ├── middleware/  # Express middleware
│   │   │   ├── routes/      # API routes
│   │   │   ├── services/    # Business logic
│   │   │   └── index.ts     # Entry point
│   │   ├── .env             # Environment variables
│   │   └── package.json
│   │
│   └── web/                  # Next.js web app
│       ├── app/             # Next.js 14 app router
│       ├── components/      # React components
│       ├── contexts/        # React contexts
│       ├── lib/            # Utilities
│       ├── services/       # API client services
│       ├── types/          # TypeScript types
│       └── package.json
│
├── docker-compose.yml       # Local development services
├── .github/workflows/       # CI/CD pipelines
└── docs/                    # Documentation
```

### Hot Reload

Both servers support hot reload:
- **API:** Changes to `.ts` files auto-restart server
- **Web:** Changes auto-update in browser

### Code Style

```bash
# Lint code
cd apps/api && npm run lint
cd apps/web && npm run lint

# Format code (if Prettier is configured)
npm run format
```

---

## 🗄️ Database Management

### Common Database Commands

```bash
cd apps/api

# Check database status
npm run db:check

# Run new migrations
npm run db:migrate

# Reset database (⚠️ deletes all data)
npm run db:migrate:reset

# Re-seed data
npm run db:seed

# Full reset + reseed
npm run db:reset
```

### Accessing PostgreSQL

#### Using PgAdmin (Web UI)

1. Start with tools profile:
   ```bash
   docker-compose --profile tools up -d
   ```

2. Open http://localhost:5050

3. Add server:
   - Host: `postgres`
   - Port: `5432`
   - Database: `bubrolinguo`
   - Username: `postgres`
   - Password: `postgres`

#### Using psql (Command Line)

```bash
# Connect to database
docker-compose exec postgres psql -U postgres bubrolinguo

# Or if PostgreSQL is installed locally
psql -U postgres bubrolinguo
```

Useful psql commands:
```sql
\dt              -- List tables
\d users         -- Describe users table
\q               -- Quit
```

### Creating Migrations

```bash
cd apps/api

# Create a new migration file
# (Manual for now - create in src/db/migrations/)

# Run migrations
npm run db:migrate
```

---

## 🧪 Testing

### API Testing

```bash
cd apps/api

# Run automated API tests
npm run test:api

# This tests:
# - User registration
# - User login
# - Lessons API
# - Vocabulary API
# - Progress tracking
# - Achievements
```

### Manual API Testing

Use Postman or curl:

```bash
# Health check
curl http://localhost:3001

# Register user
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test1234!",
    "displayName": "Test User",
    "interfaceLanguage": "en"
  }'

# Login
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test1234!"
  }'

# Get lessons (with auth token)
curl http://localhost:3001/api/v1/lessons \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Frontend Testing

```bash
cd apps/web

# Run tests (when configured)
npm test

# Run E2E tests (when configured)
npm run test:e2e
```

---

## 🔧 Troubleshooting

### Common Issues

#### "Cannot connect to database"

**Solution:**
```bash
# Check if PostgreSQL is running
docker-compose ps

# Restart PostgreSQL
docker-compose restart postgres

# Check logs
docker-compose logs postgres
```

#### "Port 3000 already in use"

**Solution:**
```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

#### "Module not found" errors

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Or clear npm cache
npm cache clean --force
npm install
```

#### "Database migration failed"

**Solution:**
```bash
# Reset and retry
npm run db:migrate:reset
npm run db:migrate
npm run db:seed
```

#### "JWT token invalid"

**Solution:**
- Check `.env` has JWT_SECRET set
- Logout and login again
- Clear localStorage in browser

#### Docker issues

**Solution:**
```bash
# Restart Docker
docker-compose down
docker-compose up -d

# Rebuild containers
docker-compose down
docker-compose up -d --build

# Remove all containers and volumes (⚠️ deletes data)
docker-compose down -v
```

### Check Services Health

```bash
# Check Docker services
docker-compose ps

# Check API health
curl http://localhost:3001

# Check database
npm run db:check

# Check logs
docker-compose logs postgres
docker-compose logs redis
```

---

## 📝 Common Tasks

### Adding a New API Endpoint

1. Create route in `apps/api/src/routes/`
2. Create controller in `apps/api/src/controllers/`
3. Add validation schema (Zod)
4. Add to main router in `apps/api/src/index.ts`
5. Document in `apps/api/API.md`
6. Test with `npm run test:api`

### Adding a New Database Table

1. Create migration in `apps/api/src/db/migrations/`
2. Run migration: `npm run db:migrate`
3. Update seed data if needed
4. Create TypeScript types

### Adding a New React Component

1. Create component in `apps/web/components/`
2. Add TypeScript types
3. Import and use in pages
4. Test in browser

### Updating Dependencies

```bash
# Check for outdated packages
npm outdated

# Update specific package
npm update package-name

# Update all patches/minors
npm update

# For majors, update package.json manually
```

### Creating a Database Backup

```bash
# Using Docker
docker-compose exec postgres pg_dump -U postgres bubrolinguo > backup.sql

# Restore
docker-compose exec -T postgres psql -U postgres bubrolinguo < backup.sql
```

### Generating Secure Secrets

```bash
# Generate JWT secret
openssl rand -base64 64

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

---

## 🐛 Debugging

### API Debugging

```bash
# View logs
cd apps/api
npm run dev

# Logs include:
# - Request/response
# - Database queries
# - Errors with stack traces
```

### Database Debugging

```bash
# View PostgreSQL logs
docker-compose logs -f postgres

# Connect to database
docker-compose exec postgres psql -U postgres bubrolinguo
```

### Network Debugging

```bash
# Test API from web app
curl http://localhost:3001/api/v1/lessons

# Check CORS headers
curl -H "Origin: http://localhost:3000" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     http://localhost:3001/api/v1/auth/login -v
```

---

## 📖 Additional Resources

- [API Documentation](./apps/api/API.md)
- [Integration Guide](./INTEGRATION.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Production Checklist](./PRODUCTION_CHECKLIST.md)
- [Project Review](./PROJECT_REVIEW.md)

---

## 🆘 Getting Help

1. Check this guide's [Troubleshooting](#troubleshooting) section
2. Check the logs: `docker-compose logs`
3. Search GitHub issues
4. Ask in team chat

---

## 🎯 Next Steps

After setup:
1. ✅ Verify all services are running
2. ✅ Run automated tests
3. ✅ Create a test user account
4. ✅ Complete a lesson
5. ✅ Review the codebase
6. 🚀 Start building!

---

**Happy Coding! 🦫**
