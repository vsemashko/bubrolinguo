# Sentry Error Tracking Setup Guide

This guide will help you set up Sentry for production error tracking in Bubrolinguo.

---

## Prerequisites

1. Create a free Sentry account at https://sentry.io
2. Create a new project for "Node.js" (backend) and "Next.js" (frontend)
3. Copy your DSN (Data Source Name) from project settings

---

## Backend Setup (API)

### 1. Install Sentry SDK

```bash
cd apps/api
npm install @sentry/node --save
```

### 2. Configure Sentry in `apps/api/src/index.ts`

Add at the **very beginning** of the file (before any other imports):

```typescript
import * as Sentry from '@sentry/node';

// Initialize Sentry
if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN_BACKEND,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 1.0, // Adjust in production (0.1 = 10%)
  });
}
```

### 3. Add Error Handler

In `apps/api/src/index.ts`, add Sentry error handler **before** your custom error handler:

```typescript
// Add after all routes, before error handler
if (process.env.NODE_ENV === 'production') {
  app.use(Sentry.Handlers.errorHandler());
}

// Then your custom error handler
app.use(errorHandler);
```

### 4. Add Environment Variable

Add to `apps/api/.env`:

```env
SENTRY_DSN_BACKEND=your_backend_dsn_here
```

---

## Frontend Setup (Web)

### 1. Install Sentry SDK

```bash
cd apps/web
npm install @sentry/nextjs --save-dev
```

### 2. Run Sentry Wizard

```bash
npx @sentry/wizard@latest -i nextjs
```

This will automatically:
- Create `sentry.client.config.ts`
- Create `sentry.server.config.ts`
- Create `sentry.edge.config.ts`
- Update `next.config.js`

### 3. Update ErrorBoundary Component

In `apps/web/components/ErrorBoundary.tsx`, replace the TODO (line 50):

```typescript
componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
  console.error('Error caught by boundary:', error, errorInfo);

  // Send to Sentry
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    import('@sentry/nextjs').then((Sentry) => {
      Sentry.captureException(error, {
        contexts: {
          react: {
            componentStack: errorInfo.componentStack,
          },
        },
      });
    });
  }
}
```

### 4. Add Environment Variable

Add to `apps/web/.env.local`:

```env
NEXT_PUBLIC_SENTRY_DSN=your_frontend_dsn_here
```

---

## Testing Sentry Integration

### Backend Test

Add a test endpoint to manually trigger an error:

```typescript
// In apps/api/src/index.ts (REMOVE IN PRODUCTION)
app.get('/api/test-sentry', (req, res) => {
  throw new Error('Test Sentry error!');
});
```

Then visit: `http://localhost:3001/api/test-sentry`

### Frontend Test

Add to any component:

```typescript
const testSentry = () => {
  throw new Error('Test frontend Sentry error!');
};

<button onClick={testSentry}>Test Sentry</button>
```

---

## Sentry Configuration Options

### Performance Monitoring

Enable performance tracing:

```typescript
Sentry.init({
  dsn: process.env.SENTRY_DSN_BACKEND,
  tracesSampleRate: 0.1, // 10% of requests
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
  ],
});
```

### Custom Context

Add user context when available:

```typescript
Sentry.setUser({
  id: user.id,
  email: user.email,
  username: user.displayName,
});
```

### Breadcrumbs

Sentry automatically captures:
- Console logs
- Network requests
- DOM events
- Navigation

### Filtering Errors

Ignore certain errors:

```typescript
Sentry.init({
  dsn: process.env.SENTRY_DSN_BACKEND,
  beforeSend(event, hint) {
    // Filter out 404s
    if (event.exception?.values?.[0]?.value?.includes('404')) {
      return null;
    }
    return event;
  },
});
```

---

## Environment-Specific Configuration

### Development
- Sentry **disabled** (no DSN set)
- Errors logged to console only

### Staging
- Sentry **enabled** with `environment: 'staging'`
- 100% sample rate for testing

### Production
- Sentry **enabled** with `environment: 'production'`
- 10-20% sample rate to reduce quota usage
- Release tracking enabled

---

## Alerting Setup

### In Sentry Dashboard:

1. **Alerts** → **Create Alert Rule**
2. Configure:
   - **When:** Error count > 10 in 1 hour
   - **Then:** Send email/Slack notification
3. Create separate alerts for:
   - High error rate
   - New error types
   - Performance degradation

---

## Release Tracking

### Backend

```typescript
Sentry.init({
  dsn: process.env.SENTRY_DSN_BACKEND,
  release: process.env.npm_package_version,
});
```

### Frontend

Next.js Sentry plugin automatically handles releases.

---

## Best Practices

1. **Never log sensitive data:**
   - Passwords
   - Tokens
   - Personal information

2. **Use structured logging:**
   ```typescript
   Sentry.captureException(error, {
     tags: {
       component: 'lessons',
       action: 'submit',
     },
     extra: {
       lessonId: id,
       userId: userId,
     },
   });
   ```

3. **Set up source maps:**
   - Sentry wizard handles this for Next.js
   - For backend, add `sentry-cli` for source map upload

4. **Monitor quota usage:**
   - Free tier: 5,000 events/month
   - Adjust sample rates accordingly

---

## Troubleshooting

### Errors not appearing in Sentry

1. Check DSN is correct
2. Verify `NODE_ENV=production`
3. Check network requests in browser DevTools
4. Verify Sentry is initialized before error occurs

### Too many events

1. Reduce `tracesSampleRate`
2. Add `beforeSend` filter
3. Ignore known errors (404s, etc.)

---

## Cost Optimization

### Free Tier Limits
- 5,000 errors/month
- 10,000 performance units/month

### Strategies
- Sample 10-20% of requests: `tracesSampleRate: 0.2`
- Filter out known/expected errors
- Use separate projects for staging/production
- Set up quota alerts

---

## Production Checklist

Before deploying to production:

- [ ] Sentry DSN configured in environment variables
- [ ] Error tracking tested on staging
- [ ] Alerts configured for critical errors
- [ ] Source maps uploaded (frontend)
- [ ] User context integration added
- [ ] Sensitive data filtering verified
- [ ] Sample rates configured appropriately
- [ ] Team members invited to Sentry project
- [ ] Slack/email notifications configured

---

## Quick Start Commands

```bash
# Install backend
cd apps/api && npm install @sentry/node

# Install frontend
cd apps/web && npx @sentry/wizard@latest -i nextjs

# Test
curl http://localhost:3001/api/test-sentry
```

---

## Support Resources

- Sentry Docs: https://docs.sentry.io
- Node.js Guide: https://docs.sentry.io/platforms/node/
- Next.js Guide: https://docs.sentry.io/platforms/javascript/guides/nextjs/
- Discord: https://discord.gg/sentry

---

**Last Updated:** November 22, 2025
**Status:** Ready for implementation
**Priority:** HIGH - Required for production deployment
