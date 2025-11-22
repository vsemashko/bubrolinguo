-- Minimal vocabulary seed for testing
-- 20 common A1 Polish words

INSERT INTO vocabulary (
  polish_word, translation_en, translation_ru, pronunciation_ipa,
  level, part_of_speech, example_sentence_pl,
  example_sentence_en, example_sentence_ru
) VALUES
('cześć', 'hello/hi', 'привет', '/ʧɛɕʨ/', 'A1', 'interjection', 'Cześć! Jak się masz?', 'Hi! How are you?', 'Привет! Как дела?'),
('dzień dobry', 'good morning/day', 'добрый день', '/ʥɛɲ ˈdɔbrɨ/', 'A1', 'phrase', 'Dzień dobry, pani Anno.', 'Good day, Ms. Anna.', 'Добрый день, госпожа Анна.'),
('dziękuję', 'thank you', 'спасибо', '/ʥɛŋˈkujɛ/', 'A1', 'verb', 'Dziękuję za pomoc.', 'Thank you for help.', 'Спасибо за помощь.'),
('proszę', 'please/you''re welcome', 'пожалуйста', '/ˈprɔʂɛ/', 'A1', 'verb', 'Proszę bardzo.', 'You''re very welcome.', 'Пожалуйста.'),
('tak', 'yes', 'да', '/tak/', 'A1', 'particle', 'Tak, rozumiem.', 'Yes, I understand.', 'Да, понимаю.'),
('nie', 'no/not', 'нет/не', '/ɲɛ/', 'A1', 'particle', 'Nie, dziękuję.', 'No, thank you.', 'Нет, спасибо.'),
('ja', 'I', 'я', '/ja/', 'A1', 'pronoun', 'Ja jestem Adam.', 'I am Adam.', 'Я Адам.'),
('ty', 'you (informal)', 'ты', '/tɨ/', 'A1', 'pronoun', 'Ty jesteś miły.', 'You are nice.', 'Ты милый.'),
('on', 'he', 'он', '/ɔn/', 'A1', 'pronoun', 'On jest studentem.', 'He is a student.', 'Он студент.'),
('ona', 'she', 'она', '/ˈɔna/', 'A1', 'pronoun', 'Ona jest nauczycielką.', 'She is a teacher.', 'Она учительница.'),
('jeden', 'one', 'один', '/ˈjɛdɛn/', 'A1', 'numeral', 'Mam jeden kot.', 'I have one cat.', 'У меня один кот.'),
('dwa', 'two', 'два', '/dva/', 'A1', 'numeral', 'Mam dwa psy.', 'I have two dogs.', 'У меня две собаки.'),
('trzy', 'three', 'три', '/tʂɨ/', 'A1', 'numeral', 'Trzy jabłka.', 'Three apples.', 'Три яблока.'),
('czerwony', 'red', 'красный', '/ʧɛrˈvɔnɨ/', 'A1', 'adjective', 'Czerwona róża.', 'Red rose.', 'Красная роза.'),
('niebieski', 'blue', 'синий', '/ɲɛˈbjɛskʲi/', 'A1', 'adjective', 'Niebieskie niebo.', 'Blue sky.', 'Синее небо.'),
('dom', 'house', 'дом', '/dɔm/', 'A1', 'noun', 'To jest mój dom.', 'This is my house.', 'Это мой дом.'),
('rodzina', 'family', 'семья', '/rɔˈʥina/', 'A1', 'noun', 'Moja rodzina jest duża.', 'My family is big.', 'Моя семья большая.'),
('matka', 'mother', 'мать', '/ˈmatka/', 'A1', 'noun', 'Moja matka gotuje.', 'My mother cooks.', 'Моя мама готовит.'),
('ojciec', 'father', 'отец', '/ˈɔjʨɛʦ/', 'A1', 'noun', 'Mój ojciec pracuje.', 'My father works.', 'Мой отец работает.'),
('woda', 'water', 'вода', '/ˈvɔda/', 'A1', 'noun', 'Pije wodę.', 'I drink water.', 'Я пью воду.');
