# Vocabulary System Specification
## Bubrolinguo

**Version:** 1.0
**Last Updated:** 2025-11-21

---

## Overview

The vocabulary system is a core pillar of Bubrolinguo, complementing structured lessons with dedicated word learning. With 10,000 words covering A1-C1 levels, the system uses spaced repetition, topical organization, and rich multimedia content to maximize retention.

---

## 1. Vocabulary Database Structure

### 1.1 Word Entry Schema

```json
{
  "id": "uuid",
  "polish_word": "dzień dobry",
  "word_base_form": "dzień dobry",
  "part_of_speech": "phrase",
  "level": "A1",
  "frequency_rank": 42,
  "topics": ["greetings", "daily_life", "formality"],

  "translations": {
    "russian": "добрый день",
    "english": "good morning/good afternoon"
  },

  "grammar_info": {
    "gender": null,
    "plural_form": null,
    "case_forms": null,
    "conjugations": null,
    "aspect": null
  },

  "examples": [
    {
      "polish": "Dzień dobry, jak się masz?",
      "russian": "Добрый день, как дела?",
      "english": "Good afternoon, how are you?",
      "audio_url": "/audio/examples/ex_001.mp3",
      "context": "formal greeting"
    }
  ],

  "related_words": {
    "synonyms": ["cześć (informal)", "witam"],
    "antonyms": ["do widzenia"],
    "word_family": ["dzień", "dobry"]
  },

  "mnemonics": {
    "russian": "Звучит похоже на 'джин добрый'",
    "english": "Sounds like 'gin dobry'"
  },

  "usage_notes": "Formal greeting used from morning until evening",

  "media": {
    "audio_url": "/audio/vocab/word_001.mp3",
    "audio_slow_url": "/audio/vocab/word_001_slow.mp3",
    "image_url": "/images/vocab/word_001.jpg"
  },

  "metadata": {
    "created_at": "2025-01-15",
    "updated_at": "2025-01-15",
    "source": "polish_national_corpus",
    "verified_by": "native_speaker_id",
    "difficulty_score": 1.2
  }
}
```

### 1.2 Word Categorization

**By Level (CEFR):**
- A1: 800 words (survival Polish)
- A2: 1,200 words (basic conversations)
- B1: 2,000 words (independent user)
- B2: 3,000 words (confident user)
- C1: 3,000 words (proficient user)
- **Total: 10,000 words**

**By Frequency:**
- Top 100: Highest priority (must know)
- Top 1,000: Core vocabulary
- Top 3,000: Common vocabulary (featured)
- 3,000-10,000: Extended vocabulary

**By Topic (30+ topics):**
- Greetings & Introductions
- Numbers & Time
- Food & Dining
- Shopping & Money
- Travel & Transportation
- Family & Relationships
- Work & Career
- Education & Learning
- Health & Body
- Home & Living
- Clothing & Fashion
- Weather & Seasons
- Sports & Hobbies
- Technology & Internet
- Culture & Arts
- Nature & Environment
- Government & Society
- Business & Economics
- Science & Medicine
- Legal & Administrative
- Emotions & Feelings
- Abstract Concepts
- Idioms & Expressions

**By Part of Speech:**
- Nouns (40%)
- Verbs (30%)
- Adjectives (15%)
- Adverbs (5%)
- Phrases (5%)
- Other (5%)

---

## 2. Spaced Repetition System

### 2.1 Algorithm Overview

Based on **SM-2 (SuperMemo 2)** algorithm with modifications for language learning.

**Core Concept:**
- Show words right before you're about to forget them
- Correctly recalled words: Interval increases
- Incorrectly recalled words: Interval resets

### 2.2 Algorithm Details

**Parameters per Word:**
```javascript
{
  user_id: uuid,
  vocabulary_id: uuid,
  easiness_factor: 2.5,        // 1.3 to 2.5
  interval: 0,                 // days until next review
  repetitions: 0,              // number of successful reviews
  next_review_date: Date,
  last_reviewed_date: Date,
  review_history: [],
  success_rate: 0.0            // overall success percentage
}
```

**Review Algorithm:**

```javascript
function calculateNextReview(quality, previousData) {
  // quality: 0-5 scale
  // 5 = perfect recall, immediate
  // 4 = correct, some hesitation
  // 3 = correct, difficult
  // 2 = incorrect, remembered with hint
  // 1 = incorrect, didn't remember
  // 0 = complete blank

  let { easiness_factor, interval, repetitions } = previousData;

  // Update easiness factor
  easiness_factor = easiness_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  easiness_factor = Math.max(1.3, Math.min(2.5, easiness_factor));

  // Update interval based on quality
  if (quality < 3) {
    // Incorrect: Reset
    repetitions = 0;
    interval = 1;
  } else {
    // Correct: Increase interval
    repetitions++;
    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 6;
    } else {
      interval = Math.round(interval * easiness_factor);
    }
  }

  // Calculate next review date
  const next_review_date = new Date();
  next_review_date.setDate(next_review_date.getDate() + interval);

  return {
    easiness_factor,
    interval,
    repetitions,
    next_review_date
  };
}
```

**Modifications for Language Learning:**

1. **First Review**: Always 1 day (instead of immediate)
   - Rationale: Sleep consolidation important for memory

2. **Initial Learning**: 1 day → 6 days → exponential
   - Rationale: Quick reinforcement in first week

3. **Difficulty Adjustment**: Based on word complexity
   - Complex grammar (cases, aspects): Shorter initial intervals
   - Cognates (similar to Russian/English): Longer intervals

4. **Context Bonus**: If word seen in lesson recently, easier recall expected

### 2.3 Review Queue Management

**Daily Review Queue:**
- Pull all words where `next_review_date <= today`
- Sort by:
  1. Overdue words first (oldest first)
  2. Words from active lessons (contextual reinforcement)
  3. New words (not yet reviewed)
- Limit: 20-50 words per session (user configurable)

**Review Session Structure:**
1. Show word count: "18 words to review"
2. Review words one by one
3. Progress bar
4. Breaks after every 10 words (optional)
5. Summary at end: Success rate, words mastered, next session

**Review Types:**
- **Recognition**: See Polish, recall meaning (easier)
- **Production**: See Russian/English, recall Polish (harder)
- **Listening**: Hear word, recall meaning
- **Sentence**: Word in context, fill in blank

Mix review types for comprehensive recall.

### 2.4 Word Mastery Levels

**Mastery Levels:**
1. **New**: Not yet reviewed (0 reviews)
2. **Learning**: 1-5 successful reviews, interval <30 days
3. **Familiar**: 6-10 successful reviews, interval 30-90 days
4. **Mastered**: 11+ successful reviews, interval >90 days
5. **Expert**: 20+ reviews, 90%+ success rate, interval >180 days

**Visual Indicators:**
- Color-coded progress bars
- Stars or badges for mastery
- "Words Mastered" counter on dashboard

---

## 3. Learning Modes

### 3.1 Mode 1: Spaced Repetition (Core)

**Description:** Review words at optimal intervals

**User Flow:**
```
1. User clicks "Review Words" (18 due)
2. Card shows Polish word + audio
3. User thinks of meaning
4. User reveals answer
5. User rates recall (Again / Hard / Good / Easy)
6. Next card
7. After 18 cards, show summary
```

**Card Format (Front):**
```
┌─────────────────────────────┐
│  🔊 Dziękuję                 │
│  [Play Audio]                │
│                             │
│  [Show Answer]               │
└─────────────────────────────┘
```

**Card Format (Back):**
```
┌─────────────────────────────┐
│  🔊 Dziękuję                 │
│  [Play Audio]                │
│                             │
│  Thank you / Спасибо         │
│                             │
│  Example:                   │
│  "Dziękuję za pomoc"        │
│  (Thank you for help)        │
│                             │
│  How well did you know it?   │
│  [Again] [Hard] [Good] [Easy]│
└─────────────────────────────┘
```

**Scoring:**
- Again (1): Show again soon (10 min later in same session)
- Hard (3): Show again tomorrow
- Good (4): Use standard algorithm
- Easy (5): Skip ahead (interval × 2)

### 3.2 Mode 2: Learn New Words

**Description:** Introduce new words before adding to review queue

**User Flow:**
```
1. User selects "Learn New Words"
2. Choose: By topic / By frequency / Next in level
3. Select 10-20 new words
4. Introduction phase:
   - Show word + translation + audio + image + example
   - User studies
5. Practice phase:
   - Quick tests (multiple choice, matching)
   - Immediate feedback
6. Words added to review queue (due tomorrow)
```

**Introduction Card:**
```
┌─────────────────────────────┐
│  Polish Word                │
│  🔊 Dziękuję                 │
│                             │
│  Translation                │
│  Thank you / Спасибо         │
│                             │
│  [Image of someone saying   │
│   thank you]                │
│                             │
│  Example:                   │
│  "Dziękuję bardzo!"         │
│  (Thank you very much!)      │
│                             │
│  Usage Note:                │
│  Formal and informal, most  │
│  common way to say thanks.   │
│                             │
│  [Next Word]                 │
└─────────────────────────────┘
```

### 3.3 Mode 3: Topical Learning

**Description:** Learn words by theme/topic

**Topics Available:**
- At a Restaurant
- At the Airport
- Shopping for Groceries
- At the Doctor
- Job Interview
- Making Friends
- Renting an Apartment
- Etc. (30+ topics)

**User Flow:**
```
1. User browses topics
2. Select "At a Restaurant" (25 words)
3. Introduction: All 25 words shown with context
4. Scenario practice: Dialogue using words
5. Practice exercises: Matching, fill-in-blank
6. Words added to review queue
```

**Benefits:**
- Contextual learning (words related to each other)
- Practical, immediately useful
- Story/scenario makes memorable

### 3.4 Mode 4: Popular Words (3,000 Most Common)

**Description:** Focused track on most common Polish words

**User Flow:**
```
1. User selects "Learn Popular Words"
2. Shows progress: 342 / 3,000 learned
3. Next batch: Words 343-360 (18 words)
4. Learn and practice
5. Track progress toward 3,000 milestone
```

**Gamification:**
- Milestones: 100, 500, 1,000, 2,000, 3,000 words
- Badges for each milestone
- Leaderboard: Who's learned most popular words?

### 3.5 Mode 5: Challenge Mode (Future)

**Description:** Time-based vocabulary challenges

**Examples:**
- Speed Review: 50 words in 5 minutes
- Accuracy Challenge: 20 words, must get all correct
- Listening Challenge: Audio only, type the word

---

## 4. Vocabulary Practice Exercises

### 4.1 Flashcard Review
- Traditional SRS flashcards
- Polish → Translation or reverse

### 4.2 Multiple Choice
```
Question: What does "kot" mean?
○ Cat ✓
○ Dog
○ Bird
○ House
```

### 4.3 Type the Word
```
Translation: Cat
Type in Polish: [______]
Correct: kot
```

### 4.4 Listening
```
[Audio plays: "kot"]
What word did you hear?
[______]
Correct: kot
```

### 4.5 Sentence Fill-in
```
Mam ___. (I have a cat)
[Word bank: kot, pies, dom, auto]
Correct: kota (accusative)
```

### 4.6 Matching
```
Match Polish words to images:
kot   → [Image of cat] ✓
pies  → [Image of dog] ✓
ptak  → [Image of bird] ✓
```

### 4.7 Image Selection
```
Which image represents "dom"?
[Image A: House] ✓
[Image B: Car]
[Image C: Cat]
[Image D: Tree]
```

---

## 5. Vocabulary Dashboard

### 5.1 Main Dashboard Widgets

**1. Review Counter**
```
┌─────────────────────────┐
│  18 words to review     │
│  [Review Now]           │
└─────────────────────────┘
```

**2. Progress Overview**
```
┌─────────────────────────┐
│  Total Words: 342       │
│  Mastered: 156          │
│  Learning: 124          │
│  New: 62                │
│                         │
│  ████████░░░░ 45%       │
│                         │
│  Next Milestone: 500    │
└─────────────────────────┘
```

**3. Popular Words Progress**
```
┌─────────────────────────┐
│  Popular Words          │
│  342 / 3,000            │
│  ███░░░░░░░ 11%         │
│  [Continue Learning]    │
└─────────────────────────┘
```

**4. Topics Progress**
```
┌─────────────────────────┐
│  Topics Completed       │
│  ✓ Greetings            │
│  ✓ Numbers              │
│  ◐ Food & Dining (65%)  │
│  ○ Travel               │
│  [Browse Topics]        │
└─────────────────────────┘
```

### 5.2 Detailed Statistics Page

**Vocabulary Stats:**
- Total words learned: 342
- Words reviewed today: 18
- Current streak: 5 days
- Total reviews: 1,247
- Average success rate: 78%
- Fastest growing words: [list]
- Struggling words: [list]

**Charts:**
- Words learned over time (line chart)
- Success rate by topic (bar chart)
- Review heatmap (calendar view)
- Mastery distribution (pie chart)

**Word List:**
- Searchable list of all words
- Filter by: Level, topic, mastery, due date
- Sort by: Alphabetical, frequency, date learned
- Click word to see details

---

## 6. Word Detail Page

**Word: Dziękuję**

**Sections:**
1. **Overview**
   - Polish word (with audio)
   - Translations (RU/EN)
   - Part of speech
   - Level (A1)
   - Frequency rank (#42)

2. **Pronunciation**
   - Audio (normal speed)
   - Audio (slow speed)
   - IPA: [d͡ʑɛŋˈkujɛ]
   - Pronunciation tip: "Emphasis on second syllable"

3. **Grammar Info**
   - Word family: dziękować (verb - to thank)
   - Related forms: dziękuję, dziękujesz, dziękuje...
   - Usage notes

4. **Examples** (3-5)
   - Dziękuję bardzo! (Thank you very much!)
   - Dziękuję za pomoc. (Thank you for help.)
   - Context audio for each

5. **Visual**
   - Image representing the word

6. **Related Words**
   - Synonyms: proszę (when replying to thanks)
   - Antonyms: proszę (please, in other context)
   - Word family: dziękować, podziękowanie

7. **Your Progress**
   - Times reviewed: 8
   - Success rate: 87%
   - Last reviewed: 2 days ago
   - Next review: in 4 days
   - Mastery level: Familiar ⭐⭐⭐

**Actions:**
- [Practice Now]
- [Add to Favorites]
- [Report Error]

---

## 7. Vocabulary Integration with Lessons

### 7.1 Lesson-Vocabulary Sync

**When User Completes Lesson:**
- Extract target vocabulary from lesson
- Check if words already in user's vocabulary
- If new: Add to vocabulary queue (review in 1 day)
- If existing: Reinforce (bonus review)

**Benefits:**
- Words learned in context (lesson) reinforced separately
- Double encoding: Contextual + isolated practice

### 7.2 Vocabulary Preview

**Before Lesson:**
- Option: "Preview lesson vocabulary" (3-5 min)
- Show new words with translations
- Quick practice
- Makes lesson easier and more comprehensible

### 7.3 Vocabulary Review in Lessons

**During Lesson:**
- If lesson uses word user learned in vocabulary, highlight it
- "You know this word! 👍"
- Positive reinforcement

---

## 8. Advanced Features (Phase 2-3)

### 8.1 Custom Vocabulary Lists

**User-Created Lists:**
- Create custom lists (e.g., "Words for my job interview")
- Add words from dictionary or lessons
- Practice custom lists separately
- Share lists with friends (optional)

### 8.2 Word of the Day

**Daily Feature:**
- Every day, one interesting word highlighted
- Notification: "Today's word: Szczęście (happiness)"
- Mini-lesson about the word
- Usage in cultural context

### 8.3 Vocabulary Challenges

**Weekly Challenges:**
- "Learn 50 new words this week"
- "Review 100 words with 90%+ accuracy"
- Rewards: Badges, XP, leaderboard position

### 8.4 Contextual Vocabulary (AI-Enhanced)

**AI-Generated Sentences:**
- Generate example sentences using user's interests
- User interested in football → football-related examples
- Personalized and engaging

### 8.5 Collocations & Idioms

**Beyond Single Words:**
- Teach common word combinations
- "Dzień dobry" (good morning) as unit
- Idioms: "Mieć muchy w nosie" (to be in bad mood)
- Phrasal verb equivalents

---

## 9. Vocabulary Content Quality

### 9.1 Content Standards

**Every Word Must Have:**
- ✅ Accurate Polish spelling
- ✅ Accurate translations (RU + EN)
- ✅ At least 2 example sentences
- ✅ Audio (native speaker or high-quality TTS)
- ✅ Image (for nouns, verbs, concrete concepts)
- ✅ Grammar info (where applicable)
- ✅ Level assignment (A1-C1)

**Nice to Have:**
- Mnemonics (memory aids)
- Usage notes (formal/informal, regional)
- Etymology (word origin)
- Cultural context

### 9.2 Quality Assurance Process

**Word Entry QA:**
1. Linguistic review (native speaker)
2. Translation accuracy check
3. Example sentence validation
4. Audio quality check
5. Image appropriateness
6. User testing (sample 100 words)

**Ongoing Quality:**
- User reporting: "Report error"
- Regular audits (quarterly)
- Update based on feedback

---

## 10. Vocabulary Monetization

### 10.1 Free vs. Premium

**Free Tier:**
- Access to 1,000 most common words
- Basic spaced repetition
- 20 reviews per day limit
- Ads (optional, non-intrusive)

**Premium Tier:**
- All 10,000 words
- Unlimited reviews
- No ads
- Offline vocabulary
- Advanced statistics
- Custom lists

### 10.2 Vocabulary as Value Proposition

**Why Upgrade:**
- "Unlock 9,000 more words to reach C1 level"
- "Unlimited vocabulary reviews"
- "Downloadable word lists for offline study"

---

## 11. Success Metrics

### 11.1 Engagement Metrics
- Daily review completion rate: >70%
- Average reviews per user per day: 15-30
- Vocabulary feature usage: >60% of users
- Time spent in vocabulary mode: 10+ min per session

### 11.2 Learning Outcomes
- Vocabulary retention: >85% after 30 days
- Words reaching "Mastered" status: 40% of learned words within 6 months
- User-reported vocabulary growth: >80% feel vocabulary improved

### 11.3 Feature Adoption
- % users who try vocabulary mode: >70%
- % users who complete topical modules: >50%
- % users who reach 1,000 words: >30%
- % users who reach 3,000 words: >10%

---

## 12. Vocabulary Roadmap

### Phase 1 (MVP):
- 1,000 vocabulary words (A1-A2, top frequency)
- Basic spaced repetition
- Flashcard review mode
- Integration with lessons

### Phase 2:
- 5,000 vocabulary words (extend to B1)
- Topical learning modules (20 topics)
- Multiple review modes (matching, typing, listening)
- Popular words track (3,000)
- Detailed statistics

### Phase 3:
- 10,000 vocabulary words (complete to C1)
- AI-enhanced features (personalized examples)
- Custom vocabulary lists
- Word of the day
- Vocabulary challenges
- Advanced analytics

---

## Appendix

### A. Vocabulary Data Sources

**Primary Sources:**
- Polish National Corpus (NKJP) - frequency data
- CEFR-aligned word lists (official EU standards)
- Polish language textbooks (Hurra, Polski Krok po Kroku)
- Subtitle corpora (contemporary usage)

**Reference Materials:**
- PWN Polish dictionaries
- Polish language exam requirements (B1, B2, C1)
- Academic research on vocabulary acquisition

### B. Spaced Repetition Research

**Key Papers:**
- Ebbinghaus Forgetting Curve
- Leitner System
- SuperMemo algorithms (SM-2, SM-15)
- Research on optimal spacing for vocabulary

**Optimization Considerations:**
- Sleep consolidation effects
- Interference between similar words
- Contextual learning benefits
- Individual differences in memory

