# Technical Architecture
## Bubrolinguo Platform

**Version:** 1.0
**Last Updated:** 2025-11-21

---

## Architecture Overview

Bubrolinguo follows a modern, cloud-native architecture designed for scalability, reliability, and rapid iteration. The system is built around a microservices-inspired backend with multiple clients (web, iOS, Android).

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                            │
├─────────────────┬─────────────────┬─────────────────────────────┤
│   Web App       │   iOS App       │   Android App               │
│   (React/Next)  │   (React Native)│   (React Native)            │
└────────┬────────┴────────┬────────┴─────────┬───────────────────┘
         │                  │                  │
         └──────────────────┴──────────────────┘
                            │
                    ┌───────▼────────┐
                    │   API Gateway  │
                    │   (nginx/AWS)  │
                    └───────┬────────┘
                            │
         ┌──────────────────┼──────────────────┐
         │                  │                  │
    ┌────▼────┐       ┌────▼────┐      ┌─────▼─────┐
    │  Auth   │       │  Core   │      │  Content  │
    │ Service │       │ Service │      │  Service  │
    └────┬────┘       └────┬────┘      └─────┬─────┘
         │                  │                  │
         └──────────────────┴──────────────────┘
                            │
         ┌──────────────────┼──────────────────┐
         │                  │                  │
    ┌────▼────┐       ┌────▼────┐      ┌─────▼─────┐
    │   AI    │       │  Voice  │      │ Analytics │
    │ Service │       │ Service │      │  Service  │
    └────┬────┘       └────┬────┘      └─────┬─────┘
         │                  │                  │
         └──────────────────┴──────────────────┘
                            │
         ┌──────────────────┼──────────────────┐
         │                  │                  │
    ┌────▼────┐       ┌────▼────┐      ┌─────▼─────┐
    │PostgreSQL│       │  Redis  │      │    S3     │
    │         │       │  Cache  │      │   CDN     │
    └─────────┘       └─────────┘      └───────────┘
```

---

## Technology Stack

### Frontend Technologies

#### Web Application
**Framework:** Next.js 14+ (React 18+)
- **Rationale:** SSR for SEO, excellent performance, API routes for BFF pattern
- **State Management:** Zustand or Redux Toolkit
- **UI Library:** Radix UI + Tailwind CSS (custom design system)
- **Animation:** Framer Motion
- **Audio:** Howler.js for audio playback
- **PWA:** Workbox for offline capabilities
- **Testing:** Jest + React Testing Library + Playwright

**Key Features:**
- Progressive Web App capabilities
- Optimistic UI updates
- Service Worker for offline lessons
- Responsive design (mobile-first)

#### Mobile Applications
**Framework:** React Native 0.73+
- **Rationale:** Code sharing with web, faster development, one team
- **Navigation:** React Navigation 6+
- **State Management:** Shared logic with web app
- **Native Modules:** Custom modules for speech recognition, audio playback
- **Testing:** Jest + Detox for E2E

**Alternative Consideration:** Native development (Swift/Kotlin)
- **Pros:** Best performance, full platform features
- **Cons:** 2x development time, separate teams needed
- **Decision:** Start with React Native, evaluate native if performance issues

**iOS-Specific:**
- Target: iOS 14.0+
- Features: Speech Recognition API, AVAudioPlayer
- Distribution: TestFlight → App Store

**Android-Specific (Phase 3):**
- Target: Android 8.0+ (API 26+)
- Features: Speech Recognition, MediaPlayer
- Distribution: Internal testing → Google Play

### Backend Technologies

#### API Layer
**Primary Stack:** Node.js + Express.js + TypeScript
- **Rationale:** JavaScript expertise sharing with frontend, excellent ecosystem, fast development
- **Version:** Node.js 20 LTS
- **API Framework:** Express.js 4.x
- **API Documentation:** OpenAPI 3.0 + Swagger UI
- **Validation:** Zod for request/response validation
- **Testing:** Jest + Supertest

**Alternative Consideration:** Python + FastAPI
- **Pros:** Better ML integration, excellent async support
- **Cons:** Different language from frontend team
- **Decision:** Node.js for MVP, Python microservices for ML-intensive features if needed

**API Design:**
- RESTful API with GraphQL consideration for Phase 2
- Versioning: URL-based (/api/v1/)
- Rate limiting: 100 requests/minute per user
- Caching: Redis for frequently accessed data
- WebSockets: Socket.io for real-time features

#### Services Architecture

**1. Auth Service**
- User registration, login, password reset
- JWT token generation and validation
- OAuth integration (Google, Apple, Facebook)
- Session management
- Role-based access control (user, admin, content creator)

**2. Core Service**
- User progress tracking
- Lesson management and delivery
- Exercise scoring and feedback
- Streak and XP calculation
- Achievement system

**3. Content Service**
- Lesson content delivery (optimized payloads)
- Vocabulary word management
- Media asset serving (via CDN)
- Content versioning
- A/B testing for content variations

**4. AI Service**
- LLM integration for mistake explanations
- Conversation management
- Prompt templates and optimization
- Response caching for common queries
- Content safety filtering

**5. Voice Service**
- Text-to-Speech generation and caching
- Speech-to-Text processing
- Pronunciation scoring
- Audio file optimization
- Multiple voice provider management

**6. Analytics Service**
- Event tracking and aggregation
- User behavior analysis
- Learning outcome metrics
- A/B test analysis
- Reporting and dashboards

### Database Layer

#### Primary Database: PostgreSQL 15+
**Rationale:** Robust, ACID-compliant, excellent JSON support, mature ecosystem

**Schema Structure:**
```
users
├── id (uuid, primary key)
├── email (unique)
├── password_hash
├── display_name
├── interface_language (ru/en)
├── current_level (A1/A2/B1/B2/C1)
├── total_xp
├── streak_count
├── created_at
└── updated_at

user_progress
├── id (uuid, primary key)
├── user_id (foreign key)
├── lesson_id (foreign key)
├── completion_status (started/completed)
├── score
├── time_spent
├── mistakes (jsonb)
└── completed_at

lessons
├── id (uuid, primary key)
├── level (A1/A2/B1/B2/C1)
├── order
├── title (jsonb - multi-language)
├── description (jsonb)
├── exercises (jsonb)
├── target_words (array)
├── grammar_focus (array)
└── estimated_time

vocabulary
├── id (uuid, primary key)
├── polish_word
├── russian_translation
├── english_translation
├── part_of_speech
├── level (A1-C1)
├── frequency_rank
├── gender (for nouns)
├── examples (jsonb)
├── audio_url
├── image_url
└── topic_tags (array)

user_vocabulary
├── id (uuid, primary key)
├── user_id (foreign key)
├── vocabulary_id (foreign key)
├── proficiency_level (1-5)
├── last_reviewed
├── next_review (spaced repetition)
├── review_count
├── success_rate
└── created_at

conversations
├── id (uuid, primary key)
├── user_id (foreign key)
├── scenario_type
├── messages (jsonb)
├── started_at
└── ended_at
```

**Optimization:**
- Indexes on foreign keys, user_id, lesson_id
- Partial indexes for common queries
- JSONB for flexible, nested data
- Connection pooling (pg-pool)
- Read replicas for analytics queries

#### Cache Layer: Redis 7+
**Use Cases:**
- Session storage
- API response caching (5-60 minutes TTL)
- Rate limiting counters
- Leaderboard data (sorted sets)
- Real-time user status
- AI response caching
- TTS audio caching (by text hash)

**Data Structures:**
- Strings: Session tokens, cached responses
- Hashes: User session data
- Sorted Sets: Leaderboards, spaced repetition queue
- Lists: Recent activity feeds
- Sets: User achievements

#### File Storage: AWS S3 / Google Cloud Storage
**Structure:**
```
bubrolinguo-assets/
├── audio/
│   ├── vocabulary/{word_id}.mp3
│   ├── characters/{character_id}/{line_id}.mp3
│   └── lessons/{lesson_id}/{audio_id}.mp3
├── images/
│   ├── vocabulary/{word_id}.jpg
│   ├── characters/{character_id}/portrait.png
│   └── lessons/{lesson_id}/{image_id}.jpg
└── generated/
    ├── tts/{hash}.mp3
    └── user_audio/{user_id}/{recording_id}.webm
```

**CDN:** CloudFront / Cloud CDN
- Edge caching for global performance
- Automatic compression
- Image optimization (WebP/AVIF with fallback)
- Audio format optimization

### AI/ML Stack

#### Large Language Models
**Primary Provider:** OpenAI GPT-4o-mini (cost-optimized) or Anthropic Claude 3.5 Sonnet
**Use Cases:**
- Grammar mistake explanations
- Free-form conversation practice
- Exercise generation (future)
- Personalized feedback

**Implementation:**
- Structured prompts with few-shot examples
- Response caching for common errors
- Token usage monitoring and optimization
- Fallback to pre-written explanations for common cases
- Safety filtering (OpenAI Moderation API)

**API Integration:**
```javascript
// Prompt template structure
const explainMistakePrompt = {
  system: "You are a Polish language teacher explaining mistakes to {interface_language} speakers...",
  user: "Student translated: '{user_answer}' | Correct: '{correct_answer}' | Explain the mistake in {interface_language}",
  max_tokens: 200,
  temperature: 0.7
}
```

#### Speech Recognition
**Provider:** OpenAI Whisper API or Google Cloud Speech-to-Text
**Use Cases:**
- Pronunciation exercises
- Speaking practice scoring
- Conversation AI input

**Requirements:**
- Polish language model
- Real-time or near-real-time processing
- Accuracy: >90% for clear speech
- Cost: <$0.01 per minute

#### Text-to-Speech
**Primary Provider:** Google Cloud TTS (Polish voices: Zofia, Jacek)
**Alternative:** Azure Cognitive Services, Amazon Polly
**Use Cases:**
- Vocabulary word pronunciation
- Character voice lines
- Lesson audio
- Example sentences

**Configuration:**
- Voice profiles for different characters
- SSML for pronunciation control
- Multiple voice options (male/female)
- Speed adjustment (0.75x - 1.5x)
- Audio format: MP3 48kbps (mobile), 128kbps (web)

#### Spaced Repetition Algorithm
**Custom Implementation** based on SM-2 (SuperMemo 2) with modifications

**Algorithm:**
```
interval = days until next review
easiness = proficiency multiplier (1.3 - 2.5)

if (correct) {
  if (review_count === 0) interval = 1
  else if (review_count === 1) interval = 6
  else interval = previous_interval * easiness

  easiness = Math.max(1.3, easiness + 0.1)
} else {
  interval = 1
  easiness = Math.max(1.3, easiness - 0.2)
}
```

**Enhancements:**
- Context-based difficulty adjustment
- User performance patterns
- Forgetting curve modeling
- Optimal review timing

### Infrastructure

#### Hosting: AWS (Primary Choice)
**Services:**
- **Compute:** ECS/Fargate for containerized services
- **Database:** RDS PostgreSQL (Multi-AZ)
- **Cache:** ElastiCache Redis
- **Storage:** S3 + CloudFront
- **Load Balancing:** Application Load Balancer
- **Secrets:** AWS Secrets Manager
- **Monitoring:** CloudWatch
- **CI/CD:** AWS CodePipeline or GitHub Actions

**Alternative:** Google Cloud Platform
- **Compute:** Cloud Run
- **Database:** Cloud SQL
- **Cache:** Memorystore
- **Storage:** Cloud Storage + Cloud CDN

**Cost Estimation (Monthly, Phase 1):**
- Compute (ECS): $200-400
- Database (RDS): $100-200
- Cache (Redis): $50-100
- Storage & CDN: $100-300
- AI APIs: $500-1,500 (usage-based)
- **Total:** $1,000-2,500/month

**Scaling Targets:**
- 10K users: Current stack sufficient
- 50K users: Add read replicas, scale ECS tasks
- 100K+ users: Consider Kubernetes, regional deployment

#### Development Infrastructure

**Version Control:** GitHub
- Monorepo structure (Nx or Turborepo)
- Branch protection rules
- Code review requirements
- Automated checks

**CI/CD Pipeline:**
1. **Code Push** → GitHub
2. **Automated Tests** → Jest, Playwright, Detox
3. **Linting & Type Checking** → ESLint, TypeScript
4. **Build** → Docker images
5. **Deploy to Staging** → Automatic for main branch
6. **Manual Approval** → Review staging
7. **Deploy to Production** → Blue-green deployment

**Environments:**
- **Development:** Local Docker Compose
- **Staging:** AWS staging environment (smaller instances)
- **Production:** AWS production environment (auto-scaling)

**Monitoring & Observability:**
- **APM:** DataDog or New Relic
- **Error Tracking:** Sentry
- **Analytics:** Mixpanel or Amplitude
- **Logging:** CloudWatch Logs or ELK Stack
- **Uptime:** Pingdom or UptimeRobot

---

## API Design

### API Structure

**Base URL:** `https://api.bubrolinguo.com/v1`

#### Authentication
```
POST /auth/register
POST /auth/login
POST /auth/refresh
POST /auth/logout
POST /auth/forgot-password
POST /auth/reset-password
POST /auth/oauth/google
POST /auth/oauth/apple
```

#### User Management
```
GET /users/me
PATCH /users/me
GET /users/me/progress
GET /users/me/statistics
GET /users/me/achievements
```

#### Lessons
```
GET /lessons                    # List all lessons (filtered by level)
GET /lessons/:id                # Get lesson detail with exercises
POST /lessons/:id/start         # Mark lesson as started
POST /lessons/:id/submit        # Submit lesson results
GET /lessons/:id/feedback       # Get AI feedback on mistakes
```

#### Vocabulary
```
GET /vocabulary                 # Search/filter vocabulary
GET /vocabulary/:id             # Get word details
GET /vocabulary/review          # Get words due for review
POST /vocabulary/:id/review     # Submit review result
GET /vocabulary/topics          # List topic groups
GET /vocabulary/topics/:id      # Get words by topic
```

#### AI Features
```
POST /ai/explain-mistake        # Get explanation for error
POST /ai/conversation           # Start/continue conversation
GET /ai/conversation/:id        # Get conversation history
POST /ai/conversation/:id/end   # End conversation session
```

#### Progress & Gamification
```
GET /progress/dashboard         # User dashboard data
GET /leaderboard                # Global or friend leaderboard
POST /streaks/claim             # Claim daily streak
GET /achievements               # User achievements
```

#### Content Management (Admin)
```
POST /admin/lessons             # Create lesson
PUT /admin/lessons/:id          # Update lesson
POST /admin/vocabulary          # Add vocabulary
POST /admin/audio/upload        # Upload audio file
```

### API Response Format

**Success Response:**
```json
{
  "success": true,
  "data": {
    // Response payload
  },
  "meta": {
    "timestamp": "2025-11-21T10:30:00Z",
    "version": "1.0"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "LESSON_NOT_FOUND",
    "message": "The requested lesson does not exist",
    "details": {}
  },
  "meta": {
    "timestamp": "2025-11-21T10:30:00Z",
    "request_id": "req_abc123"
  }
}
```

### Authentication & Security

#### JWT Token Structure
```json
{
  "sub": "user_id",
  "email": "user@example.com",
  "role": "user",
  "iat": 1234567890,
  "exp": 1234567890
}
```

**Token Lifecycle:**
- Access Token: 15 minutes expiry
- Refresh Token: 30 days expiry
- Stored in httpOnly cookies (web) or secure storage (mobile)

#### Security Measures
- HTTPS only (TLS 1.3)
- CORS configuration for known origins
- Rate limiting per endpoint and user
- SQL injection prevention (parameterized queries)
- XSS prevention (input sanitization, CSP headers)
- CSRF protection (SameSite cookies)
- Dependency vulnerability scanning
- Regular security audits

---

## Data Flow Examples

### Lesson Completion Flow

```
1. User clicks "Start Lesson"
   └─> POST /lessons/:id/start
       └─> Create user_progress record (status: started)
       └─> Return lesson content (optimized JSON)

2. User completes exercises on client
   └─> Optimistic UI updates
   └─> Local validation and scoring

3. User clicks "Finish Lesson"
   └─> POST /lessons/:id/submit
       ├─> Payload: { answers: [], time_spent: 300 }
       ├─> Server-side validation and scoring
       ├─> Update user_progress (status: completed, score)
       ├─> Calculate XP and update user.total_xp
       ├─> Check for achievements
       ├─> Update streak if applicable
       └─> Return: { score, xp_earned, achievements_unlocked }

4. If user made mistakes
   └─> GET /lessons/:id/feedback
       └─> AI Service generates explanations (cached if common)
       └─> Return personalized feedback
```

### Vocabulary Review Flow (Spaced Repetition)

```
1. User opens "Review Words"
   └─> GET /vocabulary/review
       ├─> Query user_vocabulary where next_review <= NOW()
       ├─> Order by next_review ASC, LIMIT 20
       ├─> Include word details, audio_url, image_url
       └─> Return: { words: [...], total_due: 45 }

2. User reviews word (sees, tries to recall)
   └─> Client shows question, user self-rates or types answer

3. User marks "Easy" / "Good" / "Hard" / "Again"
   └─> POST /vocabulary/:id/review
       ├─> Payload: { quality: 4 } // 0-5 scale
       ├─> Calculate new interval using SR algorithm
       ├─> Update user_vocabulary:
       │   ├─> next_review = NOW() + interval
       │   ├─> last_reviewed = NOW()
       │   ├─> review_count++
       │   └─> Update success_rate
       └─> Return: { next_review, streak_info }

4. Every 10 words, update cache and sync progress
```

### AI Conversation Flow

```
1. User starts conversation
   └─> POST /ai/conversation
       ├─> Payload: { scenario: "cafe_order", difficulty: "A2" }
       ├─> Create conversation record in DB
       ├─> Load scenario prompt from content
       ├─> Initialize conversation context
       └─> AI generates opening message
       └─> Return: { conversation_id, message, suggestions }

2. User types/speaks response
   └─> POST /ai/conversation/:id
       ├─> Payload: { message: "Dzień dobry, poproszę kawę" }
       ├─> (If audio: STT → text)
       ├─> Add to conversation messages
       ├─> Send to LLM with context:
       │   ├─> System prompt (teacher role, user level)
       │   ├─> Conversation history
       │   └─> User message
       ├─> LLM generates response
       ├─> Detect errors or corrections needed
       ├─> Store in conversations.messages (JSONB)
       └─> Return: { message, corrections, suggestions }

3. After 5-10 exchanges or user ends
   └─> POST /ai/conversation/:id/end
       ├─> Analyze conversation quality
       ├─> Calculate XP based on length and quality
       ├─> Generate summary feedback
       └─> Update user stats
```

---

## Performance Optimization

### Frontend Optimization
- Code splitting by route
- Lazy loading of images and audio
- Virtual scrolling for long lists
- Debounced API calls
- Optimistic UI updates
- Service Worker caching strategy:
  - Network first: User data, progress
  - Cache first: Lesson content, vocabulary
  - Cache only: Audio, images (with network fallback)

### Backend Optimization
- Database query optimization:
  - Proper indexing
  - Avoid N+1 queries
  - Use EXPLAIN ANALYZE
  - Connection pooling
- Redis caching:
  - Lesson content: 1 hour
  - Vocabulary: 6 hours
  - User progress: 5 minutes
  - Leaderboards: 5 minutes
- API response compression (gzip/brotli)
- GraphQL DataLoader (if using GraphQL)
- Batch operations where possible

### Media Optimization
- Audio:
  - Format: MP3, 48kbps mono for vocabulary
  - Compression: FFmpeg optimization
  - Lazy loading: Only fetch when playing
- Images:
  - Format: WebP with JPEG fallback
  - Multiple sizes: thumbnail, medium, full
  - Lazy loading with blur placeholder
  - CDN caching: 1 year
- Bundle size:
  - Code splitting: <200KB initial bundle
  - Tree shaking: Remove unused code
  - Asset preloading for critical resources

---

## Scalability Strategy

### Phase 1 (0-10K users)
- Single region deployment (EU Central - Poland/Germany)
- Vertical scaling (increase instance sizes)
- Basic load balancing
- Single database with automated backups

### Phase 2 (10K-50K users)
- Add database read replicas
- Horizontal scaling of API servers
- Redis cluster for cache
- CDN optimization and expansion
- Implement queue system (SQS/Bull) for async tasks

### Phase 3 (50K-200K users)
- Multi-region deployment (EU + US)
- Database sharding by user_id if needed
- Microservices separation for:
  - AI service (isolate expensive operations)
  - Analytics service (separate reporting load)
- Auto-scaling based on metrics
- Advanced caching strategies

### Phase 4 (200K+ users)
- Kubernetes for orchestration
- Event-driven architecture (Kafka/EventBridge)
- Regional data centers for compliance
- Advanced ML models (on-premise training)
- Dedicated infrastructure for enterprise clients

---

## Disaster Recovery & Business Continuity

### Backup Strategy
- Database backups:
  - Automated daily full backups (30-day retention)
  - Point-in-time recovery (7 days)
  - Weekly backup testing
- Content backups:
  - S3 versioning enabled
  - Cross-region replication
- Configuration backups:
  - Infrastructure as Code (Terraform/CloudFormation)
  - Version controlled configurations

### High Availability
- Multi-AZ database deployment
- Load balancer health checks
- Auto-scaling policies
- Failover procedures documented
- RTO (Recovery Time Objective): 1 hour
- RPO (Recovery Point Objective): 5 minutes

### Monitoring & Alerting
- System health dashboards
- Alert thresholds:
  - API error rate >1%
  - Response time >2s (p95)
  - Database connection pool >80%
  - Disk usage >75%
- On-call rotation for critical issues
- Incident response playbooks

---

## Security & Compliance

### Data Protection
- **GDPR Compliance:**
  - User consent management
  - Right to access data
  - Right to deletion (account deletion)
  - Data minimization
  - Privacy policy and terms of service

- **Data Encryption:**
  - At rest: AES-256 for database and storage
  - In transit: TLS 1.3
  - Sensitive data: Encrypted columns for PII

### User Privacy
- No selling of user data
- Anonymized analytics where possible
- Opt-in for marketing communications
- Secure deletion of user data on request
- Data retention policy (2 years inactive accounts)

### Application Security
- Regular dependency updates
- Automated vulnerability scanning (Snyk, Dependabot)
- Penetration testing (annually)
- Bug bounty program (future)
- Security headers (CSP, HSTS, X-Frame-Options)
- Input validation and sanitization
- SQL injection prevention
- XSS prevention

---

## Testing Strategy

### Unit Testing
- Target: 80%+ code coverage
- Framework: Jest
- Mock external services (AI, TTS)
- Test critical business logic:
  - Spaced repetition algorithm
  - Scoring calculations
  - Progress tracking

### Integration Testing
- API endpoint testing with Supertest
- Database integration tests
- External service integration (mocked)
- Test environment with seed data

### End-to-End Testing
- Framework: Playwright (web), Detox (mobile)
- Critical user flows:
  - Registration and onboarding
  - Complete a lesson
  - Review vocabulary
  - AI conversation
- Run on every deployment to staging

### Performance Testing
- Load testing with k6 or Artillery
- Target metrics:
  - 1000 concurrent users
  - <500ms API response time (p95)
  - <5% error rate
- Test before major releases

### User Testing
- Alpha testing with internal team
- Beta testing with 100-500 users
- Usability testing sessions (5-10 users per iteration)
- A/B testing for features and UI changes

---

## Development Workflow

### Repository Structure
```
bubrolinguo/
├── apps/
│   ├── web/                    # Next.js web app
│   ├── mobile/                 # React Native app
│   └── api/                    # Node.js backend
├── packages/
│   ├── shared-types/           # TypeScript types
│   ├── shared-utils/           # Utility functions
│   ├── ui-components/          # Shared UI components
│   └── api-client/             # API client SDK
├── content/
│   ├── lessons/                # Lesson JSON files
│   ├── vocabulary/             # Vocabulary data
│   └── scripts/                # Content generation tools
├── infrastructure/
│   ├── terraform/              # IaC definitions
│   └── docker/                 # Docker configurations
├── docs/                       # Documentation (PRD, API docs)
└── package.json                # Root package.json
```

### Development Process
1. **Feature Planning:** Create issue with requirements
2. **Design:** Mockups and technical design doc
3. **Branch:** Create feature branch from main
4. **Development:** TDD approach, write tests first
5. **Code Review:** Minimum 1 approval required
6. **QA:** Test on staging environment
7. **Deploy:** Merge to main → auto-deploy to production

### Code Quality Standards
- TypeScript strict mode enabled
- ESLint + Prettier for code formatting
- Husky for pre-commit hooks:
  - Linting
  - Type checking
  - Unit tests on changed files
- Conventional commits for changelog generation
- No commented-out code in production
- Maximum function complexity: 10

---

## Third-Party Services

### Required Services

| Service | Provider | Purpose | Cost (est.) |
|---------|----------|---------|-------------|
| Hosting | AWS | Infrastructure | $500-1000/mo |
| Database | AWS RDS | PostgreSQL | $100-200/mo |
| LLM API | OpenAI/Anthropic | AI features | $500-1500/mo |
| TTS | Google Cloud | Voice generation | $100-300/mo |
| STT | Google Cloud | Speech recognition | $50-150/mo |
| CDN | CloudFront | Content delivery | $100-300/mo |
| Email | SendGrid | Transactional emails | $15-50/mo |
| Analytics | Mixpanel | User analytics | $0-100/mo |
| Monitoring | DataDog | APM & logging | $100-300/mo |
| Error Tracking | Sentry | Error monitoring | $26-99/mo |
| Payment | Stripe | Subscriptions | 2.9% + $0.30 |

**Total Monthly Cost:** $1,500-4,500 (scales with usage)

---

## Appendix

### Technology Decision Log

**Decision 1: Node.js vs. Python for Backend**
- **Decision:** Node.js
- **Reasoning:** Team expertise, ecosystem, performance for I/O-bound operations
- **Date:** 2025-11-21

**Decision 2: React Native vs. Native Mobile**
- **Decision:** React Native
- **Reasoning:** Faster development, code sharing, one team
- **Trade-off:** Slightly lower performance, may need native modules
- **Date:** 2025-11-21

**Decision 3: PostgreSQL vs. MongoDB**
- **Decision:** PostgreSQL
- **Reasoning:** Structured data, ACID compliance, excellent JSON support
- **Date:** 2025-11-21

**Decision 4: Monorepo vs. Polyrepo**
- **Decision:** Monorepo (Turborepo)
- **Reasoning:** Code sharing, consistent tooling, easier refactoring
- **Date:** 2025-11-21

### Future Technical Considerations

**Phase 2+:**
- GraphQL for more flexible data fetching
- WebRTC for peer-to-peer voice conversations
- Machine learning models for personalized learning paths
- Offline-first architecture with sync
- Advanced analytics with BigQuery/Snowflake

**Phase 3+:**
- Custom-trained Polish language models
- Augmented reality for vocabulary learning
- Smart speaker integration (Alexa, Google Home)
- API for third-party integrations
- White-label platform for other languages

