-- Seed data for achievements table
-- Comprehensive achievement system for gamification

-- LESSON COMPLETION ACHIEVEMENTS
INSERT INTO achievements (code, title_en, title_ru, description_en, description_ru, requirement_type, requirement_value, xp_reward) VALUES
('first_lesson', 'First Steps', 'Первые шаги', 'Complete your first lesson', 'Завершите свой первый урок', 'lessons_completed', 1, 10),
('lessons_5', 'Getting Started', 'Начало пути', 'Complete 5 lessons', 'Завершите 5 уроков', 'lessons_completed', 5, 25),
('lessons_10', 'Dedicated Learner', 'Усердный ученик', 'Complete 10 lessons', 'Завершите 10 уроков', 'lessons_completed', 10, 50),
('lessons_25', 'Knowledge Seeker', 'Искатель знаний', 'Complete 25 lessons', 'Завершите 25 уроков', 'lessons_completed', 25, 100),
('lessons_50', 'Master Student', 'Мастер-студент', 'Complete 50 lessons', 'Завершите 50 уроков', 'lessons_completed', 50, 200),
('lessons_100', 'Lesson Legend', 'Легенда уроков', 'Complete 100 lessons', 'Завершите 100 уроков', 'lessons_completed', 100, 500);

-- VOCABULARY ACHIEVEMENTS
INSERT INTO achievements (code, title_en, title_ru, description_en, description_ru, requirement_type, requirement_value, xp_reward) VALUES
('words_10', 'Word Warrior', 'Воин слов', 'Learn 10 new words', 'Выучите 10 новых слов', 'words_learned', 10, 20),
('words_50', 'Vocabulary Builder', 'Строитель словаря', 'Learn 50 new words', 'Выучите 50 новых слов', 'words_learned', 50, 50),
('words_100', 'Word Master', 'Мастер слов', 'Learn 100 new words', 'Выучите 100 новых слов', 'words_learned', 100, 100),
('words_250', 'Polyglot Path', 'Путь полиглота', 'Learn 250 new words', 'Выучите 250 новых слов', 'words_learned', 250, 250),
('words_500', 'Vocabulary Expert', 'Эксперт по лексике', 'Learn 500 new words', 'Выучите 500 новых слов', 'words_learned', 500, 500),
('words_1000', 'Dictionary Master', 'Мастер словаря', 'Learn 1000 new words', 'Выучите 1000 новых слов', 'words_learned', 1000, 1000);

-- MASTERY ACHIEVEMENTS
INSERT INTO achievements (code, title_en, title_ru, description_en, description_ru, requirement_type, requirement_value, xp_reward) VALUES
('mastered_5', 'Quick Learner', 'Быстрый ученик', 'Master 5 words', 'Освойте 5 слов', 'words_mastered', 5, 25),
('mastered_25', 'Word Expert', 'Эксперт слов', 'Master 25 words', 'Освойте 25 слов', 'words_mastered', 25, 75),
('mastered_50', 'Mastery Achiever', 'Достигающий мастерства', 'Master 50 words', 'Освойте 50 слов', 'words_mastered', 50, 150),
('mastered_100', 'Language Master', 'Мастер языка', 'Master 100 words', 'Освойте 100 слов', 'words_mastered', 100, 300),
('mastered_250', 'Perfect Memory', 'Идеальная память', 'Master 250 words', 'Освойте 250 слов', 'words_mastered', 250, 750),
('mastered_500', 'Memory Champion', 'Чемпион памяти', 'Master 500 words', 'Освойте 500 слов', 'words_mastered', 500, 1500);

-- STREAK ACHIEVEMENTS
INSERT INTO achievements (code, title_en, title_ru, description_en, description_ru, requirement_type, requirement_value, xp_reward) VALUES
('streak_3', 'Starting Strong', 'Сильное начало', 'Maintain a 3-day streak', 'Поддерживайте серию в 3 дня', 'current_streak', 3, 15),
('streak_7', 'Week Warrior', 'Воин недели', 'Maintain a 7-day streak', 'Поддерживайте серию в 7 дней', 'current_streak', 7, 35),
('streak_14', 'Committed Learner', 'Преданный ученик', 'Maintain a 14-day streak', 'Поддерживайте серию в 14 дней', 'current_streak', 14, 70),
('streak_30', 'Monthly Master', 'Мастер месяца', 'Maintain a 30-day streak', 'Поддерживайте серию в 30 дней', 'current_streak', 30, 150),
('streak_60', 'Consistency King', 'Король постоянства', 'Maintain a 60-day streak', 'Поддерживайте серию в 60 дней', 'current_streak', 60, 300),
('streak_100', 'Unstoppable', 'Неудержимый', 'Maintain a 100-day streak', 'Поддерживайте серию в 100 дней', 'current_streak', 100, 500),
('streak_365', 'Legendary Dedication', 'Легендарная преданность', 'Maintain a 365-day streak', 'Поддерживайте серию в 365 дней', 'current_streak', 365, 3650);

-- XP ACHIEVEMENTS
INSERT INTO achievements (code, title_en, title_ru, description_en, description_ru, requirement_type, requirement_value, xp_reward) VALUES
('xp_100', 'Point Collector', 'Коллекционер очков', 'Earn 100 XP', 'Заработайте 100 XP', 'total_xp', 100, 10),
('xp_500', 'Experience Seeker', 'Искатель опыта', 'Earn 500 XP', 'Заработайте 500 XP', 'total_xp', 500, 50),
('xp_1000', 'XP Enthusiast', 'Энтузиаст XP', 'Earn 1000 XP', 'Заработайте 1000 XP', 'total_xp', 1000, 100),
('xp_2500', 'Power Learner', 'Мощный ученик', 'Earn 2500 XP', 'Заработайте 2500 XP', 'total_xp', 2500, 250),
('xp_5000', 'Elite Student', 'Элитный студент', 'Earn 5000 XP', 'Заработайте 5000 XP', 'total_xp', 5000, 500),
('xp_10000', 'XP Legend', 'Легенда XP', 'Earn 10000 XP', 'Заработайте 10000 XP', 'total_xp', 10000, 1000);

-- LEVEL PROGRESSION ACHIEVEMENTS
INSERT INTO achievements (code, title_en, title_ru, description_en, description_ru, requirement_type, requirement_value, xp_reward) VALUES
('level_a1', 'A1 Complete', 'A1 завершён', 'Complete all A1 lessons', 'Завершите все уроки A1', 'level_reached', 1, 100),
('level_a2', 'A2 Complete', 'A2 завершён', 'Complete all A2 lessons', 'Завершите все уроки A2', 'level_reached', 2, 200),
('level_b1', 'B1 Complete', 'B1 завершён', 'Complete all B1 lessons', 'Завершите все уроки B1', 'level_reached', 3, 300),
('level_b2', 'B2 Complete', 'B2 завершён', 'Complete all B2 lessons', 'Завершите все уроки B2', 'level_reached', 4, 400),
('level_c1', 'C1 Complete', 'C1 завершён', 'Complete all C1 lessons', 'Завершите все уроки C1', 'level_reached', 5, 500);

-- PRACTICE ACHIEVEMENTS
INSERT INTO achievements (code, title_en, title_ru, description_en, description_ru, requirement_type, requirement_value, xp_reward) VALUES
('review_10', 'Review Rookie', 'Новичок в повторении', 'Review 10 words', 'Повторите 10 слов', 'words_reviewed', 10, 10),
('review_50', 'Practice Makes Perfect', 'Практика делает совершенным', 'Review 50 words', 'Повторите 50 слов', 'words_reviewed', 50, 50),
('review_100', 'Review Master', 'Мастер повторения', 'Review 100 words', 'Повторите 100 слов', 'words_reviewed', 100, 100),
('review_250', 'Dedicated Reviewer', 'Преданный повторению', 'Review 250 words', 'Повторите 250 слов', 'words_reviewed', 250, 250),
('review_500', 'Review Champion', 'Чемпион повторения', 'Review 500 words', 'Повторите 500 слов', 'words_reviewed', 500, 500),
('review_1000', 'Practice Legend', 'Легенда практики', 'Review 1000 words', 'Повторите 1000 слов', 'words_reviewed', 1000, 1000);

-- PERFECT SCORE ACHIEVEMENTS
INSERT INTO achievements (code, title_en, title_ru, description_en, description_ru, requirement_type, requirement_value, xp_reward) VALUES
('perfect_1', 'First Perfect', 'Первый идеальный', 'Get 100% on a lesson', 'Получите 100% в уроке', 'perfect_lessons', 1, 20),
('perfect_5', 'Perfectionist', 'Перфекционист', 'Get 100% on 5 lessons', 'Получите 100% в 5 уроках', 'perfect_lessons', 5, 75),
('perfect_10', 'Flawless Performer', 'Безупречное выполнение', 'Get 100% on 10 lessons', 'Получите 100% в 10 уроках', 'perfect_lessons', 10, 150),
('perfect_25', 'Perfect Master', 'Мастер совершенства', 'Get 100% on 25 lessons', 'Получите 100% в 25 уроках', 'perfect_lessons', 25, 500);

-- SPEED ACHIEVEMENTS
INSERT INTO achievements (code, title_en, title_ru, description_en, description_ru, requirement_type, requirement_value, xp_reward) VALUES
('speed_5_day', 'Speed Learner', 'Быстрый ученик', 'Complete 5 lessons in one day', 'Завершите 5 уроков за один день', 'lessons_in_day', 5, 50),
('speed_10_day', 'Lightning Fast', 'Молниеносно быстрый', 'Complete 10 lessons in one day', 'Завершите 10 уроков за один день', 'lessons_in_day', 10, 100),
('speed_20_week', 'Turbo Mode', 'Турбо режим', 'Complete 20 lessons in one week', 'Завершите 20 уроков за одну неделю', 'lessons_in_week', 20, 200);

-- SPECIAL ACHIEVEMENTS
INSERT INTO achievements (code, title_en, title_ru, description_en, description_ru, requirement_type, requirement_value, xp_reward) VALUES
('early_bird', 'Early Bird', 'Ранняя пташка', 'Complete a lesson before 8 AM', 'Завершите урок до 8 утра', 'morning_lesson', 1, 10),
('night_owl', 'Night Owl', 'Сова', 'Complete a lesson after 10 PM', 'Завершите урок после 10 вечера', 'night_lesson', 1, 10),
('weekend_warrior', 'Weekend Warrior', 'Воин выходных', 'Complete 5 lessons on a weekend', 'Завершите 5 уроков на выходных', 'weekend_lessons', 5, 50),
('bubr_fan', 'Bubr Fan', 'Фанат Бубра', 'Meet Bubr the Beaver in 10 lessons', 'Встретьте бобра Бубра в 10 уроках', 'bubr_encounters', 10, 100);

-- Total: 58 achievements covering various aspects of learning
