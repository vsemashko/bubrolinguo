/**
 * Analytics Service
 *
 * Tracks user behavior and events for product analytics.
 * Supports Google Analytics 4, Plausible, and custom analytics.
 */

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  metadata?: Record<string, any>;
}

interface PageView {
  path: string;
  title: string;
  referrer?: string;
}

// Analytics configuration
const ANALYTICS_CONFIG = {
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
  enabled: process.env.NODE_ENV === 'production',
  debug: process.env.NODE_ENV === 'development',
};

/**
 * Initialize analytics
 */
export function initAnalytics() {
  if (!ANALYTICS_CONFIG.enabled) {
    console.log('[Analytics] Analytics disabled in development');
    return;
  }

  // Initialize Google Analytics
  if (ANALYTICS_CONFIG.googleAnalyticsId) {
    initGoogleAnalytics();
  }

  // Initialize Plausible (privacy-focused alternative)
  if (ANALYTICS_CONFIG.plausibleDomain) {
    initPlausible();
  }
}

/**
 * Track page view
 */
export function trackPageView(page: PageView) {
  if (ANALYTICS_CONFIG.debug) {
    console.log('[Analytics] Page view:', page);
  }

  if (!ANALYTICS_CONFIG.enabled) {return;}

  // Google Analytics
  if (window.gtag) {
    window.gtag('config', ANALYTICS_CONFIG.googleAnalyticsId!, {
      page_path: page.path,
      page_title: page.title,
    });
  }

  // Plausible
  if (window.plausible) {
    window.plausible('pageview', {
      props: {
        path: page.path,
        title: page.title,
      },
    });
  }
}

/**
 * Track custom event
 */
export function trackEvent(event: AnalyticsEvent) {
  if (ANALYTICS_CONFIG.debug) {
    console.log('[Analytics] Event:', event);
  }

  if (!ANALYTICS_CONFIG.enabled) {return;}

  // Google Analytics
  if (window.gtag) {
    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.metadata,
    });
  }

  // Plausible
  if (window.plausible) {
    window.plausible(event.action, {
      props: {
        category: event.category,
        label: event.label,
        value: event.value,
        ...event.metadata,
      },
    });
  }
}

/**
 * Track lesson completion
 */
export function trackLessonComplete(lessonId: string, score: number, timeSpent: number) {
  trackEvent({
    action: 'lesson_completed',
    category: 'Learning',
    label: lessonId,
    value: score,
    metadata: {
      lesson_id: lessonId,
      score,
      time_spent: timeSpent,
    },
  });
}

/**
 * Track vocabulary review
 */
export function trackVocabularyReview(wordId: string, correct: boolean) {
  trackEvent({
    action: 'vocabulary_reviewed',
    category: 'Learning',
    label: wordId,
    value: correct ? 1 : 0,
    metadata: {
      word_id: wordId,
      correct,
    },
  });
}

/**
 * Track user registration
 */
export function trackUserRegistration(method: string = 'email') {
  trackEvent({
    action: 'sign_up',
    category: 'User',
    label: method,
    metadata: {
      method,
    },
  });
}

/**
 * Track user login
 */
export function trackUserLogin(method: string = 'email') {
  trackEvent({
    action: 'login',
    category: 'User',
    label: method,
    metadata: {
      method,
    },
  });
}

/**
 * Track achievement unlocked
 */
export function trackAchievementUnlocked(achievementId: string, achievementName: string) {
  trackEvent({
    action: 'achievement_unlocked',
    category: 'Gamification',
    label: achievementName,
    metadata: {
      achievement_id: achievementId,
      achievement_name: achievementName,
    },
  });
}

/**
 * Track error
 */
export function trackError(error: Error, context?: string) {
  trackEvent({
    action: 'error',
    category: 'Error',
    label: error.message,
    metadata: {
      error_message: error.message,
      error_stack: error.stack,
      context,
    },
  });
}

/**
 * Track search
 */
export function trackSearch(query: string, resultsCount: number) {
  trackEvent({
    action: 'search',
    category: 'Engagement',
    label: query,
    value: resultsCount,
    metadata: {
      query,
      results_count: resultsCount,
    },
  });
}

/**
 * Track audio playback
 */
export function trackAudioPlayback(text: string, language: string = 'pl') {
  trackEvent({
    action: 'audio_played',
    category: 'Engagement',
    label: language,
    metadata: {
      text: text.substring(0, 100), // Limit text length
      language,
    },
  });
}

// Private: Initialize Google Analytics
function initGoogleAnalytics() {
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.googleAnalyticsId}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', ANALYTICS_CONFIG.googleAnalyticsId!, {
    send_page_view: false, // We'll send page views manually
  });
}

// Private: Initialize Plausible
function initPlausible() {
  const script = document.createElement('script');
  script.defer = true;
  script.setAttribute('data-domain', ANALYTICS_CONFIG.plausibleDomain!);
  script.src = 'https://plausible.io/js/script.js';
  document.head.appendChild(script);
}

// TypeScript declarations
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    plausible?: (event: string, options?: any) => void;
  }
}

/**
 * React hook for analytics
 */
export function useAnalytics() {
  return {
    trackPageView,
    trackEvent,
    trackLessonComplete,
    trackVocabularyReview,
    trackUserRegistration,
    trackUserLogin,
    trackAchievementUnlocked,
    trackError,
    trackSearch,
    trackAudioPlayback,
  };
}
