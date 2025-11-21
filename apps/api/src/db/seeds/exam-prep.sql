-- Seed data for Exam Preparation Module
-- Mock exams, sections, questions, and study resources

-- =====================================================
-- A1 LEVEL MOCK EXAM
-- =====================================================

-- Insert A1 Mock Exam
INSERT INTO mock_exams (
  title_en, title_ru, description_en, description_ru,
  level, exam_type, total_time_minutes, passing_score_percentage,
  instructions_en, instructions_ru
) VALUES (
  'A1 Polish Language Certification Mock Exam',
  'Пробный экзамен A1 на сертификат польского языка',
  'Full-length practice test simulating the official A1 Polish certification exam',
  'Полноценный практический тест, имитирующий официальный экзамен A1 на польский язык',
  'A1',
  'full',
  90, -- Total: 30+20+30+10 minutes
  60,
  'This mock exam consists of 4 sections: Reading (30 min), Listening (20 min), Writing (30 min), and Speaking (10 min). You must score at least 60% overall to pass.',
  'Этот пробный экзамен состоит из 4 частей: Чтение (30 мин), Аудирование (20 мин), Письмо (30 мин) и Говорение (10 мин). Для успешной сдачи необходимо набрать минимум 60% общего балла.'
);

-- A1 Exam Sections
INSERT INTO mock_exam_sections (mock_exam_id, section_type, section_number, title_en, title_ru, instructions_en, instructions_ru, time_limit_minutes, max_points)
VALUES
  (1, 'reading', 1, 'Reading Comprehension', 'Понимание прочитанного', 'Read the texts and answer the questions', 'Прочитайте тексты и ответьте на вопросы', 30, 30),
  (1, 'listening', 2, 'Listening Comprehension', 'Понимание на слух', 'Listen to the recordings and answer the questions', 'Прослушайте записи и ответьте на вопросы', 20, 20),
  (1, 'writing', 3, 'Writing', 'Письмо', 'Complete the writing tasks', 'Выполните письменные задания', 30, 30),
  (1, 'speaking', 4, 'Speaking', 'Говорение', 'Respond to the speaking prompts', 'Ответьте на устные задания', 10, 20);

-- A1 Reading Questions (Section 1)
INSERT INTO exam_questions (section_id, question_number, question_type, question_data, points, difficulty, correct_answers)
VALUES
  (1, 1, 'multiple_choice', '{
    "prompt": {
      "en": "Read the text: \"Cześć! Nazywam się Anna. Mam 25 lat. Jestem z Polski. Mieszkam w Warszawie. Pracuję w szkole. Lubię czytać książki.\" What is Anna''s profession?",
      "ru": "Прочитайте текст: «Cześć! Nazywam się Anna. Mam 25 lat. Jestem z Polski. Mieszkam w Warszawie. Pracuję w szkole. Lubię czytać książki.» Какая профессия у Анны?"
    },
    "options": [
      {"id": "a", "text": "Teacher / Учительница", "isCorrect": true},
      {"id": "b", "text": "Doctor / Врач", "isCorrect": false},
      {"id": "c", "text": "Student / Студентка", "isCorrect": false},
      {"id": "d", "text": "Engineer / Инженер", "isCorrect": false}
    ],
    "explanation": {
      "en": "The text says \"Pracuję w szkole\" (I work in a school), which indicates she is a teacher.",
      "ru": "В тексте сказано «Pracuję w szkole» (Я работаю в школе), что указывает на то, что она учительница."
    }
  }', 2, 'easy', '["a"]'),

  (1, 2, 'multiple_choice', '{
    "prompt": {
      "en": "Read: \"Sklep jest otwarty od poniedziałku do piątku od 9:00 do 18:00.\" When is the store open?",
      "ru": "Прочитайте: «Sklep jest otwarty od poniedziałku do piątku od 9:00 do 18:00.» Когда открыт магазин?"
    },
    "options": [
      {"id": "a", "text": "Monday to Friday, 9:00-18:00", "isCorrect": true},
      {"id": "b", "text": "Every day, 9:00-18:00", "isCorrect": false},
      {"id": "c", "text": "Saturday and Sunday only", "isCorrect": false},
      {"id": "d", "text": "24 hours", "isCorrect": false}
    ],
    "explanation": {
      "en": "Od poniedziałku do piątku means from Monday to Friday.",
      "ru": "Od poniedziałku do piątku означает с понедельника по пятницу."
    }
  }', 2, 'easy', '["a"]'),

  (1, 3, 'true_false', '{
    "prompt": {
      "en": "Read: \"Lubię pizzę, ale nie lubię kawy.\" True or False: The person likes coffee.",
      "ru": "Прочитайте: «Lubię pizzę, ale nie lubię kawy.» Правда или ложь: Человек любит кофе."
    },
    "options": [
      {"id": "true", "text": "True / Правда"},
      {"id": "false", "text": "False / Ложь"}
    ],
    "explanation": {
      "en": "The text says \"nie lubię kawy\" (I don''t like coffee), so the statement is false.",
      "ru": "В тексте сказано «nie lubię kawy» (я не люблю кофе), поэтому утверждение ложно."
    }
  }', 2, 'easy', '["false"]');

-- A1 Listening Questions (Section 2)
INSERT INTO exam_questions (section_id, question_number, question_type, question_data, points, difficulty, correct_answers)
VALUES
  (2, 1, 'listening_comprehension', '{
    "audioText": "Dzień dobry. Nazywam się Piotr. Jestem lekarzem. Pracuję w szpitalu w Krakowie.",
    "prompt": {
      "en": "Listen and answer: What is Piotr''s profession?",
      "ru": "Прослушайте и ответьте: Какая профессия у Петра?"
    },
    "options": [
      {"id": "a", "text": "Doctor / Врач", "isCorrect": true},
      {"id": "b", "text": "Teacher / Учитель", "isCorrect": false},
      {"id": "c", "text": "Engineer / Инженер", "isCorrect": false},
      {"id": "d", "text": "Lawyer / Юрист", "isCorrect": false}
    ],
    "explanation": {
      "en": "Piotr says \"Jestem lekarzem\" which means \"I am a doctor.\"",
      "ru": "Пётр говорит «Jestem lekarzem», что означает «Я врач»."
    }
  }', 2, 'easy', '["a"]'),

  (2, 2, 'listening_comprehension', '{
    "audioText": "Jutro jest sobota. Pogoda będzie słoneczna. Temperatura: dwadzieścia stopni.",
    "prompt": {
      "en": "Listen and answer: What will the weather be like tomorrow?",
      "ru": "Прослушайте и ответьте: Какая будет погода завтра?"
    },
    "options": [
      {"id": "a", "text": "Sunny / Солнечно", "isCorrect": true},
      {"id": "b", "text": "Rainy / Дождливо", "isCorrect": false},
      {"id": "c", "text": "Snowy / Снежно", "isCorrect": false},
      {"id": "d", "text": "Cloudy / Облачно", "isCorrect": false}
    ],
    "explanation": {
      "en": "The audio says \"Pogoda będzie słoneczna\" (weather will be sunny).",
      "ru": "В аудио говорится «Pogoda będzie słoneczna» (погода будет солнечной)."
    }
  }', 2, 'easy', '["a"]');

-- A1 Writing Questions (Section 3)
INSERT INTO exam_questions (section_id, question_number, question_type, question_data, points, difficulty, grading_criteria)
VALUES
  (3, 1, 'short_answer', '{
    "prompt": {
      "en": "Write 2-3 sentences about yourself (name, age, where you live)",
      "ru": "Напишите 2-3 предложения о себе (имя, возраст, где живёте)"
    },
    "minWords": 10,
    "maxWords": 30,
    "sampleAnswer": "Nazywam się Maria. Mam 30 lat. Mieszkam w Gdańsku."
  }', 10, 'easy', '{
    "criteria": [
      {"name": "grammar", "points": 3, "description": "Correct grammar and sentence structure"},
      {"name": "vocabulary", "points": 3, "description": "Appropriate vocabulary usage"},
      {"name": "task_completion", "points": 4, "description": "Answered all required elements"}
    ]
  }'),

  (3, 2, 'short_answer', '{
    "prompt": {
      "en": "Write an email to a friend inviting them to your birthday party (50-80 words)",
      "ru": "Напишите письмо другу с приглашением на день рождения (50-80 слов)"
    },
    "minWords": 50,
    "maxWords": 80,
    "sampleAnswer": "Cześć Aniu! Zapraszam Cię na moją imprezę urodzinową. Będzie w sobotę o 18:00 w mojej restauracji ulubionej. Będzie muzyka, jedzenie i tort! Mam nadzieję, że przyjdziesz. Pozdrawiam, Kasia"
  }', 15, 'medium', '{
    "criteria": [
      {"name": "grammar", "points": 5, "description": "Grammar accuracy"},
      {"name": "vocabulary", "points": 3, "description": "Range of vocabulary"},
      {"name": "task_completion", "points": 4, "description": "Includes all required information"},
      {"name": "format", "points": 3, "description": "Appropriate email format"}
    ]
  }');

-- A1 Speaking Questions (Section 4)
INSERT INTO exam_questions (section_id, question_number, question_type, question_data, points, difficulty, grading_criteria)
VALUES
  (4, 1, 'speaking_prompt', '{
    "prompt": {
      "en": "Introduce yourself: say your name, age, nationality, and where you live",
      "ru": "Представьтесь: назовите имя, возраст, национальность и где вы живёте"
    },
    "preparationTime": 30,
    "speakingTime": 60,
    "sampleAnswer": "Dzień dobry. Nazywam się Jan Kowalski. Mam dwadzieścia pięć lat. Jestem z Polski. Mieszkam w Warszawie."
  }', 10, 'easy', '{
    "criteria": [
      {"name": "pronunciation", "points": 3},
      {"name": "grammar", "points": 3},
      {"name": "vocabulary", "points": 2},
      {"name": "task_completion", "points": 2}
    ]
  }'),

  (4, 2, 'speaking_prompt', '{
    "prompt": {
      "en": "Describe your typical day: when you wake up, what you do, when you go to bed",
      "ru": "Опишите свой обычный день: когда встаёте, что делаете, когда ложитесь спать"
    },
    "preparationTime": 60,
    "speakingTime": 90,
    "sampleAnswer": "Wstaję o siódmej rano. Jem śniadanie i piję kawę. Potem idę do pracy. Pracuję od ósmej do czwartej. Wieczorem gotuję kolację i oglądam telewizję. Idę spać o jedenastej."
  }', 10, 'medium', '{
    "criteria": [
      {"name": "pronunciation", "points": 3},
      {"name": "grammar", "points": 3},
      {"name": "vocabulary", "points": 2},
      {"name": "fluency", "points": 2}
    ]
  }');

-- =====================================================
-- B1 LEVEL MOCK EXAM
-- =====================================================

INSERT INTO mock_exams (
  title_en, title_ru, description_en, description_ru,
  level, exam_type, total_time_minutes, passing_score_percentage,
  instructions_en, instructions_ru
) VALUES (
  'B1 Polish Language Certification Mock Exam',
  'Пробный экзамен B1 на сертификат польского языка',
  'Full-length practice test simulating the official B1 Polish certification exam',
  'Полноценный практический тест, имитирующий официальный экзамен B1 на польский язык',
  'B1',
  'full',
  165, -- Total: 60+30+60+15 minutes
  60,
  'This intermediate-level mock exam tests your ability to understand and produce Polish in everyday and professional contexts. Passing score: 60%.',
  'Этот экзамен среднего уровня проверяет вашу способность понимать и использовать польский язык в повседневных и профессиональных контекстах. Проходной балл: 60%.'
);

-- B1 Exam Sections
INSERT INTO mock_exam_sections (mock_exam_id, section_type, section_number, title_en, title_ru, instructions_en, instructions_ru, time_limit_minutes, max_points)
VALUES
  (2, 'reading', 1, 'Reading Comprehension', 'Понимание прочитанного', 'Read the texts and answer the questions', 'Прочитайте тексты и ответьте на вопросы', 60, 40),
  (2, 'listening', 2, 'Listening Comprehension', 'Понимание на слух', 'Listen to the recordings and answer the questions', 'Прослушайте записи и ответьте на вопросы', 30, 30),
  (2, 'writing', 3, 'Writing', 'Письмо', 'Complete the writing tasks', 'Выполните письменные задания', 60, 40),
  (2, 'speaking', 4, 'Speaking', 'Говорение', 'Respond to the speaking prompts', 'Ответьте на устные задания', 15, 30);

-- B1 Reading Question Sample
INSERT INTO exam_questions (section_id, question_number, question_type, question_data, points, difficulty, correct_answers)
VALUES
  (5, 1, 'multiple_choice', '{
    "prompt": {
      "en": "Read the text: \"Polska jest krajem w Europie Środkowej. Ma długą i bogatą historię. Warszawa, stolica Polski, jest centrum kulturalnym i gospodarczym kraju. Polski język należy do grupy języków słowiańskich.\" What is the main topic?",
      "ru": "Прочитайте текст: «Polska jest krajem w Europie Środkowej. Ma długą i bogatą historię. Warszawa, stolica Polski, jest centrum kulturalnym i gospodarczym kraju. Polski język należy do grupy języków słowiańskich.» Какая основная тема?"
    },
    "options": [
      {"id": "a", "text": "General information about Poland", "isCorrect": true},
      {"id": "b", "text": "Polish cuisine", "isCorrect": false},
      {"id": "c", "text": "Tourism in Warsaw", "isCorrect": false},
      {"id": "d", "text": "Slavic grammar rules", "isCorrect": false}
    ],
    "explanation": {
      "en": "The text provides general facts about Poland: its location, history, capital, and language family.",
      "ru": "Текст предоставляет общие факты о Польше: её расположение, историю, столицу и языковую семью."
    }
  }', 3, 'medium', '["a"]');

-- =====================================================
-- EXAM STUDY RESOURCES
-- =====================================================

-- General Test-Taking Strategies
INSERT INTO exam_study_resources (level, section_type, resource_type, title_en, title_ru, content_en, content_ru, display_order)
VALUES
  ('A1', 'general', 'strategy', 'Time Management for A1 Exam', 'Управление временем на экзамене A1',
  'Allocate your time wisely across all four sections. Don''t spend too much time on difficult questions. If you''re stuck, move on and return later if time permits.',
  'Разумно распределяйте время между всеми четырьмя частями. Не тратьте слишком много времени на сложные вопросы. Если застряли, переходите дальше и вернитесь позже, если останется время.', 1),

  ('A1', 'reading', 'tip', 'Scanning for Key Information', 'Поиск ключевой информации',
  'First, read the question to understand what you''re looking for. Then scan the text for keywords related to the question. You don''t need to understand every word.',
  'Сначала прочитайте вопрос, чтобы понять, что вы ищете. Затем просканируйте текст на ключевые слова, связанные с вопросом. Вам не нужно понимать каждое слово.', 2),

  ('A1', 'listening', 'tip', 'Listen for Specific Details', 'Слушайте конкретные детали',
  'Before the audio plays, read the question. Focus on listening for specific information like numbers, names, times, and places. You''ll hear each recording twice.',
  'Перед воспроизведением аудио прочитайте вопрос. Сосредоточьтесь на прослушивании конкретной информации, такой как числа, имена, время и места. Вы услышите каждую запись дважды.', 3),

  ('A1', 'writing', 'common_mistake', 'Verb Agreement Errors', 'Ошибки в согласовании глаголов',
  'Common mistake: Using wrong verb endings. Remember: Ja pracuję (I work), Ty pracujesz (you work), On/Ona pracuje (he/she works). Practice conjugations regularly.',
  'Распространённая ошибка: Неправильные окончания глаголов. Помните: Ja pracuję (я работаю), Ty pracujesz (ты работаешь), On/Ona pracuje (он/она работает). Регулярно практикуйте спряжения.', 4),

  ('A1', 'speaking', 'stress_management', 'Stay Calm During Speaking', 'Сохраняйте спокойствие во время говорения',
  'It''s normal to feel nervous. Take a deep breath before starting. Speak slowly and clearly. If you make a mistake, it''s okay—just continue speaking. The examiner wants to hear you communicate, not speak perfectly.',
  'Нервничать нормально. Сделайте глубокий вдох перед началом. Говорите медленно и чётко. Если допустили ошибку, это нормально—просто продолжайте говорить. Экзаменатор хочет услышать, как вы общаетесь, а не говорите идеально.', 5),

  ('B1', 'reading', 'strategy', 'Understanding Context', 'Понимание контекста',
  'For B1 reading, focus on understanding main ideas and author''s purpose. Look for topic sentences at the beginning of paragraphs. Use context clues to guess unfamiliar words.',
  'Для чтения B1 сосредоточьтесь на понимании основных идей и цели автора. Ищите тематические предложения в начале абзацев. Используйте контекстные подсказки для угадывания незнакомых слов.', 6),

  ('B1', 'writing', 'tip', 'Structuring Your Essay', 'Структура вашего эссе',
  'Use clear paragraph structure: Introduction (state your topic), Body paragraphs (develop ideas with examples), Conclusion (summarize main points). Use linking words: po pierwsze (firstly), jednak (however), w końcu (finally).',
  'Используйте чёткую структуру абзацев: Введение (укажите тему), Основные абзацы (развивайте идеи с примерами), Заключение (резюмируйте основные пункты). Используйте слова-связки: po pierwsze (во-первых), jednak (однако), w końcu (наконец).', 7),

  ('B1', 'listening', 'strategy', 'Note-Taking During Listening', 'Заметки во время прослушивания',
  'While listening, jot down key information: numbers, dates, names, main ideas. Use abbreviations. Don''t try to write full sentences—focus on understanding first.',
  'Во время прослушивания записывайте ключевую информацию: числа, даты, имена, основные идеи. Используйте сокращения. Не пытайтесь писать полные предложения—сначала сосредоточьтесь на понимании.', 8),

  ('B1', 'speaking', 'tip', 'Expanding Your Answers', 'Расширение ваших ответов',
  'Don''t give one-word answers. Always expand: answer the question, give a reason, provide an example. Practice connecting ideas with conjunctions: ponieważ (because), chociaż (although), więc (so).',
  'Не давайте односложных ответов. Всегда расширяйте: ответьте на вопрос, дайте причину, приведите пример. Практикуйте связывание идей союзами: ponieważ (потому что), chociaż (хотя), więc (так что).', 9);

-- More comprehensive study resources would be added here
-- This is a representative sample showing the structure

-- Add statistics/analytics view (optional - useful for admin dashboard)
CREATE OR REPLACE VIEW exam_statistics AS
SELECT
  me.level,
  me.title_en,
  COUNT(DISTINCT uea.user_id) as total_attempts,
  AVG(uea.percentage_score) as avg_score,
  COUNT(CASE WHEN uea.passed = true THEN 1 END) as passed_count,
  COUNT(CASE WHEN uea.passed = false THEN 1 END) as failed_count,
  AVG(uea.time_spent_minutes) as avg_time_minutes
FROM mock_exams me
LEFT JOIN user_exam_attempts uea ON me.id = uea.mock_exam_id
WHERE uea.status = 'completed'
GROUP BY me.id, me.level, me.title_en
ORDER BY me.level, me.title_en;

COMMENT ON VIEW exam_statistics IS 'Aggregated statistics for exam performance analysis';
