# Core Features Specification
## Bubrolinguo

**Version:** 1.0
**Last Updated:** 2025-11-21

---

## Feature Overview

This document details the core learning features of Bubrolinguo, including structured lessons, exercise types, progression systems, and gamification elements.

---

## 1. Structured Lessons System

### 1.1 Lesson Architecture

**Skill Tree Structure:**
```
Level: A1
├── Unit 1: Greetings & Introductions
│   ├── Lesson 1: Hello & Goodbye
│   ├── Lesson 2: My Name Is...
│   ├── Lesson 3: Nice to Meet You
│   └── Unit 1 Review
├── Unit 2: Basic Phrases
│   ├── Lesson 4: Yes, No, Please, Thank You
│   ├── Lesson 5: Questions & Answers
│   └── Unit 2 Review
└── Unit 3: Numbers & Time
    ├── Lesson 6: Numbers 1-20
    ├── Lesson 7: Telling Time
    └── Unit 3 Review

Level: A2
├── Unit 4: Shopping & Money
├── Unit 5: Food & Restaurants
├── Unit 6: Family & Relationships
└── ...

[Continues through B1, B2, C1]
```

**Progression Logic:**
- Units unlock sequentially
- Lessons within a unit can be accessed in order
- Must achieve 70%+ score to progress
- Can replay any completed lesson
- Reviews required after every 3-5 lessons

### 1.2 Lesson Structure

**Standard Lesson Format:**

**1. Introduction (30 seconds)**
- Character appears with greeting
- Lesson title and objectives shown
- Preview of new vocabulary (3-5 words)

**2. Teaching Phase (2-3 minutes)**
- **New Vocabulary**: 5-10 words introduced
  - Polish word shown
  - Translation (RU/EN)
  - Audio pronunciation
  - Example sentence
  - Visual aid (image)
- **Grammar Point**: 1-2 concepts introduced
  - Brief explanation in user's language
  - Examples highlighted
  - Pattern recognition
- **Tips & Notes**: Cultural or linguistic insights

**3. Practice Phase (8-12 minutes)**
- 10-15 exercises mixing multiple types
- Progressive difficulty
- Immediate feedback
- XP earned per correct answer
- Hints available (reduces XP)

**4. Review Phase (1-2 minutes)**
- Summary of learned vocabulary
- Grammar recap
- Character provides encouragement
- XP and progress displayed

**5. Lesson Complete**
- Score displayed (out of 100)
- Stars earned (1-3 based on score)
- XP awarded
- New words added to vocabulary review queue
- Option to continue or return to skill tree

### 1.3 Lesson Difficulty Calibration

**Dynamic Difficulty:**
- System tracks user performance
- If user scores <60% consistently, offer easier exercises
- If user scores >95% consistently, suggest skipping ahead or testing out
- Personalized hint thresholds

**Adaptive Learning:**
- Exercises prioritize user's weak areas
- More practice on commonly confused words
- Grammar concepts repeated in multiple contexts

---

## 2. Exercise Types

### 2.1 Translation Exercises

**Type 1: Polish → User Language**
```
Exercise: Translate to [Russian/English]
Polish: "Dzień dobry"
[User types answer]
Correct: "Добрый день" / "Good afternoon"
```

**Type 2: User Language → Polish**
```
Exercise: Translate to Polish
Russian: "Спасибо"
[User types or selects from word bank]
Correct: "Dziękuję"
```

**Features:**
- Auto-complete suggestions
- Typo tolerance (Levenshtein distance)
- Alternative correct answers accepted
- Hints: Show first letter or word bank

**Scoring:**
- Perfect answer: 10 XP
- Minor typo: 8 XP
- Used hint: 5 XP
- Incorrect: 0 XP, explanation shown

### 2.2 Multiple Choice

**Type 1: Vocabulary Recognition**
```
Question: What does "kot" mean?
Options:
○ Cat ✓
○ Dog
○ Bird
○ Fish
```

**Type 2: Sentence Completion**
```
Question: Jak się ___? (How are you?)
Options:
○ masz ✓
○ nazywasz
○ robisz
○ czujesz
```

**Features:**
- 3-4 options (one correct)
- Distractors chosen intelligently (similar words, common mistakes)
- Randomized option order
- No time limit (MVP), 30-second timer (future)

**Scoring:**
- Correct first try: 10 XP
- Correct second try: 5 XP (after seeing it's wrong)
- Three tries maximum

### 2.3 Fill in the Blank

**Type 1: Single Word**
```
Sentence: Jestem ___ Polski. (I am from Poland)
Correct: z
```

**Type 2: Multiple Blanks**
```
Sentence: ___ na ___ Jan. (My name is Jan)
Correct: Mam / imię
```

**Features:**
- Word bank provided (5-8 words, some distractors)
- Drag-and-drop or tap to fill
- Accept typed answers with typo tolerance
- Show article/gender hints if applicable

### 2.4 Listening Comprehension

**Type 1: Audio → Text Match**
```
[Audio plays: "Cześć, jak się masz?"]
Question: What did you hear?
Options:
○ Cześć, jak się masz? ✓
○ Dzień dobry, jak się masz?
○ Cześć, co u ciebie?
```

**Type 2: Audio → Translation**
```
[Audio plays: "Nazywam się Anna"]
Question: What does this mean?
[User selects or types: "My name is Anna"]
```

**Type 3: Audio → Image Match**
```
[Audio plays: "Czerwone jabłko"]
[User selects image of red apple from 4 options]
```

**Features:**
- Play/pause controls
- Playback speed adjustment (0.75x, 1x, 1.25x)
- Replay allowed (unlimited in MVP, limited in future)
- Audio transcript revealed after answering

### 2.5 Speaking Exercises

**Type 1: Pronunciation Practice**
```
Say: "Dziękuję"
[User presses microphone button and speaks]
[Speech-to-text converts to text]
[System compares with correct answer]
Feedback: "Great!" or "Try again: emphasis on 'kę'"
```

**Type 2: Sentence Building (Spoken)**
```
Translate and say: "I want coffee"
Correct: "Chcę kawę"
[User speaks, system validates]
```

**Features:**
- Visual indicator when recording
- Auto-detect speech end or manual stop
- Replay user's audio
- Accuracy score (phoneme-level comparison)
- Pronunciation tips for common mistakes

**Technical Requirements:**
- Speech-to-text API (Whisper or Google)
- Polish language model
- Confidence threshold: >75% for "correct"
- Offline fallback: Skip or manual input

**Scoring:**
- Perfect pronunciation: 15 XP (bonus for speaking)
- Good: 10 XP
- Needs improvement: 5 XP
- Can retry unlimited times

### 2.6 Sentence Building (Drag & Drop)

**Type 1: Word Order**
```
Question: I am learning Polish
Words: [uczę][się][polskiego][Jestem]
User arranges: [Uczę][się][polskiego]
Correct: "Uczę się polskiego"
```

**Type 2: Reverse (Polish → English)**
```
Given: "Lubię czytać książki"
Words: [I][like][reading][to][books][read]
User arranges: [I][like][to][read][books]
```

**Features:**
- Drag-and-drop interface
- Tap to add words (mobile-friendly)
- Extra distractor words included
- Proper capitalization handled automatically
- Punctuation provided or optional

### 2.7 Matching Exercises

**Type 1: Word Pairs**
```
Match Polish words to translations:
kot       •           • cat
pies      •           • dog
ptak      •           • bird
```

**Type 2: Images to Words**
```
Match images to Polish words:
[Image of apple]   •    • jabłko
[Image of banana]  •    • banan
[Image of orange]  •    • pomarańcza
```

**Type 3: Synonyms/Antonyms**
```
Match opposites:
duży      •           • mały
gorący    •           • zimny
szybki    •           • wolny
```

### 2.8 True/False

```
Statement: Polish has 7 grammatical cases.
○ True ✓
○ False

Statement: "Proszę" means "please" or "you're welcome"
○ True ✓
○ False
```

**Features:**
- Quick confidence check
- Used for grammar rules
- Cultural facts
- Common misconceptions

### 2.9 Dialogue Completion

**Scenario-based:**
```
Context: At a café
Character A: "Dzień dobry, co podać?"
You: ____
Options:
○ Poproszę kawę ✓
○ Dziękuję, do widzenia
○ Nie rozumiem
```

**Features:**
- Character avatars shown
- Context provided
- Natural conversation flow
- Multiple exchanges per exercise

### 2.10 Grammar Exercises

**Type 1: Case Selection**
```
Fill in the correct case:
Idę do ___ (sklep - shop)
Correct: sklepu (genitive)
```

**Type 2: Verb Conjugation**
```
Conjugate: mówić (to speak) - I speak
Correct: mówię
```

**Type 3: Gender Agreement**
```
Choose correct adjective form:
Ten dom jest ___ (duży/duża/duże - big)
Correct: duży (masculine)
```

---

## 3. Progress Tracking & User Dashboard

### 3.1 User Dashboard

**Main Dashboard Components:**

**1. Daily Goal Tracker**
```
┌─────────────────────────────────┐
│  Today's Goal: 50 XP            │
│  ████████████░░░░  (35/50)      │
│  📚 2 lessons completed          │
│  🎯 15 XP to go!                 │
└─────────────────────────────────┘
```

**2. Current Streak**
```
┌─────────────────────────────────┐
│  🔥 15-day streak!               │
│  Don't break your streak!        │
│  Come back tomorrow              │
└─────────────────────────────────┘
```

**3. Level Progress**
```
┌─────────────────────────────────┐
│  Current Level: A2               │
│  ████████████████░░░░ 75%        │
│  Total XP: 3,450                 │
│  Next level: A2+ (550 XP away)   │
└─────────────────────────────────┘
```

**4. Recent Activity**
- Last 3 completed lessons
- Recent vocabulary reviews
- Achievements earned

**5. Weak Areas**
```
Need practice:
• Genitive case (60% accuracy)
• Verb conjugation - past tense
• Numbers 20-100
[Practice Now] button
```

**6. Vocabulary Stats**
```
Total words learned: 342
Words to review today: 18
Mastery level: 68%
[Review Words] button
```

### 3.2 Detailed Statistics Page

**Learning Stats:**
- Total time spent learning
- Lessons completed by level
- Average lesson score
- Total XP earned
- Vocabulary mastered
- Streak history (calendar view)

**Performance Charts:**
- XP gained over time (line chart)
- Lesson completion rate by week
- Exercise accuracy by type
- Most practiced topics

**Achievements Gallery:**
- All unlocked achievements
- Progress toward locked achievements

### 3.3 Skill Tree Visualization

**Interactive Map:**
- Visual representation of learning path
- Units shown as nodes
- Connections show prerequisites
- Color coding:
  - Gray: Locked
  - Blue: Available
  - Green: Completed (1-3 stars)
  - Gold: Mastered (3 stars + review)
- Progress percentage per unit

---

## 4. Gamification System

### 4.1 Experience Points (XP)

**XP Earning Mechanisms:**

| Activity | XP Earned |
|----------|-----------|
| Complete lesson (70-84%) | 10 XP |
| Complete lesson (85-94%) | 15 XP |
| Complete lesson (95-100%) | 20 XP |
| Perfect lesson (100%, no hints) | 30 XP + bonus |
| Review vocabulary word (correct) | 5 XP |
| Speaking exercise (good pronunciation) | 10 XP |
| Daily goal achieved | 25 XP bonus |
| Maintain streak (7 days) | 50 XP bonus |
| Maintain streak (30 days) | 200 XP bonus |
| Complete unit review | 50 XP |
| Pass level-up test | 100 XP |

**XP Levels:**
- Levels based on cumulative XP
- Each level requires more XP than previous
- Level formula: `XP_needed = 100 * level^1.5`
- Level 1: 0 XP
- Level 2: 100 XP
- Level 3: 350 XP
- Level 10: 3,162 XP
- Level 50: 35,355 XP

**Level Benefits:**
- Unlock profile badges
- Unlock new characters
- Unlock customization options
- Leaderboard prominence

### 4.2 Streak System

**Streak Rules:**
- Streak increments when user completes at least 1 lesson or 10 vocabulary reviews per day
- Timezone: User's local timezone
- Grace period: 23:59 in user's timezone
- Streak freezes: Can purchase (with gems or premium) to protect streak for one day

**Streak Milestones:**
```
🔥 7 days: "Week Warrior" badge + 50 XP
🔥 14 days: "Fortnight Fighter" badge + 100 XP
🔥 30 days: "Monthly Master" badge + 200 XP
🔥 90 days: "Quarter Champion" badge + 500 XP
🔥 365 days: "Year Legend" badge + 1,000 XP
```

**Streak Recovery:**
- Lose streak if miss a day (without freeze)
- Option to purchase "Streak Repair" (within 24 hours, premium feature)
- Motivational notifications: "Don't lose your 15-day streak!"

### 4.3 Achievement System

**Achievement Categories:**

**1. Progress Achievements**
- "First Steps": Complete first lesson
- "A1 Complete": Finish all A1 lessons
- "Polyglot Path": Reach B1 level
- "Advanced Learner": Reach C1 level
- "Night Owl": Complete lesson after 10 PM
- "Early Bird": Complete lesson before 7 AM

**2. Vocabulary Achievements**
- "Word Collector": Learn 50 words
- "Vocabulary Master": Learn 1,000 words
- "Polyglot Pro": Learn 5,000 words
- "Etymology Expert": Learn 10,000 words
- "Perfect Review": 100 vocabulary reviews with 100% accuracy

**3. Skill Achievements**
- "Pronunciation Pro": 50 perfect speaking exercises
- "Grammar Guru": Complete all grammar exercises in a level
- "Speed Demon": Complete lesson in under 5 minutes
- "Perfectionist": Get 100% on 10 lessons in a row

**4. Consistency Achievements**
- "Dedicated": 30-day streak
- "Unstoppable": 100-day streak
- "Legend": 365-day streak
- "Daily Devotion": Complete daily goal for 7 days straight

**5. Social Achievements** (Future)
- "Social Learner": Add 10 friends
- "Helpful Friend": Help 5 friends in forums
- "Challenge Master": Win 10 friend challenges

**Achievement Display:**
- Badge icon
- Title
- Description
- Progress bar (for tiered achievements)
- Rarity indicator (common, rare, epic, legendary)
- Date earned
- Share to social media option

### 4.4 Leaderboards

**Leaderboard Types:**

**1. Global Leaderboard**
- Top 100 users by total XP
- Updated daily
- User's rank shown even if not in top 100

**2. Friends Leaderboard**
- Compare with connected friends
- Weekly XP comparison
- Friendly competition

**3. Weekly Challenge Leaderboard**
- Reset every Monday
- Based on XP earned this week
- Prizes for top 10 (profile badges, gems)

**4. Level-Specific Leaderboards**
- A1 learners, A2 learners, etc.
- Fair competition among similar skill levels

**Leaderboard Display:**
```
┌──────────────────────────────────┐
│  🏆 Weekly Leaderboard           │
├──────────────────────────────────┤
│  1. 🥇 Anna_PL    2,450 XP       │
│  2. 🥈 Jan123     2,380 XP       │
│  3. 🥉 Maria_W    2,150 XP       │
│  ...                              │
│  47. YOU          850 XP         │
└──────────────────────────────────┘
```

**Features:**
- Profile pictures
- Level indicators
- Country flags (optional)
- Click to view profile (limited info)

### 4.5 Gems & Virtual Currency (Future Phase)

**Gem Earning:**
- Daily login: 5 gems
- Complete daily goal: 10 gems
- Level up: 20 gems
- Achievements: 10-100 gems depending on rarity
- Purchase with real money (monetization)

**Gem Usage:**
- Unlock streak freeze (50 gems)
- Repair broken streak (100 gems)
- Unlock bonus lessons (50 gems)
- Customize profile (10-100 gems)
- Unlock character outfits (50 gems)
- Skip practice (not encouraged, 20 gems)

---

## 5. Onboarding Experience

### 5.1 First-Time User Flow

**Step 1: Welcome Screen**
- App branding and tagline
- "Get Started" button
- "I already have an account" link

**Step 2: Language Selection**
- "Which language do you speak?"
- Options: Russian, English
- This determines interface language

**Step 3: Goal Setting**
- "What's your goal?"
- Options:
  - Travel to Poland
  - Move to Poland for work/study
  - Connect with family/heritage
  - Personal interest
  - Other
- Sets initial motivation profile

**Step 4: Current Level Assessment**
- "Do you know any Polish?"
- Options:
  - Complete beginner (start at A1)
  - I know some basics (take placement test)
  - I'm intermediate (take placement test)
- Quick 5-10 question placement test if not beginner

**Step 5: Daily Goal**
- "How much time can you dedicate daily?"
- Options:
  - 5 minutes (Casual) - 25 XP/day goal
  - 10 minutes (Regular) - 50 XP/day goal
  - 15 minutes (Serious) - 75 XP/day goal
  - 20+ minutes (Intense) - 100 XP/day goal
- Can be adjusted later

**Step 6: Account Creation**
- Email + password
- Or sign in with Google/Apple
- Agree to terms and privacy policy

**Step 7: First Lesson Intro**
- Character appears: "Hi! I'm [Character name]. Let's start your Polish journey!"
- Interactive tutorial of how lessons work
- One simple practice exercise (translation)
- Immediate positive reinforcement

**Step 8: Enable Notifications**
- "Don't break your streak!"
- Request permission for push notifications
- Can skip

**Step 9: Complete First Lesson**
- Simplified first lesson (5-7 exercises)
- Extra encouraging feedback
- Celebration animation on completion
- Show XP earned and explain system

**Total Onboarding Time:** 3-5 minutes

### 5.2 Placement Test (for non-beginners)

**Test Structure:**
- 15-20 questions
- Progressive difficulty (A1 → C1)
- Mix of exercise types
- No time limit
- Can't skip or go back

**Question Distribution:**
- A1: 5 questions (basic vocabulary, simple phrases)
- A2: 5 questions (past tense, more vocabulary)
- B1: 5 questions (cases, complex sentences)
- B2: 3 questions (advanced grammar, idioms)
- C1: 2 questions (nuanced meaning, formal language)

**Scoring:**
- Correctly answer 80%+ of A1 → Start at A2
- Correctly answer 80%+ of A2 → Start at B1
- Etc.

**Result:**
- "Your level: [Level]"
- "We'll start you here, but you can adjust anytime"
- Show recommended starting lesson

---

## 6. Lesson Review & Testing System

### 6.1 Unit Reviews

**Trigger:** After completing all lessons in a unit

**Format:**
- 15-20 exercises covering all unit content
- Mixed exercise types
- No new content introduced
- Must score 80%+ to unlock next unit
- Can retake if score <80%

**Benefits:**
- Reinforces learning
- Identifies weak areas
- Gatekeeping to prevent progression without mastery
- Boosts XP (50 XP for passing)

### 6.2 Level-Up Tests

**Trigger:** Completed all units in a level (e.g., all A1 units)

**Format:**
- Comprehensive test (30-40 questions)
- All exercise types
- Covers entire level content
- 90-minute time limit (optional)
- Must score 75%+ to advance to next level

**Content:**
- Vocabulary from the level
- Grammar concepts
- Listening comprehension
- Speaking exercises
- Writing (short answers)

**Rewards:**
- Significant XP bonus (100-200 XP)
- Level badge
- Unlock next level
- Certificate (can download/share)

**Feedback:**
- Detailed breakdown by skill
- Recommendations for improvement
- Option to practice weak areas before retaking

---

## 7. Practice & Drill Modes

### 7.1 Targeted Practice

**Access:** From dashboard "Weak Areas" section

**Functionality:**
- System identifies topics/grammar with <70% accuracy
- Generate practice exercises on demand
- Personalized difficulty
- Track improvement over time

**Example Weak Areas:**
- Specific grammar rules (genitive case)
- Vocabulary topics (food, numbers)
- Exercise types (speaking, listening)

### 7.2 Quick Practice (Timed Drills)

**Mode:** Speed practice for vocabulary and basic exercises

**Format:**
- 1-2 minute rounds
- Rapid-fire questions
- Simple exercises only (multiple choice, matching)
- Streak multipliers for consecutive correct answers
- Leaderboard for high scores

**Use Case:**
- Quick review during commute
- Break the monotony of structured lessons
- Competitive element

### 7.3 Story Mode (Future Phase)

**Concept:** Narrative-driven learning

**Format:**
- Follow characters through stories
- Unlock story chapters by completing lessons
- Story choices affect dialogue and outcomes
- Practice Polish in context
- More engaging than abstract exercises

**Example:**
- Character moves to Warsaw for university
- Each chapter: Apartment hunting, first day of class, making friends, etc.
- User helps character by completing exercises

---

## 8. Accessibility Features

### 8.1 Visual Accessibility

- **High Contrast Mode**: Increase contrast for readability
- **Font Size Adjustment**: 3 size options (S, M, L)
- **Colorblind Modes**: Adjust color palette
- **Screen Reader Support**: Full ARIA labels
- **Keyboard Navigation**: Complete keyboard accessibility

### 8.2 Audio Accessibility

- **Subtitles/Captions**: All audio exercises have text option
- **Adjustable Audio Speed**: 0.5x to 2x speed
- **Visual Indicators**: For audio playing (for deaf/hard of hearing users)

### 8.3 Learning Accessibility

- **Extra Time Mode**: No time limits on exercises
- **Reduced Motion**: Minimize animations
- **Simplified Interface**: Option for clean, minimal UI
- **Dyslexia-Friendly Font**: OpenDyslexic font option

---

## 9. Offline Functionality (Phase 2+)

### 9.1 Offline Lesson Access

- Download lessons for offline use
- Pre-download audio and images
- Complete lessons without internet
- Sync progress when reconnected

### 9.2 Limitations Offline

- No AI features (explanations, conversation)
- No leaderboard updates
- No voice recognition (no STT API)
- Vocabulary reviews still work (local algorithm)

---

## 10. Social & Community Features (Phase 3+)

### 10.1 Friends System

- Connect with friends via email/username
- See friends' progress
- Compare XP and streaks
- Send encouragement messages

### 10.2 Challenges

- Create custom challenges ("Complete 5 lessons this week")
- Accept friend challenges
- Compete head-to-head
- Rewards for winners

### 10.3 Community Forums

- Ask questions
- Share tips
- Practice with others
- Moderated by native speakers

### 10.4 Study Groups

- Create or join study groups
- Group challenges and leaderboards
- Shared notes and resources
- Group chat

---

## 11. Personalization & Adaptive Learning

### 11.1 Learning Style Adaptation

**System Observes:**
- Which exercise types user performs best on
- Time spent on different content types
- Topics of interest (based on engagement)
- Optimal session length

**Adaptations:**
- Prioritize effective exercise types
- Suggest lessons matching interests
- Adjust daily goal recommendations
- Optimal notification timing

### 11.2 Difficulty Adjustment

- If user consistently scores >95%: Suggest skipping ahead or harder exercises
- If user consistently scores <60%: Slow down, offer easier variants, more hints
- Dynamic exercise selection within lessons

### 11.3 Content Recommendations

- "Based on your progress, try..."
- Suggest vocabulary topics matching interests
- Recommend grammar deep-dives for weak areas
- Suggest conversation scenarios matching goals (travel, work, etc.)

---

## 12. Cross-Platform Synchronization

### 12.1 Seamless Sync

- Real-time progress sync across devices
- Continue lesson on different device
- Vocabulary progress synced
- Settings and preferences synced

### 12.2 Conflict Resolution

- Last-write-wins for most data
- Smart merge for vocabulary reviews (take best result)
- Alert user if major conflict detected

---

## Feature Prioritization for MVP

### Must-Have (MVP - Phase 1)
✅ Structured lessons (A1-A2, 50 lessons)
✅ 6+ exercise types (translation, multiple choice, fill-in-blank, listening, speaking, matching)
✅ XP and progression system
✅ Streak tracking
✅ Basic dashboard
✅ User authentication
✅ Onboarding flow
✅ Skill tree visualization

### Should-Have (Phase 2)
- Full vocabulary system with spaced repetition
- All exercise types
- Complete B1 content
- Achievements system
- Leaderboards
- Detailed statistics
- Targeted practice

### Nice-to-Have (Phase 3)
- Story mode
- Social features (friends, challenges)
- Offline mode
- Advanced personalization
- Quick practice drills
- Community forums

---

## Success Metrics

### Engagement Metrics
- Lesson completion rate: >70%
- Average session duration: >12 minutes
- Return rate: 40% next day, 20% after 7 days
- Exercises per session: >15

### Learning Metrics
- Average lesson score: >75%
- Improvement over time: +10% score from first to last lesson in unit
- Vocabulary retention: >85% after 30 days

### User Satisfaction
- Feature rating: >4.5/5 for lessons
- NPS score: >40
- App store rating: >4.5 stars

---

## Appendix

### Exercise Type Selection Guidelines

**For vocabulary introduction:**
- Multiple choice (recognition)
- Matching (connection)
- Translation (production)

**For grammar practice:**
- Fill in the blank (application)
- Sentence building (synthesis)
- Error correction (analysis)

**For fluency development:**
- Speaking exercises (production)
- Listening comprehension (understanding)
- Dialogue completion (contextual use)

### Lesson Pacing Recommendations

**A1-A2:**
- Slower pace
- More repetition
- Simpler vocabulary
- Basic grammar only
- 10-15 minutes per lesson

**B1-B2:**
- Moderate pace
- Balanced repetition and new content
- Expanding vocabulary
- Complex grammar introduced
- 15-20 minutes per lesson

**C1:**
- Faster pace
- Minimal repetition (assumes prior knowledge)
- Advanced vocabulary and idioms
- Nuanced grammar
- 20-25 minutes per lesson

