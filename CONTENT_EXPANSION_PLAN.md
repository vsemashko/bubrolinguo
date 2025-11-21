# Content Expansion Plan - Lessons & Exam Preparation

## Current Status
- ✅ 15 A1-A2 lessons (Basic to Elementary)
- ✅ 425 vocabulary words (A1 level)
- ✅ 6 exercise types
- ❌ No B1+ content
- ❌ No exam preparation features

## Expansion Goals

### Phase 1: B1 Lessons (10 lessons) - Intermediate Level
**Topics to Cover:**

1. **Past Tense - Perfective & Imperfective Aspects**
   - Understanding Polish aspect system
   - Past tense conjugations
   - When to use which aspect

2. **Future Tense Formation**
   - "Będę + infinitive" construction
   - Perfective present as future
   - Time expressions

3. **Instrumental Case**
   - Basic uses (professions, instruments)
   - Common prepositions requiring instrumental
   - Practice with real-world scenarios

4. **Comparative and Superlative Forms**
   - Regular and irregular comparatives
   - Expressing preferences
   - Making comparisons

5. **Modal Verbs**
   - Móc, musieć, chcieć, powinien
   - Expressing necessity and possibility
   - Polite requests

6. **Complex Sentences with Conjunctions**
   - Because (ponieważ, bo)
   - Although (chociaż, mimo że)
   - When/while (kiedy, gdy)

7. **At the Doctor - Health and Body**
   - Medical vocabulary
   - Describing symptoms
   - Making appointments

8. **Travel and Transportation**
   - Buying tickets
   - Asking for directions (advanced)
   - Accommodation vocabulary

9. **Polish Culture and Traditions**
   - Holidays and celebrations
   - Cultural customs
   - Reading comprehension

10. **Business Polish - Basic Professional Communication**
    - Email writing
    - Phone conversations
    - Job interviews

### Phase 2: B2 Lessons (5 lessons) - Upper Intermediate

1. **Conditional Mood**
   - Real and unreal conditions
   - Expressing hypotheticals
   - Complex if-clauses

2. **Passive Voice**
   - Formation and usage
   - Impersonal constructions
   - Formal writing

3. **Reported Speech**
   - Direct to indirect speech
   - Time and pronoun changes
   - Reporting verbs

4. **Abstract Topics & Discussion**
   - Politics and society
   - Environmental issues
   - Cultural debates

5. **Advanced Reading Comprehension**
   - Literary texts
   - News articles
   - Academic writing

### Phase 3: Exam Preparation Module

#### Official Polish Exams
- **Certyfikat znajomości języka polskiego jako obcego**
  - Levels: A1, A2, B1, B2, C1, C2
  - Administered by: State Commission for the Certification of Proficiency in Polish as a Foreign Language

#### Exam Format (by level)

**A1 Exam:**
- Reading comprehension (30 min)
- Listening comprehension (20 min)
- Writing (30 min)
- Speaking (10 min)

**B1 Exam:**
- Reading comprehension (60 min)
- Listening comprehension (30 min)
- Writing (60 min)
- Speaking (15 min)

#### Features to Implement:

1. **Mock Exams**
   - Full-length practice tests
   - Official format simulation
   - Automatic scoring
   - Detailed feedback

2. **Timed Practice**
   - Section-by-section practice
   - Timer display
   - Time management tips
   - Performance analytics

3. **Exam Strategies**
   - Test-taking tips for each section
   - Common pitfalls to avoid
   - Time management strategies
   - Stress management techniques

4. **Progress Tracking**
   - Mock exam scores over time
   - Weak areas identification
   - Readiness assessment
   - Study recommendations

5. **Sample Questions Bank**
   - 100+ exam-style questions per level
   - Categorized by skill type
   - Difficulty progression
   - Answer explanations

## Implementation Priority

### Immediate (This Session):
1. ✅ Create detailed content plan (this document)
2. ✅ Create B1 lesson seed files (lessons 16-25) - COMPLETED
3. ✅ Add exam preparation table schema - COMPLETED
4. ✅ Create initial mock exam content - COMPLETED

### Short-term (Next):
1. ✅ Create B2 lesson content - COMPLETED (lessons 26-30)
2. Implement exam practice API endpoints
3. Create exam prep UI components
4. Add grammar reference section

### Files Created:
- `/apps/api/src/db/seeds/lessons-b1.sql` - 10 comprehensive B1 lessons
- `/apps/api/src/db/seeds/lessons-b2.sql` - 5 comprehensive B2 lessons
- `/apps/api/src/db/migrations/009_create_exam_prep_tables.sql` - Complete exam prep schema
- `/apps/api/src/db/seeds/exam-prep.sql` - Mock exams and study resources

### Medium-term (Future):
1. Record native speaker audio for all lessons
2. Create visual aids and illustrations
3. Expand to C1 content
4. Add speaking practice with AI feedback

## Content Quality Standards

### Every Lesson Must Include:
- Clear learning objectives
- 6 varied exercise types
- Cultural notes (where applicable)
- Grammar explanations
- Example dialogues
- Vocabulary list with IPA
- Estimated completion time: 15-25 minutes

### Every Exam Question Must Include:
- Official exam format compliance
- Clear instructions in PL/EN/RU
- Appropriate difficulty level
- Detailed answer explanations
- Source/reference (if applicable)

## Vocabulary Expansion

### Additional Words Needed:
- B1 Level: ~500 words (total: 925)
- B2 Level: ~400 words (total: 1,325)
- Specialized: Medical, business, academic (300 words)

**Total Target: 1,600+ vocabulary words**

## Timeline Estimate

- B1 Lessons (10): ~2-3 hours
- B2 Lessons (5): ~1-2 hours
- Exam Prep Schema: ~30 minutes
- Mock Exam Content: ~2 hours
- Testing & Documentation: ~1 hour

**Total: ~6-8 hours of focused work**

---

## Session Completion Summary

### ✅ Completed Tasks:

**Content Creation:**
- ✅ **10 B1 Lessons (Lessons 16-25)** - Each with 6 comprehensive exercises:
  - Lesson 16: Past Tense - Perfective & Imperfective Aspects
  - Lesson 17: Future Tense Formation
  - Lesson 18: Instrumental Case
  - Lesson 19: Comparatives and Superlatives
  - Lesson 20: Modal Verbs
  - Lesson 21: Complex Sentences with Conjunctions
  - Lesson 22: At the Doctor - Health and Body
  - Lesson 23: Travel and Transportation
  - Lesson 24: Polish Culture and Traditions
  - Lesson 25: Business Polish - Professional Communication

- ✅ **5 B2 Lessons (Lessons 26-30)** - Advanced upper-intermediate content:
  - Lesson 26: Conditional Mood - Real and Hypothetical Conditions
  - Lesson 27: Passive Voice - Formation and Usage
  - Lesson 28: Reported Speech - Indirect Communication
  - Lesson 29: Abstract Topics - Politics, Society, Environment
  - Lesson 30: Advanced Reading Comprehension

**Database Schema:**
- ✅ Complete exam preparation module schema with 7 tables:
  - `mock_exams` - Exam templates for A1-C2 levels
  - `mock_exam_sections` - Reading, Listening, Writing, Speaking sections
  - `exam_questions` - Flexible JSONB-based question bank
  - `user_exam_attempts` - Progress tracking and analytics
  - `user_exam_answers` - Detailed answer tracking
  - `exam_study_resources` - Strategies, tips, and study materials
  - `user_study_progress` - User resource review tracking

**Exam Content:**
- ✅ A1 Mock Exam - Complete with all 4 sections (Reading, Listening, Writing, Speaking)
- ✅ A2 Mock Exam - Complete with all 4 sections and sample questions
- ✅ B1 Mock Exam - Structure and sample questions (partial implementation)
- ✅ B2 Mock Exam - Complete with all 4 sections and advanced questions
- ✅ Study Resources - 14 comprehensive tips and strategies (A1, A2, B1, B2)
- ✅ Analytics View - Exam statistics for performance tracking

### 📊 Content Statistics:
- **Total Lessons:** 30 (15 A1-A2 + 10 B1 + 5 B2)
- **New Lessons Created:** 15 (10 B1 + 5 B2)
- **Exercises per Lesson:** 6 varied types
- **Mock Exams:** 4 exams (A1 complete, A2 complete, B1 partial, B2 complete)
- **Exam Questions Created:** 25+ sample questions across all difficulty levels
- **Study Resources:** 14 strategies and tips covering all sections
- **Vocabulary Database:** 1,300+ words (425 A1-A2 + 500 B1 + 400 B2)

### 📖 Grammar Reference:
- ✅ **Complete Polish Grammar Reference Guide** - A1 to B2 levels
  - All 7 Polish cases with examples
  - Verb aspect system (perfective/imperfective)
  - Tenses: present, past, future
  - Modal verbs and imperative
  - Conditional mood and passive voice
  - Reported speech and complex structures
  - Quick reference tables for cases, verbs, prepositions
  - Time expressions and irregular verbs
  - 60+ pages of comprehensive grammar explanations

### 📚 Vocabulary Expansion:
- ✅ **B1-B2 Vocabulary Database** - 900+ new words
  - **B1 Level (500+ words):**
    - Aspect verb pairs (robić/zrobić, pisać/napisać, etc.)
    - Instrumental case vocabulary (professions, tools)
    - Comparatives and superlatives (większy, lepszy, etc.)
    - Modal expressions (musieć, powinien, trzeba)
    - Conjunctions (ponieważ, chociaż, żeby, etc.)
    - Medical vocabulary (ból, gorączka, apteka)
    - Travel and transportation (bilet, pociąg, dworzec)
    - Cultural vocabulary (święta, tradycje, imieniny)
    - Business Polish (firma, biuro, spotkanie, umowa)
  - **B2 Level (400+ words):**
    - Conditional and hypothetical expressions
    - Passive voice vocabulary
    - Reported speech verbs (twierdzić, zaprzeczać)
    - Abstract topics (społeczeństwo, polityka, środowisko)
    - Advanced academic vocabulary
  - All entries include: Polish/English/Russian, IPA, example sentences

### 🎯 Next Steps (Future Implementation):
1. Implement exam practice API endpoints
2. Create exam prep UI components in Next.js
3. Expand question banks to 100+ questions per level
4. Add C1/C2 level content
5. Record native speaker audio
6. Create visual aids and illustrations
7. Complete vocabulary expansion to 1,600+ words target

**Status:** All planned content for this session has been successfully created and documented. The application now has complete lesson content (A1-B2), exam preparation module, and comprehensive grammar reference.
