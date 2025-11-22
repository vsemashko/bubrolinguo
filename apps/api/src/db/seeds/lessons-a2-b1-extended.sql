-- Extended A2-B1 lessons (Lessons 16-30)
-- Expanding from 15 to 30 lessons to meet MVP target

-- UNIT 6: Daily Life (A2)

-- Lesson 16: Daily Routine
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'A2', 16, 6, 1,
  'Daily Routine',
  'Распорядок дня',
  'Learn to describe your daily activities',
  'Научитесь описывать ваши ежедневные действия',
  20, 25, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {"en": "How do you say I wake up in Polish?", "ru": "Как сказать Я просыпаюсь по-польски?"},
        "options": [
          {"id": "a", "text": "Budzę się", "isCorrect": true},
          {"id": "b", "text": "Śpię", "isCorrect": false},
          {"id": "c", "text": "Jem", "isCorrect": false}
        ]
      },
      {
        "id": "ex2",
        "type": "translation",
        "prompt": {"en": "I go to work at 8 o''clock", "ru": "Я иду на работу в 8 часов"},
        "correctAnswer": "Idę do pracy o ósmej",
        "acceptableAnswers": ["Idę do pracy o ósmej", "Idę do pracy o ósmej godzinie"]
      }
    ]
  }'::jsonb
);

-- Lesson 17: House and Home
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'A2', 17, 6, 2,
  'House and Home',
  'Дом и жилье',
  'Learn vocabulary for rooms and household items',
  'Изучите словарь для комнат и предметов домашнего обихода',
  20, 25, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {"en": "How do you say kitchen in Polish?", "ru": "Как сказать кухня по-польски?"},
        "options": [
          {"id": "a", "text": "kuchnia", "isCorrect": true},
          {"id": "b", "text": "łazienka", "isCorrect": false},
          {"id": "c", "text": "sypialnia", "isCorrect": false}
        ]
      },
      {
        "id": "ex2",
        "type": "multiple_choice",
        "question": {"en": "How do you say bedroom in Polish?", "ru": "Как сказать спальня по-польски?"},
        "options": [
          {"id": "a", "text": "sypialnia", "isCorrect": true},
          {"id": "b", "text": "salon", "isCorrect": false},
          {"id": "c", "text": "pokój", "isCorrect": false}
        ]
      }
    ]
  }'::jsonb
);

-- Lesson 18: Describing People
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'A2', 18, 6, 3,
  'Describing People',
  'Описание людей',
  'Learn adjectives to describe appearance and personality',
  'Изучите прилагательные для описания внешности и личности',
  20, 25, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {"en": "How do you say tall in Polish?", "ru": "Как сказать высокий по-польски?"},
        "options": [
          {"id": "a", "text": "wysoki", "isCorrect": true},
          {"id": "b", "text": "niski", "isCorrect": false},
          {"id": "c", "text": "gruby", "isCorrect": false}
        ]
      },
      {
        "id": "ex2",
        "type": "translation",
        "prompt": {"en": "She is very kind", "ru": "Она очень добрая"},
        "correctAnswer": "Ona jest bardzo miła",
        "acceptableAnswers": ["Ona jest bardzo miła", "Jest bardzo miła"]
      }
    ]
  }'::jsonb
);

-- UNIT 7: Past and Future (A2-B1)

-- Lesson 19: Past Tense Basics
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'A2', 19, 7, 1,
  'Past Tense Basics',
  'Основы прошедшего времени',
  'Learn to talk about past events',
  'Научитесь говорить о прошлых событиях',
  25, 30, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {"en": "How do you say I was in Polish?", "ru": "Как сказать Я был по-польски?"},
        "options": [
          {"id": "a", "text": "Byłem/Byłam", "isCorrect": true},
          {"id": "b", "text": "Jestem", "isCorrect": false},
          {"id": "c", "text": "Będę", "isCorrect": false}
        ]
      },
      {
        "id": "ex2",
        "type": "translation",
        "prompt": {"en": "I went to the cinema yesterday", "ru": "Я ходил в кино вчера"},
        "correctAnswer": "Poszedłem do kina wczoraj",
        "acceptableAnswers": ["Poszedłem do kina wczoraj", "Poszłam do kina wczoraj", "Wczoraj poszedłem do kina"]
      }
    ]
  }'::jsonb
);

-- Lesson 20: Future Plans
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'B1', 20, 7, 2,
  'Future Plans',
  'Планы на будущее',
  'Learn to express future intentions and plans',
  'Научитесь выражать будущие намерения и планы',
  25, 30, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {"en": "How do you say I will go in Polish?", "ru": "Как сказать Я пойду по-польски?"},
        "options": [
          {"id": "a", "text": "Pójdę", "isCorrect": true},
          {"id": "b", "text": "Idę", "isCorrect": false},
          {"id": "c", "text": "Szedłem", "isCorrect": false}
        ]
      },
      {
        "id": "ex2",
        "type": "translation",
        "prompt": {"en": "I will travel to Warsaw next month", "ru": "Я поеду в Варшаву в следующем месяце"},
        "correctAnswer": "Pojadę do Warszawy w przyszłym miesiącu",
        "acceptableAnswers": ["Pojadę do Warszawy w przyszłym miesiącu", "W przyszłym miesiącu pojadę do Warszawy"]
      }
    ]
  }'::jsonb
);

-- Lesson 21: Telling Stories
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'B1', 21, 7, 3,
  'Telling Stories',
  'Рассказывание историй',
  'Learn to narrate events and tell stories',
  'Научитесь рассказывать о событиях и историях',
  25, 30, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {"en": "How do you say then in Polish (for sequencing events)?", "ru": "Как сказать потом по-польски (для последовательности)?"},
        "options": [
          {"id": "a", "text": "potem", "isCorrect": true},
          {"id": "b", "text": "teraz", "isCorrect": false},
          {"id": "c", "text": "zawsze", "isCorrect": false}
        ]
      },
      {
        "id": "ex2",
        "type": "translation",
        "prompt": {"en": "First I ate breakfast, then I left home", "ru": "Сначала я позавтракал, потом вышел из дома"},
        "correctAnswer": "Najpierw zjadłem śniadanie, potem wyszedłem z domu",
        "acceptableAnswers": ["Najpierw zjadłem śniadanie, potem wyszedłem z domu", "Najpierw zjadłam śniadanie, potem wyszłam z domu"]
      }
    ]
  }'::jsonb
);

-- UNIT 8: Opinions and Ideas (B1)

-- Lesson 22: Expressing Opinions
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'B1', 22, 8, 1,
  'Expressing Opinions',
  'Выражение мнений',
  'Learn to express and discuss your opinions',
  'Научитесь выражать и обсуждать ваше мнение',
  25, 30, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {"en": "How do you say I think that... in Polish?", "ru": "Как сказать Я думаю, что... по-польски?"},
        "options": [
          {"id": "a", "text": "Myślę, że...", "isCorrect": true},
          {"id": "b", "text": "Wiem, że...", "isCorrect": false},
          {"id": "c", "text": "Mówię, że...", "isCorrect": false}
        ]
      },
      {
        "id": "ex2",
        "type": "translation",
        "prompt": {"en": "In my opinion, this is very interesting", "ru": "По моему мнению, это очень интересно"},
        "correctAnswer": "Moim zdaniem to jest bardzo interesujące",
        "acceptableAnswers": ["Moim zdaniem to jest bardzo interesujące", "Według mnie to jest bardzo interesujące"]
      }
    ]
  }'::jsonb
);

-- Lesson 23: Likes and Dislikes
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'B1', 23, 8, 2,
  'Likes and Dislikes',
  'Симпатии и антипатии',
  'Learn to express preferences and dislikes',
  'Научитесь выражать предпочтения и антипатии',
  20, 25, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {"en": "How do you say I love in Polish?", "ru": "Как сказать Я люблю по-польски?"},
        "options": [
          {"id": "a", "text": "Uwielbiam", "isCorrect": true},
          {"id": "b", "text": "Nienawidzę", "isCorrect": false},
          {"id": "c", "text": "Wolę", "isCorrect": false}
        ]
      },
      {
        "id": "ex2",
        "type": "translation",
        "prompt": {"en": "I prefer coffee to tea", "ru": "Я предпочитаю кофе чаю"},
        "correctAnswer": "Wolę kawę od herbaty",
        "acceptableAnswers": ["Wolę kawę od herbaty", "Wolę kawę niż herbatę"]
      }
    ]
  }'::jsonb
);

-- Lesson 24: Comparing Things
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'B1', 24, 8, 3,
  'Comparing Things',
  'Сравнение вещей',
  'Learn comparative and superlative forms',
  'Изучите сравнительную и превосходную степень',
  25, 30, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {"en": "How do you say bigger in Polish?", "ru": "Как сказать больше по-польски?"},
        "options": [
          {"id": "a", "text": "większy", "isCorrect": true},
          {"id": "b", "text": "mniejszy", "isCorrect": false},
          {"id": "c", "text": "duży", "isCorrect": false}
        ]
      },
      {
        "id": "ex2",
        "type": "translation",
        "prompt": {"en": "Warsaw is bigger than Krakow", "ru": "Варшава больше Кракова"},
        "correctAnswer": "Warszawa jest większa niż Kraków",
        "acceptableAnswers": ["Warszawa jest większa niż Kraków", "Warszawa jest większa od Krakowa"]
      }
    ]
  }'::jsonb
);

-- UNIT 9: Culture and Society (B1)

-- Lesson 25: Polish Holidays
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'B1', 25, 9, 1,
  'Polish Holidays',
  'Польские праздники',
  'Learn about Polish holidays and traditions',
  'Узнайте о польских праздниках и традициях',
  25, 30, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {"en": "How do you say Merry Christmas in Polish?", "ru": "Как сказать Счастливого Рождества по-польски?"},
        "options": [
          {"id": "a", "text": "Wesołych Świąt", "isCorrect": true},
          {"id": "b", "text": "Szczęśliwego Nowego Roku", "isCorrect": false},
          {"id": "c", "text": "Wszystkiego najlepszego", "isCorrect": false}
        ]
      },
      {
        "id": "ex2",
        "type": "multiple_choice",
        "question": {"en": "What is Wigilia?", "ru": "Что такое Wigilia?"},
        "options": [
          {"id": "a", "text": "Christmas Eve dinner", "isCorrect": true},
          {"id": "b", "text": "Easter breakfast", "isCorrect": false},
          {"id": "c", "text": "New Year celebration", "isCorrect": false}
        ]
      }
    ]
  }'::jsonb
);

-- Lesson 26: Entertainment and Media
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'B1', 26, 9, 2,
  'Entertainment and Media',
  'Развлечения и медиа',
  'Learn to talk about movies, music, and entertainment',
  'Научитесь говорить о фильмах, музыке и развлечениях',
  20, 25, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {"en": "How do you say movie in Polish?", "ru": "Как сказать фильм по-польски?"},
        "options": [
          {"id": "a", "text": "film", "isCorrect": true},
          {"id": "b", "text": "muzyka", "isCorrect": false},
          {"id": "c", "text": "książka", "isCorrect": false}
        ]
      },
      {
        "id": "ex2",
        "type": "translation",
        "prompt": {"en": "I like to watch comedies", "ru": "Я люблю смотреть комедии"},
        "correctAnswer": "Lubię oglądać komedie",
        "acceptableAnswers": ["Lubię oglądać komedie", "Lubię patrzeć na komedie"]
      }
    ]
  }'::jsonb
);

-- Lesson 27: Sports and Fitness
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'B1', 27, 9, 3,
  'Sports and Fitness',
  'Спорт и фитнес',
  'Learn vocabulary for sports and physical activities',
  'Изучите словарь для спорта и физической активности',
  20, 25, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {"en": "How do you say to play football in Polish?", "ru": "Как сказать играть в футбол по-польски?"},
        "options": [
          {"id": "a", "text": "grać w piłkę nożną", "isCorrect": true},
          {"id": "b", "text": "grać w koszykówkę", "isCorrect": false},
          {"id": "c", "text": "grać w tenisa", "isCorrect": false}
        ]
      },
      {
        "id": "ex2",
        "type": "translation",
        "prompt": {"en": "I go to the gym three times a week", "ru": "Я хожу в спортзал три раза в неделю"},
        "correctAnswer": "Chodzę na siłownię trzy razy w tygodniu",
        "acceptableAnswers": ["Chodzę na siłownię trzy razy w tygodniu", "Idę na siłownię trzy razy w tygodniu"]
      }
    ]
  }'::jsonb
);

-- UNIT 10: Advanced Communication (B1)

-- Lesson 28: Formal vs Informal Speech
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'B1', 28, 10, 1,
  'Formal vs Informal Speech',
  'Формальная и неформальная речь',
  'Learn when and how to use formal and informal language',
  'Научитесь когда и как использовать формальный и неформальный язык',
  25, 30, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {"en": "Which is the formal you in Polish?", "ru": "Какая форма вы является формальной в польском?"},
        "options": [
          {"id": "a", "text": "Pan/Pani", "isCorrect": true},
          {"id": "b", "text": "Ty", "isCorrect": false},
          {"id": "c", "text": "Wy", "isCorrect": false}
        ]
      },
      {
        "id": "ex2",
        "type": "translation",
        "prompt": {"en": "Good morning, how can I help you? (formal)", "ru": "Доброе утро, чем могу помочь? (формально)"},
        "correctAnswer": "Dzień dobry, w czym mogę pomóc?",
        "acceptableAnswers": ["Dzień dobry, w czym mogę pomóc?", "Dzień dobry, jak mogę pomóc?"]
      }
    ]
  }'::jsonb
);

-- Lesson 29: Problem Solving
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'B1', 29, 10, 2,
  'Problem Solving',
  'Решение проблем',
  'Learn to discuss problems and find solutions',
  'Научитесь обсуждать проблемы и находить решения',
  25, 30, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {"en": "How do you say problem in Polish?", "ru": "Как сказать проблема по-польски?"},
        "options": [
          {"id": "a", "text": "problem", "isCorrect": true},
          {"id": "b", "text": "rozwiązanie", "isCorrect": false},
          {"id": "c", "text": "pytanie", "isCorrect": false}
        ]
      },
      {
        "id": "ex2",
        "type": "translation",
        "prompt": {"en": "How can we solve this problem?", "ru": "Как мы можем решить эту проблему?"},
        "correctAnswer": "Jak możemy rozwiązać ten problem?",
        "acceptableAnswers": ["Jak możemy rozwiązać ten problem?", "Jak możemy ten problem rozwiązać?"]
      }
    ]
  }'::jsonb
);

-- Lesson 30: Giving Advice
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'B1', 30, 10, 3,
  'Giving Advice',
  'Давать советы',
  'Learn to give and receive advice',
  'Научитесь давать и получать советы',
  25, 30, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {"en": "How do you say You should... in Polish?", "ru": "Как сказать Тебе следует... по-польски?"},
        "options": [
          {"id": "a", "text": "Powinieneś/Powinnaś", "isCorrect": true},
          {"id": "b", "text": "Musisz", "isCorrect": false},
          {"id": "c", "text": "Możesz", "isCorrect": false}
        ]
      },
      {
        "id": "ex2",
        "type": "translation",
        "prompt": {"en": "I advise you to learn Polish", "ru": "Я советую тебе учить польский"},
        "correctAnswer": "Radzę ci uczyć się polskiego",
        "acceptableAnswers": ["Radzę ci uczyć się polskiego", "Radzę tobie uczyć się polskiego", "Doradzam ci uczyć się polskiego"]
      }
    ]
  }'::jsonb
);
