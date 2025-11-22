# 🦫 Bubrolinguo - Learn Polish from A1 to C1

> Master Polish language with AI-powered lessons, 10,000 vocabulary words, and engaging characters. Unlike Duolingo, we take you all the way to C1 fluency!

---

## 🚀 Project Status

**Current Phase:** Phase 3 - Production Readiness ✨
**Version:** 0.3.0
**Last Updated:** 2025-11-22

- ✅ Phase 1: Backend MVP Complete
- ✅ Phase 2: Enhanced UX Complete
- 🔄 Phase 3: Production Prep In Progress

---

## 📁 Project Structure

This is a monorepo containing all Bubrolinguo applications and packages:

```
bubrolinguo/
├── apps/
│   ├── web/              # Next.js web application
│   ├── api/              # Express.js API server
│   └── mobile/           # React Native mobile app (coming soon)
├── packages/
│   ├── shared-types/     # TypeScript types (coming soon)
│   ├── shared-utils/     # Utility functions (coming soon)
│   └── ui-components/    # Shared UI components (coming soon)
├── docs/                 # Comprehensive PRD documentation
├── roadmap/              # Phase-by-phase development roadmap
└── content/              # Lesson content (coming soon)
```

---

## 🛠️ Tech Stack

### Frontend (Web App)
- **Framework:** Next.js 14 (React 18)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3
- **State Management:** React Context API + Custom Hooks
- **UI Components:** Custom component library with accessibility
- **Testing:** Jest + React Testing Library (85% coverage target)
- **Runtime Manager:** Mise (asdf alternative)

### Backend (API)
- **Runtime:** Node.js 20.11.0
- **Framework:** Express.js
- **Language:** TypeScript 5
- **Database:** PostgreSQL 16
- **Cache:** Redis 7.0.15
- **Authentication:** JWT with refresh tokens
- **Security:** Helmet, CORS, bcrypt, Zod validation
- **Testing:** Jest (85% coverage target)

### Mobile (Coming Soon)
- **Framework:** React Native
- **Platform:** iOS (primary), Android (Phase 2)

---

## 🏃‍♂️ Quick Start

### Prerequisites

- **Node.js 20.11.0** (use Mise or install manually)
- **npm 10+**
- **Docker Desktop** (recommended) OR PostgreSQL 16+ and Redis 7+
- **Git**

#### Quick Install with Mise (Recommended)
```bash
# Install Mise (https://mise.jdx.dev)
curl https://mise.run | sh

# Install project runtimes
mise install
```

### Installation

#### Option 1: Using Mise + Docker (Recommended) 🐳

1. **Clone the repository:**
```bash
git clone https://github.com/vsemashko/bubrolinguo.git
cd bubrolinguo
```

2. **Install runtimes with Mise:**
```bash
mise install
```

3. **Start infrastructure services:**
```bash
docker-compose up -d postgres redis
```

4. **Setup project (installs dependencies + initializes database):**
```bash
mise task setup
```

This will populate:
- **30 lessons (A1-B2)** with 180 exercises
- **Mock exam preparation** with 93+ questions
- **1,700 vocabulary words** with IPA pronunciation
- **58 achievements** for gamification

5. **Run development servers:**
```bash
mise task dev
```

**You're ready!** 🎉
- **Web App:** http://localhost:3000
- **API Server:** http://localhost:3001
- **Database UI:** http://localhost:5050 (run with `docker-compose --profile tools up -d`)

#### Option 2: Manual Setup (Without Docker)

See [DEVELOPMENT.md](./DEVELOPMENT.md) for detailed manual setup instructions.

---

## 📚 Documentation

### Development Guides
- **[Development Guide](./DEVELOPMENT.md)** - Complete local development setup
- **[API Documentation](./API_DOCUMENTATION.md)** - Complete REST API specification (40+ endpoints)
- **[Integration Guide](./INTEGRATION.md)** - Frontend-backend integration
- **[Deployment Guide](./DEPLOYMENT.md)** - Production deployment
- **[Production Checklist](./PRODUCTION_CHECKLIST.md)** - Pre-launch checklist
- **[Project Review](./PROJECT_REVIEW.md)** - Comprehensive code review

### Content & Learning Resources
- **[Content Expansion Plan](./CONTENT_EXPANSION_PLAN.md)** - 30 lessons + exam prep roadmap
- **[Polish Grammar Reference](./POLISH_GRAMMAR_REFERENCE.md)** - Complete A1-B2 grammar guide (755 lines)
- **[Vocabulary Database](./apps/api/src/db/seeds/)** - 1,700 words across all levels with IPA

### Product Requirements
- **[PRD Overview](./docs/prd-overview.md)** - High-level product vision
- **[Vision & Scope](./docs/prd-vision-scope.md)** - Strategy, personas, competitive analysis
- **[Technical Architecture](./docs/prd-architecture.md)** - System design and tech stack
- **[Content Strategy](./docs/prd-content-strategy.md)** - Content creation and sourcing
- **[Roadmap](./docs/prd-roadmap.md)** - Development phases
- **[Monetization](./docs/prd-monetization.md)** - Business model

### Development Roadmap
- **[Roadmap Overview](./roadmap/README.md)** - Phase tracking and progress
- **[Phase 1: MVP](./roadmap/phase-1-mvp.md)** - 125 tasks (Months 1-6)
- **[Phase 2: Enhanced](./roadmap/phase-2-enhanced.md)** - 98 tasks (Months 7-12)
- **[Phase 3: Advanced](./roadmap/phase-3-advanced.md)** - 87 tasks (Months 13-18)
- **[Phase 4: Scale](./roadmap/phase-4-scale.md)** - 64 tasks (Months 19-24)

---

## 🎯 Current Development Focus

**Phase:** Phase 3 - Production Readiness 🚀

### ✅ Phase 1: Backend MVP (100% Complete)
- [x] Database schema with all tables
- [x] Authentication system (JWT + refresh)
- [x] 30 A1-B2 lessons with 180 exercises
- [x] 1,700 vocabulary words (A1-C1 preview)
- [x] Mock exam preparation (93+ questions)
- [x] 58 achievements
- [x] Spaced repetition (SM-2 algorithm)
- [x] Progress tracking & statistics
- [x] Leaderboard system
- [x] Complete API with 40+ endpoints

### ✅ Phase 2: Enhanced UX (100% Complete)
- [x] Toast notification system
- [x] Loading skeleton components (all pages)
- [x] Comprehensive Settings page
- [x] Protected route authentication
- [x] Streak calendar tracking
- [x] Achievement unlock celebrations
- [x] Achievement notification queue
- [x] Achievements gallery page
- [x] Leaderboard page (global/friends)
- [x] Mobile responsive navigation
- [x] Daily goal tracker
- [x] User stats panel
- [x] Quick actions component
- [x] Lesson progress indicator
- [x] Custom React hooks (useApi, useLocalStorage, etc.)
- [x] UX components (ErrorState, EmptyState, ConfirmDialog)
- [x] Utility functions library (40+ helpers)
- [x] Animation utilities
- [x] Button danger variant

### 🔄 Phase 3: Production Readiness (In Progress)
- [x] Mise runtime manager configuration
- [x] API service layer implementations
- [x] Environment configuration templates
- [x] Comprehensive test suite (Jest + RTL)
- [x] Deployment configuration (Docker, CI/CD)
- [x] README documentation updates
- [ ] API documentation completion
- [ ] Connect frontend to real API endpoints
- [ ] Production monitoring setup
- [ ] Security audit completion

### 📋 Next Steps
- [ ] Connect frontend to backend APIs
- [ ] Implement backend audio generation (Google Cloud TTS)
- [ ] Character design and illustrations
- [ ] Mobile app development (React Native)
- [ ] E2E testing with Playwright/Cypress
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] Beta testing program

---

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

---

## 📦 Building for Production

```bash
# Build all apps
npm run build

# Build specific app
cd apps/web && npm run build
cd apps/api && npm run build
```

---

## 🚢 Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for comprehensive production deployment instructions covering:
- Railway (API + Database)
- Vercel (Web App)
- Render (Alternative hosting)
- Environment configuration
- CI/CD setup
- Production monitoring

---

## 🤝 Contributing

This is a proprietary project. If you're part of the team:

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes and commit: `git commit -m "Add your feature"`
3. Push to the branch: `git push origin feature/your-feature-name`
4. Create a Pull Request

---

## 📊 Project Metrics

### Target MVP Metrics (Month 6)
- **Users:** 10,000 registered users
- **Retention:** 40%+ 7-day retention
- **Engagement:** 70%+ lesson completion rate
- **Quality:** 4.0+ app store rating
- **Revenue:** 500 paying users

### Technical Metrics
- **Code Coverage:** Target 80%+
- **API Response Time:** <500ms (p95)
- **Page Load Time:** <2 seconds
- **Uptime:** 99.9%+

---

## 🎨 Brand

**Colors:**
- Primary (Beaver Orange): `#FF6B35`
- Secondary (Polish Blue): `#004E89`
- Accent: `#F7931E`

**Mascot:**
- Bubr the Beaver 🦫 (Bubr = beaver in Polish!)

---

## 📞 Contact

- **Project Lead:** vsemashko
- **Repository:** https://github.com/vsemashko/bubrolinguo
- **Documentation:** Check `/docs` folder

---

## 📄 License

PROPRIETARY - All rights reserved

---

## 🎉 Acknowledgments

Built with passion for helping people learn Polish!

**Special thanks to our personas:**
- Bubr 🦫 for teaching us about systematic learning
- Irina 🐱 for reminding us that perfection takes time
- Wojtek 🐻 for showing us language learning can be fun
- Sergei 😰 for representing high-stakes learners
- Emma 😊 for connecting us to heritage and family

---

**Ready to build your Polish? Let's go! 🚀**

