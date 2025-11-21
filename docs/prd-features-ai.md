# AI Features Specification
## Bubrolinguo

**Version:** 1.0
**Last Updated:** 2025-11-21

---

## Overview

AI-powered features are a key differentiator for Bubrolinguo, providing personalized, contextual learning support that adapts to each user's needs. This document details the AI features, implementation approach, and quality assurance measures.

---

## 1. AI Mistake Explanations

### 1.1 Feature Description

When a user makes an error in an exercise, the system provides a personalized, contextual explanation of why the answer was incorrect and how to correct it.

### 1.2 Trigger Conditions

**When to Show AI Explanation:**
- User submits incorrect answer
- Error is not a simple typo (Levenshtein distance >2)
- Error represents grammar or vocabulary misunderstanding
- User clicks "Explain" button after seeing correction

**When NOT to Show:**
- Simple typos (show gentle correction instead)
- User hasn't attempted (no error to explain)
- Common error with pre-written explanation available (use cached version)

### 1.3 User Experience Flow

```
1. User submits incorrect answer
   ↓
2. System shows correct answer immediately
   ↓
3. "Why was I wrong? [Explain]" button appears
   ↓
4. User clicks [Explain]
   ↓
5. Loading indicator (1-3 seconds)
   ↓
6. AI explanation appears with:
   - What was wrong
   - Why it's wrong
   - Correct usage
   - Example
   - Optional: Related grammar rule link
```

### 1.4 Explanation Quality Standards

**Good AI Explanation Example:**

```
User Answer: "Ja mam kot" (I have cat)
Correct Answer: "Mam kota"

AI Explanation:
"There are two issues here:
1. In Polish, the subject pronoun 'Ja' (I) is usually omitted
   because the verb form already shows who is speaking.
2. After the verb 'mieć' (to have), the object takes the
   accusative case. 'Kot' (cat, nominative) becomes 'kota'
   (accusative).

Example: 'Mam psa' (I have a dog) - 'pies' becomes 'psa'

This is similar to how in Russian you say 'У меня есть кот',
not 'Я имею кот'."
```

**Explanation Components:**
1. **Identification**: Clearly state what was wrong
2. **Explanation**: Why it's wrong (grammar rule, vocabulary misuse)
3. **Correct Form**: How to fix it
4. **Example**: Similar sentence demonstrating correct usage
5. **Comparison** (if applicable): Relate to user's native language (RU/EN)
6. **Tone**: Encouraging, never condescending

### 1.5 Technical Implementation

**LLM Provider:** OpenAI GPT-4o-mini or Anthropic Claude 3.5 Haiku (cost-optimized)

**Prompt Template:**
```javascript
{
  "system": `You are a Polish language teacher explaining mistakes to ${user.interface_language} speakers.

  Guidelines:
  - Be encouraging and supportive
  - Explain clearly in ${user.interface_language}
  - Compare to ${user.native_language} when helpful
  - Keep explanations under 150 words
  - Use examples
  - Reference CEFR level: ${user.level}`,

  "user": `Exercise: ${exercise.instruction}
  Student wrote: "${user_answer}"
  Correct answer: "${correct_answer}"
  Grammar focus: ${lesson.grammar_focus}

  Explain the mistake in ${user.interface_language}.`
}
```

**Response Caching:**
- Hash: (exercise_id + user_answer + correct_answer)
- Cache hit: Return cached explanation immediately
- Cache miss: Generate new explanation, cache for future
- Cache TTL: 90 days
- Cache invalidation: When exercise content updated

**Cost Optimization:**
- Use cheaper model (GPT-4o-mini)
- Limit tokens: max_tokens: 300
- Cache common mistakes (90%+ hit rate expected)
- Batch processing if possible

**Estimated Costs:**
- Average explanation: ~200 tokens input + ~150 tokens output = 350 tokens
- GPT-4o-mini: ~$0.015 per 1M tokens
- Cost per explanation: ~$0.000005 (essentially free)
- With caching: 90% reduction → effectively $0.0000005 per explanation
- 1M explanations: ~$50-500 depending on cache hit rate

### 1.6 Quality Assurance

**Pre-Launch:**
- Generate explanations for 500+ common errors
- Human review by Polish teachers
- Adjust prompts based on quality issues
- A/B test different prompt templates

**Post-Launch:**
- User feedback: "Was this helpful?" (thumbs up/down)
- Flag unhelpful explanations for review
- Regular sampling and quality checks
- Update prompts based on patterns

**Fallback Strategy:**
- If AI unavailable: Show pre-written explanation for common errors
- If AI returns poor quality: Show generic grammar rule instead
- Never leave user without explanation

### 1.7 Safety & Content Filtering

**Filtering:**
- Use OpenAI Moderation API
- Block any inappropriate content
- Ensure explanations stay on-topic
- No personal information in prompts

---

## 2. AI Conversational Practice

### 2.1 Feature Description

Users can have free-form conversations in Polish with an AI tutor that adapts to their level, corrects mistakes gently, and guides the conversation naturally.

### 2.2 Conversation Scenarios

**Structured Scenarios (Phase 2):**
- At a café: Ordering food and drinks
- At a store: Shopping for clothes
- At the train station: Buying tickets
- Meeting someone new: Introductions
- At the doctor: Describing symptoms
- Job interview: Professional conversation
- Apartment hunting: Asking about rentals

**Free Conversation (Phase 3):**
- Open-ended topics
- User-selected interests
- Current events (if appropriate for level)

### 2.3 User Experience Flow

**Starting a Conversation:**
```
1. User selects "Practice Conversation"
   ↓
2. Choose scenario or "Free talk"
   ↓
3. Select difficulty (A2, B1, B2, C1)
   ↓
4. AI introduces scenario
   "Dzień dobry! Welcome to my café. What would you like?"
   ↓
5. User responds (text or voice)
   ↓
6. AI replies naturally
   ↓
7. Conversation continues (5-10 exchanges)
   ↓
8. User ends or AI wraps up naturally
   ↓
9. Summary feedback provided
```

**During Conversation:**
- User can type or speak
- AI responds conversationally
- If major error: AI gently corrects inline
  - "Ah, you mean 'chcę kawę' (I want coffee), right? So, you want coffee. What size?"
- If user struggles: AI offers hint or simplifies
- Real-time conversation, minimal latency

### 2.4 AI Conversation System Prompt

**System Prompt Template:**
```javascript
{
  "system": `You are a friendly Polish language conversation partner helping a ${user.level} learner practice.

  Your role:
  - Conduct conversation in Polish at ${user.level} level
  - Stay in character for scenario: ${scenario.description}
  - Use vocabulary appropriate for ${user.level} (refer to CEFR guidelines)
  - Speak naturally but clearly
  - If user makes grammar mistake, gently correct inline: "Ah, you mean '[correct form]'? ..."
  - If user doesn't understand, rephrase more simply
  - Ask follow-up questions to continue conversation
  - Keep responses short (2-3 sentences max)
  - Be encouraging and patient
  - After 8-10 exchanges, naturally conclude conversation
  - Respond ONLY in Polish (except for gentle corrections)

  Scenario: ${scenario.name}
  Context: ${scenario.context}
  Your character: ${scenario.ai_character}`,

  "messages": [
    // Conversation history
  ]
}
```

**Example Conversation (B1 level, Café scenario):**
```
AI: "Dzień dobry! Co mogę podać?"
User (types): "Ja chce kawa"
AI: "Ah, you mean 'Chcę kawę', right? 😊 Dobrze! Małą czy dużą?"
User: "Duża proszę"
AI: "Świetnie! Duża kawa. Czy coś jeszcze? Może ciasto?"
User: "Nie dziękuję"
AI: "W porządku. To będzie 12 złotych. Proszę usiąść, przyniosę kawę."
[Conversation continues...]
```

### 2.5 Conversation Intelligence Features

**Adaptive Difficulty:**
- Monitor user's success rate
- If user struggling (many errors, asks for help): Simplify vocabulary and sentence structure
- If user excelling: Introduce more complex grammar and vocabulary

**Context Awareness:**
- Remember conversation history
- Reference previous statements
- Maintain scenario coherence

**Error Handling:**
- Severe errors: Gently correct inline
- Minor errors: Ignore to maintain flow (correct later in summary)
- Repeated errors: Note for end-of-conversation feedback
- Complete confusion: Offer hint in user's native language

**Natural Conversation Flow:**
- Ask open-ended questions
- React to user's statements
- Show emotion/personality appropriate to scenario
- Conclude gracefully after 8-10 exchanges

### 2.6 End-of-Conversation Feedback

**Summary Provided:**
```
┌─────────────────────────────────────┐
│  Conversation Summary               │
├─────────────────────────────────────┤
│  Duration: 5 minutes                │
│  Exchanges: 10                      │
│  New words used: 8                  │
│  XP Earned: 50                      │
├─────────────────────────────────────┤
│  💪 What you did well:              │
│  • Good use of polite phrases       │
│  • Correct verb conjugations        │
│  • Natural flow                     │
├─────────────────────────────────────┤
│  📚 Areas to practice:              │
│  • Accusative case (3 errors)       │
│  • Word order in questions          │
├─────────────────────────────────────┤
│  📝 New vocabulary:                 │
│  • ciasto (cake)                    │
│  • rachunek (bill)                  │
│  • przyniosę (I will bring)         │
│                                     │
│  [Save to Vocabulary] [Try Again]   │
└─────────────────────────────────────┘
```

**Feedback Generation:**
- AI analyzes conversation transcript
- Identifies patterns (errors, strengths)
- Extracts new vocabulary
- Provides actionable advice

### 2.7 Technical Implementation

**Model Selection:**
- **Primary**: OpenAI GPT-4o (fast, conversational)
- **Alternative**: Anthropic Claude 3.5 Sonnet
- **Requirement**: Low latency (<2s response time)

**Architecture:**
```
User Input (text/voice)
  ↓
[If voice → STT conversion]
  ↓
Check for errors (local grammar check)
  ↓
Send to LLM with context
  ↓
Receive AI response
  ↓
[Optional: TTS for audio response]
  ↓
Display to user
```

**Context Management:**
- Store conversation history (last 20 messages)
- Summarize older context to save tokens
- Include scenario details in every request
- Track user's known vocabulary and grammar

**Streaming Responses:**
- Use streaming API for faster perceived response
- Show typing indicator while generating
- Display response word-by-word as received

**Cost Management:**
- Limit conversation length (10-15 exchanges)
- Optimize prompts to reduce tokens
- Cache scenario introductions
- Estimated cost per conversation: $0.01-0.05
- Budget: $1,000/month for 20,000-100,000 conversations

### 2.8 Safety & Moderation

**Content Safety:**
- Filter user input with OpenAI Moderation API
- Block inappropriate topics
- Flag abusive language
- Maintain educational context

**Conversation Guardrails:**
- AI stays in role (doesn't break character)
- AI doesn't provide personal advice
- AI redirects off-topic conversations
- AI doesn't engage with inappropriate requests

**User Reporting:**
- Report button in conversation
- Flag inappropriate AI responses
- Human review of flagged conversations
- Update prompts to prevent recurrence

### 2.9 MVP vs. Full Feature

**MVP (Phase 2):**
- 3-5 structured scenarios
- Text-based conversation only
- B1-B2 levels
- 5-8 exchanges per conversation
- Basic error correction
- Simple summary feedback

**Full Feature (Phase 3):**
- 15+ scenarios
- Free-form conversation
- A2-C1 levels
- Voice input/output
- Advanced error analysis
- Detailed feedback with grammar explanations
- Conversation history and replay

---

## 3. Personalized Learning Recommendations

### 3.1 Feature Description

AI analyzes user's learning patterns, strengths, weaknesses, and goals to provide personalized recommendations for what to study next.

### 3.2 Recommendation Types

**Lesson Recommendations:**
- "You're ready for B1! Start with 'Advanced Verb Conjugation'"
- "Based on your interests in travel, try 'At the Airport' lesson"

**Practice Recommendations:**
- "You've struggled with genitive case. Practice now?"
- "Review these 15 words before they're forgotten"

**Goal-Based Recommendations:**
- "To pass B1 exam, focus on: [grammar topics]"
- "For travel Polish, learn: [vocabulary modules]"

**Time-Based Recommendations:**
- "You usually study in the evening. Reminder set for 7 PM"
- "Quick 5-minute review? You have time now."

### 3.3 Recommendation Engine

**Data Inputs:**
- User's completed lessons and scores
- Exercise performance by type
- Vocabulary review history
- Time spent on different content
- Stated goals and interests
- Streak and engagement patterns
- Time of day most active

**Algorithm:**
1. Identify weak areas (topics with <70% accuracy)
2. Identify strong areas (topics with >90% accuracy)
3. Check vocabulary due for review (spaced repetition)
4. Consider user's stated goals
5. Factor in engagement patterns
6. Generate recommendations with priority scores
7. Present top 3 recommendations

**AI Enhancement:**
- Use LLM to generate natural language recommendations
- Explain reasoning: "I recommend this because..."
- Personalized tone and encouragement

**Example Prompt:**
```javascript
{
  "system": "You are a Polish language learning advisor. Analyze this user's progress and provide personalized recommendations.",
  "user": `User profile:
  - Level: A2
  - Goal: Move to Poland for work
  - Strengths: Vocabulary (85%), listening (80%)
  - Weaknesses: Accusative case (55%), verb conjugation (60%)
  - Recent activity: 7-day streak, 2 lessons/day average
  - Interests: Travel, food, technology

  Provide 3 specific, actionable recommendations for what to study next. Be encouraging.`
}
```

**Example Output:**
```
1. 💪 Master the Accusative Case
   You've been doing great with vocabulary, but the accusative
   case needs some practice. Try the 'Cases in Action' lesson
   - it's designed for work-related scenarios that match your goal!

2. 🗣️ Practice Polish Workplace Phrases
   Since you're moving to Poland for work, the 'Office Polish'
   module will help you sound professional. You'll build on your
   strong vocabulary skills!

3. 📚 Review These 12 Words
   These words are about to slip away - but a quick 5-minute
   review now will lock them in. Keep that 7-day streak going!
```

### 3.4 Implementation

**Phase 1 (MVP):**
- Rule-based recommendations (no AI)
- Simple logic: Weak areas + due reviews + next lesson
- Static templates

**Phase 2:**
- Add AI-generated natural language
- Personalized tone
- Context-aware recommendations

**Phase 3:**
- Advanced ML model
- Predict optimal learning path
- Predict churn risk and intervene
- Collaborate filtering (what worked for similar users)

---

## 4. Intelligent Content Generation (Future)

### 4.1 Dynamic Exercise Generation

**Concept:** AI generates new exercises based on user's level and weak areas

**Use Case:**
- User needs extra practice on specific grammar point
- Generate 10 new exercises on demand
- Ensures endless practice material

**Technical Approach:**
- Fine-tuned model on our exercise data
- Generate exercises following our templates
- Human validation for quality (sample checking)

**Risk:** Quality control challenges, cost

**Timeline:** Phase 4+

### 4.2 Personalized Example Sentences

**Concept:** Generate example sentences using user's interests

**Example:**
- User interested in football
- Instead of generic "Mam kota" (I have a cat)
- Generate "Lubię oglądać mecze piłki nożnej" (I like watching football matches)

**Implementation:**
- Modify vocabulary examples dynamically
- Use user profile to customize
- Maintain grammar correctness

**Timeline:** Phase 3+

### 4.3 AI Tutor Chat (Future)

**Concept:** Ask AI any question about Polish language

**Use Case:**
- "Why do we use genitive here?"
- "What's the difference between 'jeść' and 'zjeść'?"
- "How do I say 'I would have gone' in Polish?"

**Implementation:**
- RAG (Retrieval Augmented Generation) with our grammar content
- GPT-4 or Claude with Polish language expertise
- Provide accurate, sourced answers

**Timeline:** Phase 3+

---

## 5. AI Quality Assurance

### 5.1 Quality Metrics

**Accuracy:**
- Grammar explanations: >95% accurate (human evaluation)
- Conversation responses: >90% appropriate and helpful
- Recommendations: >80% relevant (user feedback)

**User Satisfaction:**
- "Was this helpful?" rating: >85% positive
- Feature usage rate: >50% of users try AI features
- Continued usage: >30% use regularly

**Safety:**
- Inappropriate content rate: <0.1%
- Off-topic responses: <5%
- Report rate: <1% of interactions

### 5.2 Testing Strategy

**Pre-Launch Testing:**
- Generate 1,000+ AI responses
- Human evaluation by Polish teachers
- Red team testing (try to break it)
- A/B test prompts
- Latency testing (<2s target)

**Ongoing Monitoring:**
- Sample 1% of all AI interactions daily
- Human review of flagged content
- User feedback analysis
- A/B testing new prompts
- Quarterly quality audits

### 5.3 Human-in-the-Loop

**When to Involve Humans:**
- Review flagged interactions
- Improve poor-quality responses
- Update prompts based on patterns
- Validate new features before release

**Feedback Loop:**
- User reports → Human review → Prompt update → A/B test → Deploy

---

## 6. AI Feature Comparison

| Feature | Phase | Model | Avg Cost | Latency Target | Quality Target |
|---------|-------|-------|----------|----------------|----------------|
| Mistake Explanations | 2 | GPT-4o-mini | <$0.001 | <2s | >95% accurate |
| Conversation Practice | 2-3 | GPT-4o | $0.01-0.05 | <2s | >90% appropriate |
| Recommendations | 2-3 | GPT-4o-mini | <$0.001 | <1s | >80% relevant |
| Exercise Generation | 4+ | Fine-tuned | TBD | <5s | >90% quality |
| AI Tutor Chat | 3+ | GPT-4o + RAG | $0.001-0.01 | <2s | >95% accurate |

---

## 7. Ethical Considerations

### 7.1 Transparency

- Clearly label AI-generated content
- Explain how AI is used
- Provide human alternatives when possible

### 7.2 Data Privacy

- No personal information in AI prompts
- Conversations not used for training (opt-in only)
- User can delete conversation history
- GDPR compliant

### 7.3 Bias Mitigation

- Review AI outputs for bias
- Diverse examples and scenarios
- Cultural sensitivity review
- Regular bias audits

### 7.4 Over-Reliance Prevention

- Encourage human interaction (future tutoring)
- Promote community engagement
- Balance AI and traditional exercises
- Remind users AI is supplementary tool

---

## 8. Success Metrics

### Adoption Metrics
- % of users who try AI features: Target >60%
- % of users who use AI regularly (weekly): Target >30%
- Average AI interactions per user per week: Target 5+

### Quality Metrics
- AI explanation helpfulness: >85% positive ratings
- Conversation completion rate: >80%
- Recommendation click-through rate: >40%

### Learning Outcome Metrics
- Users who use AI features: +15% retention vs. non-users
- AI conversation users: +20% speaking confidence (survey)
- AI explanation users: Faster error correction (fewer repeated mistakes)

### Cost Efficiency
- AI cost per user per month: <$0.50
- Cost as % of revenue: <10%
- ROI on AI features: >3x (user retention value vs. cost)

---

## Appendix

### A. Example Prompts

**Mistake Explanation Prompt (Full):**
```
System: You are an expert Polish language teacher explaining mistakes to English speakers learning Polish at the A2 level. Your explanations should be:
- Clear and concise (under 150 words)
- Encouraging and supportive
- Comparative when helpful (relate to English grammar)
- Practical with examples

User: Exercise: "Translate to Polish: I have a cat"
Student wrote: "Ja mam kot"
Correct answer: "Mam kota"
Grammar focus: Accusative case, verb 'mieć'

Explain the mistake in English.