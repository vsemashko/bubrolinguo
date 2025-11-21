# Claude Development Guidelines

This file contains guidelines for Claude (AI assistant) when working on the Bubrolinguo project.

## Pre-Commit Checklist

**IMPORTANT:** Before committing any changes, Claude MUST complete the following checks:

### 1. Code Quality Checks

#### Linting
```bash
# Run linter for affected workspace
cd apps/api && npm run lint
cd apps/web && npm run lint

# Fix auto-fixable issues
npm run lint:fix
```

#### Type Checking
```bash
# Check TypeScript types
cd apps/api && npm run type-check
cd apps/web && npm run type-check
```

### 2. Security Audits

```bash
# Run npm audit to check for vulnerabilities
cd apps/api && npm audit
cd apps/web && npm audit

# Fix vulnerabilities if found
npm audit fix

# For high/critical vulnerabilities, document in commit message
```

### 3. Tests

```bash
# Run all tests
cd apps/api && npm test
cd apps/web && npm test

# Run specific test suites if relevant
npm test -- --testPathPattern=vocabulary
```

### 4. Build Verification

```bash
# Verify production build works
cd apps/api && npm run build
cd apps/web && npm run build

# Check for build errors or warnings
```

### 5. Database Changes

If database migrations or seeds were modified:

```bash
# Test database initialization
cd apps/api
npm run db:init    # Run migrations
npm run db:seed    # Seed data
npm run db:check   # Verify database state
```

---

## Commit Message Format

Use conventional commit format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting, missing semicolons, etc
- `refactor`: Code refactor
- `test`: Adding tests
- `chore`: Maintenance

**Examples:**
```
feat(api): add exam preparation endpoints

- Implement exam attempt flow
- Add automatic grading for MC questions
- Add section-by-section submission
- Include comprehensive error handling

Closes #123
```

```
fix(vocab): correct spaced repetition algorithm

- Fix SM-2 algorithm calculation
- Add bounds checking for ease factor
- Update test cases

Fixes #456
```

---

## Code Review Checklist

Before finalizing commits:

- [ ] No console.log statements (use logger)
- [ ] No commented-out code
- [ ] All imports used
- [ ] No unused variables
- [ ] Error handling present
- [ ] Input validation added
- [ ] Security checks (SQL injection, XSS)
- [ ] Performance considerations
- [ ] Documentation updated

---

## Testing Standards

### Unit Tests
- Test business logic
- Mock external dependencies
- Aim for 80%+ coverage

### Integration Tests
- Test API endpoints
- Test database operations
- Test authentication flow

### E2E Tests
- Test critical user flows
- Test across different browsers

---

## Documentation Standards

Keep documentation current:

- Update API_DOCUMENTATION.md for endpoint changes
- Update README.md for feature additions
- Update migration files with comments
- Add JSDoc comments to functions

---

## Error Handling

Always handle errors gracefully:

```typescript
try {
  const result = await dangerousOperation();
  return result;
} catch (error) {
  logger.error('Operation failed', { error, context });
  throw new AppError('User-friendly message', 500, 'ERROR_CODE');
}
```

---

## Security Best Practices

- ✅ Validate all input
- ✅ Sanitize user data
- ✅ Use parameterized queries
- ✅ Hash passwords with bcrypt
- ✅ Use HTTPS in production
- ✅ Implement rate limiting
- ✅ Add CORS configuration
- ✅ Use helmet for headers
- ❌ Never log sensitive data
- ❌ Never commit .env files
- ❌ Never trust client input

---

## Performance Considerations

- Use database indexes
- Implement pagination
- Cache frequent queries
- Use connection pooling
- Optimize N+1 queries
- Monitor query performance

---

## Git Workflow

1. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes with frequent commits**
   ```bash
   git add <files>
   git commit -m "feat: descriptive message"
   ```

3. **Run pre-commit checks** (see checklist above)

4. **Push to remote**
   ```bash
   git push -u origin feature/your-feature-name
   ```

5. **Create pull request**
   - Add description
   - Reference related issues
   - Request review

---

## Quick Commands Reference

```bash
# Development
npm run dev           # Start dev server
npm run build         # Production build
npm run test          # Run tests
npm run lint          # Check code style
npm run type-check    # Check TypeScript

# Database
npm run db:init       # Run migrations
npm run db:seed       # Seed data
npm run db:check      # Check database status
npm run db:reset      # Reset database

# Production
npm start             # Start production server
npm run db:migrate    # Run migrations only
```

---

## Common Issues & Solutions

### Port Already in Use
```bash
# Find process using port
lsof -i :3001
kill -9 <PID>
```

### Database Connection Errors
```bash
# Check PostgreSQL is running
pg_isready -h localhost -p 5432

# Restart database
docker-compose restart db
```

### Node Modules Issues
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## Resources

- [API Documentation](../API_DOCUMENTATION.md)
- [Testing Guide](../API_TESTING_GUIDE.md)
- [Development Guide](../DEVELOPMENT.md)
- [Backend Summary](../BACKEND_IMPLEMENTATION_SUMMARY.md)

---

**Remember: Quality over speed. Take time to ensure code is clean, tested, and documented.** ✨
