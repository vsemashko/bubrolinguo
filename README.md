# 🦫 Bubrolinguo - Learn Polish from A1 to C1

> Master Polish language with AI-powered lessons, 10,000 vocabulary words, and engaging characters. Unlike Duolingo, we take you all the way to C1 fluency!

---

## 🚀 Project Status

**Current Phase:** Initial Setup & Development
**Version:** 0.1.0
**Last Updated:** 2025-11-21

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
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Data Fetching:** TanStack Query (React Query)

### Backend (API)
- **Runtime:** Node.js 20+
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL 15
- **Cache:** Redis 7
- **Authentication:** JWT with refresh tokens
- **Security:** Helmet, CORS, bcrypt, Zod validation

### Mobile (Coming Soon)
- **Framework:** React Native
- **Platform:** iOS (primary), Android (Phase 2)

---

## 🏃‍♂️ Quick Start

### Prerequisites

- **Node.js 20+** and npm 10+
- **Docker Desktop** (recommended) OR PostgreSQL 15+ and Redis 7+
- **Git**

### Installation

#### Option 1: Using Docker (Recommended) 🐳

1. **Clone the repository:**
```bash
git clone https://github.com/vsemashko/bubrolinguo.git
cd bubrolinguo
```

2. **Start database services:**
```bash
docker-compose up -d
```

3. **Install dependencies:**
```bash
cd apps/api && npm install && cd ../..
cd apps/web && npm install && cd ../..
```

4. **Set up environment variables:**
```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
```

5. **Initialize database:**
```bash
cd apps/api
npm run db:init
```

This will populate:
- **30 lessons (A1-B2)** with 180 exercises (all 6 exercise types)
  - 15 A1-A2 lessons (Basic to Elementary)
  - 10 B1 lessons (Intermediate)
  - 5 B2 lessons (Upper Intermediate)
- **Mock exam preparation** with official format simulation:
  - 4 mock exams (A1, A2, B1, B2) with 25+ sample questions
  - 14 study resources (strategies, tips, common mistakes)
  - Analytics and progress tracking
- **1,300+ vocabulary words** with Polish/English/Russian translations and IPA
  - 425 A1-A2 words (basic-elementary)
  - 500+ B1 words (intermediate)
  - 400+ B2 words (upper-intermediate)
- **58 achievements** for gamification

6. **Run development servers:**
```bash
# From project root
npm run dev
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
- **[API Documentation](./apps/api/API.md)** - API endpoints and usage
- **[Integration Guide](./INTEGRATION.md)** - Frontend-backend integration
- **[Deployment Guide](./DEPLOYMENT.md)** - Production deployment
- **[Production Checklist](./PRODUCTION_CHECKLIST.md)** - Pre-launch checklist
- **[Project Review](./PROJECT_REVIEW.md)** - Comprehensive code review

### Content & Learning Resources
- **[Content Expansion Plan](./CONTENT_EXPANSION_PLAN.md)** - 30 lessons + exam prep roadmap
- **[Polish Grammar Reference](./POLISH_GRAMMAR_REFERENCE.md)** - Complete A1-B2 grammar guide

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

**Phase:** Initial Setup (Pre-Launch)

### ✅ Completed
- [x] Comprehensive PRD documentation
- [x] Detailed roadmap with checkboxes
- [x] Memorable persona creation
- [x] Project structure setup
- [x] Next.js web app foundation
- [x] Express API foundation
- [x] Basic landing page

### 🏗️ In Progress
- [ ] UI component library refinement
- [ ] Mobile app development (React Native)
- [ ] Audio generation for exercises

### ✅ Recently Completed (MVP Backend + UX)
- [x] Database schema design and implementation
- [x] Authentication implementation (JWT + refresh tokens)
- [x] Complete API with all controllers
- [x] 30 A1-B2 lessons with 180 exercises
- [x] Mock exam preparation module (A1, B1 with study resources)
- [x] 1,300+ vocabulary words with translations (A1-B2)
- [x] 58 achievement definitions
- [x] Spaced repetition (SM-2 algorithm)
- [x] Progress tracking and statistics
- [x] Leaderboard system
- [x] Error handling (ErrorBoundary, Toast notifications)
- [x] Loading states (Skeleton components)
- [x] Audio pronunciation (Web Speech API)
- [x] Analytics infrastructure (GA4, Plausible)
- [x] Frontend-backend integration
- [x] Docker Compose for local development
- [x] CI/CD pipeline with GitHub Actions

### 📋 Next Steps
- [x] Expand to 30 A1-B2 lessons (COMPLETED)
- [x] Expand vocabulary to 1,300+ words (COMPLETED)
- [ ] Complete vocabulary to 1,600+ words (add remaining ~300 words)
- [ ] Implement backend audio generation (Google Cloud TTS)
- [ ] Character design and illustrations
- [ ] Voice interaction features
- [ ] Mobile app development (React Native)
- [ ] Unit and E2E testing
- [ ] Dependency updates and security improvements

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

