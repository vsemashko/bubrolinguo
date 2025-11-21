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
- **Database:** PostgreSQL (planned)
- **Cache:** Redis (planned)
- **Authentication:** JWT

### Mobile (Coming Soon)
- **Framework:** React Native
- **Platform:** iOS (primary), Android (Phase 2)

---

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 20+ and npm 10+
- Git

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/vsemashko/bubrolinguo.git
cd bubrolinguo
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**

Create `.env.local` files in both apps:

**apps/web/.env.local:**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**apps/api/.env:**
```env
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
DATABASE_URL=postgresql://localhost:5432/bubrolinguo
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-super-secret-key-change-this
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this
```

4. **Set up the database:**

Create the PostgreSQL database:
```bash
createdb bubrolinguo
```

Run migrations to create tables:
```bash
cd apps/api
npm run db:migrate
```

Seed the database with initial content:
```bash
npm run db:seed
```

This will populate:
- **10 A1 lessons** with 60 total exercises covering all 6 exercise types
- **300 vocabulary words** with Polish/English/Russian translations and IPA pronunciations
- **58 achievements** for gamification (lessons, vocabulary, streaks, XP, etc.)

5. **Run development servers:**

```bash
# Run both web and API in development mode
npm run dev
```

Or run individually:

```bash
# Web app only (http://localhost:3000)
cd apps/web
npm run dev

# API server only (http://localhost:3001)
cd apps/api
npm run dev
```

---

## 📚 Documentation

### Product Requirements
- **[PRD Overview](./docs/prd-overview.md)** - High-level product vision
- **[Vision & Scope](./docs/prd-vision-scope.md)** - Strategy, personas, competitive analysis
- **[Technical Architecture](./docs/prd-architecture.md)** - System design and tech stack
- **[Content Strategy](./docs/prd-content-strategy.md)** - Content creation and sourcing
- **[Features](./docs/)** - Core features, AI, vocabulary, characters, voice
- **[Roadmap](./docs/prd-roadmap.md)** - Development phases
- **[Monetization](./docs/prd-monetization.md)** - Business model

### Development Roadmap
- **[Roadmap Overview](./roadmap/README.md)** - Phase tracking and progress
- **[Pre-Launch](./roadmap/pre-launch.md)** - 48 tasks before development
- **[Phase 1: MVP](./roadmap/phase-1-mvp.md)** - 125 tasks (Months 1-6)
- **[Phase 2: Enhanced](./roadmap/phase-2-enhanced.md)** - 98 tasks (Months 7-12)
- **[Phase 3: Advanced](./roadmap/phase-3-advanced.md)** - 87 tasks (Months 13-18)
- **[Phase 4: Scale](./roadmap/phase-4-scale.md)** - 64 tasks (Months 19-24)

### Personas
- **[Quick Reference](./docs/personas-quick-reference.md)** - Meet our memorable users!
  - 🦫 Bubr the Beaver - The Motivated Builder
  - 🐱 Crazy Cat Lady Irina - The Perfectionist
  - 🐻 Wojtek the Party Bear - The Heritage Learner
  - 😰 Stressed-Out Sergei - The Corporate Refugee
  - 😊 Emma "Babcia's Favorite" - The Guilty Grandchild

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

### ✅ Recently Completed (MVP Backend)
- [x] Database schema design and implementation
- [x] Authentication implementation (JWT + refresh tokens)
- [x] Complete API with all controllers
- [x] 10 A1 lessons with 60 exercises
- [x] 300 vocabulary words with translations
- [x] 58 achievement definitions
- [x] Spaced repetition (SM-2 algorithm)
- [x] Progress tracking and statistics
- [x] Leaderboard system

### 📋 Next Steps
- [ ] Expand to 15+ A1/A2 lessons
- [ ] Expand vocabulary to 500+ words
- [ ] Audio generation for vocabulary and exercises
- [ ] Character design and illustrations
- [ ] Voice integration planning
- [ ] Frontend-backend integration testing

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

(Coming soon - deployment instructions for production)

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

