#!/usr/bin/env node
/**
 * Database Seed Script
 *
 * Seeds the database with initial data for development/testing:
 * - Characters (Bubr, Zofia, Ania, etc.)
 * - Achievements
 * - Sample lessons (A1)
 * - Sample vocabulary words
 *
 * Usage:
 *   npm run db:seed
 */

import { pool, query } from './connection';
import { logger } from '../utils/logger';

/**
 * Seed characters
 */
async function seedCharacters(): Promise<void> {
  logger.info('Seeding characters...');

  const characters = [
    {
      name: 'Bubr',
      nickname: 'The Motivated Builder',
      description_en:
        'A hard-working beaver who believes in systematic learning. He approaches Polish like a construction project - one brick at a time.',
      description_ru:
        'Трудолюбивый бобр, который верит в систематическое обучение. Он изучает польский как строительный проект - по одному кирпичику.',
      personality_en:
        'Persistent, organized, loves spreadsheets and tracking progress. Never gives up!',
      personality_ru:
        'Настойчивый, организованный, любит таблицы и отслеживание прогресса. Никогда не сдается!',
      emoji: '🦫',
      unlock_requirement: 'default',
      unlock_xp: 0,
    },
    {
      name: 'Zofia',
      nickname: 'The Enthusiastic Guide',
      description_en:
        'A cheerful teacher from Warsaw who loves introducing people to Polish culture and language.',
      description_ru:
        'Веселая учительница из Варшавы, которая любит знакомить людей с польской культурой и языком.',
      personality_en:
        'Warm, encouraging, patient. Always ready with a helpful tip or cultural insight.',
      personality_ru:
        'Теплая, ободряющая, терпеливая. Всегда готова дать полезный совет или культурную информацию.',
      emoji: '👩‍🏫',
      unlock_requirement: 'default',
      unlock_xp: 0,
    },
    {
      name: 'Ania',
      nickname: 'The Student Friend',
      description_en:
        'A university student from Kraków who loves meeting international friends and helping them learn Polish.',
      description_ru:
        'Студентка из Кракова, которая любит знакомиться с международными друзьями и помогать им учить польский.',
      personality_en:
        'Fun, relatable, uses modern slang. Makes learning feel like hanging out with a friend.',
      personality_ru:
        'Веселая, близкая, использует современный сленг. Делает обучение похожим на общение с другом.',
      emoji: '👩‍🎓',
      unlock_requirement: 'default',
      unlock_xp: 0,
    },
    {
      name: 'Jakub',
      nickname: 'The History Buff',
      description_en:
        'A history professor who loves explaining the rich cultural context behind Polish words and phrases.',
      description_ru:
        'Профессор истории, который любит объяснять богатый культурный контекст польских слов и фраз.',
      personality_en:
        'Intellectual, passionate about etymology and history. Adds depth to your learning.',
      personality_ru:
        'Интеллектуал, увлеченный этимологией и историей. Добавляет глубину вашему обучению.',
      emoji: '👨‍🏫',
      unlock_requirement: 'reach_a2',
      unlock_xp: 1000,
    },
    {
      name: 'Kasia',
      nickname: 'The Business Professional',
      description_en:
        'A businesswoman from Gdańsk who specializes in professional and business Polish.',
      description_ru:
        'Бизнесвумен из Гданьска, специализирующаяся на профессиональном и деловом польском.',
      personality_en:
        'Professional, articulate, practical. Focuses on real-world business communication.',
      personality_ru:
        'Профессиональная, красноречивая, практичная. Фокусируется на реальной деловой коммуникации.',
      emoji: '👩‍💼',
      unlock_requirement: 'reach_b1',
      unlock_xp: 3000,
    },
    {
      name: 'Piotr',
      nickname: 'The Exam Coach',
      description_en:
        'An experienced exam preparation tutor who helps you master advanced Polish for certifications.',
      description_ru:
        'Опытный репетитор по подготовке к экзаменам, который помогает вам освоить продвинутый польский для сертификации.',
      personality_en:
        'Focused, strategic, detail-oriented. Knows exactly what you need to pass exams.',
      personality_ru:
        'Сосредоточенный, стратегический, внимательный к деталям. Точно знает, что нужно для сдачи экзаменов.',
      emoji: '👨‍💻',
      unlock_requirement: 'reach_b2',
      unlock_xp: 5000,
    },
  ];

  for (const char of characters) {
    await query(
      `INSERT INTO characters (name, nickname, description_en, description_ru, personality_en, personality_ru, emoji, unlock_requirement, unlock_xp, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, true)
       ON CONFLICT DO NOTHING`,
      [
        char.name,
        char.nickname,
        char.description_en,
        char.description_ru,
        char.personality_en,
        char.personality_ru,
        char.emoji,
        char.unlock_requirement,
        char.unlock_xp,
      ]
    );
  }

  logger.info(`✓ Seeded ${characters.length} characters`);
}

/**
 * Seed achievements
 */
async function seedAchievements(): Promise<void> {
  logger.info('Seeding achievements...');

  const achievements = [
    {
      code: 'first_lesson',
      title_en: 'First Steps',
      title_ru: 'Первые шаги',
      description_en: 'Complete your first lesson',
      description_ru: 'Завершите первый урок',
      requirement_type: 'lessons_completed',
      requirement_value: 1,
      xp_reward: 10,
      badge_color: '#4CAF50',
    },
    {
      code: 'streak_7',
      title_en: '7-Day Streak',
      title_ru: '7-дневная серия',
      description_en: 'Practice for 7 days in a row',
      description_ru: 'Занимайтесь 7 дней подряд',
      requirement_type: 'streak_days',
      requirement_value: 7,
      xp_reward: 50,
      badge_color: '#FF9800',
    },
    {
      code: 'streak_30',
      title_en: 'Month Master',
      title_ru: 'Мастер месяца',
      description_en: 'Practice for 30 days in a row',
      description_ru: 'Занимайтесь 30 дней подряд',
      requirement_type: 'streak_days',
      requirement_value: 30,
      xp_reward: 200,
      badge_color: '#FF5722',
    },
    {
      code: 'words_100',
      title_en: 'Word Collector',
      title_ru: 'Коллекционер слов',
      description_en: 'Master 100 vocabulary words',
      description_ru: 'Освойте 100 словарных слов',
      requirement_type: 'words_mastered',
      requirement_value: 100,
      xp_reward: 100,
      badge_color: '#2196F3',
    },
    {
      code: 'words_1000',
      title_en: 'Vocabulary Virtuoso',
      title_ru: 'Виртуоз словарного запаса',
      description_en: 'Master 1000 vocabulary words',
      description_ru: 'Освойте 1000 словарных слов',
      requirement_type: 'words_mastered',
      requirement_value: 1000,
      xp_reward: 500,
      badge_color: '#9C27B0',
    },
    {
      code: 'perfect_lesson',
      title_en: 'Perfectionist',
      title_ru: 'Перфекционист',
      description_en: 'Complete a lesson with 100% accuracy',
      description_ru: 'Завершите урок со 100% точностью',
      requirement_type: 'perfect_lesson',
      requirement_value: 1,
      xp_reward: 25,
      badge_color: '#FFD700',
    },
    {
      code: 'reach_a2',
      title_en: 'A2 Achiever',
      title_ru: 'Достигший A2',
      description_en: 'Reach A2 level',
      description_ru: 'Достигните уровня A2',
      requirement_type: 'level_reached',
      requirement_value: 0,
      xp_reward: 300,
      badge_color: '#8BC34A',
    },
    {
      code: 'reach_b1',
      title_en: 'B1 Milestone',
      title_ru: 'Веха B1',
      description_en: 'Reach B1 level',
      description_ru: 'Достигните уровня B1',
      requirement_type: 'level_reached',
      requirement_value: 0,
      xp_reward: 500,
      badge_color: '#03A9F4',
    },
    {
      code: 'early_bird',
      title_en: 'Early Bird',
      title_ru: 'Ранняя пташка',
      description_en: 'Practice before 8 AM',
      description_ru: 'Занимайтесь до 8 утра',
      requirement_type: 'early_practice',
      requirement_value: 1,
      xp_reward: 15,
      badge_color: '#FFEB3B',
    },
    {
      code: 'night_owl',
      title_en: 'Night Owl',
      title_ru: 'Сова',
      description_en: 'Practice after 10 PM',
      description_ru: 'Занимайтесь после 10 вечера',
      requirement_type: 'late_practice',
      requirement_value: 1,
      xp_reward: 15,
      badge_color: '#3F51B5',
    },
  ];

  for (const achievement of achievements) {
    await query(
      `INSERT INTO achievements (code, title_en, title_ru, description_en, description_ru, requirement_type, requirement_value, xp_reward, badge_color)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       ON CONFLICT (code) DO NOTHING`,
      [
        achievement.code,
        achievement.title_en,
        achievement.title_ru,
        achievement.description_en,
        achievement.description_ru,
        achievement.requirement_type,
        achievement.requirement_value,
        achievement.xp_reward,
        achievement.badge_color,
      ]
    );
  }

  logger.info(`✓ Seeded ${achievements.length} achievements`);
}

/**
 * Seed sample vocabulary
 */
async function seedVocabulary(): Promise<void> {
  logger.info('Seeding sample vocabulary...');

  const vocabulary = [
    {
      polish_word: 'cześć',
      polish_word_normalized: 'czesc',
      translation_en: 'hello, hi',
      translation_ru: 'привет',
      part_of_speech: 'interjection',
      level: 'A1',
      frequency_rank: 1,
      pronunciation_ipa: 't͡ʂɛɕt͡ɕ',
      example_sentence_pl: 'Cześć! Jak się masz?',
      example_sentence_en: 'Hi! How are you?',
      example_sentence_ru: 'Привет! Как дела?',
    },
    {
      polish_word: 'dziękuję',
      polish_word_normalized: 'dziekuje',
      translation_en: 'thank you',
      translation_ru: 'спасибо',
      part_of_speech: 'verb',
      level: 'A1',
      frequency_rank: 2,
      pronunciation_ipa: 'd͡ʑɛŋˈkujɛ',
      example_sentence_pl: 'Dziękuję za pomoc.',
      example_sentence_en: 'Thank you for the help.',
      example_sentence_ru: 'Спасибо за помощь.',
    },
    {
      polish_word: 'proszę',
      polish_word_normalized: 'prosze',
      translation_en: 'please, you are welcome',
      translation_ru: 'пожалуйста',
      part_of_speech: 'verb',
      level: 'A1',
      frequency_rank: 3,
      pronunciation_ipa: 'ˈprɔʂɛ',
      example_sentence_pl: 'Proszę, weź kawę.',
      example_sentence_en: 'Please, take some coffee.',
      example_sentence_ru: 'Пожалуйста, возьми кофе.',
    },
    {
      polish_word: 'tak',
      polish_word_normalized: 'tak',
      translation_en: 'yes',
      translation_ru: 'да',
      part_of_speech: 'particle',
      level: 'A1',
      frequency_rank: 4,
      pronunciation_ipa: 'tak',
      example_sentence_pl: 'Tak, to prawda.',
      example_sentence_en: 'Yes, that is true.',
      example_sentence_ru: 'Да, это правда.',
    },
    {
      polish_word: 'nie',
      polish_word_normalized: 'nie',
      translation_en: 'no, not',
      translation_ru: 'нет, не',
      part_of_speech: 'particle',
      level: 'A1',
      frequency_rank: 5,
      pronunciation_ipa: 'ɲɛ',
      example_sentence_pl: 'Nie, dziękuję.',
      example_sentence_en: 'No, thank you.',
      example_sentence_ru: 'Нет, спасибо.',
    },
    {
      polish_word: 'dobry',
      polish_word_normalized: 'dobry',
      translation_en: 'good',
      translation_ru: 'хороший',
      part_of_speech: 'adjective',
      gender: 'masculine',
      level: 'A1',
      frequency_rank: 6,
      pronunciation_ipa: 'ˈdɔbrɨ',
      example_sentence_pl: 'To jest dobry pomysł.',
      example_sentence_en: 'This is a good idea.',
      example_sentence_ru: 'Это хорошая идея.',
    },
    {
      polish_word: 'dzień',
      polish_word_normalized: 'dzien',
      translation_en: 'day',
      translation_ru: 'день',
      part_of_speech: 'noun',
      gender: 'masculine',
      level: 'A1',
      frequency_rank: 7,
      pronunciation_ipa: 'd͡ʑɛɲ',
      example_sentence_pl: 'Dzień dobry!',
      example_sentence_en: 'Good day!',
      example_sentence_ru: 'Добрый день!',
    },
    {
      polish_word: 'widzenia',
      polish_word_normalized: 'widzenia',
      translation_en: 'seeing (in "goodbye")',
      translation_ru: 'видения (в "до свидания")',
      part_of_speech: 'noun',
      level: 'A1',
      frequency_rank: 8,
      pronunciation_ipa: 'vi.ˈd͡zɛ.ɲa',
      example_sentence_pl: 'Do widzenia!',
      example_sentence_en: 'Goodbye!',
      example_sentence_ru: 'До свидания!',
    },
    {
      polish_word: 'jestem',
      polish_word_normalized: 'jestem',
      translation_en: 'I am',
      translation_ru: 'я есть',
      part_of_speech: 'verb',
      level: 'A1',
      frequency_rank: 9,
      pronunciation_ipa: 'ˈjɛstɛm',
      example_sentence_pl: 'Jestem studentem.',
      example_sentence_en: 'I am a student.',
      example_sentence_ru: 'Я студент.',
    },
    {
      polish_word: 'mam',
      polish_word_normalized: 'mam',
      translation_en: 'I have',
      translation_ru: 'у меня есть',
      part_of_speech: 'verb',
      level: 'A1',
      frequency_rank: 10,
      pronunciation_ipa: 'mam',
      example_sentence_pl: 'Mam psa.',
      example_sentence_en: 'I have a dog.',
      example_sentence_ru: 'У меня есть собака.',
    },
  ];

  for (const word of vocabulary) {
    await query(
      `INSERT INTO vocabulary (
        polish_word, polish_word_normalized, translation_en, translation_ru,
        part_of_speech, gender, level, frequency_rank, pronunciation_ipa,
        example_sentence_pl, example_sentence_en, example_sentence_ru
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [
        word.polish_word,
        word.polish_word_normalized,
        word.translation_en,
        word.translation_ru,
        word.part_of_speech,
        word.gender || null,
        word.level,
        word.frequency_rank,
        word.pronunciation_ipa,
        word.example_sentence_pl,
        word.example_sentence_en,
        word.example_sentence_ru,
      ]
    );
  }

  logger.info(`✓ Seeded ${vocabulary.length} vocabulary words`);
}

/**
 * Seed sample lesson
 */
async function seedLessons(): Promise<void> {
  logger.info('Seeding sample lessons...');

  const lesson1Exercises = [
    {
      id: 'ex1',
      type: 'multiple_choice',
      question_en: 'How do you say "hello" in Polish?',
      question_ru: 'Как сказать "привет" по-польски?',
      options: ['cześć', 'dziękuję', 'proszę', 'tak'],
      correct_answer: 'cześć',
      explanation_en: '"Cześć" is the most common informal greeting in Polish.',
      explanation_ru:
        '"Cześć" - самое распространённое неформальное приветствие в польском языке.',
    },
    {
      id: 'ex2',
      type: 'translation',
      prompt_en: 'Translate to Polish: Thank you',
      prompt_ru: 'Переведите на польский: Спасибо',
      correct_answer: 'dziękuję',
      accept_typos: true,
      hint_en: 'It starts with "dz"',
      hint_ru: 'Начинается с "dz"',
    },
    {
      id: 'ex3',
      type: 'fill_blank',
      sentence: '___, jak się masz?',
      sentence_en: '___, how are you?',
      sentence_ru: '___, как дела?',
      correct_answer: 'Cześć',
      options: ['Cześć', 'Dziękuję', 'Proszę'],
    },
  ];

  await query(
    `INSERT INTO lessons (
      lesson_number, level, unit_number, order_in_unit,
      title_en, title_ru, description_en, description_ru,
      exercises, xp_reward, is_published
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
    [
      1,
      'A1',
      1,
      1,
      'Greetings and Basic Phrases',
      'Приветствия и основные фразы',
      'Learn how to greet people and use basic courtesy phrases in Polish.',
      'Научитесь приветствовать людей и использовать основные вежливые фразы на польском.',
      JSON.stringify(lesson1Exercises),
      10,
      true,
    ]
  );

  logger.info('✓ Seeded 1 sample lesson');
}

/**
 * Main seed function
 */
async function main() {
  try {
    logger.info('Starting database seeding...');

    await seedCharacters();
    await seedAchievements();
    await seedVocabulary();
    await seedLessons();

    logger.info('✅ Database seeding completed successfully');

    await pool.end();
    process.exit(0);
  } catch (error) {
    logger.error('Database seeding failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    await pool.end();
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export { seedCharacters, seedAchievements, seedVocabulary, seedLessons };
