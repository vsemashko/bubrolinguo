/**
 * Audio Service
 *
 * Handles text-to-speech pronunciation for Polish vocabulary and sentences.
 * Uses Web Speech API with fallback to Google TTS API.
 */

// Cache for audio elements to avoid recreating them
const audioCache = new Map<string, HTMLAudioElement>();

/**
 * Play Polish text using text-to-speech
 */
export async function playPolishAudio(text: string, speed: number = 1.0): Promise<void> {
  try {
    // Try Web Speech API first (free, works offline)
    if ('speechSynthesis' in window) {
      return playWithWebSpeech(text, speed);
    }

    // Fallback to Google TTS API (requires internet)
    return playWithGoogleTTS(text, speed);
  } catch (_error) {
    console.error('Failed to play audio:', error);
    throw new Error('Audio playback failed');
  }
}

/**
 * Play audio using Web Speech API (browser built-in)
 */
function playWithWebSpeech(text: string, speed: number): Promise<void> {
  return new Promise((resolve, reject) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pl-PL'; // Polish language
    utterance.rate = speed;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onend = () => resolve();
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      reject(new Error('Speech synthesis failed'));
    };

    // Try to find a Polish voice
    const voices = window.speechSynthesis.getVoices();
    const polishVoice = voices.find(
      (voice) => voice.lang.startsWith('pl') || voice.lang.startsWith('PL')
    );

    if (polishVoice) {
      utterance.voice = polishVoice;
    }

    window.speechSynthesis.speak(utterance);
  });
}

/**
 * Play audio using Google TTS API
 * Note: This requires setting up the API in the backend
 */
async function playWithGoogleTTS(text: string, speed: number): Promise<void> {
  const cacheKey = `${text}-${speed}`;

  // Check cache first
  if (audioCache.has(cacheKey)) {
    const audio = audioCache.get(cacheKey)!;
    audio.currentTime = 0; // Reset to beginning
    await audio.play();
    return;
  }

  // For now, fallback to Web Speech API
  // In production, this would call your backend API endpoint
  // that generates audio using Google Cloud TTS
  return playWithWebSpeech(text, speed);

  /*
  // Production implementation:
  const response = await fetch('/api/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, lang: 'pl-PL', speed }),
  });

  if (!response.ok) {
    throw new Error('TTS API request failed');
  }

  const audioBlob = await response.blob();
  const audioUrl = URL.createObjectURL(audioBlob);
  const audio = new Audio(audioUrl);

  // Cache the audio element
  audioCache.set(cacheKey, audio);

  await audio.play();
  */
}

/**
 * Check if text-to-speech is available
 */
export function isTTSAvailable(): boolean {
  return 'speechSynthesis' in window;
}

/**
 * Get available Polish voices
 */
export function getPolishVoices(): SpeechSynthesisVoice[] {
  if (!isTTSAvailable()) {
    return [];
  }

  return window.speechSynthesis
    .getVoices()
    .filter((voice) => voice.lang.startsWith('pl') || voice.lang.startsWith('PL'));
}

/**
 * Load voices (required for some browsers)
 */
export function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
      return;
    }

    // Wait for voices to load
    window.speechSynthesis.onvoiceschanged = () => {
      resolve(window.speechSynthesis.getVoices());
    };
  });
}

/**
 * Preload audio for a list of words
 * Useful for vocabulary review sessions
 */
export async function preloadAudio(words: string[]): Promise<void> {
  if (!isTTSAvailable()) {
    return;
  }

  // Load voices first
  await loadVoices();

  // Preload by creating silent utterances
  for (const word of words.slice(0, 10)) {
    // Limit to first 10
    const cacheKey = `${word}-1.0`;
    if (!audioCache.has(cacheKey)) {
      // Audio will be loaded on first play
      // This just ensures voices are ready
    }
  }
}

/**
 * Clear audio cache
 */
export function clearAudioCache(): void {
  audioCache.clear();
}

/**
 * Stop any currently playing audio
 */
export function stopAudio(): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }

  // Stop any cached audio elements
  audioCache.forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
}

/**
 * Audio player hook for React components
 */
export function useAudioPlayer() {
  const play = async (text: string, speed: number = 1.0) => {
    try {
      await playPolishAudio(text, speed);
      return { success: true };
    } catch (_error) {
      console.error('Audio playback error:', error);
      return {
        success: false,
        error: 'Failed to play audio. Please check your browser settings.',
      };
    }
  };

  const stop = () => {
    stopAudio();
  };

  return { play, stop, isAvailable: isTTSAvailable() };
}
