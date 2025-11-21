-- Seed data for achievements table
-- Comprehensive achievement system for gamification

-- LESSON COMPLETION ACHIEVEMENTS
INSERT INTO achievements (name_en, name_ru, description_en, description_ru, icon, category, requirement_type, requirement_value) VALUES
('First Steps', 'Первые шаги', 'Complete your first lesson', 'Завершите свой первый урок', '🎯', 'lessons', 'lessons_completed', 1),
('Getting Started', 'Начало пути', 'Complete 5 lessons', 'Завершите 5 уроков', '📚', 'lessons', 'lessons_completed', 5),
('Dedicated Learner', 'Усердный ученик', 'Complete 10 lessons', 'Завершите 10 уроков', '🎓', 'lessons', 'lessons_completed', 10),
('Knowledge Seeker', 'Искатель знаний', 'Complete 25 lessons', 'Завершите 25 уроков', '📖', 'lessons', 'lessons_completed', 25),
('Master Student', 'Мастер-студент', 'Complete 50 lessons', 'Завершите 50 уроков', '🏆', 'lessons', 'lessons_completed', 50),
('Lesson Legend', 'Легенда уроков', 'Complete 100 lessons', 'Завершите 100 уроков', '👑', 'lessons', 'lessons_completed', 100);

-- VOCABULARY ACHIEVEMENTS
INSERT INTO achievements (name_en, name_ru, description_en, description_ru, icon, category, requirement_type, requirement_value) VALUES
('Word Warrior', 'Воин слов', 'Learn 10 new words', 'Выучите 10 новых слов', '📝', 'vocabulary', 'words_learned', 10),
('Vocabulary Builder', 'Строитель словаря', 'Learn 50 new words', 'Выучите 50 новых слов', '📚', 'vocabulary', 'words_learned', 50),
('Word Master', 'Мастер слов', 'Learn 100 new words', 'Выучите 100 новых слов', '🎯', 'vocabulary', 'words_learned', 100),
('Polyglot Path', 'Путь полиглота', 'Learn 250 new words', 'Выучите 250 новых слов', '🌍', 'vocabulary', 'words_learned', 250),
('Vocabulary Expert', 'Эксперт по лексике', 'Learn 500 new words', 'Выучите 500 новых слов', '⭐', 'vocabulary', 'words_learned', 500),
('Dictionary Master', 'Мастер словаря', 'Learn 1000 new words', 'Выучите 1000 новых слов', '👑', 'vocabulary', 'words_learned', 1000);

-- MASTERY ACHIEVEMENTS
INSERT INTO achievements (name_en, name_ru, description_en, description_ru, icon, category, requirement_type, requirement_value) VALUES
('Quick Learner', 'Быстрый ученик', 'Master 5 words', 'Освойте 5 слов', '⚡', 'mastery', 'words_mastered', 5),
('Word Expert', 'Эксперт слов', 'Master 25 words', 'Освойте 25 слов', '🎓', 'mastery', 'words_mastered', 25),
('Mastery Achiever', 'Достигающий мастерства', 'Master 50 words', 'Освойте 50 слов', '🏅', 'mastery', 'words_mastered', 50),
('Language Master', 'Мастер языка', 'Master 100 words', 'Освойте 100 слов', '🏆', 'mastery', 'words_mastered', 100),
('Perfect Memory', 'Идеальная память', 'Master 250 words', 'Освойте 250 слов', '🧠', 'mastery', 'words_mastered', 250),
('Memory Champion', 'Чемпион памяти', 'Master 500 words', 'Освойте 500 слов', '👑', 'mastery', 'words_mastered', 500);

-- STREAK ACHIEVEMENTS
INSERT INTO achievements (name_en, name_ru, description_en, description_ru, icon, category, requirement_type, requirement_value) VALUES
('Starting Strong', 'Сильное начало', 'Maintain a 3-day streak', 'Поддерживайте серию в 3 дня', '🔥', 'streaks', 'current_streak', 3),
('Week Warrior', 'Воин недели', 'Maintain a 7-day streak', 'Поддерживайте серию в 7 дней', '📅', 'streaks', 'current_streak', 7),
('Committed Learner', 'Преданный ученик', 'Maintain a 14-day streak', 'Поддерживайте серию в 14 дней', '💪', 'streaks', 'current_streak', 14),
('Monthly Master', 'Мастер месяца', 'Maintain a 30-day streak', 'Поддерживайте серию в 30 дней', '🗓️', 'streaks', 'current_streak', 30),
('Consistency King', 'Король постоянства', 'Maintain a 60-day streak', 'Поддерживайте серию в 60 дней', '👑', 'streaks', 'current_streak', 60),
('Unstoppable', 'Неудержимый', 'Maintain a 100-day streak', 'Поддерживайте серию в 100 дней', '🚀', 'streaks', 'current_streak', 100),
('Legendary Dedication', 'Легендарная преданность', 'Maintain a 365-day streak', 'Поддерживайте серию в 365 дней', '🌟', 'streaks', 'current_streak', 365);

-- XP ACHIEVEMENTS
INSERT INTO achievements (name_en, name_ru, description_en, description_ru, icon, category, requirement_type, requirement_value) VALUES
('Point Collector', 'Коллекционер очков', 'Earn 100 XP', 'Заработайте 100 XP', '💎', 'xp', 'total_xp', 100),
('Experience Seeker', 'Искатель опыта', 'Earn 500 XP', 'Заработайте 500 XP', '⭐', 'xp', 'total_xp', 500),
('XP Enthusiast', 'Энтузиаст XP', 'Earn 1000 XP', 'Заработайте 1000 XP', '🎯', 'xp', 'total_xp', 1000),
('Power Learner', 'Мощный ученик', 'Earn 2500 XP', 'Заработайте 2500 XP', '💪', 'xp', 'total_xp', 2500),
('Elite Student', 'Элитный студент', 'Earn 5000 XP', 'Заработайте 5000 XP', '🏆', 'xp', 'total_xp', 5000),
('XP Legend', 'Легенда XP', 'Earn 10000 XP', 'Заработайте 10000 XP', '👑', 'xp', 'total_xp', 10000);

-- LEVEL PROGRESSION ACHIEVEMENTS
INSERT INTO achievements (name_en, name_ru, description_en, description_ru, icon, category, requirement_type, requirement_value) VALUES
('A1 Complete', 'A1 завершён', 'Complete all A1 lessons', 'Завершите все уроки A1', '🎓', 'levels', 'level_reached', 1),
('A2 Complete', 'A2 завершён', 'Complete all A2 lessons', 'Завершите все уроки A2', '📚', 'levels', 'level_reached', 2),
('B1 Complete', 'B1 завершён', 'Complete all B1 lessons', 'Завершите все уроки B1', '🏅', 'levels', 'level_reached', 3),
('B2 Complete', 'B2 завершён', 'Complete all B2 lessons', 'Завершите все уроки B2', '🏆', 'levels', 'level_reached', 4),
('C1 Complete', 'C1 завершён', 'Complete all C1 lessons', 'Завершите все уроки C1', '👑', 'levels', 'level_reached', 5);

-- PRACTICE ACHIEVEMENTS
INSERT INTO achievements (name_en, name_ru, description_en, description_ru, icon, category, requirement_type, requirement_value) VALUES
('Review Rookie', 'Новичок в повторении', 'Review 10 words', 'Повторите 10 слов', '🔄', 'practice', 'words_reviewed', 10),
('Practice Makes Perfect', 'Практика делает совершенным', 'Review 50 words', 'Повторите 50 слов', '📝', 'practice', 'words_reviewed', 50),
('Review Master', 'Мастер повторения', 'Review 100 words', 'Повторите 100 слов', '🎯', 'practice', 'words_reviewed', 100),
('Dedicated Reviewer', 'Преданный повторению', 'Review 250 words', 'Повторите 250 слов', '⭐', 'practice', 'words_reviewed', 250),
('Review Champion', 'Чемпион повторения', 'Review 500 words', 'Повторите 500 слов', '🏆', 'practice', 'words_reviewed', 500),
('Practice Legend', 'Легенда практики', 'Review 1000 words', 'Повторите 1000 слов', '👑', 'practice', 'words_reviewed', 1000);

-- PERFECT SCORE ACHIEVEMENTS
INSERT INTO achievements (name_en, name_ru, description_en, description_ru, icon, category, requirement_type, requirement_value) VALUES
('First Perfect', 'Первый идеальный', 'Get 100% on a lesson', 'Получите 100% в уроке', '💯', 'perfection', 'perfect_lessons', 1),
('Perfectionist', 'Перфекционист', 'Get 100% on 5 lessons', 'Получите 100% в 5 уроках', '⭐', 'perfection', 'perfect_lessons', 5),
('Flawless Performer', 'Безупречное выполнение', 'Get 100% on 10 lessons', 'Получите 100% в 10 уроках', '🌟', 'perfection', 'perfect_lessons', 10),
('Perfect Master', 'Мастер совершенства', 'Get 100% on 25 lessons', 'Получите 100% в 25 уроках', '👑', 'perfection', 'perfect_lessons', 25);

-- SPEED ACHIEVEMENTS
INSERT INTO achievements (name_en, name_ru, description_en, description_ru, icon, category, requirement_type, requirement_value) VALUES
('Speed Learner', 'Быстрый ученик', 'Complete 5 lessons in one day', 'Завершите 5 уроков за один день', '⚡', 'speed', 'lessons_in_day', 5),
('Lightning Fast', 'Молниеносно быстрый', 'Complete 10 lessons in one day', 'Завершите 10 уроков за один день', '🌩️', 'speed', 'lessons_in_day', 10),
('Turbo Mode', 'Турбо режим', 'Complete 20 lessons in one week', 'Завершите 20 уроков за одну неделю', '🚀', 'speed', 'lessons_in_week', 20);

-- SPECIAL ACHIEVEMENTS
INSERT INTO achievements (name_en, name_ru, description_en, description_ru, icon, category, requirement_type, requirement_value) VALUES
('Early Bird', 'Ранняя пташка', 'Complete a lesson before 8 AM', 'Завершите урок до 8 утра', '🌅', 'special', 'morning_lesson', 1),
('Night Owl', 'Сова', 'Complete a lesson after 10 PM', 'Завершите урок после 10 вечера', '🌙', 'special', 'night_lesson', 1),
('Weekend Warrior', 'Воин выходных', 'Complete 5 lessons on a weekend', 'Завершите 5 уроков на выходных', '🎮', 'special', 'weekend_lessons', 5),
('Bubr Fan', 'Фанат Бубра', 'Meet Bubr the Beaver in 10 lessons', 'Встретьте бобра Бубра в 10 уроках', '🦫', 'special', 'bubr_encounters', 10);

-- Total: 58 achievements covering various aspects of learning
