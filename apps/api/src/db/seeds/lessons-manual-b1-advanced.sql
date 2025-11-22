-- Additional A2-B1 lessons (Lessons 16-30)
-- Expanding to 30 total lessons for MVP

-- Lesson 16: Present Tense
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'A2', 16, 5, 3,
  'Present Tense Verbs',
  'Глаголы в настоящем времени',
  'Learn present tense conjugation in Polish',
  'Изучите спряжение глаголов в настоящем времени',
  25, 30, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {"en": "How do you say I am eating?", "ru": "Как сказать Я ем?"},
        "options": [
          {"id": "a", "text": "Jem", "isCorrect": true},
          {"id": "b", "text": "Jesz", "isCorrect": false},
          {"id": "c", "text": "Je", "isCorrect": false}
        ]
      }
    ]
  }'::jsonb
);

-- Lesson 17: Past Tense Basics
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'A2', 17, 6, 1,
  'Past Tense Introduction',
  'Введение в прошедшее время',
  'Learn basic past tense in Polish',
  'Изучите основы прошедшего времени',
  25, 30, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "translation",
        "prompt": {"en": "I was in Warsaw", "ru": "Я был в Варшаве"},
        "correctAnswer": "Byłem w Warszawie",
        "acceptableAnswers": ["Byłem w Warszawie", "Byłam w Warszawie"]
      }
    ]
  }'::jsonb
);

-- Lesson 18: Future Tense
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'A2', 18, 6, 2,
  'Future Tense',
  'Будущее время',
  'Express future actions in Polish',
  'Выражайте будущие действия по-польски',
  25, 30, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {"en": "How do you say I will go?", "ru": "Как сказать Я пойду?"},
        "options": [
          {"id": "a", "text": "Pójdę", "isCorrect": true},
          {"id": "b", "text": "Idę", "isCorrect": false},
          {"id": "c", "text": "Szedłem", "isCorrect": false}
        ]
      }
    ]
  }'::jsonb
);

-- Lesson 19: Adjectives
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'A2', 19, 6, 3,
  'Common Adjectives',
  'Общие прилагательные',
  'Learn frequently used Polish adjectives',
  'Изучите часто используемые польские прилагательные',
  20, 25, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {"en": "What is big in Polish?", "ru": "Что значит большой по-польски?"},
        "options": [
          {"id": "a", "text": "duży", "isCorrect": true},
          {"id": "b", "text": "mały", "isCorrect": false},
          {"id": "c", "text": "średni", "isCorrect": false}
        ]
      }
    ]
  }'::jsonb
);

-- Lesson 20: Prepositions
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'A2', 20, 7, 1,
  'Common Prepositions',
  'Общие предлоги',
  'Master Polish prepositions of place and time',
  'Освойте польские предлоги места и времени',
  20, 25, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "translation",
        "prompt": {"en": "On the table", "ru": "На столе"},
        "correctAnswer": "Na stole",
        "acceptableAnswers": ["Na stole", "na stole"]
      }
    ]
  }'::jsonb
);

-- Lesson 21: Pronouns
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'B1', 21, 7, 2,
  'Personal Pronouns',
  'Личные местоимения',
  'Learn Polish personal pronouns and their cases',
  'Изучите польские личные местоимения и их падежи',
  25, 35, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {"en": "How do you say with me?", "ru": "Как сказать со мной?"},
        "options": [
          {"id": "a", "text": "ze mną", "isCorrect": true},
          {"id": "b", "text": "z ja", "isCorrect": false},
          {"id": "c", "text": "mnie", "isCorrect": false}
        ]
      }
    ]
  }'::jsonb
);

-- Lesson 22: Numbers Advanced
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'B1', 22, 7, 3,
  'Numbers and Counting Advanced',
  'Числа и счёт продвинутый уровень',
  'Master larger numbers and ordinal numbers',
  'Освойте большие числа и порядковые числительные',
  20, 30, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "translation",
        "prompt": {"en": "One hundred", "ru": "Сто"},
        "correctAnswer": "Sto",
        "acceptableAnswers": ["Sto", "sto"]
      }
    ]
  }'::jsonb
);

-- Lesson 23: Clothing
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'B1', 23, 8, 1,
  'Clothing and Fashion',
  'Одежда и мода',
  'Learn vocabulary for clothes and accessories',
  'Изучите словарь одежды и аксессуаров',
  20, 30, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {"en": "How do you say shirt in Polish?", "ru": "Как сказать рубашка по-польски?"},
        "options": [
          {"id": "a", "text": "koszula", "isCorrect": true},
          {"id": "b", "text": "spodnie", "isCorrect": false},
          {"id": "c", "text": "buty", "isCorrect": false}
        ]
      }
    ]
  }'::jsonb
);

-- Lesson 24: Housing
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'B1', 24, 8, 2,
  'House and Apartment',
  'Дом и квартира',
  'Describe your living space in Polish',
  'Опишите своё жильё по-польски',
  25, 35, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {"en": "What is kitchen in Polish?", "ru": "Что значит кухня по-польски?"},
        "options": [
          {"id": "a", "text": "kuchnia", "isCorrect": true},
          {"id": "b", "text": "łazienka", "isCorrect": false},
          {"id": "c", "text": "salon", "isCorrect": false}
        ]
      }
    ]
  }'::jsonb
);

-- Lesson 25: Education
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'B1', 25, 8, 3,
  'School and Education',
  'Школа и образование',
  'Talk about education and learning',
  'Говорите об образовании и учёбе',
  25, 35, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "translation",
        "prompt": {"en": "I study Polish", "ru": "Я учу польский"},
        "correctAnswer": "Uczę się polskiego",
        "acceptableAnswers": ["Uczę się polskiego", "Uczę się języka polskiego"]
      }
    ]
  }'::jsonb
);

-- Lesson 26: Technology
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'B1', 26, 9, 1,
  'Technology and Internet',
  'Технологии и интернет',
  'Learn modern technology vocabulary',
  'Изучите современную технологическую лексику',
  20, 30, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {"en": "How do you say computer?", "ru": "Как сказать компьютер?"},
        "options": [
          {"id": "a", "text": "komputer", "isCorrect": true},
          {"id": "b", "text": "telefon", "isCorrect": false},
          {"id": "c", "text": "tablet", "isCorrect": false}
        ]
      }
    ]
  }'::jsonb
);

-- Lesson 27: Entertainment
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'B1', 27, 9, 2,
  'Movies and Entertainment',
  'Кино и развлечения',
  'Discuss entertainment and leisure activities',
  'Обсуждайте развлечения и досуг',
  20, 30, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "translation",
        "prompt": {"en": "I like watching movies", "ru": "Я люблю смотреть фильмы"},
        "correctAnswer": "Lubię oglądać filmy",
        "acceptableAnswers": ["Lubię oglądać filmy", "Lubię oglądać film"]
      }
    ]
  }'::jsonb
);

-- Lesson 28: Nature
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'B1', 28, 9, 3,
  'Nature and Environment',
  'Природа и окружающая среда',
  'Talk about nature and the environment',
  'Говорите о природе и окружающей среде',
  25, 35, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {"en": "What is tree in Polish?", "ru": "Что значит дерево по-польски?"},
        "options": [
          {"id": "a", "text": "drzewo", "isCorrect": true},
          {"id": "b", "text": "kwiat", "isCorrect": false},
          {"id": "c", "text": "trawa", "isCorrect": false}
        ]
      }
    ]
  }'::jsonb
);

-- Lesson 29: Sports
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'B1', 29, 10, 1,
  'Sports and Exercise',
  'Спорт и упражнения',
  'Discuss sports and physical activities',
  'Обсуждайте спорт и физические активности',
  20, 30, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {"en": "How do you say I play football?", "ru": "Как сказать Я играю в футбол?"},
        "options": [
          {"id": "a", "text": "Gram w piłkę nożną", "isCorrect": true},
          {"id": "b", "text": "Grać w piłkę", "isCorrect": false},
          {"id": "c", "text": "Gra piłka", "isCorrect": false}
        ]
      }
    ]
  }'::jsonb
);

-- Lesson 30: Celebrations
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'B1', 30, 10, 2,
  'Holidays and Celebrations',
  'Праздники и торжества',
  'Learn about Polish holidays and traditions',
  'Узнайте о польских праздниках и традициях',
  25, 35, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "translation",
        "prompt": {"en": "Merry Christmas", "ru": "Счастливого Рождества"},
        "correctAnswer": "Wesołych Świąt",
        "acceptableAnswers": ["Wesołych Świąt", "Wesołych Świąt Bożego Narodzenia"]
      }
    ]
  }'::jsonb
);
