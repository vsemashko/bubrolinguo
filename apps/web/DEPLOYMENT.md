# Deployment Guide

## Quick Start

### Using Mise
```bash
# Install runtime versions
mise install

# Setup project
mise task setup

# Start development
mise task dev
```

### Using Docker
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Environment Configuration

Copy templates and configure:
```bash
cp apps/web/.env.template apps/web/.env.local
cp apps/api/.env.template apps/api/.env
```

## Production Deployment

See full documentation in docs/DEPLOYMENT_FULL.md

### Pre-Deployment Checklist
- [ ] Tests passing
- [ ] Linter clean
- [ ] Environment variables set
- [ ] Database migrations ready
- [ ] Monitoring configured

### Deploy to Vercel
```bash
cd apps/web
vercel --prod
```

## Database Setup

```bash
# Initialize database
mise task db-init

# Seed data
mise task db-seed
```

## Monitoring

- Health check: `/api/health`
- Logs: Check platform dashboard
- Errors: Sentry (if configured)
