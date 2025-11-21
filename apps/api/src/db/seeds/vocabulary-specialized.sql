-- Vocabulary Completion: Specialized Topics and Remaining Gaps
-- Adding ~300 words to reach 1,600+ total vocabulary
-- Topics: Food, Weather, Technology, Emotions, Household, Nature, Advanced B2

-- =====================================================
-- FOOD AND DINING (All Levels)
-- =====================================================

INSERT INTO vocabulary (polish_word, translation_en, translation_ru, part_of_speech, gender, level, frequency_rank, pronunciation_ipa, example_sentence_pl, example_sentence_en, example_sentence_ru) VALUES
('jedzenie', 'food', 'еда', 'noun', 'neuter', 'A2', 1001, 'jɛd͡zɛɲɛ', 'Lubię polskie jedzenie.', 'I like Polish food.', 'Мне нравится польская еда.'),
('śniadanie', 'breakfast', 'завтрак', 'noun', 'neuter', 'A2', 1002, 'ɕɲadaɲɛ', 'Jem śniadanie o 7:00.', 'I eat breakfast at 7:00.', 'Я завтракаю в 7:00.'),
('obiad', 'lunch, dinner', 'обед', 'noun', 'masculine', 'A2', 1003, 'ɔbʲat', 'Obiad jest o 14:00.', 'Lunch is at 2 PM.', 'Обед в 14:00.'),
('kolacja', 'supper, dinner', 'ужин', 'noun', 'feminine', 'A2', 1004, 'kɔlat͡sja', 'Jemy kolację razem.', 'We eat dinner together.', 'Мы ужинаем вместе.'),
('mięso', 'meat', 'мясо', 'noun', 'neuter', 'A2', 1005, 'mjɛ̃sɔ', 'Nie jem mięsa.', 'I don''t eat meat.', 'Я не ем мясо.'),
('ryba', 'fish', 'рыба', 'noun', 'feminine', 'A2', 1006, 'rɨba', 'Lubię rybę.', 'I like fish.', 'Мне нравится рыба.'),
('warzywa', 'vegetables', 'овощи', 'noun', 'plural', 'A2', 1007, 'vaʐɨva', 'Jem dużo warzyw.', 'I eat a lot of vegetables.', 'Я ем много овощей.'),
('owoce', 'fruits', 'фрукты', 'noun', 'plural', 'A2', 1008, 'ɔvɔt͡sɛ', 'Kupuję świeże owoce.', 'I buy fresh fruits.', 'Я покупаю свежие фрукты.'),
('ser', 'cheese', 'сыр', 'noun', 'masculine', 'A2', 1009, 'sɛr', 'Kanapka z serem.', 'Sandwich with cheese.', 'Бутерброд с сыром.'),
('masło', 'butter', 'масло', 'noun', 'neuter', 'A2', 1010, 'maswɔ', 'Chcę masło na chleb.', 'I want butter on bread.', 'Я хочу масло на хлеб.'),
('jajko', 'egg', 'яйцо', 'noun', 'neuter', 'A2', 1011, 'jajkɔ', 'Gotuję jajka.', 'I''m cooking eggs.', 'Я готовлю яйца.'),
('sól', 'salt', 'соль', 'noun', 'feminine', 'A2', 1012, 'sul', 'Podaj mi sól.', 'Pass me the salt.', 'Передай мне соль.'),
('pieprz', 'pepper', 'перец', 'noun', 'masculine', 'A2', 1013, 'pʲɛpʂ', 'Sól i pieprz.', 'Salt and pepper.', 'Соль и перец.'),
('cukier', 'sugar', 'сахар', 'noun', 'masculine', 'A2', 1014, 't͡sukʲɛr', 'Kawa z cukrem.', 'Coffee with sugar.', 'Кофе с сахаром.'),
('zupa', 'soup', 'суп', 'noun', 'feminine', 'A2', 1015, 'zupa', 'Zupa pomidorowa.', 'Tomato soup.', 'Томатный суп.'),
('sałatka', 'salad', 'салат', 'noun', 'feminine', 'A2', 1016, 'sawatka', 'Zielona sałatka.', 'Green salad.', 'Зелёный салат.'),
('deser', 'dessert', 'десерт', 'noun', 'masculine', 'A2', 1017, 'dɛsɛr', 'Na deser lody.', 'Ice cream for dessert.', 'На десерт мороженое.'),
('lody', 'ice cream', 'мороженое', 'noun', 'plural', 'A2', 1018, 'lɔdɨ', 'Kupię lody.', 'I''ll buy ice cream.', 'Я куплю мороженое.'),
('ciasto', 'cake, pastry', 'пирог', 'noun', 'neuter', 'A2', 1019, 't͡ɕastɔ', 'Pyszne ciasto.', 'Delicious cake.', 'Вкусный пирог.'),
('czekolada', 'chocolate', 'шоколад', 'noun', 'feminine', 'A2', 1020, 't͡ʂɛkɔlada', 'Lubię czekoladę.', 'I like chocolate.', 'Я люблю шоколад.'),
('restauracja', 'restaurant', 'ресторан', 'noun', 'feminine', 'B1', 1021, 'rɛstawrat͡sja', 'Idziemy do restauracji.', 'We''re going to a restaurant.', 'Мы идём в ресторан.'),
('kelner', 'waiter', 'официант', 'noun', 'masculine', 'B1', 1022, 'kɛlnɛr', 'Proszę kelnera!', 'Waiter, please!', 'Официант, пожалуйста!'),
('kelnerka', 'waitress', 'официантка', 'noun', 'feminine', 'B1', 1023, 'kɛlnɛrka', 'Kelnerka przynosi menu.', 'The waitress brings the menu.', 'Официантка приносит меню.'),
('menu', 'menu', 'меню', 'noun', 'neuter', 'B1', 1024, 'mɛnu', 'Poproszę menu.', 'May I have the menu, please.', 'Меню, пожалуйста.'),
('rachunek', 'bill, check', 'счёт', 'noun', 'masculine', 'B1', 1025, 'raxunɛk', 'Poproszę rachunek.', 'The bill, please.', 'Счёт, пожалуйста.'),
('napiwek', 'tip', 'чаевые', 'noun', 'masculine', 'B1', 1026, 'napivɛk', 'Zostawię napiwek.', 'I''ll leave a tip.', 'Я оставлю чаевые.'),
('rezerwacja', 'reservation', 'бронь', 'noun', 'feminine', 'B1', 1027, 'rɛzɛrvat͡sja', 'Mam rezerwację na 19:00.', 'I have a reservation for 7 PM.', 'У меня бронь на 19:00.'),
('porcja', 'portion, serving', 'порция', 'noun', 'feminine', 'B1', 1028, 'pɔrt͡sja', 'Duża porcja.', 'Large portion.', 'Большая порция.'),
('danie', 'dish, course', 'блюдо', 'noun', 'neuter', 'B1', 1029, 'daɲɛ', 'Danie główne.', 'Main course.', 'Основное блюдо.'),
('przystawka', 'appetizer', 'закуска', 'noun', 'feminine', 'B1', 1030, 'pʂɨstafka', 'Na przystawkę sałatkę.', 'Salad for an appetizer.', 'Салат на закуску.');

-- WEATHER AND NATURE
INSERT INTO vocabulary (polish_word, translation_en, translation_ru, part_of_speech, gender, level, frequency_rank, pronunciation_ipa, example_sentence_pl, example_sentence_en, example_sentence_ru) VALUES
('pogoda', 'weather', 'погода', 'noun', 'feminine', 'A2', 1031, 'pɔgɔda', 'Jaka jest pogoda?', 'What''s the weather like?', 'Какая погода?'),
('słońce', 'sun', 'солнце', 'noun', 'neuter', 'A2', 1032, 'swɔɲt͡sɛ', 'Świeci słońce.', 'The sun is shining.', 'Светит солнце.'),
('deszcz', 'rain', 'дождь', 'noun', 'masculine', 'A2', 1033, 'dɛʃt͡ʂ', 'Pada deszcz.', 'It''s raining.', 'Идёт дождь.'),
('śnieg', 'snow', 'снег', 'noun', 'masculine', 'A2', 1034, 'ɕɲɛk', 'Pada śnieg.', 'It''s snowing.', 'Идёт снег.'),
('wiatr', 'wind', 'ветер', 'noun', 'masculine', 'A2', 1035, 'vʲatr', 'Wieje wiatr.', 'The wind is blowing.', 'Дует ветер.'),
('chmura', 'cloud', 'облако', 'noun', 'feminine', 'A2', 1036, 'xmura', 'Są chmury na niebie.', 'There are clouds in the sky.', 'На небе облака.'),
('temperatura', 'temperature', 'температура', 'noun', 'feminine', 'A2', 1037, 'tɛmpɛratura', 'Temperatura wynosi 20 stopni.', 'The temperature is 20 degrees.', 'Температура 20 градусов.'),
('ciepło', 'warm, heat', 'тепло', 'adverb/noun', 'neuter', 'A2', 1038, 't͡ɕɛpwɔ', 'Dziś jest ciepło.', 'It''s warm today.', 'Сегодня тепло.'),
('zimno', 'cold', 'холодно', 'adverb', NULL, 'A2', 1039, 'ʑimnɔ', 'Jest zimno.', 'It''s cold.', 'Холодно.'),
('gorąco', 'hot', 'жарко', 'adverb', NULL, 'A2', 1040, 'gɔrɔ̃t͡sɔ', 'Jest gorąco.', 'It''s hot.', 'Жарко.'),
('burza', 'storm', 'гроза', 'noun', 'feminine', 'B1', 1041, 'buʐa', 'Będzie burza.', 'There will be a storm.', 'Будет гроза.'),
('mgła', 'fog', 'туман', 'noun', 'feminine', 'B1', 1042, 'mgwa', 'Gęsta mgła.', 'Dense fog.', 'Густой туман.'),
('mróz', 'frost', 'мороз', 'noun', 'masculine', 'B1', 1043, 'mrus', 'Ostry mróz.', 'Severe frost.', 'Сильный мороз.'),
('upał', 'heat wave', 'жара', 'noun', 'masculine', 'B1', 1044, 'upaw', 'Letnie upały.', 'Summer heat waves.', 'Летняя жара.'),
('tęcza', 'rainbow', 'радуга', 'noun', 'feminine', 'B1', 1045, 'tɛ̃nt͡ʂa', 'Piękna tęcza.', 'Beautiful rainbow.', 'Красивая радуга.'),
('błyskawica', 'lightning', 'молния', 'noun', 'feminine', 'B1', 1046, 'bwɨskavʲit͡sa', 'Błysnęła błyskawica.', 'Lightning flashed.', 'Сверкнула молния.'),
('grzmot', 'thunder', 'гром', 'noun', 'masculine', 'B1', 1047, 'gʐmɔt', 'Słyszę grzmot.', 'I hear thunder.', 'Я слышу гром.'),
('las', 'forest', 'лес', 'noun', 'masculine', 'A2', 1048, 'las', 'Idziemy do lasu.', 'We''re going to the forest.', 'Мы идём в лес.'),
('drzewo', 'tree', 'дерево', 'noun', 'neuter', 'A2', 1049, 'dʐɛvɔ', 'Wysokie drzewo.', 'Tall tree.', 'Высокое дерево.'),
('kwiat', 'flower', 'цветок', 'noun', 'masculine', 'A2', 1050, 'kfʲat', 'Kupuję kwiaty.', 'I''m buying flowers.', 'Я покупаю цветы.'),
('trawa', 'grass', 'трава', 'noun', 'feminine', 'A2', 1051, 'trava', 'Zielona trawa.', 'Green grass.', 'Зелёная трава.'),
('rzeka', 'river', 'река', 'noun', 'feminine', 'A2', 1052, 'ʐɛka', 'Wisła to wielka rzeka.', 'The Vistula is a big river.', 'Висла - большая река.'),
('jezioro', 'lake', 'озеро', 'noun', 'neuter', 'A2', 1053, 'jɛʑɔrɔ', 'Pływam w jeziorze.', 'I swim in the lake.', 'Я плаваю в озере.'),
('góra', 'mountain', 'гора', 'noun', 'feminine', 'A2', 1054, 'gura', 'Tatry to polskie góry.', 'The Tatras are Polish mountains.', 'Татры - польские горы.'),
('plaża', 'beach', 'пляж', 'noun', 'feminine', 'A2', 1055, 'plaʐa', 'Leżę na plaży.', 'I''m lying on the beach.', 'Я лежу на пляже.');

-- TECHNOLOGY AND MODERN LIFE
INSERT INTO vocabulary (polish_word, translation_en, translation_ru, part_of_speech, gender, level, frequency_rank, pronunciation_ipa, example_sentence_pl, example_sentence_en, example_sentence_ru) VALUES
('komputer', 'computer', 'компьютер', 'noun', 'masculine', 'A2', 1056, 'kɔmputɛr', 'Pracuję na komputerze.', 'I work on a computer.', 'Я работаю на компьютере.'),
('laptop', 'laptop', 'ноутбук', 'noun', 'masculine', 'A2', 1057, 'laptɔp', 'Kupię nowego laptopa.', 'I''ll buy a new laptop.', 'Я куплю новый ноутбук.'),
('telefon', 'phone', 'телефон', 'noun', 'masculine', 'A2', 1058, 'tɛlɛfɔn', 'Zadzwoń na mój telefon.', 'Call my phone.', 'Позвони на мой телефон.'),
('smartphone', 'smartphone', 'смартфон', 'noun', 'masculine', 'A2', 1059, 'smartfɔn', 'Mam nowego smartfona.', 'I have a new smartphone.', 'У меня новый смартфон.'),
('internet', 'internet', 'интернет', 'noun', 'masculine', 'A2', 1060, 'intɛrnɛt', 'Szukam w internecie.', 'I''m searching on the internet.', 'Я ищу в интернете.'),
('email', 'email', 'электронная почта', 'noun', 'masculine', 'A2', 1061, 'imɛjl', 'Wysłałem email.', 'I sent an email.', 'Я отправил электронное письмо.'),
('wiadomość', 'message', 'сообщение', 'noun', 'feminine', 'A2', 1062, 'vʲadɔmɔɕt͡ɕ', 'Dostałem wiadomość.', 'I got a message.', 'Я получил сообщение.'),
('aplikacja', 'application, app', 'приложение', 'noun', 'feminine', 'B1', 1063, 'aplikat͡sja', 'Pobieram aplikację.', 'I''m downloading an app.', 'Я скачиваю приложение.'),
('program', 'program, software', 'программа', 'noun', 'masculine', 'B1', 1064, 'prɔgram', 'Instaluję program.', 'I''m installing a program.', 'Я устанавливаю программу.'),
('przeglądarka', 'browser', 'браузер', 'noun', 'feminine', 'B1', 1065, 'pʂɛglɔ̃darka', 'Otwieram przeglądarkę.', 'I''m opening the browser.', 'Я открываю браузер.'),
('strona internetowa', 'website', 'веб-сайт', 'noun phrase', NULL, 'B1', 1066, 'strɔna intɛrnɛtɔva', 'Tworzę stronę internetową.', 'I''m creating a website.', 'Я создаю веб-сайт.'),
('hasło', 'password', 'пароль', 'noun', 'neuter', 'B1', 1067, 'haswɔ', 'Zapomniałem hasła.', 'I forgot the password.', 'Я забыл пароль.'),
('konto', 'account', 'аккаунт', 'noun', 'neuter', 'B1', 1068, 'kɔntɔ', 'Zakładam nowe konto.', 'I''m creating a new account.', 'Я создаю новый аккаунт.'),
('ładowarka', 'charger', 'зарядное устройство', 'noun', 'feminine', 'B1', 1069, 'wadɔvarka', 'Gdzie jest ładowarka?', 'Where is the charger?', 'Где зарядное устройство?'),
('bateria', 'battery', 'батарея', 'noun', 'feminine', 'B1', 1070, 'batɛrja', 'Bateria się rozładowała.', 'The battery died.', 'Батарея разрядилась.'),
('Wi-Fi', 'Wi-Fi', 'Wi-Fi', 'noun', 'neuter', 'B1', 1071, 'vajfaj', 'Jakie jest hasło do Wi-Fi?', 'What''s the Wi-Fi password?', 'Какой пароль от Wi-Fi?'),
('sieć', 'network', 'сеть', 'noun', 'feminine', 'B1', 1072, 'ɕɛt͡ɕ', 'Nie ma sieci.', 'There''s no network.', 'Нет сети.'),
('plik', 'file', 'файл', 'noun', 'masculine', 'B1', 1073, 'plik', 'Otwieram plik.', 'I''m opening a file.', 'Я открываю файл.'),
('folder', 'folder', 'папка', 'noun', 'masculine', 'B1', 1074, 'fɔldɛr', 'Zapisz w folderze.', 'Save it in the folder.', 'Сохрани в папке.'),
('klawiatura', 'keyboard', 'клавиатура', 'noun', 'feminine', 'B1', 1075, 'klavʲatura', 'Piszę na klawiaturze.', 'I''m typing on the keyboard.', 'Я печатаю на клавиатуре.'),
('mysz', 'mouse', 'мышь', 'noun', 'feminine', 'B1', 1076, 'mɨʃ', 'Kliknij myszą.', 'Click the mouse.', 'Кликни мышью.'),
('ekran', 'screen', 'экран', 'noun', 'masculine', 'B1', 1077, 'ɛkran', 'Duży ekran.', 'Big screen.', 'Большой экран.'),
('drukarka', 'printer', 'принтер', 'noun', 'feminine', 'B1', 1078, 'drukarka', 'Drukarka nie działa.', 'The printer doesn''t work.', 'Принтер не работает.');

-- EMOTIONS AND FEELINGS
INSERT INTO vocabulary (polish_word, translation_en, translation_ru, part_of_speech, gender, level, frequency_rank, pronunciation_ipa, example_sentence_pl, example_sentence_en, example_sentence_ru) VALUES
('szczęśliwy', 'happy', 'счастливый', 'adjective', 'masculine', 'A2', 1079, 'ʃt͡ʂɛɕlivɨ', 'Jestem szczęśliwy.', 'I''m happy.', 'Я счастлив.'),
('smutny', 'sad', 'грустный', 'adjective', 'masculine', 'A2', 1080, 'smugnɨ', 'Jestem smutny.', 'I''m sad.', 'Я грустный.'),
('zły', 'angry', 'злой', 'adjective', 'masculine', 'A2', 1081, 'zwɨ', 'Jestem zły.', 'I''m angry.', 'Я злой.'),
('zmęczony', 'tired', 'уставший', 'adjective', 'masculine', 'A2', 1082, 'zmɛ̃nt͡ʂɔnɨ', 'Jestem zmęczony.', 'I''m tired.', 'Я устал.'),
('przestraszony', 'scared, frightened', 'испуганный', 'adjective', 'masculine', 'B1', 1083, 'pʂɛstraʃɔnɨ', 'Jestem przestraszony.', 'I''m scared.', 'Я испуган.'),
('zdenerwowany', 'nervous, upset', 'нервный', 'adjective', 'masculine', 'B1', 1084, 'zdɛnɛrvɔvanɨ', 'Jestem zdenerwowany.', 'I''m nervous.', 'Я нервничаю.'),
('zadowolony', 'satisfied, pleased', 'довольный', 'adjective', 'masculine', 'B1', 1085, 'zadɔvɔlɔnɨ', 'Jestem zadowolony.', 'I''m satisfied.', 'Я доволен.'),
('ciekawy', 'curious, interesting', 'любопытный', 'adjective', 'masculine', 'B1', 1086, 't͡ɕɛkavɨ', 'To ciekawe.', 'That''s interesting.', 'Это интересно.'),
('zaskoczony', 'surprised', 'удивлённый', 'adjective', 'masculine', 'B1', 1087, 'zaskɔt͡ʂɔnɨ', 'Jestem zaskoczony.', 'I''m surprised.', 'Я удивлён.'),
('zawstydzony', 'embarrassed', 'смущённый', 'adjective', 'masculine', 'B1', 1088, 'zafstɨd͡zɔnɨ', 'Jestem zawstydzony.', 'I''m embarrassed.', 'Я смущён.'),
('dumny', 'proud', 'гордый', 'adjective', 'masculine', 'B1', 1089, 'dumnɨ', 'Jestem dumny z ciebie.', 'I''m proud of you.', 'Я горжусь тобой.'),
('zazdrosny', 'jealous', 'ревнивый', 'adjective', 'masculine', 'B1', 1090, 'zazdrɔsnɨ', 'Jestem zazdrosny.', 'I''m jealous.', 'Я ревную.'),
('samotny', 'lonely', 'одинокий', 'adjective', 'masculine', 'B1', 1091, 'samɔtnɨ', 'Czuję się samotny.', 'I feel lonely.', 'Я чувствую себя одиноким.'),
('podekscytowany', 'excited', 'взволнованный', 'adjective', 'masculine', 'B1', 1092, 'pɔdɛksʦɨtɔvanɨ', 'Jestem podekscytowany.', 'I''m excited.', 'Я взволнован.'),
('rozczarowany', 'disappointed', 'разочарованный', 'adjective', 'masculine', 'B1', 1093, 'rɔt͡ʂarɔvanɨ', 'Jestem rozczarowany.', 'I''m disappointed.', 'Я разочарован.');

-- HOUSEHOLD AND DAILY LIFE
INSERT INTO vocabulary (polish_word, translation_en, translation_ru, part_of_speech, gender, level, frequency_rank, pronunciation_ipa, example_sentence_pl, example_sentence_en, example_sentence_ru) VALUES
('sprzątać', 'to clean', 'убирать', 'verb', NULL, 'A2', 1094, 'spʂɔ̃tat͡ɕ', 'Sprzątam pokój.', 'I''m cleaning the room.', 'Я убираю комнату.'),
('posprzątać', 'to clean (pf)', 'убрать', 'verb', NULL, 'A2', 1095, 'pɔspʂɔ̃tat͡ɕ', 'Posprzątałem mieszkanie.', 'I cleaned the apartment.', 'Я убрал квартиру.'),
('prać', 'to wash (clothes)', 'стирать', 'verb', NULL, 'A2', 1096, 'prat͡ɕ', 'Prę ubrania.', 'I''m washing clothes.', 'Я стираю одежду.'),
('wypрać', 'to wash (clothes, pf)', 'постирать', 'verb', NULL, 'A2', 1097, 'vɨprat͡ɕ', 'Wyprałem koszulę.', 'I washed the shirt.', 'Я постирал рубашку.'),
('gotować', 'to cook', 'готовить', 'verb', NULL, 'A2', 1098, 'gɔtɔvat͡ɕ', 'Gotuję obiad.', 'I''m cooking lunch.', 'Я готовлю обед.'),
('ugotować', 'to cook (pf)', 'приготовить', 'verb', NULL, 'A2', 1099, 'ugɔtɔvat͡ɕ', 'Ugotowałem zupę.', 'I cooked soup.', 'Я приготовил суп.'),
('zmywać', 'to wash (dishes)', 'мыть', 'verb', NULL, 'A2', 1100, 'zmɨvat͡ɕ', 'Zmywam naczynia.', 'I''m washing dishes.', 'Я мою посуду.'),
('zmyć', 'to wash (dishes, pf)', 'помыть', 'verb', NULL, 'A2', 1101, 'zmɨt͡ɕ', 'Zmyłem wszystko.', 'I washed everything.', 'Я всё помыл.'),
('odkurzać', 'to vacuum', 'пылесосить', 'verb', NULL, 'B1', 1102, 'ɔtkuʐat͡ɕ', 'Odkurzam dywan.', 'I''m vacuuming the carpet.', 'Я пылесошу ковёр.'),
('odkurzyć', 'to vacuum (pf)', 'пропылесосить', 'verb', NULL, 'B1', 1103, 'ɔtkuʐɨt͡ɕ', 'Odkurzyłem cały dom.', 'I vacuumed the whole house.', 'Я пропылесосил весь дом.'),
('prasować', 'to iron', 'гладить', 'verb', NULL, 'B1', 1104, 'prasɔvat͡ɕ', 'Prasuję koszulę.', 'I''m ironing a shirt.', 'Я глажу рубашку.'),
('żelazko', 'iron (appliance)', 'утюг', 'noun', 'neuter', 'B1', 1105, 'ʐɛlaskɔ', 'Używam żelazka.', 'I''m using an iron.', 'Я использую утюг.'),
('pralka', 'washing machine', 'стиральная машина', 'noun', 'feminine', 'B1', 1106, 'pralka', 'Pralka się zepsuła.', 'The washing machine broke.', 'Стиральная машина сломалась.'),
('lodówka', 'refrigerator', 'холодильник', 'noun', 'feminine', 'A2', 1107, 'lɔdufka', 'Mleko jest w lodówce.', 'The milk is in the refrigerator.', 'Молоко в холодильнике.'),
('kuchenka', 'stove', 'плита', 'noun', 'feminine', 'B1', 1108, 'kuxɛnka', 'Gotuje na kuchence.', 'I''m cooking on the stove.', 'Я готовлю на плите.'),
('zmywarka', 'dishwasher', 'посудомоечная машина', 'noun', 'feminine', 'B1', 1109, 'zmɨvarka', 'Włączam zmywarkę.', 'I''m turning on the dishwasher.', 'Я включаю посудомоечную машину.'),
('odkurzacz', 'vacuum cleaner', 'пылесос', 'noun', 'masculine', 'B1', 1110, 'ɔtkuʐat͡ʂ', 'Gdzie jest odkurzacz?', 'Where is the vacuum cleaner?', 'Где пылесос?'),
('śmieci', 'garbage, trash', 'мусор', 'noun', 'plural', 'A2', 1111, 'ɕmʲɛt͡ɕi', 'Wynoszę śmieci.', 'I''m taking out the trash.', 'Я выношу мусор.'),
('kosz', 'basket, bin', 'корзина', 'noun', 'masculine', 'B1', 1112, 'kɔʃ', 'Kosz na śmieci.', 'Trash bin.', 'Мусорная корзина.');

-- ADVANCED B2 AND C1 PREVIEW VOCABULARY
INSERT INTO vocabulary (polish_word, translation_en, translation_ru, part_of_speech, gender, level, frequency_rank, pronunciation_ipa, example_sentence_pl, example_sentence_en, example_sentence_ru) VALUES
('wyzwanie', 'challenge', 'вызов', 'noun', 'neuter', 'B2', 1113, 'vɨzvaɲɛ', 'To duże wyzwanie.', 'This is a big challenge.', 'Это большой вызов.'),
('osiągnięcie', 'achievement', 'достижение', 'noun', 'neuter', 'B2', 1114, 'ɔɕɔ̃gɲɛɲt͡ɕɛ', 'Gratuluję osiągnięcia!', 'Congratulations on your achievement!', 'Поздравляю с достижением!'),
('wpływ', 'influence, impact', 'влияние', 'noun', 'masculine', 'B2', 1115, 'fpwɨf', 'Ma duży wpływ.', 'He has a big influence.', 'Он имеет большое влияние.'),
('konsekwencja', 'consequence', 'последствие', 'noun', 'feminine', 'B2', 1116, 'kɔnsɛkfɛnt͡sja', 'Jakie są konsekwencje?', 'What are the consequences?', 'Каковы последствия?'),
('rozwiązanie', 'solution', 'решение', 'noun', 'neuter', 'B2', 1117, 'rɔzvjɔ̃zaɲɛ', 'Znalazłem rozwiązanie.', 'I found a solution.', 'Я нашёл решение.'),
('zjawisko', 'phenomenon', 'явление', 'noun', 'neuter', 'B2', 1118, 'zjaviskɔ', 'Ciekawe zjawisko.', 'Interesting phenomenon.', 'Интересное явление.'),
('tendencja', 'trend, tendency', 'тенденция', 'noun', 'feminine', 'B2', 1119, 'tɛndɛnt͡sja', 'Rosnąca tendencja.', 'Growing trend.', 'Растущая тенденция.'),
('analiza', 'analysis', 'анализ', 'noun', 'feminine', 'B2', 1120, 'analiza', 'Przeprowadzam analizę.', 'I''m conducting an analysis.', 'Я провожу анализ.'),
('argumentacja', 'argumentation', 'аргументация', 'noun', 'feminine', 'B2', 1121, 'argumɛntat͡sja', 'Twoja argumentacja jest słaba.', 'Your argumentation is weak.', 'Твоя аргументация слабая.'),
('stanowisko', 'position, standpoint', 'позиция', 'noun', 'neuter', 'B2', 1122, 'stanɔviskɔ', 'Jakie jest twoje stanowisko?', 'What is your position?', 'Какая твоя позиция?'),
('perspektywa', 'perspective', 'перспектива', 'noun', 'feminine', 'B2', 1123, 'pɛrspɛktɨva', 'Z tej perspektywy...', 'From this perspective...', 'С этой перспективы...'),
('kontrowersja', 'controversy', 'контроверсия', 'noun', 'feminine', 'B2', 1124, 'kɔntrɔvɛrsja', 'To wywołało kontrowersję.', 'This caused controversy.', 'Это вызвало контроверсию.'),
('nierówność', 'inequality', 'неравенство', 'noun', 'feminine', 'B2', 1125, 'ɲɛruvnɔɕt͡ɕ', 'Walka z nierównością.', 'Fighting inequality.', 'Борьба с неравенством.'),
('zagrożenie', 'threat', 'угроза', 'noun', 'neuter', 'B2', 1126, 'zagrɔʐɛɲɛ', 'Poważne zagrożenie.', 'Serious threat.', 'Серьёзная угроза.'),
('dziedzina', 'field, domain', 'область', 'noun', 'feminine', 'B2', 1127, 'd͡ʑɛd͡ʑina', 'Specjalizuję się w tej dziedzinie.', 'I specialize in this field.', 'Я специализируюсь в этой области.'),
('kwestia', 'issue, matter', 'вопрос', 'noun', 'feminine', 'B2', 1128, 'kfɛst͡ja', 'To ważna kwestia.', 'This is an important issue.', 'Это важный вопрос.'),
('zagadnienie', 'problem, issue', 'проблема', 'noun', 'neuter', 'B2', 1129, 'zagadɲɛɲɛ', 'Skomplikowane zagadnienie.', 'Complicated issue.', 'Сложная проблема.'),
('przeszkoda', 'obstacle', 'препятствие', 'noun', 'feminine', 'B2', 1130, 'pʂɛʃkɔda', 'Napotykam przeszkody.', 'I''m encountering obstacles.', 'Я сталкиваюсь с препятствиями.'),
('alternatywa', 'alternative', 'альтернатива', 'noun', 'feminine', 'B2', 1131, 'altɛrnatɨva', 'Nie mamy alternatywy.', 'We have no alternative.', 'У нас нет альтернативы.'),
('uczestnictwo', 'participation', 'участие', 'noun', 'neuter', 'B2', 1132, 'ut͡ʂɛstɲit͡tsfɔ', 'Dziękuję za uczestnictwo.', 'Thank you for participation.', 'Спасибо за участие.');

-- SPORT AND LEISURE
INSERT INTO vocabulary (polish_word, translation_en, translation_ru, part_of_speech, gender, level, frequency_rank, pronunciation_ipa, example_sentence_pl, example_sentence_en, example_sentence_ru) VALUES
('sport', 'sport', 'спорт', 'noun', 'masculine', 'A2', 1133, 'spɔrt', 'Uprawiam sport.', 'I do sports.', 'Я занимаюсь спортом.'),
('piłka nożna', 'football, soccer', 'футбол', 'noun phrase', NULL, 'A2', 1134, 'pʲiwka nɔʐna', 'Gram w piłkę nożną.', 'I play football.', 'Я играю в футбол.'),
('koszykówka', 'basketball', 'баскетбол', 'noun', 'feminine', 'A2', 1135, 'kɔʃɨkufka', 'Lubię koszykówkę.', 'I like basketball.', 'Мне нравится баскетбол.'),
('siatkówka', 'volleyball', 'волейбол', 'noun', 'feminine', 'A2', 1136, 'ɕatkufka', 'Gramy w siatkówkę.', 'We play volleyball.', 'Мы играем в волейбол.'),
('tenis', 'tennis', 'теннис', 'noun', 'masculine', 'A2', 1137, 'tɛɲis', 'Uczę się grać w tenisa.', 'I''m learning to play tennis.', 'Я учусь играть в теннис.'),
('pływanie', 'swimming', 'плавание', 'noun', 'neuter', 'A2', 1138, 'pwɨvaɲɛ', 'Pływanie to zdrowy sport.', 'Swimming is a healthy sport.', 'Плавание - здоровый спорт.'),
('bieganie', 'running', 'бег', 'noun', 'neuter', 'A2', 1139, 'bʲɛgaɲɛ', 'Codziennie chodzę na bieganie.', 'I go running every day.', 'Я бегаю каждый день.'),
('trening', 'training, workout', 'тренировка', 'noun', 'masculine', 'B1', 1140, 'trɛɲiŋk', 'Mam trening o 18:00.', 'I have training at 6 PM.', 'У меня тренировка в 18:00.'),
('zawody', 'competition', 'соревнование', 'noun', 'plural', 'B1', 1141, 'zavɔdɨ', 'Biorę udział w zawodach.', 'I''m participating in a competition.', 'Я участвую в соревновании.'),
('drużyna', 'team', 'команда', 'noun', 'feminine', 'B1', 1142, 'druʐɨna', 'Nasza drużyna wygrała.', 'Our team won.', 'Наша команда победила.'),
('mecz', 'match, game', 'матч', 'noun', 'masculine', 'B1', 1143, 'mɛt͡ʂ', 'Oglądamy mecz.', 'We''re watching the match.', 'Мы смотрим матч.'),
('boisko', 'field, court', 'поле', 'noun', 'neuter', 'B1', 1144, 'bɔjiskɔ', 'Gramy na boisku.', 'We''re playing on the field.', 'Мы играем на поле.'),
('siłownia', 'gym', 'тренажёрный зал', 'noun', 'feminine', 'B1', 1145, 'ɕiwɔvɲa', 'Chodzę na siłownię.', 'I go to the gym.', 'Я хожу в зал.'),
('wycieczka', 'trip, excursion', 'экскурсия', 'noun', 'feminine', 'A2', 1146, 'vɨt͡ɕɛt͡ʂka', 'Jedziemy na wycieczkę.', 'We''re going on a trip.', 'Мы едем на экскурсию.'),
('wakacje', 'vacation, holidays', 'каникулы', 'noun', 'plural', 'A2', 1147, 'vakat͡sjɛ', 'Planuję wakacje.', 'I''m planning a vacation.', 'Я планирую каникулы.'),
('kemping', 'camping', 'кемпинг', 'noun', 'masculine', 'B1', 1148, 'kɛmpiŋk', 'Jedziemy na kemping.', 'We''re going camping.', 'Мы едем в кемпинг.'),
('wyprawa', 'expedition', 'экспедиция', 'noun', 'feminine', 'B1', 1149, 'vɨprava', 'Organizujemy wyprawę w góry.', 'We''re organizing a mountain expedition.', 'Мы организуем экспедицию в горы.'),
('wędrówka', 'hike, trek', 'поход', 'noun', 'feminine', 'B1', 1150, 'vɛ̃ndrufka', 'Długa wędrówka.', 'Long hike.', 'Длинный поход.'),
('rozrywka', 'entertainment', 'развлечение', 'noun', 'feminine', 'B1', 1151, 'rɔzrɨfka', 'Szukam rozrywki.', 'I''m looking for entertainment.', 'Я ищу развлечение.'),
('hobby', 'hobby', 'хобби', 'noun', 'neuter', 'A2', 1152, 'xɔbɨ', 'Jakie masz hobby?', 'What''s your hobby?', 'Какое у тебя хобби?'),
('gra', 'game', 'игра', 'noun', 'feminine', 'A2', 1153, 'gra', 'To fajna gra.', 'This is a fun game.', 'Это весёлая игра.'),
('szachy', 'chess', 'шахматы', 'noun', 'plural', 'B1', 1154, 'ʃaxɨ', 'Gram w szachy.', 'I play chess.', 'Я играю в шахматы.'),
('karty', 'cards', 'карты', 'noun', 'plural', 'A2', 1155, 'kartɨ', 'Gramy w karty.', 'We''re playing cards.', 'Мы играем в карты.');

-- EDUCATION AND LEARNING
INSERT INTO vocabulary (polish_word, translation_en, translation_ru, part_of_speech, gender, level, frequency_rank, pronunciation_ipa, example_sentence_pl, example_sentence_en, example_sentence_ru) VALUES
('edukacja', 'education', 'образование', 'noun', 'feminine', 'B1', 1156, 'ɛdukat͡sja', 'System edukacji.', 'Education system.', 'Система образования.'),
('wykształcenie', 'education (level)', 'образование (уровень)', 'noun', 'neuter', 'B1', 1157, 'vɨkʃtawt͡sɛɲɛ', 'Mam wyższe wykształcenie.', 'I have higher education.', 'У меня высшее образование.'),
('uniwersytet', 'university', 'университет', 'noun', 'masculine', 'B1', 1158, 'uɲivɛrsɨtɛt', 'Studiuję na uniwersytecie.', 'I study at university.', 'Я учусь в университете.'),
('wydział', 'faculty, department', 'факультет', 'noun', 'masculine', 'B1', 1159, 'vɨd͡ʑaw', 'Wydział Filologii.', 'Faculty of Philology.', 'Филологический факультет.'),
('kierunek', 'major, field of study', 'направление', 'noun', 'masculine', 'B1', 1160, 'kʲɛrunɛk', 'Jaki kierunek studiujesz?', 'What''s your major?', 'Какое у тебя направление?'),
('semestr', 'semester', 'семестр', 'noun', 'masculine', 'B1', 1161, 'sɛmɛstr', 'Jestem na trzecim semestrze.', 'I''m in third semester.', 'Я на третьем семестре.'),
('wykład', 'lecture', 'лекция', 'noun', 'masculine', 'B1', 1162, 'vɨkwat', 'Mam wykład o 10:00.', 'I have a lecture at 10 AM.', 'У меня лекция в 10:00.'),
('egzamin', 'exam', 'экзамен', 'noun', 'masculine', 'A2', 1163, 'ɛgzamiŋ', 'Zdałem egzamin!', 'I passed the exam!', 'Я сдал экзамен!'),
('kolokwium', 'test, quiz', 'тест', 'noun', 'neuter', 'B1', 1164, 'kɔlɔkfʲum', 'Mam kolokwium jutro.', 'I have a test tomorrow.', 'У меня тест завтра.'),
('praca dyplomowa', 'thesis', 'дипломная работа', 'noun phrase', NULL, 'B1', 1165, 'prat͡sa dɨplɔmɔva', 'Piszę pracę dyplomową.', 'I''m writing my thesis.', 'Я пишу дипломную работу.'),
('stypendium', 'scholarship', 'стипендия', 'noun', 'neuter', 'B1', 1166, 'stɨpɛndʲum', 'Dostałem stypendium.', 'I got a scholarship.', 'Я получил стипендию.'),
('biblioteka', 'library', 'библиотека', 'noun', 'feminine', 'A2', 1167, 'biblʲɔtɛka', 'Uczę się w bibliotece.', 'I study in the library.', 'Я учусь в библиотеке.'),
('badania', 'research', 'исследование', 'noun', 'plural', 'B2', 1168, 'badaɲa', 'Prowadzę badania naukowe.', 'I conduct scientific research.', 'Я провожу научные исследования.'),
('doktorat', 'doctorate, PhD', 'докторантура', 'noun', 'masculine', 'B2', 1169, 'dɔktɔrat', 'Robię doktorat.', 'I''m doing a PhD.', 'Я делаю докторантуру.'),
('konferencja', 'conference', 'конференция', 'noun', 'feminine', 'B1', 1170, 'kɔnfɛrɛnt͡sja', 'Biorę udział w konferencji.', 'I''m attending a conference.', 'Я участвую в конференции.'),
('publikacja', 'publication', 'публикация', 'noun', 'feminine', 'B2', 1171, 'publikat͡sja', 'Moja pierwsza publikacja.', 'My first publication.', 'Моя первая публикация.'),
('seminarium', 'seminar', 'семинар', 'noun', 'neuter', 'B1', 1172, 'sɛmiɲarʲum', 'Uczestniczę w seminarium.', 'I''m participating in a seminar.', 'Я участвую в семинаре.'),
('metoda', 'method', 'метод', 'noun', 'feminine', 'B1', 1173, 'mɛtɔda', 'Nowa metoda nauczania.', 'New teaching method.', 'Новый метод обучения.');

-- GOVERNMENT, LAW AND SOCIETY
INSERT INTO vocabulary (polish_word, translation_en, translation_ru, part_of_speech, gender, level, frequency_rank, pronunciation_ipa, example_sentence_pl, example_sentence_en, example_sentence_ru) VALUES
('rząd', 'government', 'правительство', 'noun', 'masculine', 'B1', 1174, 'ʐɔ̃t', 'Rząd Polski.', 'Polish government.', 'Правительство Польши.'),
('parlament', 'parliament', 'парламент', 'noun', 'masculine', 'B1', 1175, 'parlamɛnt', 'Sejm to polski parlament.', 'Sejm is the Polish parliament.', 'Сейм - это польский парламент.'),
('prezydent', 'president', 'президент', 'noun', 'masculine', 'B1', 1176, 'prɛzɨdɛnt', 'Prezydent kraju.', 'President of the country.', 'Президент страны.'),
('premier', 'prime minister', 'премьер-министр', 'noun', 'masculine', 'B1', 1177, 'prɛmʲɛr', 'Premier rządu.', 'Prime minister.', 'Премьер-министр.'),
('minister', 'minister', 'министр', 'noun', 'masculine', 'B1', 1178, 'miɲistɛr', 'Minister spraw zagranicznych.', 'Minister of foreign affairs.', 'Министр иностранных дел.'),
('prawo', 'law', 'право', 'noun', 'neuter', 'B1', 1179, 'pravɔ', 'Studiuję prawo.', 'I study law.', 'Я изучаю право.'),
('ustawa', 'act, law', 'закон', 'noun', 'feminine', 'B2', 1180, 'ustava', 'Nowa ustawa wchodzi w życie.', 'A new law comes into force.', 'Новый закон вступает в силу.'),
('konstytucja', 'constitution', 'конституция', 'noun', 'feminine', 'B2', 1181, 'kɔnstɨtut͡sja', 'Konstytucja RP.', 'Constitution of Poland.', 'Конституция РП.'),
('sąd', 'court', 'суд', 'noun', 'masculine', 'B1', 1182, 'sɔ̃t', 'Sprawa idzie do sądu.', 'The case goes to court.', 'Дело идёт в суд.'),
('sędzia', 'judge', 'судья', 'noun', 'masculine/feminine', 'B1', 1183, 'sɛ̃nd͡ʑa', 'Sędzia wydał wyrok.', 'The judge issued a verdict.', 'Судья вынес приговор.'),
('adwokat', 'lawyer, attorney', 'адвокат', 'noun', 'masculine', 'B1', 1184, 'advɔkat', 'Potrzebuję adwokata.', 'I need a lawyer.', 'Мне нужен адвокат.'),
('umowa', 'contract, agreement', 'договор', 'noun', 'feminine', 'B1', 1185, 'umɔva', 'Podpisujemy umowę.', 'We''re signing a contract.', 'Мы подписываем договор.'),
('obywatel', 'citizen', 'гражданин', 'noun', 'masculine', 'B1', 1186, 'ɔbɨvatɛl', 'Obywatel Polski.', 'Polish citizen.', 'Гражданин Польши.'),
('obywatelstwo', 'citizenship', 'гражданство', 'noun', 'neuter', 'B1', 1187, 'ɔbɨvatɛlstfɔ', 'Mam podwójne obywatelstwo.', 'I have dual citizenship.', 'У меня двойное гражданство.'),
('wybory', 'elections', 'выборы', 'noun', 'plural', 'B1', 1188, 'vɨbɔrɨ', 'Wybory parlamentarne.', 'Parliamentary elections.', 'Парламентские выборы.'),
('głosowanie', 'voting', 'голосование', 'noun', 'neuter', 'B1', 1189, 'gwɔsɔvaɲɛ', 'Biorę udział w głosowaniu.', 'I''m participating in voting.', 'Я участвую в голосовании.'),
('partia', 'party (political)', 'партия', 'noun', 'feminine', 'B1', 1190, 'part͡ja', 'Partia polityczna.', 'Political party.', 'Политическая партия.'),
('polityka', 'politics, policy', 'политика', 'noun', 'feminine', 'B1', 1191, 'pɔlitɨka', 'Interesuję się polityką.', 'I''m interested in politics.', 'Я интересуюсь политикой.');

-- MEDIA AND COMMUNICATION
INSERT INTO vocabulary (polish_word, translation_en, translation_ru, part_of_speech, gender, level, frequency_rank, pronunciation_ipa, example_sentence_pl, example_sentence_en, example_sentence_ru) VALUES
('media', 'media', 'медиа', 'noun', 'plural', 'B1', 1192, 'mɛdʲa', 'Media społecznościowe.', 'Social media.', 'Социальные медиа.'),
('gazeta', 'newspaper', 'газета', 'noun', 'feminine', 'A2', 1193, 'gazɛta', 'Czytam gazetę.', 'I''m reading a newspaper.', 'Я читаю газету.'),
('czasopismo', 'magazine, journal', 'журнал', 'noun', 'neuter', 'B1', 1194, 't͡ʂasɔpismɔ', 'Prenumeruję czasopismo.', 'I subscribe to a magazine.', 'Я подписан на журнал.'),
('artykuł', 'article', 'статья', 'noun', 'masculine', 'B1', 1195, 'artɨkuw', 'Ciekawy artykuł.', 'Interesting article.', 'Интересная статья.'),
('dziennikarz', 'journalist', 'журналист', 'noun', 'masculine', 'B1', 1196, 'd͡ʑɛɲɲikaʂ', 'Jestem dziennikarzem.', 'I''m a journalist.', 'Я журналист.'),
('wywiad', 'interview', 'интервью', 'noun', 'masculine', 'B1', 1197, 'vɨvʲat', 'Przeprowadzam wywiad.', 'I''m conducting an interview.', 'Я провожу интервью.'),
('relacja', 'report, coverage', 'репортаж', 'noun', 'feminine', 'B1', 1198, 'rɛlat͡sja', 'Relacja na żywo.', 'Live coverage.', 'Прямой репортаж.'),
('reportaż', 'reportage', 'репортаж', 'noun', 'masculine', 'B1', 1199, 'rɛpɔrtaʃ', 'Oglądamy reportaż.', 'We''re watching a reportage.', 'Мы смотрим репортаж.'),
('audycja', 'broadcast, program', 'передача', 'noun', 'feminine', 'B1', 1200, 'audɨt͡sja', 'Słucham audycji radiowej.', 'I''m listening to a radio program.', 'Я слушаю радиопередачу.'),
('transmisja', 'transmission, broadcast', 'трансляция', 'noun', 'feminine', 'B1', 1201, 'transmisjа', 'Transmisja na żywo.', 'Live broadcast.', 'Прямая трансляция.'),
('nadawca', 'broadcaster, sender', 'вещатель', 'noun', 'masculine', 'B2', 1202, 'nadaft͡sa', 'Nadawca publiczny.', 'Public broadcaster.', 'Общественный вещатель.'),
('odbiorca', 'recipient, audience', 'получатель', 'noun', 'masculine', 'B2', 1203, 'ɔdbʲɔrt͡sa', 'Odbiorca wiadomości.', 'Recipient of the message.', 'Получатель сообщения.'),
('informacja', 'information', 'информация', 'noun', 'feminine', 'A2', 1204, 'infɔrmat͡sja', 'Potrzebuję informacji.', 'I need information.', 'Мне нужна информация.'),
('komunikat', 'announcement, communique', 'сообщение', 'noun', 'masculine', 'B1', 1205, 'kɔmuɲikat', 'Oficjalny komunikat.', 'Official announcement.', 'Официальное сообщение.'),
('oświadczenie', 'statement, declaration', 'заявление', 'noun', 'neuter', 'B2', 1206, 'ɔɕfʲat͡ʂɛɲɛ', 'Wydałem oświadczenie.', 'I issued a statement.', 'Я выпустил заявление.'),
('propaganda', 'propaganda', 'пропаганда', 'noun', 'feminine', 'B2', 1207, 'prɔpaganda', 'Propaganda polityczna.', 'Political propaganda.', 'Политическая пропаганда.'),
('cenzura', 'censorship', 'цензура', 'noun', 'feminine', 'B2', 1208, 't͡sɛnzura', 'Walka z cenzurą.', 'Fighting censorship.', 'Борьба с цензурой.');

-- ECONOMICS AND BUSINESS
INSERT INTO vocabulary (polish_word, translation_en, translation_ru, part_of_speech, gender, level, frequency_rank, pronunciation_ipa, example_sentence_pl, example_sentence_en, example_sentence_ru) VALUES
('gospodarka', 'economy', 'экономика', 'noun', 'feminine', 'B2', 1209, 'gɔspɔdarka', 'Polska gospodarka rośnie.', 'Polish economy is growing.', 'Польская экономика растёт.'),
('ekonomia', 'economics', 'экономика (наука)', 'noun', 'feminine', 'B2', 1210, 'ɛkɔnɔmʲa', 'Studiuję ekonomię.', 'I study economics.', 'Я изучаю экономику.'),
('przedsiębiorstwo', 'enterprise, company', 'предприятие', 'noun', 'neuter', 'B2', 1211, 'pʂɛt͡ɕɛbʲɔrstfɔ', 'Małe przedsiębiorstwo.', 'Small enterprise.', 'Малое предприятие.'),
('firma', 'company, firm', 'фирма', 'noun', 'feminine', 'B1', 1212, 'firma', 'Pracuję w międzynarodowej firmie.', 'I work in an international company.', 'Я работаю в международной фирме.'),
('przedsiębiorca', 'entrepreneur', 'предприниматель', 'noun', 'masculine', 'B2', 1213, 'pʂɛt͡ɕɛbʲɔrt͡sa', 'Jestem przedsiębiorcą.', 'I''m an entrepreneur.', 'Я предприниматель.'),
('konkurencja', 'competition', 'конкуренция', 'noun', 'feminine', 'B2', 1214, 'kɔnkurɛnt͡sja', 'Silna konkurencja na rynku.', 'Strong market competition.', 'Сильная конкуренция на рынке.'),
('zysk', 'profit', 'прибыль', 'noun', 'masculine', 'B2', 1215, 'zɨsk', 'Firma przynosi zysk.', 'The company brings profit.', 'Фирма приносит прибыль.'),
('strata', 'loss', 'убыток', 'noun', 'feminine', 'B1', 1216, 'strata', 'Ponieśliśmy straty.', 'We suffered losses.', 'Мы понесли убытки.'),
('inwestycja', 'investment', 'инвестиция', 'noun', 'feminine', 'B2', 1217, 'invɛstɨt͡sja', 'Dobra inwestycja.', 'Good investment.', 'Хорошая инвестиция.'),
('kredyt', 'loan, credit', 'кредит', 'noun', 'masculine', 'B1', 1218, 'krɛdɨt', 'Wzięliśmy kredyt hipoteczny.', 'We took out a mortgage.', 'Мы взяли ипотечный кредит.'),
('budżet', 'budget', 'бюджет', 'noun', 'masculine', 'B1', 1219, 'budʐɛt', 'Planujemy budżet.', 'We''re planning the budget.', 'Мы планируем бюджет.'),
('dochód', 'income', 'доход', 'noun', 'masculine', 'B1', 1220, 'dɔxut', 'Wysoki dochód.', 'High income.', 'Высокий доход.'),
('wydatek', 'expense, expenditure', 'расход', 'noun', 'masculine', 'B1', 1221, 'vɨdatɛk', 'Ograniczamy wydatki.', 'We''re limiting expenses.', 'Мы ограничиваем расходы.'),
('podatek', 'tax', 'налог', 'noun', 'masculine', 'B1', 1222, 'pɔdatɛk', 'Płacę podatki.', 'I pay taxes.', 'Я плачу налоги.'),
('inflacja', 'inflation', 'инфляция', 'noun', 'feminine', 'B2', 1223, 'inflat͡sja', 'Wzrost inflacji.', 'Rise in inflation.', 'Рост инфляции.'),
('bezrobocie', 'unemployment', 'безработица', 'noun', 'neuter', 'B2', 1224, 'bɛzrɔbɔt͡ɕɛ', 'Niski poziom bezrobocia.', 'Low unemployment rate.', 'Низкий уровень безработицы.'),
('rynek', 'market', 'рынок', 'noun', 'masculine', 'B1', 1225, 'rɨnɛk', 'Rynek pracy.', 'Labor market.', 'Рынок труда.'),
('giełda', 'stock exchange', 'биржа', 'noun', 'feminine', 'B2', 1226, 'gʲɛwda', 'Giełda papierów wartościowych.', 'Stock exchange.', 'Фондовая биржа.');

-- SCIENCE AND RESEARCH
INSERT INTO vocabulary (polish_word, translation_en, translation_ru, part_of_speech, gender, level, frequency_rank, pronunciation_ipa, example_sentence_pl, example_sentence_en, example_sentence_ru) VALUES
('nauka', 'science', 'наука', 'noun', 'feminine', 'B1', 1227, 'nauka', 'Nauka to moja pasja.', 'Science is my passion.', 'Наука - моя страсть.'),
('naukowiec', 'scientist', 'учёный', 'noun', 'masculine', 'B1', 1228, 'naukɔvʲɛt͡s', 'Jestem naukowcem.', 'I''m a scientist.', 'Я учёный.'),
('teoria', 'theory', 'теория', 'noun', 'feminine', 'B1', 1229, 'tɛɔrja', 'Teoria względności.', 'Theory of relativity.', 'Теория относительности.'),
('hipoteza', 'hypothesis', 'гипотеза', 'noun', 'feminine', 'B2', 1230, 'xipɔtɛza', 'Stawiamy hipotezę.', 'We''re formulating a hypothesis.', 'Мы выдвигаем гипотезу.'),
('eksperyment', 'experiment', 'эксперимент', 'noun', 'masculine', 'B1', 1231, 'ɛkspɛrɨmɛnt', 'Przeprowadzamy eksperyment.', 'We''re conducting an experiment.', 'Мы проводим эксперимент.'),
('laboratorium', 'laboratory', 'лаборатория', 'noun', 'neuter', 'B1', 1232, 'labɔratɔrʲum', 'Pracuję w laboratorium.', 'I work in a laboratory.', 'Я работаю в лаборатории.'),
('odkrycie', 'discovery', 'открытие', 'noun', 'neuter', 'B2', 1233, 'ɔtkrɨt͡ɕɛ', 'Ważne odkrycie naukowe.', 'Important scientific discovery.', 'Важное научное открытие.'),
('wynalazek', 'invention', 'изобретение', 'noun', 'masculine', 'B2', 1234, 'vɨnalazɛk', 'Rewolucyjny wynalazek.', 'Revolutionary invention.', 'Революционное изобретение.'),
('technologia', 'technology', 'технология', 'noun', 'feminine', 'B1', 1235, 'tɛxnɔlɔgʲa', 'Nowa technologia.', 'New technology.', 'Новая технология.'),
('innowacja', 'innovation', 'инновация', 'noun', 'feminine', 'B2', 1236, 'inɔvat͡sja', 'Innowacja technologiczna.', 'Technological innovation.', 'Технологическая инновация.'),
('projekt', 'project', 'проект', 'noun', 'masculine', 'B1', 1237, 'prɔjɛkt', 'Pracuję nad projektem.', 'I''m working on a project.', 'Я работаю над проектом.'),
('dane', 'data', 'данные', 'noun', 'plural', 'B1', 1238, 'danɛ', 'Analizujemy dane.', 'We''re analyzing data.', 'Мы анализируем данные.'),
('wynik', 'result', 'результат', 'noun', 'masculine', 'B1', 1239, 'vɨɲik', 'Wyniki badań.', 'Research results.', 'Результаты исследований.'),
('wzór', 'formula, pattern', 'формула', 'noun', 'masculine', 'B1', 1240, 'vzur', 'Matematyczny wzór.', 'Mathematical formula.', 'Математическая формула.'),
('równanie', 'equation', 'уравнение', 'noun', 'neuter', 'B1', 1241, 'ruvnaɲɛ', 'Rozwiązuję równanie.', 'I''m solving an equation.', 'Я решаю уравнение.');

-- ARTS AND CULTURE
INSERT INTO vocabulary (polish_word, translation_en, translation_ru, part_of_speech, gender, level, frequency_rank, pronunciation_ipa, example_sentence_pl, example_sentence_en, example_sentence_ru) VALUES
('sztuka', 'art', 'искусство', 'noun', 'feminine', 'B1', 1242, 'ʃtuka', 'Uwielbiam sztukę współczesną.', 'I love contemporary art.', 'Я люблю современное искусство.'),
('artysta', 'artist', 'художник', 'noun', 'masculine', 'B1', 1243, 'artɨsta', 'Jestem artystą.', 'I''m an artist.', 'Я художник.'),
('obraz', 'painting, picture', 'картина', 'noun', 'masculine', 'A2', 1244, 'ɔbras', 'Piękny obraz.', 'Beautiful painting.', 'Красивая картина.'),
('rzeźba', 'sculpture', 'скульптура', 'noun', 'feminine', 'B1', 1245, 'ʐɛʑba', 'Stara rzeźba.', 'Old sculpture.', 'Старая скульптура.'),
('wystawa', 'exhibition', 'выставка', 'noun', 'feminine', 'B1', 1246, 'vɨstava', 'Idę na wystawę.', 'I''m going to an exhibition.', 'Я иду на выставку.'),
('galeria', 'gallery', 'галерея', 'noun', 'feminine', 'B1', 1247, 'galɛrja', 'Galeria sztuki.', 'Art gallery.', 'Художественная галерея.'),
('spektakl', 'show, performance', 'спектакль', 'noun', 'masculine', 'B1', 1248, 'spɛktakl', 'Oglądamy spektakl teatralny.', 'We''re watching a theatrical performance.', 'Мы смотрим театральный спектакль.'),
('koncert', 'concert', 'концерт', 'noun', 'masculine', 'A2', 1249, 'kɔnt͡sɛrt', 'Idziemy na koncert.', 'We''re going to a concert.', 'Мы идём на концерт.'),
('orkiestra', 'orchestra', 'оркестр', 'noun', 'feminine', 'B1', 1250, 'ɔrkʲɛstra', 'Orkiestra symfoniczna.', 'Symphony orchestra.', 'Симфонический оркестр.'),
('kompozytor', 'composer', 'композитор', 'noun', 'masculine', 'B1', 1251, 'kɔmpɔzɨtɔr', 'Słynny kompozytor.', 'Famous composer.', 'Знаменитый композитор.'),
('literatura', 'literature', 'литература', 'noun', 'feminine', 'B1', 1252, 'litɛratura', 'Polska literatura.', 'Polish literature.', 'Польская литература.'),
('poeta', 'poet', 'поэт', 'noun', 'masculine', 'B1', 1253, 'pɔɛta', 'Ulubiony poeta.', 'Favorite poet.', 'Любимый поэт.'),
('wiersz', 'poem', 'стихотворение', 'noun', 'masculine', 'B1', 1254, 'vʲɛrʃ', 'Czytam wiersz.', 'I''m reading a poem.', 'Я читаю стихотворение.'),
('powieść', 'novel', 'роман', 'noun', 'feminine', 'B1', 1255, 'pɔvʲɛɕt͡ɕ', 'Fascynująca powieść.', 'Fascinating novel.', 'Захватывающий роман.');

-- ADDITIONAL ASPECT PAIRS (Important for Polish fluency)
INSERT INTO vocabulary (polish_word, translation_en, translation_ru, part_of_speech, gender, level, frequency_rank, pronunciation_ipa, example_sentence_pl, example_sentence_en, example_sentence_ru) VALUES
('szukać', 'to search, look for (impf)', 'искать (несов.)', 'verb', NULL, 'A2', 1256, 'ʃukat͡ɕ', 'Szukam kluczy.', 'I''m looking for keys.', 'Я ищу ключи.'),
('poszukać', 'to search, look for (pf)', 'поискать (сов.)', 'verb', NULL, 'A2', 1257, 'pɔʃukat͡ɕ', 'Poszukam w pokoju.', 'I''ll look in the room.', 'Я поищу в комнате.'),
('znajdować', 'to find (impf)', 'находить (несов.)', 'verb', NULL, 'A2', 1258, 'znajdɔvat͡ɕ', 'Często znajduję ciekawe rzeczy.', 'I often find interesting things.', 'Я часто нахожу интересные вещи.'),
('znaleźć', 'to find (pf)', 'найти (сов.)', 'verb', NULL, 'A2', 1259, 'znalɛɕt͡ɕ', 'Znalazłem klucze!', 'I found the keys!', 'Я нашёл ключи!'),
('wyjaśniać', 'to explain (impf)', 'объяснять (несов.)', 'verb', NULL, 'B1', 1260, 'vɨjaɕɲat͡ɕ', 'Wyjaśniam zasady.', 'I''m explaining the rules.', 'Я объясняю правила.'),
('wyjaśnić', 'to explain (pf)', 'объяснить (сов.)', 'verb', NULL, 'B1', 1261, 'vɨjaɕɲit͡ɕ', 'Wyjaśnię ci to później.', 'I''ll explain it to you later.', 'Я объясню тебе это позже.'),
('porównywać', 'to compare (impf)', 'сравнивать (несов.)', 'verb', NULL, 'B1', 1262, 'pɔruvnɨvat͡ɕ', 'Porównuję ceny.', 'I''m comparing prices.', 'Я сравниваю цены.'),
('porównać', 'to compare (pf)', 'сравнить (сов.)', 'verb', NULL, 'B1', 1263, 'pɔruvnat͡ɕ', 'Porównałem oferty.', 'I compared the offers.', 'Я сравнил предложения.'),
('proponować', 'to propose (impf)', 'предлагать (несов.)', 'verb', NULL, 'B1', 1264, 'prɔpɔnɔvat͡ɕ', 'Często proponuję rozwiązania.', 'I often propose solutions.', 'Я часто предлагаю решения.'),
('zaproponować', 'to propose (pf)', 'предложить (сов.)', 'verb', NULL, 'B1', 1265, 'zaprɔpɔnɔvat͡ɕ', 'Zaproponowałem kompromis.', 'I proposed a compromise.', 'Я предложил компромисс.'),
('przekonywać', 'to persuade, convince (impf)', 'убеждать (несов.)', 'verb', NULL, 'B1', 1266, 'pʂɛkɔnɨvat͡ɕ', 'Przekonuję go do tego pomysłu.', 'I''m persuading him about this idea.', 'Я убеждаю его в этой идее.'),
('przekonać', 'to persuade, convince (pf)', 'убедить (сов.)', 'verb', NULL, 'B1', 1267, 'pʂɛkɔnat͡ɕ', 'Przekonałem ich.', 'I convinced them.', 'Я убедил их.'),
('organizować', 'to organize (impf)', 'организовывать (несов.)', 'verb', NULL, 'B1', 1268, 'ɔrganizɔvat͡ɕ', 'Organizuję imprezę.', 'I''m organizing a party.', 'Я организую вечеринку.'),
('zorganizować', 'to organize (pf)', 'организовать (сов.)', 'verb', NULL, 'B1', 1269, 'zɔrganizɔvat͡ɕ', 'Zorganizowałem wszystko.', 'I organized everything.', 'Я всё организовал.'),
('rozwiązywać', 'to solve (impf)', 'решать (несов.)', 'verb', NULL, 'B1', 1270, 'rɔzvjɔ̃zɨvat͡ɕ', 'Rozwiązuję problemy.', 'I''m solving problems.', 'Я решаю проблемы.'),
('rozwiązać', 'to solve (pf)', 'решить (сов.)', 'verb', NULL, 'B1', 1271, 'rɔzvjɔ̃zat͡ɕ', 'Rozwiązałem zadanie.', 'I solved the task.', 'Я решил задачу.'),
('osiągać', 'to achieve (impf)', 'достигать (несов.)', 'verb', NULL, 'B2', 1272, 'ɔɕɔ̃gat͡ɕ', 'Osiągam swoje cele.', 'I''m achieving my goals.', 'Я достигаю своих целей.'),
('osiągnąć', 'to achieve (pf)', 'достичь (сов.)', 'verb', NULL, 'B2', 1273, 'ɔɕɔ̃gnɔ̃t͡ɕ', 'Osiągnąłem sukces!', 'I achieved success!', 'Я достиг успеха!'),
('wprowadzać', 'to introduce, implement (impf)', 'внедрять (несов.)', 'verb', NULL, 'B2', 1274, 'fprɔvad͡zat͡ɕ', 'Wprowadzamy zmiany.', 'We''re implementing changes.', 'Мы внедряем изменения.'),
('wprowadzić', 'to introduce, implement (pf)', 'внедрить (сов.)', 'verb', NULL, 'B2', 1275, 'fprɔvad͡ʑit͡ɕ', 'Wprowadziliśmy nowy system.', 'We implemented a new system.', 'Мы внедрили новую систему.');

-- COMMON IDIOMATIC EXPRESSIONS AND USEFUL PHRASES
INSERT INTO vocabulary (polish_word, translation_en, translation_ru, part_of_speech, gender, level, frequency_rank, pronunciation_ipa, example_sentence_pl, example_sentence_en, example_sentence_ru) VALUES
('w porządku', 'alright, okay', 'в порядке', 'phrase', NULL, 'A2', 1276, 'f pɔʐɔ̃tku', 'Wszystko w porządku?', 'Is everything alright?', 'Всё в порядке?'),
('oczywiście', 'of course, obviously', 'конечно', 'adverb', NULL, 'A2', 1277, 'ɔt͡ʂɨvʲiɕt͡ɕɛ', 'Oczywiście, że pomogę!', 'Of course I''ll help!', 'Конечно, я помогу!'),
('na przykład', 'for example', 'например', 'phrase', NULL, 'B1', 1278, 'na pʂɨkwat', 'Na przykład ja.', 'For example, me.', 'Например, я.'),
('w ogóle', 'at all, in general', 'вообще', 'phrase', NULL, 'B1', 1279, 'v ɔgulɛ', 'Nie mam w ogóle czasu.', 'I have no time at all.', 'У меня вообще нет времени.'),
('w końcu', 'finally, in the end', 'наконец', 'phrase', NULL, 'B1', 1280, 'f kɔɲt͡su', 'W końcu to zrobiłem!', 'I finally did it!', 'Я наконец это сделал!'),
('z kolei', 'in turn, on the other hand', 'в свою очередь', 'phrase', NULL, 'B2', 1281, 's kɔlɛj', 'On z kolei myśli inaczej.', 'He, in turn, thinks differently.', 'Он, в свою очередь, думает иначе.'),
('w związku z', 'in connection with', 'в связи с', 'phrase', NULL, 'B2', 1282, 'v zvjɔ̃sku s', 'W związku z tym...', 'In connection with this...', 'В связи с этим...'),
('w zależności od', 'depending on', 'в зависимости от', 'phrase', NULL, 'B2', 1283, 'v zalɛʐnɔɕt͡ɕi ɔd', 'W zależności od pogody.', 'Depending on the weather.', 'В зависимости от погоды.'),
('co do', 'as for, regarding', 'что касается', 'phrase', NULL, 'B2', 1284, 't͡sɔ dɔ', 'Co do twojej propozycji...', 'As for your proposal...', 'Что касается твоего предложения...'),
('pod warunkiem', 'on condition, provided that', 'при условии', 'phrase', NULL, 'B2', 1285, 'pɔd varunkʲɛm', 'Zgadzam się pod warunkiem, że...', 'I agree provided that...', 'Я согласен при условии, что...'),
('tym niemniej', 'nevertheless', 'тем не менее', 'phrase', NULL, 'B2', 1286, 'tɨm ɲɛmɲɛj', 'Tym niemniej, musimy spróbować.', 'Nevertheless, we must try.', 'Тем не менее, мы должны попробовать.'),
('za to', 'on the other hand', 'зато', 'phrase', NULL, 'B1', 1287, 'za tɔ', 'Jest drogi, za to dobry.', 'It''s expensive, but good.', 'Он дорогой, зато хороший.'),
('co prawda', 'admittedly, it''s true', 'правда', 'phrase', NULL, 'B2', 1288, 't͡sɔ pravda', 'Co prawda, masz rację.', 'Admittedly, you''re right.', 'Правда, ты прав.'),
('po prostu', 'simply', 'просто', 'phrase', NULL, 'B1', 1289, 'pɔ prɔstu', 'To po prostu niemożliwe.', 'It''s simply impossible.', 'Это просто невозможно.'),
('w każdym razie', 'in any case', 'в любом случае', 'phrase', NULL, 'B1', 1290, 'f kaʐdɨm raʑɛ', 'W każdym razie dziękuję.', 'In any case, thank you.', 'В любом случае, спасибо.'),
('bez wątpienia', 'without doubt', 'без сомнения', 'phrase', NULL, 'B2', 1291, 'bɛz vɔ̃tpʲɛɲa', 'To bez wątpienia najlepsze.', 'This is without doubt the best.', 'Это без сомнения лучшее.'),
('nie ma mowy', 'no way, out of the question', 'не может быть речи', 'phrase', NULL, 'B1', 1292, 'ɲɛ ma mɔvɨ', 'Nie ma mowy o rezygnacji!', 'There''s no way we''re giving up!', 'Не может быть речи об отказе!'),
('mieć na myśli', 'to mean, have in mind', 'иметь в виду', 'phrase', NULL, 'B1', 1293, 'mʲɛt͡ɕ na mɨɕli', 'Co masz na myśli?', 'What do you mean?', 'Что ты имеешь в виду?'),
('brać udział', 'to participate, take part', 'принимать участие', 'phrase', NULL, 'B1', 1294, 'brat͡ɕ ud͡ʑaw', 'Biorę udział w projekcie.', 'I''m participating in the project.', 'Я принимаю участие в проекте.'),
('mieć rację', 'to be right', 'быть правым', 'phrase', NULL, 'A2', 1295, 'mʲɛt͡ɕ rat͡sję', 'Masz rację!', 'You''re right!', 'Ты прав!'),
('zwracać uwagę', 'to pay attention', 'обращать внимание', 'phrase', NULL, 'B1', 1296, 'zvrat͡sat͡ɕ uvagɛ', 'Zwracaj uwagę na szczegóły.', 'Pay attention to details.', 'Обращай внимание на детали.'),
('mieć do czynienia z', 'to deal with', 'иметь дело с', 'phrase', NULL, 'B2', 1297, 'mʲɛt͡ɕ dɔ t͡ʂɨɲɛɲa z', 'Mam do czynienia z trudnym klientem.', 'I''m dealing with a difficult client.', 'Я имею дело с трудным клиентом.'),
('dochodzić do siebie', 'to recover', 'приходить в себя', 'phrase', NULL, 'B1', 1298, 'dɔxɔd͡ʑit͡ɕ dɔ ɕɛbʲɛ', 'Powoli dochodzę do siebie.', 'I''m slowly recovering.', 'Я медленно прихожу в себя.'),
('radzić sobie', 'to cope, manage', 'справляться', 'phrase', NULL, 'B1', 1299, 'rad͡ʑit͡ɕ sɔbʲɛ', 'Dobrze sobie radzisz!', 'You''re coping well!', 'Ты хорошо справляешься!'),
('starać się', 'to try, make an effort', 'стараться', 'phrase', NULL, 'A2', 1300, 'starat͡ɕ ɕɛ', 'Staram się jak mogę.', 'I''m trying my best.', 'Я стараюсь как могу.');

-- END OF VOCABULARY EXPANSION
-- Total new words added: ~300
-- Combined with existing vocabulary: 425 (A1-A2) + 900 (B1-B2) + 300 (specialized) = 1,625 words
-- Target achieved: 1,600+ comprehensive vocabulary database
