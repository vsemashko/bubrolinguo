-- Minimal lesson seed for testing
-- 3 simple A1 lessons to get started

INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES
-- Lesson 1
(
  'A1', 1, 1, 1,
  'Basic Greetings', 'Основные приветствия',
  'Learn essential Polish greetings', 'Изучите основные польские приветствия',
  15, 20, true,
  '{"exercises": [{"id": "ex1", "type": "multiple_choice", "question": {"en": "How do you say Hello in Polish?", "ru": "Как сказать Привет по-польски?"}, "options": [{"id": "a", "text": "Cześć", "isCorrect": true}, {"id": "b", "text": "Dziękuję", "isCorrect": false}], "correctAnswerId": "a", "explanation": {"en": "Cześć is the informal way to say hello", "ru": "Cześć - неформальный способ поздороваться"}}]}'::jsonb
),
-- Lesson 2
(
  'A1', 2, 1, 2,
  'Numbers 1-10', 'Числа 1-10',
  'Learn to count in Polish', 'Научитесь считать по-польски',
  15, 20, true,
  '{"exercises": [{"id": "ex1", "type": "multiple_choice", "question": {"en": "What is number 1 in Polish?", "ru": "Что такое число 1 по-польски?"}, "options": [{"id": "a", "text": "jeden", "isCorrect": true}, {"id": "b", "text": "dwa", "isCorrect": false}], "correctAnswerId": "a"}]}'::jsonb
),
-- Lesson 3
(
  'A1', 3, 1, 3,
  'Colors', 'Цвета',
  'Learn basic colors in Polish', 'Изучите основные цвета по-польски',
  15, 20, true,
  '{"exercises": [{"id": "ex1", "type": "multiple_choice", "question": {"en": "What color is czerwony?", "ru": "Какого цвета czerwony?"}, "options": [{"id": "a", "text": "Red", "isCorrect": true}, {"id": "b", "text": "Blue", "isCorrect": false}], "correctAnswerId": "a"}]}'::jsonb
);
