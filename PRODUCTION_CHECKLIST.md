# Production Readiness Checklist

Complete this checklist before deploying Bubrolinguo to production.

---

## 🔒 Security

- [ ] **Environment Variables**
  - [ ] All secrets moved from `.env` to platform environment variables
  - [ ] No hardcoded API keys or secrets in code
  - [ ] `JWT_SECRET` is cryptographically secure (64+ random characters)
  - [ ] `JWT_REFRESH_SECRET` is different from `JWT_SECRET`
  - [ ] `NODE_ENV=production` set on production servers

- [ ] **CORS Configuration**
  - [ ] `CORS_ORIGIN` set to exact production domain (no wildcards)
  - [ ] No `Access-Control-Allow-Origin: *` in production

- [ ] **Database Security**
  - [ ] Database uses SSL connections
  - [ ] Database password is strong (20+ characters)
  - [ ] Database is not publicly accessible
  - [ ] Database backups are configured

- [ ] **Authentication**
  - [ ] Password hashing uses bcrypt with salt rounds >= 10
  - [ ] JWT tokens expire appropriately (1 hour for access, 7 days for refresh)
  - [ ] Rate limiting enabled on login/register endpoints
  - [ ] Account lockout after failed login attempts

- [ ] **API Security**
  - [ ] Helmet.js configured for security headers
  - [ ] Rate limiting enabled (100 requests per 15 minutes)
  - [ ] Input validation on all endpoints (using Zod)
  - [ ] SQL injection prevention (using parameterized queries)
  - [ ] XSS prevention (input sanitization)

- [ ] **Frontend Security**
  - [ ] No sensitive data in localStorage (only tokens)
  - [ ] Tokens cleared on logout
  - [ ] Protected routes require authentication
  - [ ] Error messages don't leak sensitive info

---

## ⚡ Performance

- [ ] **Database**
  - [ ] Database indexes created on frequently queried columns
  - [ ] Connection pooling configured (pool size: 20)
  - [ ] Query performance tested with realistic data volumes
  - [ ] Database query times under 100ms for common operations

- [ ] **API Server**
  - [ ] Redis caching enabled (optional but recommended)
  - [ ] Response compression enabled (gzip)
  - [ ] Static assets served with caching headers
  - [ ] API response times under 200ms for most endpoints

- [ ] **Frontend**
  - [ ] Images optimized (WebP format where supported)
  - [ ] Code splitting enabled (Next.js automatic)
  - [ ] Lazy loading for routes and components
  - [ ] Bundle size analyzed and optimized
  - [ ] Lighthouse score > 90 for performance

- [ ] **CDN**
  - [ ] Static assets served from CDN (Vercel handles this)
  - [ ] Caching headers configured properly

---

## 📊 Monitoring & Logging

- [ ] **Error Tracking**
  - [ ] Sentry (or similar) configured for frontend errors
  - [ ] Sentry (or similar) configured for backend errors
  - [ ] Error notifications configured
  - [ ] Source maps uploaded to Sentry

- [ ] **Analytics**
  - [ ] Google Analytics 4 configured (optional)
  - [ ] Plausible Analytics configured (privacy-friendly alternative)
  - [ ] Key events tracked (signup, lesson complete, etc.)
  - [ ] Conversion funnels configured

- [ ] **Logging**
  - [ ] Structured logging enabled (Winston)
  - [ ] Log levels appropriate for production (info/warn/error)
  - [ ] Sensitive data not logged (passwords, tokens)
  - [ ] Logs aggregated (Papertrail, Logtail, or similar)

- [ ] **Health Checks**
  - [ ] API health endpoint responding (`GET /`)
  - [ ] Database health check endpoint
  - [ ] Uptime monitoring configured (UptimeRobot, Pingdom)

---

## 🗄️ Database

- [ ] **Migrations**
  - [ ] All migrations run successfully
  - [ ] Migrations tested with production-like data volume
  - [ ] Rollback plan documented

- [ ] **Seeding**
  - [ ] Production database seeded with initial data
  - [ ] 15 lessons loaded
  - [ ] 425 vocabulary words loaded
  - [ ] 58 achievements loaded
  - [ ] Seed data verified with `npm run db:check`

- [ ] **Backups**
  - [ ] Automated daily backups configured
  - [ ] Backup restoration tested
  - [ ] Point-in-time recovery available
  - [ ] Backup retention policy defined (30 days recommended)

- [ ] **Data Validation**
  - [ ] All foreign key constraints working
  - [ ] Data integrity checks passing
  - [ ] No orphaned records

---

## 🚀 Deployment

- [ ] **API Deployment**
  - [ ] Deployed to Railway/Render/Heroku
  - [ ] Custom domain configured (optional)
  - [ ] HTTPS enabled (automatic on platforms)
  - [ ] Environment variables set
  - [ ] Database connected
  - [ ] Health check passing

- [ ] **Web Deployment**
  - [ ] Deployed to Vercel
  - [ ] Custom domain configured (optional)
  - [ ] `NEXT_PUBLIC_API_URL` points to production API
  - [ ] Build succeeded
  - [ ] Preview deployments working

- [ ] **DNS**
  - [ ] DNS records configured correctly
  - [ ] SSL certificates valid
  - [ ] WWW and non-WWW both working (if using custom domain)

- [ ] **CI/CD**
  - [ ] GitHub Actions pipeline passing
  - [ ] Automated tests running on PRs
  - [ ] Auto-deploy on push to main (optional)

---

## 🧪 Testing

- [ ] **API Testing**
  - [ ] All endpoints tested with `npm run test:api`
  - [ ] Authentication flow tested
  - [ ] Lesson completion tested
  - [ ] Vocabulary review tested
  - [ ] Error handling tested

- [ ] **Frontend Testing**
  - [ ] Registration flow tested
  - [ ] Login flow tested
  - [ ] Lesson playthrough tested
  - [ ] Vocabulary review tested
  - [ ] Dashboard data loading tested

- [ ] **Integration Testing**
  - [ ] Full user journey tested end-to-end
  - [ ] Cross-browser testing (Chrome, Firefox, Safari)
  - [ ] Mobile responsiveness tested (iOS, Android)
  - [ ] Error scenarios tested

- [ ] **Load Testing** (optional but recommended)
  - [ ] API can handle expected concurrent users
  - [ ] Database connection pool sized appropriately
  - [ ] No memory leaks under sustained load

---

## 📱 User Experience

- [ ] **Performance**
  - [ ] Initial page load under 3 seconds
  - [ ] Time to interactive under 5 seconds
  - [ ] No layout shift (CLS score < 0.1)
  - [ ] Smooth animations (60 FPS)

- [ ] **Error Handling**
  - [ ] Error boundary catches React errors
  - [ ] User-friendly error messages
  - [ ] Network errors handled gracefully
  - [ ] Fallback UI for errors

- [ ] **Loading States**
  - [ ] Skeleton screens for loading content
  - [ ] Progress indicators for long operations
  - [ ] Optimistic UI updates where appropriate

- [ ] **Accessibility**
  - [ ] Keyboard navigation works
  - [ ] Screen reader tested (basic)
  - [ ] Color contrast meets WCAG AA
  - [ ] Focus indicators visible

- [ ] **Mobile Experience**
  - [ ] Responsive design on all screen sizes
  - [ ] Touch targets at least 44x44px
  - [ ] No horizontal scroll
  - [ ] Mobile keyboard doesn't break layout

---

## 📄 Documentation

- [ ] **User Documentation**
  - [ ] Getting started guide
  - [ ] FAQ (optional)
  - [ ] Contact/support information

- [ ] **Developer Documentation**
  - [ ] API documentation (API.md) ✅
  - [ ] Integration guide (INTEGRATION.md) ✅
  - [ ] Deployment guide (DEPLOYMENT.md) ✅
  - [ ] Contributing guide (if open source)

- [ ] **Runbooks**
  - [ ] How to rollback a deployment
  - [ ] How to restore from backup
  - [ ] How to scale the application
  - [ ] Common issues and solutions

---

## 🔧 Configuration

- [ ] **Email Configuration** (if needed)
  - [ ] Email service configured (SendGrid, Mailgun)
  - [ ] Transactional emails tested
  - [ ] Unsubscribe links working
  - [ ] Email templates reviewed

- [ ] **File Storage** (if needed)
  - [ ] S3/Cloud Storage configured
  - [ ] Upload limits configured
  - [ ] File type validation
  - [ ] Virus scanning (optional)

- [ ] **External APIs**
  - [ ] All API keys valid
  - [ ] Rate limits understood
  - [ ] Billing alerts configured
  - [ ] Fallback behavior for API failures

---

## 💰 Business

- [ ] **Legal**
  - [ ] Privacy policy published
  - [ ] Terms of service published
  - [ ] GDPR compliance (if serving EU users)
  - [ ] Cookie consent (if required)

- [ ] **Analytics & Goals**
  - [ ] Key metrics defined
  - [ ] Conversion goals set up
  - [ ] User feedback mechanism

- [ ] **Scaling Plan**
  - [ ] Know how to scale database
  - [ ] Know how to scale API instances
  - [ ] Budget for scaling costs
  - [ ] Monitoring for resource usage

---

## ✅ Pre-Launch Final Checks

**24 Hours Before Launch:**
- [ ] Full backup of development database
- [ ] All team members notified
- [ ] Monitoring dashboards ready
- [ ] Support channels ready

**1 Hour Before Launch:**
- [ ] Run `npm run db:check` on production database
- [ ] Run `npm run test:api` against production API
- [ ] Test complete user flow on production
- [ ] Verify all environment variables set correctly

**Immediately After Launch:**
- [ ] Monitor error tracking for 1 hour
- [ ] Check server logs for errors
- [ ] Test user registration and login
- [ ] Complete one full lesson as a user
- [ ] Verify analytics tracking

---

## 🎯 Post-Launch (First Week)

- [ ] Monitor error rates daily
- [ ] Review performance metrics
- [ ] Collect user feedback
- [ ] Fix critical bugs immediately
- [ ] Plan first updates based on feedback

---

## 📞 Support

**Emergency Contacts:**
- Database: [Railway/Render support]
- API Server: [Platform support]
- Frontend: [Vercel support]
- Domain/DNS: [Domain registrar]

**Useful Commands:**
```bash
# Check API health
curl https://your-api-url.com/

# Check database
railway run npm run db:check

# View logs
railway logs --tail
# or
heroku logs --tail
```

---

**Deployment Date:** ______________

**Deployed By:** ______________

**Production URLs:**
- API: ______________
- Web: ______________

---

Last Updated: 2025-11-21
