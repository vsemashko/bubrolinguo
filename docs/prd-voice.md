# Voice Integration Strategy
## Bubrolinguo

**Version:** 1.0
**Last Updated:** 2025-11-21

---

## Overview

Voice is critical to language learning. Bubrolinguo integrates voice technology in three ways:
1. **Text-to-Speech (TTS)**: Pronunciation models for vocabulary and exercises
2. **Speech-to-Text (STT)**: User pronunciation evaluation
3. **Voice Acting**: Character voices and natural dialogue

---

## 1. Text-to-Speech (TTS) Strategy

### 1.1 Use Cases

**Primary Uses:**
- Vocabulary word pronunciation
- Example sentence audio
- Lesson exercise audio (listening comprehension)
- AI conversation responses (when in voice mode)
- Pronunciation model for speaking exercises

**Secondary Uses:**
- Grammar example audio
- Cultural content narration
- Accessibility (screen reader support)

### 1.2 TTS Provider Selection

**Evaluation Criteria:**
- Polish language quality (naturalness, accuracy)
- Voice variety (male/female, ages, regional accents)
- Cost efficiency
- API reliability and latency
- SSML support (for pronunciation control)
- Commercial licensing terms

**Provider Comparison:**

| Provider | Polish Quality | Voices | Cost (per 1M chars) | Latency | SSML Support |
|----------|----------------|---------|---------------------|---------|--------------|
| Google Cloud TTS | Excellent | 4 neural | $16 | <500ms | ✓ |
| Azure Cognitive Services | Excellent | 3 neural | $16 | <500ms | ✓ |
| Amazon Polly | Good | 2 standard | $4-16 | <500ms | ✓ |
| ElevenLabs | Excellent | Custom | $30-99 | <1s | Limited |
| OpenAI TTS | Good | 2 | $15 | <500ms | ✗ |

**Recommended Primary: Google Cloud TTS**
- Rationale: Best Polish quality, multiple voices, reliable, good pricing
- Voices: Zofia (PL-Wavenet-A), Jacek (PL-Wavenet-B), Maja (PL-Wavenet-C), Oliwier (PL-Wavenet-D)

**Backup: Azure Cognitive Services**
- Similar quality and pricing
- Failover in case of Google outages

### 1.3 Voice Mapping Strategy

**Character Voice Mapping:**
- Zofia (character) → Google "Zofia" voice (older female)
- Ania → Google "Maja" voice (younger female)
- Kasia → Google "Maja" voice (variation)
- Jakub → Google "Jacek" voice (male)
- Piotr → Google "Oliwier" voice (male, deeper)
- Staszek → Google "Jacek" voice (regional variation)

**Note:** Professional voice actors for characters (see character doc), TTS for vocabulary/exercises

### 1.4 TTS Implementation

**Architecture:**
```
Content Text
  ↓
Check cache (Redis by text hash)
  ↓ (cache miss)
Send to Google TTS API
  ↓
Receive MP3 audio
  ↓
Upload to S3/CDN
  ↓
Cache URL (90 days TTL)
  ↓
Return to client
```

**Caching Strategy:**
- Cache Key: SHA-256 hash of (text + voice + speed + SSML parameters)
- Cache Location: Redis (URL only) + S3 (audio file)
- Cache TTL: 90 days (extend on access)
- Pre-generation: Generate audio for all vocabulary words in advance

**Audio Specifications:**
- Format: MP3
- Bitrate: 48 kbps (vocabulary), 96 kbps (lessons)
- Sample Rate: 24 kHz
- Channels: Mono

**SSML Usage:**

Example for word pronunciation:
```xml
<speak>
  <prosody rate="slow">
    <phoneme alphabet="ipa" ph="d͡ʑɛŋ ˈkujɛ">Dziękuję</phoneme>
  </prosody>
</speak>
```

Example for emphasis:
```xml
<speak>
  Notice the <emphasis level="strong">accusative</emphasis> case here.
</speak>
```

**Cost Estimation:**
- 10,000 vocabulary words × 10 chars average = 100,000 chars = $0.16
- 3 example sentences each × 50 chars = 1.5M chars = $24
- Lesson audio: 250 lessons × 500 chars = 125,000 chars = $2
- **Total pre-generated**: ~$26 one-time
- **Monthly usage** (user-generated via AI): ~50,000 chars/1000 users = $0.80/month
- **Scalable**: $16 per 1M chars

### 1.5 Audio Quality Assurance

**Pre-Launch:**
- Human review of all pre-generated audio (sample 10%)
- Native speaker validation
- Pronunciation accuracy check
- Naturalness rating (>4/5)

**Post-Launch:**
- User feedback: "Report incorrect pronunciation"
- Fix reported issues by:
  - Adjust SSML
  - Use alternative voice
  - Replace with professional recording (critical words)

**Quality Metrics:**
- User-reported issues: <1% of audio
- Pronunciation accuracy: >95% (evaluated by native speakers)
- Naturalness rating: >4.0/5 (user survey)

---

## 2. Speech-to-Text (STT) Strategy

### 2.1 Use Cases

**Primary Uses:**
- Speaking exercises (pronunciation practice)
- AI conversation input
- Dictation exercises

**User Flow:**
```
1. User sees: "Say: Dziękuję"
2. User taps microphone button
3. Recording starts (visual indicator)
4. User speaks
5. Recording stops (auto or manual)
6. Audio sent to STT API
7. Transcribed text returned
8. Compare with expected text
9. Provide feedback (correct/incorrect + tips)
```

### 2.2 STT Provider Selection

**Evaluation Criteria:**
- Polish accuracy (word error rate)
- Accent robustness (non-native speakers)
- Real-time vs. batch
- Cost
- API reliability

**Provider Comparison:**

| Provider | Polish Accuracy | Accent Handling | Cost (per hour) | Latency | API Quality |
|----------|-----------------|------------------|-----------------|---------|-------------|
| Google Speech-to-Text | Excellent (WER ~5%) | Good | $1.44 | <1s | ✓✓ |
| Azure Speech Services | Excellent (WER ~5%) | Good | $1.44 | <1s | ✓✓ |
| OpenAI Whisper API | Excellent (WER ~3-5%) | Excellent | $0.36 | 1-3s | ✓✓✓ |
| Assembly AI | Good | Fair | $1.62 | <1s | ✓ |

**Recommended Primary: OpenAI Whisper API**
- Rationale: Best accuracy, excellent with accents, lower cost
- Model: whisper-1
- Supports Polish natively

**Backup: Google Speech-to-Text**
- Excellent quality, real-time capable
- Use if Whisper latency becomes issue

### 2.3 STT Implementation

**Architecture:**
```
User speaks
  ↓
Record audio (WebRTC / native)
  ↓
Audio file (WAV/WEBM)
  ↓
Send to Whisper API
  ↓
Receive transcription
  ↓
Compare with expected text
  ↓
Calculate accuracy score
  ↓
Provide feedback
```

**Audio Recording Specifications:**
- Format: WAV or WEBM (browser), M4A (iOS)
- Sample Rate: 16 kHz (sufficient for speech)
- Channels: Mono
- Max duration: 30 seconds per exercise
- Auto-silence detection: Stop after 2s silence

**Accuracy Scoring Algorithm:**

```javascript
function calculatePronunciationScore(expected, transcribed) {
  // Normalize both strings
  expected = normalize(expected); // lowercase, remove punctuation
  transcribed = normalize(transcribed);

  // Calculate Levenshtein distance
  const distance = levenshteinDistance(expected, transcribed);

  // Calculate similarity percentage
  const maxLength = Math.max(expected.length, transcribed.length);
  const similarity = (1 - distance / maxLength) * 100;

  // Score buckets
  if (similarity >= 95) return { score: "perfect", feedback: "Excellent!" };
  if (similarity >= 85) return { score: "great", feedback: "Great job!" };
  if (similarity >= 70) return { score: "good", feedback: "Good, try again for perfection!" };
  if (similarity >= 50) return { score: "ok", feedback: "Not bad, but practice this more." };
  return { score: "try_again", feedback: "Try again. Listen to the pronunciation." };
}
```

**Phoneme-Level Analysis (Future):**
- Use IPA (International Phonetic Alphabet) comparison
- Identify specific sounds user struggles with
- Provide targeted feedback: "The 'ę' sound needs work"

### 2.4 STT Cost Estimation

**Usage Assumptions:**
- Average user: 10 speaking exercises per day
- Average duration: 5 seconds per exercise
- Whisper cost: $0.006 per minute = $0.0001 per second

**Calculations:**
- Per user per day: 10 exercises × 5 seconds × $0.0001 = $0.005
- Per user per month: $0.005 × 30 = $0.15
- 10,000 active users: $1,500/month
- 50,000 active users: $7,500/month

**Cost Optimization:**
- Client-side voice activity detection (don't send silence)
- Limit exercise length (max 30s)
- Cache common phrases (optional)
- Use cheaper provider for simple validation

### 2.5 Pronunciation Feedback

**Feedback Levels:**

1. **Perfect (95-100% match)**
   - "🎉 Perfect pronunciation!"
   - Award full XP
   - Positive reinforcement animation

2. **Great (85-94% match)**
   - "✓ Great job! Almost perfect."
   - Award 90% XP
   - Show minor differences (optional)

3. **Good (70-84% match)**
   - "Good effort! Try emphasizing '[word]'."
   - Award 75% XP
   - Highlight area to improve

4. **Needs Work (50-69% match)**
   - "Let's try again. Listen carefully:"
   - Play model pronunciation
   - Award 50% XP (or allow retry)

5. **Try Again (<50% match)**
   - "Hmm, I didn't catch that. Let's listen and try again."
   - Play model pronunciation
   - No XP, free retry

**Specific Feedback Examples:**

```
User said: "Dzinkuye"
Expected: "Dziękuję"
Feedback: "Close! The 'ę' makes a nasal sound, like 'en'. Try: Dzi-en-ku-ye."
```

```
User said: "Yak she mash"
Expected: "Jak się masz"
Feedback: "Good try! 'ę' sounds like 'en'. It's: Yak shen mash."
```

### 2.6 Accessibility Considerations

**Alternative for Users Without Microphone:**
- Option to skip speaking exercises (or mark as completed)
- Provide typing alternative
- Don't penalize in progression

**Audio Quality Issues:**
- Retry mechanism (unlimited)
- Skip button (with note: "Practice pronunciation later")
- Offline mode: Skip or manual assessment

---

## 3. Professional Voice Acting

### 3.1 Content Requiring Professional Recording

**High Priority:**
- Character dialogue (300-500 lines per character)
- Lesson introductions (250 lessons)
- Common vocabulary (top 1,000 words)
- Cultural content narration
- Emotional/character-driven content

**Can Use TTS:**
- Extended vocabulary (9,000 words)
- Example sentences
- Grammar explanations
- Exercise instructions

### 3.2 Recording Production Process

**Pre-Production:**
1. Script preparation
   - Finalize all text content
   - Pronunciation guides (IPA for difficult words)
   - Emotion/tone notes
2. Voice actor casting (see Character doc)
3. Studio booking (Warsaw or Kraków)

**Production:**
1. Recording sessions
   - 2-3 hour sessions per character
   - Multiple takes per line
   - Director provides feedback
   - Immediate playback review
2. Quality control during recording
   - Check for clarity, emotion, consistency

**Post-Production:**
1. Audio editing
   - Remove noise, breaths (selectively)
   - Level normalization
   - Apply light EQ and compression
2. File export
   - Consistent loudness (LUFS -16)
   - MP3 export (128 kbps for character voices)
   - Naming convention: `character_scenario_line_001.mp3`
3. Quality assurance
   - Listen to all files
   - Check for export errors
   - Verify file integrity

**Timeline:**
- Pre-production: 2-4 weeks
- Recording (6 characters): 3-6 studio days
- Post-production: 2-3 weeks
- **Total: 7-13 weeks**

**Budget:**
- Studio + actors (see Character doc): $15,000-24,000
- Post-production: $3,000-5,000
- **Total**: $18,000-29,000

### 3.3 Voice Quality Standards

**Technical Specifications:**
- Sample Rate: 48 kHz
- Bit Depth: 24-bit (master), 16-bit (delivery)
- Format: WAV (master), MP3 (delivery)
- Bitrate: 128 kbps (character voices)
- Loudness: -16 LUFS (integrated)
- Noise Floor: < -60 dB

**Quality Criteria:**
- No background noise
- Consistent volume across files
- Natural delivery (not robotic)
- Clear enunciation
- Appropriate emotion
- Polish pronunciation accuracy: 100%

**Approval Process:**
- Director approval during recording
- Native Polish speaker review
- User testing with sample audio (5-10 users)
- Final approval by content lead

---

## 4. Audio Content Delivery

### 4.1 Content Delivery Network (CDN)

**CDN Strategy:**
- All audio hosted on CDN (CloudFront / Cloud CDN)
- Origin: S3 or Cloud Storage
- Edge caching for global low-latency delivery
- Automatic compression and format optimization

**URL Structure:**
```
https://cdn.bubrolinguo.com/audio/
  ├── vocabulary/
  │   ├── word_001.mp3
  │   └── word_002.mp3
  ├── characters/
  │   ├── zofia/
  │   │   ├── intro_01.mp3
  │   │   └── encouragement_01.mp3
  │   └── ania/
  │       └── ...
  ├── lessons/
  │   ├── lesson_001_intro.mp3
  │   └── lesson_001_exercise_01.mp3
  └── tts-generated/
      └── [hash].mp3 (cached TTS)
```

### 4.2 Client-Side Caching

**Web App:**
- Service Worker caches frequently accessed audio
- Cache vocabulary audio after first play
- Cache character voices
- Cache strategy: Cache-first with network fallback

**Mobile App:**
- Download audio on WiFi
- Cache in app storage
- Allow manual cache clearing (storage management)
- Pre-download option for offline mode

### 4.3 Adaptive Audio Quality

**Dynamic Bitrate:**
- Detect user's connection speed
- Serve appropriate quality:
  - Fast connection: 128 kbps
  - Medium connection: 96 kbps
  - Slow connection: 48 kbps
- Vocabulary: Always 48 kbps (small, efficient)

**Format Selection:**
- Modern browsers: Opus (better compression)
- Fallback: MP3 (universal support)

---

## 5. Accessibility Features

### 5.1 Audio Accessibility

**Visual Indicators:**
- Waveform animation while audio plays
- Text highlights (karaoke-style for longer audio)
- Captions/subtitles always available
- Deaf/hard of hearing mode (no required audio exercises)

**Controls:**
- Play/pause buttons
- Playback speed: 0.5x, 0.75x, 1x, 1.25x, 1.5x
- Volume control
- Loop/repeat option

### 5.2 Alternative Modes

**Text-Only Mode:**
- Option to disable all audio
- All content available as text
- Speaking exercises become typing exercises
- Full functionality without audio

**Screen Reader Support:**
- ARIA labels for all audio controls
- Announce when audio playing
- Keyboard controls for audio playback

---

## 6. Voice Technology Roadmap

### Phase 1 (MVP):
- ✅ TTS for vocabulary words (1,000)
- ✅ Basic STT for speaking exercises
- ✅ Professional voices for 2 characters (Zofia, Ania)
- ✅ Simple pronunciation feedback

### Phase 2:
- ✅ TTS for all vocabulary (10,000)
- ✅ Professional voices for 4 characters (add Jakub, Kasia)
- ✅ Improved pronunciation feedback
- ✅ AI conversation with voice I/O

### Phase 3:
- ✅ Professional voices for all 6 characters
- ✅ Phoneme-level pronunciation analysis
- ✅ Custom TTS voices (ElevenLabs for characters)
- ✅ Offline TTS (on-device for mobile)

### Future:
- Voice cloning for personalized characters
- Dialect variations (Warsaw vs. Kraków accent)
- Singing/music for learning
- Peer voice chat (live conversation practice)

---

## 7. Voice Quality Metrics

### TTS Quality:
- Pronunciation accuracy: >95% (native speaker validation)
- Naturalness: >4.0/5 (user rating)
- User preference: >80% prefer with audio vs. text-only
- Error rate: <1% reported pronunciation issues

### STT Quality:
- Recognition accuracy: >85% for non-native speakers
- User satisfaction: >4.0/5
- Exercise completion rate: >70% for speaking exercises
- Retry rate: <30% (users retry to improve, not due to errors)

### Professional Voice Acting:
- Character likability: >4.5/5
- Voice appropriateness: >4.5/5
- Audio quality: >4.5/5
- Consistency: No reported issues

### Performance:
- Audio load time: <1 second (p95)
- STT processing time: <2 seconds
- TTS generation time: <1 second (cached), <3 seconds (new)

---

## 8. Risk Mitigation

### Technical Risks:

**Risk: TTS/STT API outage**
- Mitigation: Fallback provider configured
- Mitigation: Pre-generated audio cached
- Mitigation: Graceful degradation (text-only mode)

**Risk: Poor audio quality affects learning**
- Mitigation: Multi-stage QA process
- Mitigation: User feedback mechanism
- Mitigation: Rapid fix and redeploy for issues

**Risk: STT inaccurate for non-native speakers**
- Mitigation: Choose accent-robust model (Whisper)
- Mitigation: Generous scoring (85% threshold)
- Mitigation: Allow unlimited retries
- Mitigation: Option to skip speaking exercises

### Cost Risks:

**Risk: Voice API costs exceed budget**
- Mitigation: Aggressive caching (90%+ hit rate)
- Mitigation: Usage limits per user
- Mitigation: Switch to cheaper provider if needed

**Risk: Professional recording over budget**
- Mitigation: Fixed-price contracts
- Mitigation: Phased recording (2 characters MVP, expand later)

---

## Appendix

### A. Audio File Naming Convention

```
Format: {category}_{identifier}_{variation}.mp3

Examples:
- vocab_0001_normal.mp3 (vocabulary word #1, normal speed)
- vocab_0001_slow.mp3 (vocabulary word #1, slow speed)
- char_zofia_intro_01.mp3 (Zofia, intro line #1)
- lesson_a1_01_intro.mp3 (A1 lesson 1, intro audio)
- exercise_a1_01_q01.mp3 (A1 lesson 1, exercise question 1)
```

### B. Polish Pronunciation Guide

**Challenging Sounds for Non-Native Speakers:**
- ą, ę (nasal vowels)
- ć, ś, ź, ń (soft consonants)
- cz, sz, rz, dż (hard consonants)
- ł (pronounced like English 'w')

**IPA Pronunciation Resources:**
- Use IPA for pronunciation guides
- SSML phoneme tags for TTS accuracy
- Pronunciation tips in lesson content

### C. Voice Technology Vendors

**TTS Providers:**
- Google Cloud TTS: cloud.google.com/text-to-speech
- Azure Cognitive Services: azure.microsoft.com/en-us/services/cognitive-services/text-to-speech
- OpenAI TTS: platform.openai.com/docs/guides/text-to-speech
- ElevenLabs: elevenlabs.io

**STT Providers:**
- OpenAI Whisper: platform.openai.com/docs/guides/speech-to-text
- Google Speech-to-Text: cloud.google.com/speech-to-text
- Azure Speech Services: azure.microsoft.com/en-us/services/cognitive-services/speech-to-text

**Recording Studios (Poland):**
- Warsaw: Studio S4, Hansa Studio
- Kraków: Studio A4, Soundrive Studio
- Remote direction via Source-Connect

