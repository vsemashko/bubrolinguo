# Content Strategy & Sourcing
## Bubrolinguo

**Version:** 1.0
**Last Updated:** 2025-11-21

---

## Content Overview

Content is the core of Bubrolinguo's value proposition. High-quality, pedagogically sound, and engaging content will differentiate us from competitors and drive learning outcomes.

### Content Types

1. **Structured Lessons** (200-300 total)
2. **Vocabulary Database** (10,000 words)
3. **Grammar Explanations** (100+ topics)
4. **Audio Content** (15,000+ files)
5. **Visual Content** (10,000+ images)
6. **Character Dialogues** (500+ scenarios)
7. **Exam Preparation Materials** (B1, B2, C1)
8. **Cultural Content** (100+ modules)

---

## Content Sourcing Strategy

### 1. Lesson Content Creation

#### Sourcing Approach: **Professional Creation + Validation**

**Phase 1: Core Team Creation**
- **Team Composition:**
  - 2-3 Polish language teachers (certified, 5+ years experience)
  - 1 instructional designer
  - 1 content coordinator
  - Native Polish speakers from both Russia and English-speaking countries for cultural context

**Phase 2: Scaling**
- Contract additional teachers for B1-C1 content
- Partner with Polish universities (Jagiellonian University, University of Warsaw)
- Hire Polish language PhD candidates

**Content Creation Pipeline:**
```
1. Curriculum Design
   └─> Map CEFR levels to lesson topics
   └─> Define learning objectives per lesson
   └─> Create progression framework

2. Lesson Development
   └─> Teacher creates lesson draft
   └─> Include: vocabulary, grammar, exercises, examples
   └─> Peer review by second teacher

3. Linguistic Validation
   └─> Native Polish speaker review
   └─> Grammar accuracy check
   └─> Cultural appropriateness review

4. Pedagogical Review
   └─> Instructional designer evaluates
   └─> Check difficulty progression
   └─> Ensure variety in exercise types

5. Technical Implementation
   └─> Convert to JSON format
   └─> Add audio/image assets
   └─> QA testing in app

6. Beta Testing
   └─> Test with 20-50 learners
   └─> Collect feedback
   └─> Iterate based on data

7. Production Release
   └─> Deploy to platform
   └─> Monitor completion rates
   └─> Continuous improvement
```

**Quality Standards:**
- Zero grammatical errors
- Culturally appropriate and sensitive
- Age-appropriate content (16+)
- Diverse representations
- Natural, contemporary Polish
- Clear learning objectives
- Balanced difficulty curve

#### Lesson Structure Template

**Each lesson includes:**
- **Title & Description** (RU, EN)
- **Learning Objectives** (2-3 clear goals)
- **Target Vocabulary** (5-10 new words)
- **Grammar Focus** (1-2 concepts)
- **Exercises** (8-12 varied types):
  - Translation (PL→RU/EN and reverse)
  - Multiple choice
  - Fill in the blank
  - Listening comprehension
  - Speaking practice
  - Sentence building
  - Matching
  - True/False
- **Example Dialogues**
- **Tips & Notes**
- **Cultural Insights**

**Estimated Creation Time:**
- A1-A2 lesson: 8-12 hours
- B1 lesson: 12-16 hours
- B2-C1 lesson: 16-24 hours

**Cost Estimation:**
- Per lesson (A1-A2): $200-400
- Per lesson (B1): $400-600
- Per lesson (B2-C1): $600-1,000
- **Total for 250 lessons: $100,000-200,000**

### 2. Vocabulary Database

#### Sourcing Approach: **Data Compilation + Professional Enhancement**

**Sources for Word Selection:**

1. **Frequency Lists**
   - Polish National Corpus (NKJP) frequency data
   - Subtitle corpus (contemporary usage)
   - Top 3,000 most common words (priority)
   - Extended to 10,000 for advanced learners

2. **Thematic Categories**
   - CEFR-aligned word lists
   - Topic-based groupings (food, travel, work, etc.)
   - Domain-specific vocabulary (business, academic, medical)

3. **Academic Resources**
   - Polish language textbooks
   - CEFR vocabulary standards
   - Official exam word lists (B1, B2, C1)

**Data Structure for Each Word:**

```json
{
  "id": "word_001",
  "polish": "dzień dobry",
  "russian": "добрый день",
  "english": "good morning/afternoon",
  "part_of_speech": "phrase",
  "level": "A1",
  "frequency_rank": 42,
  "gender": null,
  "cases": null,
  "conjugation": null,
  "examples": [
    {
      "polish": "Dzień dobry, jak się masz?",
      "russian": "Добрый день, как дела?",
      "english": "Good afternoon, how are you?",
      "audio_url": "/audio/examples/ex_001.mp3"
    }
  ],
  "synonyms": ["cześć (informal)"],
  "antonyms": ["do widzenia"],
  "notes": "Formal greeting used during daytime",
  "topics": ["greetings", "daily_life"],
  "image_url": "/images/vocab/word_001.jpg",
  "audio_url": "/audio/vocab/word_001.mp3",
  "mnemonic": {
    "russian": "Звучит похоже на 'джин добрый'",
    "english": "Sounds like 'jin dobry'"
  }
}
```

**Creation Process:**

1. **Word Selection** (automated)
   - Extract top 10,000 words from frequency lists
   - Categorize by CEFR level
   - Group by topics and themes

2. **Translation & Definition** (hybrid)
   - Initial machine translation
   - Professional translator review and correction
   - Add context and nuances

3. **Example Sentences** (professional)
   - Create 2-3 example sentences per word
   - Show different contexts and uses
   - Professional translation to RU/EN

4. **Audio Recording** (professional + synthetic)
   - Priority words (3,000): Professional native speaker
   - Extended vocabulary (7,000): High-quality TTS
   - Record all example sentences

5. **Image Selection** (licensed + custom)
   - License images from stock photo services
   - Commission custom illustrations for abstract concepts
   - Ensure cultural relevance

6. **Review & Validation**
   - Linguistic accuracy check
   - Audio quality verification
   - Image appropriateness review

**Timeline:**
- Research & selection: 2 weeks
- Translation & examples (batch 1 - 1,000 words): 6-8 weeks
- Audio recording (professional): 4-6 weeks
- Image sourcing: 4 weeks (ongoing)
- Full 10,000 words: 9-12 months (phased)

**Cost Estimation:**
- Translation & examples: $5-10 per word
- Professional audio: $2-5 per word (3,000 words)
- TTS audio: $0.10 per word (7,000 words)
- Images: $1-3 per word (licensed/custom mix)
- **Total: $80,000-130,000**

**Vendors & Partners:**

- **Translation**: Professional Polish translation agencies
  - Options: Tomedes, One Hour Translation, SDL
  - Native speakers from Russia and English-speaking countries

- **Audio**: Polish voice actors + TTS
  - Professional studios in Warsaw, Kraków
  - Google Cloud TTS for bulk content

- **Images**: Stock + custom illustrations
  - Shutterstock, iStock (licensed)
  - Commission Polish illustrators for custom work

### 3. Grammar Explanations

#### Sourcing Approach: **Expert Creation**

**Content Requirements:**
- 100+ grammar topics covering A1→C1
- Explanations in Russian and English
- Contrastive analysis (Polish vs. Russian/English)
- Progressive complexity
- Examples and exercises

**Topics Coverage:**
- **A1-A2**: Basic cases (nominative, accusative, genitive), verb conjugation, gender, basic tenses
- **B1**: All 7 Polish cases, aspect, motion verbs, numerals
- **B2**: Advanced verb aspects, conditional mood, complex sentences, participles
- **C1**: Stylistics, advanced syntax, idiomatic expressions, formal/informal registers

**Creation Process:**
- Expert Polish linguists create explanations
- Focus on common mistakes (Russian/English speakers)
- Include comparison tables
- Interactive examples
- Practice exercises integrated into lessons

**Cost Estimation:**
- $500-1,000 per major grammar topic
- **Total: $50,000-100,000**

### 4. Audio Content Strategy

#### Production Approach: **Hybrid (Professional + TTS)**

**Professional Recording:**
- **Use Cases:**
  - Character voice lines
  - Top 3,000 vocabulary words
  - Lesson dialogues
  - Key example sentences

- **Requirements:**
  - Native Polish speakers
  - 2-3 different voices (male/female, different ages)
  - Professional studio quality
  - Natural, clear pronunciation
  - Consistent quality across recordings

- **Process:**
  1. Prepare scripts with pronunciation notes
  2. Record in professional studio (Warsaw/Kraków)
  3. Audio editing and mastering
  4. Quality control review
  5. Format optimization (MP3, various bitrates)
  6. Upload to CDN

- **Voice Actors:**
  - Recruit from Polish voice acting community
  - Audition process for character voices
  - Long-term contracts for consistency

**Text-to-Speech (TTS):**
- **Use Cases:**
  - Extended vocabulary (7,000 words)
  - Practice sentences
  - User-generated content (AI conversations)

- **Provider:** Google Cloud TTS or Azure
- **Voices:** Zofia (female), Jacek (male) - Polish voices
- **Quality:** Neural voices for natural sound

**Audio Specifications:**
- **Format:** MP3
- **Bitrate:**
  - Mobile: 48 kbps (mono)
  - Web: 96-128 kbps
- **Sample Rate:** 44.1 kHz
- **Channels:** Mono for speech
- **File Naming:** Consistent, hash-based for caching

**Cost Estimation:**
- Professional recording: $50-100 per hour (studio + actor)
- Character voices: $2,000-5,000 per character (50-100 lines each)
- Vocabulary audio: $10,000-15,000 (3,000 words)
- TTS: $100-300/month (ongoing usage)
- **Total Initial: $30,000-50,000**

### 5. Visual Content Strategy

#### Sourcing Approach: **Licensed + Custom**

**Image Requirements:**
- 10,000 images for vocabulary
- Character illustrations
- Lesson imagery
- Cultural content visuals
- UI icons and graphics

**Vocabulary Images:**
- **Concrete Nouns**: Photos (licensed from stock)
- **Abstract Concepts**: Custom illustrations
- **Actions/Verbs**: Illustrations or action photos
- **Cultural Items**: Custom photography or commissioned art

**Style Guidelines:**
- Modern, clean aesthetic
- Diverse and inclusive representation
- Culturally accurate (Polish context)
- Consistent illustration style
- Optimized for mobile (WebP format)

**Sourcing:**
1. **Stock Photos** (60%):
   - Shutterstock, iStock, Unsplash Pro
   - Bulk licensing agreements
   - Filter by Polish/European context

2. **Custom Illustrations** (30%):
   - Commission Polish illustrators
   - Create style guide
   - Batch creation for efficiency

3. **User-Generated** (10%):
   - Photo contests for learners in Poland
   - Curated and vetted
   - Community engagement

**Image Specifications:**
- **Resolution**: 1200x800px (web), 600x400px (mobile)
- **Format**: WebP primary, JPEG fallback
- **Size**: <100KB per image (compressed)
- **Aspect Ratio**: 3:2 or 16:9
- **Alt Text**: Required for accessibility (RU/EN)

**Cost Estimation:**
- Stock licensing: $5,000-10,000 (bulk annual)
- Custom illustrations: $20-50 per image × 3,000 = $60,000-150,000
- Photography: $5,000-10,000
- **Total: $70,000-170,000** (phased over 18 months)

### 6. Character Content

**See detailed specifications in:** [prd-characters.md](./prd-characters.md)

**Content Requirements per Character:**
- Backstory and personality profile
- Visual design (multiple poses, expressions)
- Voice acting (50-100 voice lines)
- Character-specific dialogues in lessons
- Catchphrases and personality quirks

**Cost per Character:** $5,000-10,000
**Total (6 characters):** $30,000-60,000

### 7. Exam Preparation Content

#### Sourcing Approach: **Expert Creation + Official Materials Analysis**

**Content Coverage:**
- Mock exams for B1, B2, C1 levels
- Practice sections: Reading, Writing, Listening, Speaking
- Scoring rubrics and explanations
- Tips and strategies

**Sources:**
- Official exam specifications (Państwowa Komisja Poświadczania Znajomości Języka Polskiego)
- Sample exams from certification bodies
- Expert test prep teachers
- Analysis of common mistakes

**Creation Process:**
1. Analyze official exam formats
2. Create original practice questions (avoid copyright)
3. Develop scoring criteria
4. Professional review by certified examiners
5. Beta test with real learners
6. Refine based on performance data

**Cost Estimation:**
- Per mock exam: $5,000-10,000
- 3 levels × 2 exams each = $30,000-60,000

### 8. Cultural Content

**Purpose:** Provide context, motivation, and practical knowledge about Poland

**Content Types:**
- Polish history and traditions
- Contemporary Polish culture
- Regional differences
- Social norms and etiquette
- Polish holidays and celebrations
- Famous Poles (literature, science, sports)
- Polish cuisine
- Travel guides (cities, regions)

**Format:**
- Short articles (500-800 words)
- Video content (future phase)
- Interactive quizzes
- Integrated into lessons

**Sourcing:**
- Polish cultural experts
- Travel writers
- Partnership with Polish tourism board
- User-contributed content (vetted)

**Cost Estimation:**
- 100 articles at $200-500 each = $20,000-50,000

---

## Content Validation & Quality Assurance

### Multi-Stage Review Process

**Stage 1: Content Creation**
- Creator develops initial content
- Self-review checklist completed
- Submit for peer review

**Stage 2: Linguistic Validation**
- Native Polish speaker review
- Grammar and syntax accuracy
- Natural language usage
- Contemporary Polish verification
- Flag: Outdated expressions, errors, unclear phrasing

**Stage 3: Cultural Review**
- Cultural sensitivity check
- Stereotypes avoidance
- Appropriate representations
- Regional considerations
- Flag: Culturally insensitive, outdated stereotypes

**Stage 4: Pedagogical Review**
- Instructional designer evaluation
- Learning objective alignment
- Difficulty appropriate for level
- Exercise variety and effectiveness
- Progression logic
- Flag: Too difficult, too easy, unclear objectives

**Stage 5: Translation Accuracy**
- Verify Russian translations (native Russian speaker)
- Verify English translations (native English speaker)
- Consistency across languages
- Flag: Mistranslations, cultural mismatches

**Stage 6: Technical QA**
- Format validation (JSON schema)
- Audio quality check
- Image appropriateness and quality
- Load testing (performance)
- Flag: Technical errors, broken links, poor quality assets

**Stage 7: User Testing**
- Beta test with 20-50 learners
- Measure: Completion rate, time taken, error rate
- Collect qualitative feedback
- Flag: Confusing content, bugs, user complaints

**Stage 8: Data-Driven Iteration**
- Analyze learning outcomes
- Identify problematic lessons/exercises
- Monitor user feedback
- Regular updates and improvements

### Quality Metrics

**Content Quality KPIs:**
- Error rate: <1% reported errors per lesson
- Completion rate: >70% for each lesson
- User satisfaction: >4.0/5.0 rating
- Time to complete: Within ±20% of estimated time
- Retention: >80% of learned vocabulary after 30 days

**Review Turnaround:**
- Linguistic review: 2-3 days
- Cultural review: 1-2 days
- Pedagogical review: 2-3 days
- Technical QA: 1-2 days
- **Total: 6-10 business days per lesson**

### Content Update Strategy

**Continuous Improvement:**
- Quarterly content audits
- User feedback integration
- Update outdated cultural references
- Improve low-performing lessons
- Add new content based on user requests

**Version Control:**
- All content in version control (Git)
- Track changes and rationale
- A/B testing for major changes
- Rollback capability for issues

---

## Content Management System (CMS)

### CMS Requirements

**Core Features:**
- WYSIWYG editor for lesson creation
- Audio upload and management
- Image upload and optimization
- Preview functionality
- Workflow management (draft → review → approved → published)
- Version history
- Collaboration tools (comments, assignments)
- Search and filter
- Bulk operations
- Export/import (JSON, CSV)

**User Roles:**
- **Admin**: Full access, user management
- **Content Creator**: Create and edit lessons
- **Reviewer**: Review and approve content
- **Translator**: Edit translations
- **Audio Producer**: Upload and manage audio
- **Viewer**: Read-only access

**Technical Implementation:**
- Custom-built with React + Node.js
- Or use headless CMS: Strapi, Contentful, Sanity.io
- Integration with main application database
- API for content delivery to apps

### Content Workflow Automation

**Automated Checks:**
- JSON schema validation
- Audio format and quality verification
- Image format and size optimization
- Duplicate detection
- Link checking
- Translation completeness check

**Notifications:**
- Email alerts for review assignments
- Slack/Discord integration for team
- Deadline reminders
- Approval notifications

---

## Content Partnerships

### Potential Partners

**1. Polish Universities**
- **Universities**: Jagiellonian University, University of Warsaw, Adam Mickiewicz University
- **Benefits**:
  - Access to Polish language experts
  - Research collaboration
  - Student interns for content creation
  - Credibility and quality assurance
- **Collaboration**: Content review, research projects, internship programs

**2. Polish Language Institutions**
- **Organizations**: Polish Language Council, Polish Cultural Institutes
- **Benefits**:
  - Official endorsement
  - Access to linguistic resources
  - Networking with educators
- **Collaboration**: Content validation, promotional partnerships

**3. Polish Exam Certification Bodies**
- **Państwowa Komisja Poświadczania Znajomości Języka Polskiego**
- **Benefits**:
  - Ensure exam prep content accuracy
  - Possible official exam registration integration
  - Credibility for learners
- **Collaboration**: Content validation, official test prep designation

**4. Polish Government/Tourism**
- **Organizations**: Polish Tourism Organization, Ministry of Foreign Affairs
- **Benefits**:
  - Funding or grants for cultural content
  - Promotional support
  - Official language learning designation
- **Collaboration**: Co-marketing, content exchange

**5. Language Content Agencies**
- **Agencies specializing in language learning content**
- **Benefits**:
  - Scale content production
  - Established quality processes
  - Faster development
- **Collaboration**: Outsource B2-C1 content creation

**6. Polish Media & Publishers**
- **Radio Poland, Polish language textbook publishers**
- **Benefits**:
  - Licensed content (articles, audio)
  - Credibility
  - Cross-promotion
- **Collaboration**: Content licensing, co-branded materials

---

## Content Localization Strategy

### Interface Localization

**Target Languages:**
1. **Russian** (primary)
   - Full UI translation
   - Grammar explanations with Russian comparisons
   - Native Russian-speaking content reviewers

2. **English** (primary)
   - Full UI translation
   - Grammar explanations for English speakers
   - Native English-speaking content reviewers

3. **Polish** (future)
   - For advanced learners using app in Polish
   - Monolingual mode option

**Localization Requirements:**
- Professional translators (native speakers)
- Cultural adaptation (not just translation)
- Localized examples and references
- Date, time, currency formats
- Right-to-left support (not applicable)
- Emoji and symbol appropriateness

**Process:**
- Extract all UI strings to translation files
- Use i18n library (react-i18next)
- Context provided for translators
- QA by native speakers
- A/B test for optimal phrasing

**Cost Estimation:**
- Initial translation: $5,000-10,000 per language
- Ongoing updates: $500-1,000 per month

### Content Localization Considerations

**Examples and Context:**
- Use culturally relevant examples for each audience
- Russian learners: Comparisons to Russian culture, Cyrillic hints
- English learners: Western cultural references, Latin alphabet focus

**Contrastive Analysis:**
- Highlight differences between Polish and source language
- Common mistakes for Russian vs. English speakers differ
- Tailored grammar explanations

---

## Content Calendar & Roadmap

### Phase 1: MVP (Months 1-6)

**Month 1-2: Foundation**
- Set up CMS
- Hire content team (2 teachers, 1 coordinator)
- Create style guides and templates
- Develop 3,000 word vocabulary database (initial selection)
- Record character auditions and selection

**Month 3-4: Core Content Creation**
- Create A1 lessons (20 lessons)
- Create A2 lessons (30 lessons)
- Record audio for 500 priority vocabulary words
- Source images for vocabulary (1,000 images)
- Develop 2-3 character profiles and voice lines

**Month 5-6: Validation & Polish**
- Beta testing with 50 users
- Linguistic and cultural review
- Fix issues and iterate
- Record remaining audio
- Finalize characters and voices

**Phase 1 Deliverables:**
- 50 lessons (A1-A2)
- 1,000 vocabulary words (audio + images)
- 2-3 characters (voice lines, visuals)
- Basic grammar explanations (30 topics)

### Phase 2: Expansion (Months 7-12)

**Month 7-9: B1 Content**
- Create 60 B1 lessons
- Expand vocabulary to 3,000 words
- Create topical vocabulary modules (20 topics)
- Add 2-3 more characters
- Enhanced grammar explanations (50 topics)

**Month 10-12: Enhanced Features**
- B1 exam preparation content
- Cultural content modules (30 articles)
- AI conversation scenarios
- Character dialogue expansions
- Expand vocabulary to 5,000 words

**Phase 2 Deliverables:**
- 110 total lessons (A1-B1)
- 5,000 vocabulary words
- 5-6 characters
- B1 exam prep
- 30 cultural modules

### Phase 3: Advanced Content (Months 13-18)

**Month 13-15: B2 Content**
- Create 70 B2 lessons
- Expand vocabulary to 7,500 words
- B2 exam preparation
- Advanced grammar (75 topics)

**Month 16-18: C1 Content**
- Create 70 C1 lessons
- Complete 10,000 vocabulary words
- C1 exam preparation
- Advanced topics and idioms
- Business and academic Polish modules

**Phase 3 Deliverables:**
- 250+ total lessons (A1-C1)
- 10,000 vocabulary words
- Complete exam prep (B1, B2, C1)
- 100+ cultural modules

---

## Content Budget Summary

### Initial Investment (18 months)

| Content Type | Estimated Cost |
|--------------|----------------|
| Lesson Content (250 lessons) | $100,000-200,000 |
| Vocabulary Database (10,000 words) | $80,000-130,000 |
| Grammar Explanations (100 topics) | $50,000-100,000 |
| Professional Audio Recording | $30,000-50,000 |
| Visual Content (images, illustrations) | $70,000-170,000 |
| Character Development (6 characters) | $30,000-60,000 |
| Exam Preparation Content | $30,000-60,000 |
| Cultural Content (100 modules) | $20,000-50,000 |
| **Total Content Investment** | **$410,000-820,000** |

### Ongoing Costs (Monthly)

| Item | Monthly Cost |
|------|-------------|
| Content Team Salaries (3-5 people) | $10,000-20,000 |
| Content Updates & Improvements | $2,000-5,000 |
| TTS API Usage | $100-300 |
| Stock Image Licensing | $500-1,000 |
| Translation & Localization | $500-1,000 |
| **Total Monthly** | **$13,000-27,000** |

### Phased Spending

- **Phase 1 (Months 1-6)**: $150,000-250,000
- **Phase 2 (Months 7-12)**: $150,000-300,000
- **Phase 3 (Months 13-18)**: $110,000-270,000

---

## Risk Mitigation

### Content Quality Risks

**Risk**: Inaccurate or low-quality content
- **Mitigation**: Multi-stage review process, expert validators, user feedback loops

**Risk**: Content creation delays
- **Mitigation**: Buffer time in schedule, backup content creators, phased releases

**Risk**: Cultural insensitivity
- **Mitigation**: Cultural review stage, diverse review team, sensitivity training

### Sourcing Risks

**Risk**: Difficulty finding qualified Polish experts
- **Mitigation**: Early recruitment, university partnerships, remote work globally

**Risk**: Voice actor availability
- **Mitigation**: Record in batches, have backup actors, TTS fallback

**Risk**: Copyright infringement
- **Mitigation**: Only licensed or original content, legal review, proper attribution

### Cost Overruns

**Risk**: Content creation costs exceed budget
- **Mitigation**: Fixed-price contracts where possible, phased approach, prioritize MVP content

**Risk**: Ongoing content costs unsustainable
- **Mitigation**: Automation where possible, efficient workflows, community contributions (future)

---

## Success Metrics

### Content Performance Metrics

**Engagement:**
- Lesson completion rate: Target >70%
- Time spent per lesson: Within ±20% of estimated
- Vocabulary review frequency: 2+ sessions per week per user

**Learning Outcomes:**
- Vocabulary retention: >85% after 30 days
- Test scores improving over time
- User progression: A1→A2 in 3-4 months (daily use)

**Quality:**
- User-reported errors: <1% per lesson
- Content quality rating: >4.5/5
- Audio quality rating: >4.5/5
- Image relevance rating: >4.0/5

**Efficiency:**
- Content creation time: <15 hours per A1-A2 lesson
- Review turnaround: <10 business days
- Cost per lesson: <$600 (average)

---

## Appendix

### Content Creation Templates

- Lesson Template (JSON schema)
- Vocabulary Entry Template
- Grammar Explanation Template
- Exercise Type Specifications
- Audio Recording Script Template
- Image Requirements Checklist

### Style Guides

- Polish Language Style Guide
- Russian Translation Style Guide
- English Translation Style Guide
- Visual Design Style Guide
- Audio Production Guidelines

### Vendor Contact List

- Polish translation agencies
- Voice actors and studios (Warsaw, Kraków)
- Illustration and design agencies
- Stock photo services
- Content management system providers

### Reference Materials

- CEFR Framework Documentation
- Polish Language Exam Specifications (B1, B2, C1)
- Polish National Corpus Resources
- Frequency Lists and Word Statistics
- Pedagogical Research on Language Acquisition

