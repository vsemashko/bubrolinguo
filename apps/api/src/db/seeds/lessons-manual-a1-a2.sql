-- Additional A1-A2 lessons (Lessons 4-15)
-- Manually created to ensure correct format

-- Lesson 4: Days of the Week
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'A1', 4, 1, 4,
  'Days of the Week',
  'Дни недели',
  'Learn the days of the week in Polish',
  'Изучите дни недели на польском',
  15, 20, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {"en": "How do you say Monday in Polish?", "ru": "Как сказать понедельник по-польски?"},
        "options": [
          {"id": "a", "text": "poniedziałek", "isCorrect": true},
          {"id": "b", "text": "wtorek", "isCorrect": false},
          {"id": "c", "text": "środa", "isCorrect": false}
        ]
      }
    ]
  }'::jsonb
);

-- Lesson 5: Family
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'A1', 5, 2, 1,
  'Family Members',
  'Члены семьи',
  'Learn words for family members in Polish',
  'Изучите слова для членов семьи на польском',
  15, 20, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {"en": "How do you say mother in Polish?", "ru": "Как сказать мать по-польски?"},
        "options": [
          {"id": "a", "text": "mama", "isCorrect": true},
          {"id": "b", "text": "tata", "isCorrect": false},
          {"id": "c", "text": "siostra", "isCorrect": false}
        ]
      }
    ]
  }'::jsonb
);

-- Lesson 6: Food and Drinks
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'A1', 6, 2, 2,
  'Food and Drinks',
  'Еда и напитки',
  'Learn basic food and drink vocabulary',
  'Изучите основную лексику еды и напитков',
  20, 25, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {"en": "How do you say water in Polish?", "ru": "Как сказать вода по-польски?"},
        "options": [
          {"id": "a", "text": "woda", "isCorrect": true},
          {"id": "b", "text": "mleko", "isCorrect": false},
          {"id": "c", "text": "kawa", "isCorrect": false}
        ]
      }
    ]
  }'::jsonb
);

-- Lesson 7: At the Restaurant
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'A1', 7, 2, 3,
  'At the Restaurant',
  'В ресторане',
  'Learn how to order food in Polish',
  'Научитесь заказывать еду по-польски',
  20, 25, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "translation",
        "prompt": {"en": "I would like water please", "ru": "Я хотел бы воды пожалуйста"},
        "correctAnswer": "Poproszę wodę",
        "acceptableAnswers": ["Poproszę wodę", "poproszę wodę"]
      }
    ]
  }'::jsonb
);

-- Lesson 8: Shopping
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'A2', 8, 3, 1,
  'Shopping Basics',
  'Основы покупок',
  'Learn shopping vocabulary and phrases',
  'Изучите словарь и фразы для покупок',
  20, 25, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {"en": "How do you ask How much does it cost?", "ru": "Как спросить Сколько это стоит?"},
        "options": [
          {"id": "a", "text": "Ile to kosztuje?", "isCorrect": true},
          {"id": "b", "text": "Co to jest?", "isCorrect": false},
          {"id": "c", "text": "Gdzie jest sklep?", "isCorrect": false}
        ]
      }
    ]
  }'::jsonb
);

-- Lesson 9: Transportation
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'A2', 9, 3, 2,
  'Transportation',
  'Транспорт',
  'Learn how to talk about getting around',
  'Научитесь говорить о передвижении',
  20, 25, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {"en": "How do you say bus in Polish?", "ru": "Как сказать автобус по-польски?"},
        "options": [
          {"id": "a", "text": "autobus", "isCorrect": true},
          {"id": "b", "text": "tramwaj", "isCorrect": false},
          {"id": "c", "text": "pociąg", "isCorrect": false}
        ]
      }
    ]
  }'::jsonb
);

-- Lesson 10: Directions
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'A2', 10, 3, 3,
  'Asking for Directions',
  'Спросить дорогу',
  'Learn how to ask for and give directions',
  'Научитесь спрашивать и указывать дорогу',
  20, 25, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "translation",
        "prompt": {"en": "Where is the train station?", "ru": "Где находится вокзал?"},
        "correctAnswer": "Gdzie jest dworzec kolejowy?",
        "acceptableAnswers": ["Gdzie jest dworzec?", "Gdzie jest dworzec kolejowy?"]
      }
    ]
  }'::jsonb
);

-- Lesson 11: Weather
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'A2', 11, 4, 1,
  'Talking About Weather',
  'Разговор о погоде',
  'Learn weather vocabulary and expressions',
  'Изучите словарь и выражения о погоде',
  15, 20, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {"en": "How do you say It is raining?", "ru": "Как сказать Идёт дождь?"},
        "options": [
          {"id": "a", "text": "Pada deszcz", "isCorrect": true},
          {"id": "b", "text": "Jest słonecznie", "isCorrect": false},
          {"id": "c", "text": "Jest zimno", "isCorrect": false}
        ]
      }
    ]
  }'::jsonb
);

-- Lesson 12: Hobbies
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'A2', 12, 4, 2,
  'Hobbies and Free Time',
  'Хобби и свободное время',
  'Learn to talk about your hobbies and interests',
  'Научитесь говорить о хобби и интересах',
  20, 25, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {"en": "How do you say I like to read?", "ru": "Как сказать Я люблю читать?"},
        "options": [
          {"id": "a", "text": "Lubię czytać", "isCorrect": true},
          {"id": "b", "text": "Lubię pisać", "isCorrect": false},
          {"id": "c", "text": "Lubię słuchać", "isCorrect": false}
        ]
      }
    ]
  }'::jsonb
);

-- Lesson 13: Work and Professions
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'A2', 13, 4, 3,
  'Work and Professions',
  'Работа и профессии',
  'Learn vocabulary for jobs and workplaces',
  'Изучите словарь для работ и рабочих мест',
  20, 25, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {"en": "How do you say teacher in Polish?", "ru": "Как сказать учитель по-польски?"},
        "options": [
          {"id": "a", "text": "nauczyciel", "isCorrect": true},
          {"id": "b", "text": "lekarz", "isCorrect": false},
          {"id": "c", "text": "inżynier", "isCorrect": false}
        ]
      }
    ]
  }'::jsonb
);

-- Lesson 14: Health and Body
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'A2', 14, 5, 1,
  'Health and Body Parts',
  'Здоровье и части тела',
  'Learn vocabulary for health and body',
  'Изучите словарь для здоровья и тела',
  20, 25, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {"en": "How do you say I am sick?", "ru": "Как сказать Я болен?"},
        "options": [
          {"id": "a", "text": "Jestem chory", "isCorrect": true},
          {"id": "b", "text": "Jestem zdrowy", "isCorrect": false},
          {"id": "c", "text": "Jestem szczęśliwy", "isCorrect": false}
        ]
      }
    ]
  }'::jsonb
);

-- Lesson 15: Making Plans
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'A2', 15, 5, 2,
  'Making Plans and Appointments',
  'Составление планов и встреч',
  'Learn to arrange meetings and make plans',
  'Научитесь договариваться о встречах и составлять планы',
  20, 25, true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "translation",
        "prompt": {"en": "Shall we meet tomorrow?", "ru": "Встретимся завтра?"},
        "correctAnswer": "Spotkamy się jutro?",
        "acceptableAnswers": ["Spotkamy się jutro?", "Czy spotkamy się jutro?"]
      }
    ]
  }'::jsonb
);
