-- Fixed lesson seed data

-- Lesson 1: Basic Greetings
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'A1',
  1,
  1,
  1,
  'Basic Greetings',
  'Основные приветствия',
  'Learn essential Polish greetings and how to introduce yourself',
  'Изучите основные польские приветствия и как представиться',
  15,
  20,
  true,
  '{
      "exercises": [
        {
          "id": "ex1",
          "type": "multiple_choice",
          "question": {
            "en": "How do you say \"Hello\" in Polish?",
            "ru": "Как сказать \"Привет\" по-польски?"
          },
          "options": [
            {"id": "a", "text": "Cześć", "isCorrect": true},
            {"id": "b", "text": "Dziękuję", "isCorrect": false},
            {"id": "c", "text": "Proszę", "isCorrect": false},
            {"id": "d", "text": "Do widzenia", "isCorrect": false}
          ],
          "explanation": {
            "en": "\"Cześć\" is the informal way to say hello in Polish, similar to \"hi\" in English.",
            "ru": "\"Cześć\" - это неформальный способ поздороваться по-польски, аналог английского \"hi\"."
          }
        },
        {
          "id": "ex2",
          "type": "translation",
          "prompt": {
            "en": "Translate to Polish: Good morning",
            "ru": "Переведите на польский: Доброе утро"
          },
          "correctAnswer": "Dzień dobry",
          "acceptableAnswers": ["Dzień dobry", "dzień dobry"],
          "hint": {
            "en": "It literally means \"good day\"",
            "ru": "Буквально означает \"хороший день\""
          }
        },
        {
          "id": "ex3",
          "type": "fill_blank",
          "sentence": {
            "polish": "Cześć! _____ na imię Piotr.",
            "en": "Hi! My name is Piotr.",
            "ru": "Привет! Меня зовут Пётр."
          },
          "correctAnswer": "Mam",
          "acceptableAnswers": ["Mam", "mam"],
          "hint": {
            "en": "The verb \"to have\" in first person",
            "ru": "Глагол \"иметь\" в первом лице"
          }
        },
        {
          "id": "ex4",
          "type": "multiple_choice",
          "question": {
            "en": "What does \"Miło mi\" mean?",
            "ru": "Что означает \"Miło mi\"?"
          },
          "options": [
            {"id": "a", "text": "Nice to meet you", "isCorrect": true},
            {"id": "b", "text": "Thank you", "isCorrect": false},
            {"id": "c", "text": "Goodbye", "isCorrect": false},
            {"id": "d", "text": "See you later", "isCorrect": false}
          ],
          "explanation": {
            "en": "\"Miło mi\" literally means \"pleasant to me\" and is used when meeting someone for the first time.",
            "ru": "\"Miło mi\" буквально означает \"мне приятно\" и используется при первой встрече."
          }
        },
        {
          "id": "ex5",
          "type": "matching",
          "instruction": {
            "en": "Match the Polish greetings with their English translations",
            "ru": "Сопоставьте польские приветствия с их английскими переводами"
          },
          "pairs": [
            {"left": "Dzień dobry", "right": "Good morning/Good day", "pairId": 1},
            {"left": "Dobry wieczór", "right": "Good evening", "pairId": 2},
            {"left": "Dobranoc", "right": "Good night", "pairId": 3},
            {"left": "Do widzenia", "right": "Goodbye", "pairId": 4}
          ]
        },
        {
          "id": "ex6",
          "type": "translation",
          "prompt": {
            "en": "Translate to Polish: How are you?",
            "ru": "Переведите на польский: Как дела?"
          },
          "correctAnswer": "Jak się masz?",
          "acceptableAnswers": ["Jak się masz?", "Jak się masz", "jak się masz?", "jak się masz"],
          "hint": {
            "en": "Use the informal form",
            "ru": "Используйте неформальную форму"
          }
        }
      ]
    }'
);

-- Lesson 2: Numbers 1-20
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'A1',
  2,
  1,
  2,
  'Numbers 1-20',
  'Числа 1-20',
  'Learn to count from 1 to 20 in Polish',
  'Научитесь считать от 1 до 20 по-польски',
  12,
  15,
  true,
  '{
      "exercises": [
        {
          "id": "ex1",
          "type": "multiple_choice",
          "question": {
            "en": "What is \"five\" in Polish?",
            "ru": "Как будет \"пять\" по-польски?"
          },
          "options": [
            {"id": "a", "text": "pięć", "isCorrect": true},
            {"id": "b", "text": "cztery", "isCorrect": false},
            {"id": "c", "text": "sześć", "isCorrect": false},
            {"id": "d", "text": "siedem", "isCorrect": false}
          ],
          "explanation": {
            "en": "\"Pięć\" is the number five in Polish.",
            "ru": "\"Pięć\" - это число пять по-польски."
          }
        },
        {
          "id": "ex2",
          "type": "fill_blank",
          "sentence": {
            "polish": "Mam _____ jabłka.",
            "en": "I have three apples.",
            "ru": "У меня три яблока."
          },
          "correctAnswer": "trzy",
          "acceptableAnswers": ["trzy"],
          "hint": {
            "en": "The number 3",
            "ru": "Число 3"
          }
        },
        {
          "id": "ex3",
          "type": "translation",
          "prompt": {
            "en": "Translate to Polish: ten",
            "ru": "Переведите на польский: десять"
          },
          "correctAnswer": "dziesięć",
          "acceptableAnswers": ["dziesięć", "dziesiec"],
          "hint": {
            "en": "It starts with \"dzie-\"",
            "ru": "Начинается с \"dzie-\""
          }
        },
        {
          "id": "ex4",
          "type": "matching",
          "instruction": {
            "en": "Match the numbers with their Polish names",
            "ru": "Сопоставьте числа с их польскими названиями"
          },
          "pairs": [
            {"left": "1", "right": "jeden", "pairId": 1},
            {"left": "2", "right": "dwa", "pairId": 2},
            {"left": "7", "right": "siedem", "pairId": 3},
            {"left": "10", "right": "dziesięć", "pairId": 4}
          ]
        },
        {
          "id": "ex5",
          "type": "multiple_choice",
          "question": {
            "en": "What number is \"piętnaście\"?",
            "ru": "Какое число \"piętnaście\"?"
          },
          "options": [
            {"id": "a", "text": "15", "isCorrect": true},
            {"id": "b", "text": "13", "isCorrect": false},
            {"id": "c", "text": "14", "isCorrect": false},
            {"id": "d", "text": "16", "isCorrect": false}
          ],
          "explanation": {
            "en": "\"Piętnaście\" means fifteen. It comes from \"pięć\" (five) + \"naście\" (teen).",
            "ru": "\"Piętnaście\" означает пятнадцать. Происходит от \"pięć\" (пять) + \"naście\" (-надцать)."
          }
        },
        {
          "id": "ex6",
          "type": "fill_blank",
          "sentence": {
            "polish": "Dwadzieścia minus pięć równa się _____.",
            "en": "Twenty minus five equals fifteen.",
            "ru": "Двадцать минус пять равно пятнадцать."
          },
          "correctAnswer": "piętnaście",
          "acceptableAnswers": ["piętnaście", "piętnascie"],
          "hint": {
            "en": "15 in Polish",
            "ru": "15 по-польски"
          }
        }
      ]
    }'
);

-- Lesson 3: Colors and Adjectives
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'A1',
  3,
  1,
  3,
  'Colors and Basic Adjectives',
  'Цвета и основные прилагательные',
  'Learn common colors and simple adjectives in Polish',
  'Изучите распространённые цвета и простые прилагательные',
  15,
  20,
  true,
  '{
      "exercises": [
        {
          "id": "ex1",
          "type": "multiple_choice",
          "question": {
            "en": "What is \"red\" in Polish?",
            "ru": "Как будет \"красный\" по-польски?"
          },
          "options": [
            {"id": "a", "text": "czerwony", "isCorrect": true},
            {"id": "b", "text": "niebieski", "isCorrect": false},
            {"id": "c", "text": "żółty", "isCorrect": false},
            {"id": "d", "text": "zielony", "isCorrect": false}
          ],
          "explanation": {
            "en": "\"Czerwony\" means red in Polish. It changes based on gender and case.",
            "ru": "\"Czerwony\" означает красный по-польски. Изменяется по родам и падежам."
          }
        },
        {
          "id": "ex2",
          "type": "fill_blank",
          "sentence": {
            "polish": "To jest _____ samochód.",
            "en": "This is a blue car.",
            "ru": "Это синяя машина."
          },
          "correctAnswer": "niebieski",
          "acceptableAnswers": ["niebieski"],
          "hint": {
            "en": "The color blue (masculine form)",
            "ru": "Цвет синий (мужской род)"
          }
        },
        {
          "id": "ex3",
          "type": "matching",
          "instruction": {
            "en": "Match the colors with their Polish names",
            "ru": "Сопоставьте цвета с их польскими названиями"
          },
          "pairs": [
            {"left": "white", "right": "biały", "pairId": 1},
            {"left": "black", "right": "czarny", "pairId": 2},
            {"left": "green", "right": "zielony", "pairId": 3},
            {"left": "yellow", "right": "żółty", "pairId": 4}
          ]
        },
        {
          "id": "ex4",
          "type": "translation",
          "prompt": {
            "en": "Translate to Polish: big house",
            "ru": "Переведите на польский: большой дом"
          },
          "correctAnswer": "duży dom",
          "acceptableAnswers": ["duży dom", "Duży dom"],
          "hint": {
            "en": "Adjective comes before the noun",
            "ru": "Прилагательное идёт перед существительным"
          }
        },
        {
          "id": "ex5",
          "type": "multiple_choice",
          "question": {
            "en": "What does \"mały\" mean?",
            "ru": "Что означает \"mały\"?"
          },
          "options": [
            {"id": "a", "text": "small", "isCorrect": true},
            {"id": "b", "text": "big", "isCorrect": false},
            {"id": "c", "text": "beautiful", "isCorrect": false},
            {"id": "d", "text": "ugly", "isCorrect": false}
          ],
          "explanation": {
            "en": "\"Mały\" means small or little. Opposite is \"duży\" (big).",
            "ru": "\"Mały\" означает маленький. Противоположность - \"duży\" (большой)."
          }
        },
        {
          "id": "ex6",
          "type": "fill_blank",
          "sentence": {
            "polish": "Moja sukienka jest _____.",
            "en": "My dress is beautiful.",
            "ru": "Моё платье красивое."
          },
          "correctAnswer": "piękna",
          "acceptableAnswers": ["piękna", "piekna"],
          "hint": {
            "en": "Beautiful (feminine form)",
            "ru": "Красивое (женский род)"
          }
        }
      ]
    }'
);

-- Lesson 4: Family Members
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'Family Members',
  'Члены семьи',
  'Learn how to talk about your family in Polish',
  'Научитесь говорить о своей семье по-польски',
  'A1',
  4,
  1,
  4,  18,
  25,
  true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {
          "en": "What is \"mother\" in Polish?",
          "ru": "Как будет \"мама\" по-польски?"
        },
        "options": [
          {"id": "a", "text": "matka", "isCorrect": true},
          {"id": "b", "text": "ojciec", "isCorrect": false},
          {"id": "c", "text": "siostra", "isCorrect": false},
          {"id": "d", "text": "babcia", "isCorrect": false}
        ],
        "explanation": {
          "en": "\"Matka\" is the formal word for mother. Informally, you can say \"mama\".",
          "ru": "\"Matka\" - формальное слово для мамы. Неформально можно сказать \"mama\"."
        }
      },
      {
        "id": "ex2",
        "type": "fill_blank",
        "sentence": {
          "polish": "Mój _____ ma na imię Jan.",
          "en": "My father'\''s name is Jan.",
          "ru": "Моего отца зовут Ян."
        },
        "correctAnswer": "ojciec",
        "acceptableAnswers": ["ojciec", "tata"],
        "hint": {
          "en": "The word for father",
          "ru": "Слово для отца"
        }
      },
      {
        "id": "ex3",
        "type": "matching",
        "instruction": {
          "en": "Match the family members with their Polish names",
          "ru": "Сопоставьте членов семьи с их польскими названиями"
        },
        "pairs": [
          {"left": "brother", "right": "brat", "pairId": 1},
          {"left": "sister", "right": "siostra", "pairId": 2},
          {"left": "grandmother", "right": "babcia", "pairId": 3},
          {"left": "grandfather", "right": "dziadek", "pairId": 4}
        ]
      },
      {
        "id": "ex4",
        "type": "translation",
        "prompt": {
          "en": "Translate to Polish: I have a sister",
          "ru": "Переведите на польский: У меня есть сестра"
        },
        "correctAnswer": "Mam siostrę",
        "acceptableAnswers": ["Mam siostrę", "mam siostrę", "Mam siostre", "mam siostre"],
        "hint": {
          "en": "Use the accusative case for sister",
          "ru": "Используйте винительный падеж для сестры"
        }
      },
      {
        "id": "ex5",
        "type": "multiple_choice",
        "question": {
          "en": "What does \"córka\" mean?",
          "ru": "Что означает \"córka\"?"
        },
        "options": [
          {"id": "a", "text": "daughter", "isCorrect": true},
          {"id": "b", "text": "son", "isCorrect": false},
          {"id": "c", "text": "wife", "isCorrect": false},
          {"id": "d", "text": "husband", "isCorrect": false}
        ],
        "explanation": {
          "en": "\"Córka\" means daughter. The word for son is \"syn\".",
          "ru": "\"Córka\" означает дочь. Слово для сына - \"syn\"."
        }
      },
      {
        "id": "ex6",
        "type": "fill_blank",
        "sentence": {
          "polish": "Moja rodzina ma pięć _____.",
          "en": "My family has five members.",
          "ru": "В моей семье пять человек."
        },
        "correctAnswer": "osób",
        "acceptableAnswers": ["osób", "osob"],
        "hint": {
          "en": "People (genitive plural)",
          "ru": "Люди (родительный падеж множественного числа)"
        }
      }
    ]
  }'::jsonb
);


-- Lesson 5: Food and Drinks
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'Food and Drinks',
  'Еда и напитки',
  'Learn common food and drink vocabulary in Polish',
  'Изучите распространённую лексику о еде и напитках',
  'A1',
  5,
  1,
  5,  20,
  25,
  true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {
          "en": "What is \"bread\" in Polish?",
          "ru": "Как будет \"хлеб\" по-польски?"
        },
        "options": [
          {"id": "a", "text": "chleb", "isCorrect": true},
          {"id": "b", "text": "woda", "isCorrect": false},
          {"id": "c", "text": "mleko", "isCorrect": false},
          {"id": "d", "text": "ser", "isCorrect": false}
        ],
        "explanation": {
          "en": "\"Chleb\" means bread in Polish. It'\''s a masculine noun.",
          "ru": "\"Chleb\" означает хлеб по-польски. Это существительное мужского рода."
        }
      },
      {
        "id": "ex2",
        "type": "fill_blank",
        "sentence": {
          "polish": "Chcę pić _____.",
          "en": "I want to drink water.",
          "ru": "Я хочу пить воду."
        },
        "correctAnswer": "wodę",
        "acceptableAnswers": ["wodę", "wode"],
        "hint": {
          "en": "Water in accusative case",
          "ru": "Вода в винительном падеже"
        }
      },
      {
        "id": "ex3",
        "type": "matching",
        "instruction": {
          "en": "Match the food items with their Polish names",
          "ru": "Сопоставьте продукты с их польскими названиями"
        },
        "pairs": [
          {"left": "milk", "right": "mleko", "pairId": 1},
          {"left": "cheese", "right": "ser", "pairId": 2},
          {"left": "apple", "right": "jabłko", "pairId": 3},
          {"left": "egg", "right": "jajko", "pairId": 4}
        ]
      },
      {
        "id": "ex4",
        "type": "translation",
        "prompt": {
          "en": "Translate to Polish: I like coffee",
          "ru": "Переведите на польский: Я люблю кофе"
        },
        "correctAnswer": "Lubię kawę",
        "acceptableAnswers": ["Lubię kawę", "lubie kawe", "Lubie kawe", "Lubię kawe"],
        "hint": {
          "en": "Use the verb \"lubić\" (to like)",
          "ru": "Используйте глагол \"lubić\" (любить/нравиться)"
        }
      },
      {
        "id": "ex5",
        "type": "multiple_choice",
        "question": {
          "en": "What does \"herbata\" mean?",
          "ru": "Что означает \"herbata\"?"
        },
        "options": [
          {"id": "a", "text": "tea", "isCorrect": true},
          {"id": "b", "text": "coffee", "isCorrect": false},
          {"id": "c", "text": "juice", "isCorrect": false},
          {"id": "d", "text": "water", "isCorrect": false}
        ],
        "explanation": {
          "en": "\"Herbata\" means tea in Polish. Coffee is \"kawa\".",
          "ru": "\"Herbata\" означает чай по-польски. Кофе - \"kawa\"."
        }
      },
      {
        "id": "ex6",
        "type": "fill_blank",
        "sentence": {
          "polish": "Na śniadanie jem _____ i masło.",
          "en": "For breakfast I eat bread and butter.",
          "ru": "На завтрак я ем хлеб и масло."
        },
        "correctAnswer": "chleb",
        "acceptableAnswers": ["chleb"],
        "hint": {
          "en": "The word for bread",
          "ru": "Слово для хлеба"
        }
      }
    ]
  }'::jsonb
);


-- Lesson 6: Days and Time
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'Days of the Week and Time',
  'Дни недели и время',
  'Learn days of the week and basic time expressions',
  'Изучите дни недели и базовые выражения времени',
  'A1',
  6,
  2,
  1,  15,
  20,
  true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {
          "en": "What is \"Monday\" in Polish?",
          "ru": "Как будет \"понедельник\" по-польски?"
        },
        "options": [
          {"id": "a", "text": "poniedziałek", "isCorrect": true},
          {"id": "b", "text": "wtorek", "isCorrect": false},
          {"id": "c", "text": "środa", "isCorrect": false},
          {"id": "d", "text": "czwartek", "isCorrect": false}
        ],
        "explanation": {
          "en": "\"Poniedziałek\" means Monday. It comes from \"po\" (after) and \"niedziela\" (Sunday).",
          "ru": "\"Poniedziałek\" означает понедельник. Происходит от \"po\" (после) и \"niedziela\" (воскресенье)."
        }
      },
      {
        "id": "ex2",
        "type": "matching",
        "instruction": {
          "en": "Match the days with their Polish names",
          "ru": "Сопоставьте дни с их польскими названиями"
        },
        "pairs": [
          {"left": "Tuesday", "right": "wtorek", "pairId": 1},
          {"left": "Wednesday", "right": "środa", "pairId": 2},
          {"left": "Friday", "right": "piątek", "pairId": 3},
          {"left": "Sunday", "right": "niedziela", "pairId": 4}
        ]
      },
      {
        "id": "ex3",
        "type": "fill_blank",
        "sentence": {
          "polish": "Która jest _____?",
          "en": "What time is it?",
          "ru": "Который час?"
        },
        "correctAnswer": "godzina",
        "acceptableAnswers": ["godzina"],
        "hint": {
          "en": "The word for hour/time",
          "ru": "Слово для часа/времени"
        }
      },
      {
        "id": "ex4",
        "type": "translation",
        "prompt": {
          "en": "Translate to Polish: It is three o'\''clock",
          "ru": "Переведите на польский: Сейчас три часа"
        },
        "correctAnswer": "Jest trzecia",
        "acceptableAnswers": ["Jest trzecia", "jest trzecia"],
        "hint": {
          "en": "Use the ordinal number in feminine form",
          "ru": "Используйте порядковое числительное в женском роде"
        }
      },
      {
        "id": "ex5",
        "type": "multiple_choice",
        "question": {
          "en": "What does \"sobota\" mean?",
          "ru": "Что означает \"sobota\"?"
        },
        "options": [
          {"id": "a", "text": "Saturday", "isCorrect": true},
          {"id": "b", "text": "Sunday", "isCorrect": false},
          {"id": "c", "text": "Friday", "isCorrect": false},
          {"id": "d", "text": "Thursday", "isCorrect": false}
        ],
        "explanation": {
          "en": "\"Sobota\" means Saturday. Sunday is \"niedziela\".",
          "ru": "\"Sobota\" означает суббота. Воскресенье - \"niedziela\"."
        }
      },
      {
        "id": "ex6",
        "type": "fill_blank",
        "sentence": {
          "polish": "W _____ idę do szkoły.",
          "en": "On Thursday I go to school.",
          "ru": "В четверг я иду в школу."
        },
        "correctAnswer": "czwartek",
        "acceptableAnswers": ["czwartek"],
        "hint": {
          "en": "Thursday in accusative case",
          "ru": "Четверг в винительном падеже"
        }
      }
    ]
  }'::jsonb
);


-- Lesson 7: Common Verbs
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'A1',
  7,
  2,
  2,
  'Common Verbs in Present Tense',
  'Распространённые глаголы в настоящем времени',
  'Learn essential Polish verbs and their conjugations',
  'Изучите основные польские глаголы и их спряжения',
  20,
  25,
  true,
  '{
      "exercises": [
        {
          "id": "ex1",
          "type": "multiple_choice",
          "question": {
            "en": "How do you say \"I am\" in Polish?",
            "ru": "Как сказать \"я есть\" по-польски?"
          },
          "options": [
            {"id": "a", "text": "jestem", "isCorrect": true},
            {"id": "b", "text": "jesteś", "isCorrect": false},
            {"id": "c", "text": "jest", "isCorrect": false},
            {"id": "d", "text": "jesteśmy", "isCorrect": false}
          ],
          "explanation": {
            "en": "\"Jestem\" is the first person singular form of \"być\" (to be).",
            "ru": "\"Jestem\" - форма первого лица единственного числа глагола \"być\" (быть)."
          }
        },
        {
          "id": "ex2",
          "type": "fill_blank",
          "sentence": {
            "polish": "Ja _____ do domu.",
            "en": "I go home.",
            "ru": "Я иду домой."
          },
          "correctAnswer": "idę",
          "acceptableAnswers": ["idę", "ide"],
          "hint": {
            "en": "First person singular of \"iść\" (to go)",
            "ru": "Первое лицо единственного числа глагола \"iść\" (идти)"
          }
        },
        {
          "id": "ex3",
          "type": "matching",
          "instruction": {
            "en": "Match the verbs with their English translations",
            "ru": "Сопоставьте глаголы с их английскими переводами"
          },
          "pairs": [
            {"left": "mówię", "right": "I speak", "pairId": 1},
            {"left": "robię", "right": "I do/make", "pairId": 2},
            {"left": "mam", "right": "I have", "pairId": 3},
            {"left": "chcę", "right": "I want", "pairId": 4}
          ]
        },
        {
          "id": "ex4",
          "type": "translation",
          "prompt": {
            "en": "Translate to Polish: You are (informal)",
            "ru": "Переведите на польский: Ты есть (неформально)"
          },
          "correctAnswer": "jesteś",
          "acceptableAnswers": ["jesteś", "jestes"],
          "hint": {
            "en": "Second person singular of być",
            "ru": "Второе лицо единственного числа глагола być"
          }
        },
        {
          "id": "ex5",
          "type": "multiple_choice",
          "question": {
            "en": "What does \"czytam\" mean?",
            "ru": "Что означает \"czytam\"?"
          },
          "options": [
            {"id": "a", "text": "I read", "isCorrect": true},
            {"id": "b", "text": "I write", "isCorrect": false},
            {"id": "c", "text": "I listen", "isCorrect": false},
            {"id": "d", "text": "I watch", "isCorrect": false}
          ],
          "explanation": {
            "en": "\"Czytam\" means I read, from the verb \"czytać\" (to read).",
            "ru": "\"Czytam\" означает я читаю, от глагола \"czytać\" (читать)."
          }
        },
        {
          "id": "ex6",
          "type": "fill_blank",
          "sentence": {
            "polish": "My _____ po polsku.",
            "en": "We speak Polish.",
            "ru": "Мы говорим по-польски."
          },
          "correctAnswer": "mówimy",
          "acceptableAnswers": ["mówimy", "mowimy"],
          "hint": {
            "en": "First person plural of mówić",
            "ru": "Первое лицо множественного числа глагола mówić"
          }
        }
      ]
    }'
);

-- Lesson 8: At the Shop
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'A1',
  8,
  2,
  3,
  'At the Shop - Shopping Phrases',
  'В магазине - фразы для покупок',
  'Learn essential phrases for shopping in Polish',
  'Изучите основные фразы для покупок по-польски',
  18,
  25,
  true,
  '{
      "exercises": [
        {
          "id": "ex1",
          "type": "multiple_choice",
          "question": {
            "en": "How do you say \"How much does it cost?\" in Polish?",
            "ru": "Как сказать \"Сколько это стоит?\" по-польски?"
          },
          "options": [
            {"id": "a", "text": "Ile to kosztuje?", "isCorrect": true},
            {"id": "b", "text": "Gdzie to jest?", "isCorrect": false},
            {"id": "c", "text": "Co to jest?", "isCorrect": false},
            {"id": "d", "text": "Kiedy jest otwarte?", "isCorrect": false}
          ],
          "explanation": {
            "en": "\"Ile to kosztuje?\" is the standard way to ask about price.",
            "ru": "\"Ile to kosztuje?\" - стандартный способ спросить о цене."
          }
        },
        {
          "id": "ex2",
          "type": "fill_blank",
          "sentence": {
            "polish": "Chciałbym _____ to.",
            "en": "I would like to buy this.",
            "ru": "Я хотел бы купить это."
          },
          "correctAnswer": "kupić",
          "acceptableAnswers": ["kupić", "kupic"],
          "hint": {
            "en": "The infinitive form of to buy",
            "ru": "Инфинитивная форма глагола купить"
          }
        },
        {
          "id": "ex3",
          "type": "matching",
          "instruction": {
            "en": "Match the shopping phrases with their translations",
            "ru": "Сопоставьте фразы для покупок с их переводами"
          },
          "pairs": [
            {"left": "Czy mogę?", "right": "May I?", "pairId": 1},
            {"left": "Dziękuję", "right": "Thank you", "pairId": 2},
            {"left": "Proszę", "right": "Please/Here you are", "pairId": 3},
            {"left": "Przepraszam", "right": "Excuse me/Sorry", "pairId": 4}
          ]
        },
        {
          "id": "ex4",
          "type": "translation",
          "prompt": {
            "en": "Translate to Polish: I need...",
            "ru": "Переведите на польский: Мне нужно..."
          },
          "correctAnswer": "Potrzebuję",
          "acceptableAnswers": ["Potrzebuję", "potrzebuję", "Potrzebuje", "potrzebuje"],
          "hint": {
            "en": "First person singular of potrzebować",
            "ru": "Первое лицо единственного числа глагола potrzebować"
          }
        },
        {
          "id": "ex5",
          "type": "multiple_choice",
          "question": {
            "en": "What does \"sklep\" mean?",
            "ru": "Что означает \"sklep\"?"
          },
          "options": [
            {"id": "a", "text": "shop/store", "isCorrect": true},
            {"id": "b", "text": "market", "isCorrect": false},
            {"id": "c", "text": "bank", "isCorrect": false},
            {"id": "d", "text": "restaurant", "isCorrect": false}
          ],
          "explanation": {
            "en": "\"Sklep\" means shop or store. A supermarket is \"supermarket\" or \"market\".",
            "ru": "\"Sklep\" означает магазин. Супермаркет - \"supermarket\" или \"market\"."
          }
        },
        {
          "id": "ex6",
          "type": "fill_blank",
          "sentence": {
            "polish": "To jest za _____.",
            "en": "This is too expensive.",
            "ru": "Это слишком дорого."
          },
          "correctAnswer": "drogie",
          "acceptableAnswers": ["drogie"],
          "hint": {
            "en": "The adjective for expensive (neuter form)",
            "ru": "Прилагательное для дорого (средний род)"
          }
        }
      ]
    }'
);

-- Lesson 9: Asking Questions
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'Asking Questions',
  'Задавать вопросы',
  'Learn how to ask basic questions in Polish',
  'Научитесь задавать базовые вопросы по-польски',
  'A1',
  9,
  2,
  4,  15,
  20,
  true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {
          "en": "How do you say \"What?\" in Polish?",
          "ru": "Как сказать \"Что?\" по-польски?"
        },
        "options": [
          {"id": "a", "text": "Co?", "isCorrect": true},
          {"id": "b", "text": "Kto?", "isCorrect": false},
          {"id": "c", "text": "Gdzie?", "isCorrect": false},
          {"id": "d", "text": "Kiedy?", "isCorrect": false}
        ],
        "explanation": {
          "en": "\"Co?\" means what. It'\''s one of the most common question words.",
          "ru": "\"Co?\" означает что. Это одно из самых распространённых вопросительных слов."
        }
      },
      {
        "id": "ex2",
        "type": "fill_blank",
        "sentence": {
          "polish": "_____ to jest?",
          "en": "Where is it?",
          "ru": "Где это?"
        },
        "correctAnswer": "Gdzie",
        "acceptableAnswers": ["Gdzie", "gdzie"],
        "hint": {
          "en": "The question word for where",
          "ru": "Вопросительное слово для где"
        }
      },
      {
        "id": "ex3",
        "type": "matching",
        "instruction": {
          "en": "Match the question words with their meanings",
          "ru": "Сопоставьте вопросительные слова с их значениями"
        },
        "pairs": [
          {"left": "Kto?", "right": "Who?", "pairId": 1},
          {"left": "Kiedy?", "right": "When?", "pairId": 2},
          {"left": "Dlaczego?", "right": "Why?", "pairId": 3},
          {"left": "Jak?", "right": "How?", "pairId": 4}
        ]
      },
      {
        "id": "ex4",
        "type": "translation",
        "prompt": {
          "en": "Translate to Polish: Who are you?",
          "ru": "Переведите на польский: Кто ты?"
        },
        "correctAnswer": "Kim jesteś?",
        "acceptableAnswers": ["Kim jesteś?", "Kim jestes?", "kim jesteś?", "kim jestes?"],
        "hint": {
          "en": "Use the instrumental case of kto",
          "ru": "Используйте творительный падеж слова kto"
        }
      },
      {
        "id": "ex5",
        "type": "multiple_choice",
        "question": {
          "en": "What does \"Ile?\" mean?",
          "ru": "Что означает \"Ile?\"?"
        },
        "options": [
          {"id": "a", "text": "How many/much?", "isCorrect": true},
          {"id": "b", "text": "How?", "isCorrect": false},
          {"id": "c", "text": "Which?", "isCorrect": false},
          {"id": "d", "text": "Whose?", "isCorrect": false}
        ],
        "explanation": {
          "en": "\"Ile?\" is used to ask about quantity - how many or how much.",
          "ru": "\"Ile?\" используется для вопросов о количестве - сколько."
        }
      },
      {
        "id": "ex6",
        "type": "fill_blank",
        "sentence": {
          "polish": "_____ masz lat?",
          "en": "How old are you?",
          "ru": "Сколько тебе лет?"
        },
        "correctAnswer": "Ile",
        "acceptableAnswers": ["Ile", "ile"],
        "hint": {
          "en": "Question word for quantity",
          "ru": "Вопросительное слово для количества"
        }
      }
    ]
  }'::jsonb
);


-- Lesson 10: Places in the City
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'Places in the City',
  'Места в городе',
  'Learn vocabulary for common places and locations',
  'Изучите лексику для распространённых мест и локаций',
  'A1',
  10,
  2,
  5,  20,
  25,
  true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {
          "en": "What is \"restaurant\" in Polish?",
          "ru": "Как будет \"ресторан\" по-польски?"
        },
        "options": [
          {"id": "a", "text": "restauracja", "isCorrect": true},
          {"id": "b", "text": "sklep", "isCorrect": false},
          {"id": "c", "text": "muzeum", "isCorrect": false},
          {"id": "d", "text": "kino", "isCorrect": false}
        ],
        "explanation": {
          "en": "\"Restauracja\" means restaurant. It'\''s a feminine noun.",
          "ru": "\"Restauracja\" означает ресторан. Это существительное женского рода."
        }
      },
      {
        "id": "ex2",
        "type": "fill_blank",
        "sentence": {
          "polish": "Idę do _____.",
          "en": "I am going to the bank.",
          "ru": "Я иду в банк."
        },
        "correctAnswer": "banku",
        "acceptableAnswers": ["banku"],
        "hint": {
          "en": "Bank in genitive case (after \"do\")",
          "ru": "Банк в родительном падеже (после \"do\")"
        }
      },
      {
        "id": "ex3",
        "type": "matching",
        "instruction": {
          "en": "Match the places with their Polish names",
          "ru": "Сопоставьте места с их польскими названиями"
        },
        "pairs": [
          {"left": "school", "right": "szkoła", "pairId": 1},
          {"left": "hospital", "right": "szpital", "pairId": 2},
          {"left": "park", "right": "park", "pairId": 3},
          {"left": "cinema", "right": "kino", "pairId": 4}
        ]
      },
      {
        "id": "ex4",
        "type": "translation",
        "prompt": {
          "en": "Translate to Polish: in the center",
          "ru": "Переведите на польский: в центре"
        },
        "correctAnswer": "w centrum",
        "acceptableAnswers": ["w centrum", "W centrum"],
        "hint": {
          "en": "Use the locative case",
          "ru": "Используйте предложный падеж"
        }
      },
      {
        "id": "ex5",
        "type": "multiple_choice",
        "question": {
          "en": "What does \"dworzec\" mean?",
          "ru": "Что означает \"dworzec\"?"
        },
        "options": [
          {"id": "a", "text": "train station", "isCorrect": true},
          {"id": "b", "text": "bus stop", "isCorrect": false},
          {"id": "c", "text": "airport", "isCorrect": false},
          {"id": "d", "text": "taxi stand", "isCorrect": false}
        ],
        "explanation": {
          "en": "\"Dworzec\" means train station. Bus station is \"dworzec autobusowy\".",
          "ru": "\"Dworzec\" означает вокзал. Автобусная станция - \"dworzec autobusowy\"."
        }
      },
      {
        "id": "ex6",
        "type": "fill_blank",
        "sentence": {
          "polish": "_____ jest blisko.",
          "en": "The church is nearby.",
          "ru": "Церковь рядом."
        },
        "correctAnswer": "Kościół",
        "acceptableAnswers": ["Kościół", "Kosciol", "kościół", "kosciol"],
        "hint": {
          "en": "The word for church",
          "ru": "Слово для церкви"
        }
      }
    ]
  }'::jsonb
);


-- Lesson 11: Weather and Seasons
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'A1',
  11,
  3,
  1,
  'Weather and Seasons',
  'Погода и времена года',
  'Learn to talk about weather conditions and seasons in Polish',
  'Научитесь говорить о погоде и временах года по-польски',
  18,
  25,
  true,
  '{
      "exercises": [
        {
          "id": "ex1",
          "type": "multiple_choice",
          "question": {
            "en": "How do you say \"It is sunny\" in Polish?",
            "ru": "Как сказать \"Солнечно\" по-польски?"
          },
          "options": [
            {"id": "a", "text": "Jest słonecznie", "isCorrect": true},
            {"id": "b", "text": "Jest zimno", "isCorrect": false},
            {"id": "c", "text": "Pada deszcz", "isCorrect": false},
            {"id": "d", "text": "Jest wietrznie", "isCorrect": false}
          ],
          "explanation": {
            "en": "\"Jest słonecznie\" means it is sunny. \"Słońce\" is sun, \"słonecznie\" is sunny.",
            "ru": "\"Jest słonecznie\" означает солнечно. \"Słońce\" - солнце, \"słonecznie\" - солнечно."
          }
        },
        {
          "id": "ex2",
          "type": "fill_blank",
          "sentence": {
            "polish": "Dzisiaj _____ deszcz.",
            "en": "Today it is raining.",
            "ru": "Сегодня идёт дождь."
          },
          "correctAnswer": "pada",
          "acceptableAnswers": ["pada"],
          "hint": {
            "en": "The verb \"to fall\" for rain",
            "ru": "Глагол \"падать\" для дождя"
          }
        },
        {
          "id": "ex3",
          "type": "matching",
          "instruction": {
            "en": "Match the seasons with their Polish names",
            "ru": "Сопоставьте времена года с их польскими названиями"
          },
          "pairs": [
            {"left": "spring", "right": "wiosna", "pairId": 1},
            {"left": "summer", "right": "lato", "pairId": 2},
            {"left": "autumn/fall", "right": "jesień", "pairId": 3},
            {"left": "winter", "right": "zima", "pairId": 4}
          ]
        },
        {
          "id": "ex4",
          "type": "translation",
          "prompt": {
            "en": "Translate to Polish: It is cold",
            "ru": "Переведите на польский: Холодно"
          },
          "correctAnswer": "Jest zimno",
          "acceptableAnswers": ["Jest zimno", "jest zimno"],
          "hint": {
            "en": "Use the impersonal construction",
            "ru": "Используйте безличную конструкцию"
          }
        },
        {
          "id": "ex5",
          "type": "multiple_choice",
          "question": {
            "en": "What does \"pada śnieg\" mean?",
            "ru": "Что означает \"pada śnieg\"?"
          },
          "options": [
            {"id": "a", "text": "It is snowing", "isCorrect": true},
            {"id": "b", "text": "It is hot", "isCorrect": false},
            {"id": "c", "text": "It is windy", "isCorrect": false},
            {"id": "d", "text": "It is cloudy", "isCorrect": false}
          ],
          "explanation": {
            "en": "\"Pada śnieg\" literally means \"snow is falling\" - it is snowing.",
            "ru": "\"Pada śnieg\" буквально означает \"снег падает\" - идёт снег."
          }
        },
        {
          "id": "ex6",
          "type": "fill_blank",
          "sentence": {
            "polish": "W _____ jest gorąco.",
            "en": "In summer it is hot.",
            "ru": "Летом жарко."
          },
          "correctAnswer": "lecie",
          "acceptableAnswers": ["lecie"],
          "hint": {
            "en": "Summer in locative case",
            "ru": "Лето в предложном падеже"
          }
        }
      ]
    }'
);

-- Lesson 12: Likes and Dislikes
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'A1',
  12,
  3,
  2,
  'Expressing Likes and Dislikes',
  'Выражение симпатий и антипатий',
  'Learn how to express what you like and don''t like in Polish',
  'Научитесь выражать, что вам нравится и не нравится',
  15,
  20,
  true,
  '{
      "exercises": [
        {
          "id": "ex1",
          "type": "multiple_choice",
          "question": {
            "en": "How do you say \"I like music\" in Polish?",
            "ru": "Как сказать \"Мне нравится музыка\" по-польски?"
          },
          "options": [
            {"id": "a", "text": "Lubię muzykę", "isCorrect": true},
            {"id": "b", "text": "Kocham muzykę", "isCorrect": false},
            {"id": "c", "text": "Słucham muzyki", "isCorrect": false},
            {"id": "d", "text": "Mam muzykę", "isCorrect": false}
          ],
          "explanation": {
            "en": "\"Lubię\" means I like (less intense than love). Use accusative case for the object.",
            "ru": "\"Lubię\" означает мне нравится (менее интенсивно чем любить). Используйте винительный падеж."
          }
        },
        {
          "id": "ex2",
          "type": "fill_blank",
          "sentence": {
            "polish": "Nie _____ kawy.",
            "en": "I don''t like coffee.",
            "ru": "Мне не нравится кофе."
          },
          "correctAnswer": "lubię",
          "acceptableAnswers": ["lubię", "lubie"],
          "hint": {
            "en": "Same verb as ''like'', just add ''nie''",
            "ru": "Тот же глагол что и ''нравится'', просто добавьте ''nie''"
          }
        },
        {
          "id": "ex3",
          "type": "matching",
          "instruction": {
            "en": "Match the expressions with their meanings",
            "ru": "Сопоставьте выражения с их значениями"
          },
          "pairs": [
            {"left": "Lubię", "right": "I like", "pairId": 1},
            {"left": "Kocham", "right": "I love", "pairId": 2},
            {"left": "Nienawidzę", "right": "I hate", "pairId": 3},
            {"left": "Wolę", "right": "I prefer", "pairId": 4}
          ]
        },
        {
          "id": "ex4",
          "type": "translation",
          "prompt": {
            "en": "Translate to Polish: I love Poland",
            "ru": "Переведите на польский: Я люблю Польшу"
          },
          "correctAnswer": "Kocham Polskę",
          "acceptableAnswers": ["Kocham Polskę", "kocham Polskę", "Kocham Polske", "kocham polskę"],
          "hint": {
            "en": "Use the strong verb for love",
            "ru": "Используйте сильный глагол для любви"
          }
        },
        {
          "id": "ex5",
          "type": "multiple_choice",
          "question": {
            "en": "What does \"Wolę herbatę niż kawę\" mean?",
            "ru": "Что означает \"Wolę herbatę niż kawę\"?"
          },
          "options": [
            {"id": "a", "text": "I prefer tea to coffee", "isCorrect": true},
            {"id": "b", "text": "I like tea and coffee", "isCorrect": false},
            {"id": "c", "text": "I hate tea and coffee", "isCorrect": false},
            {"id": "d", "text": "I drink tea not coffee", "isCorrect": false}
          ],
          "explanation": {
            "en": "\"Wolę X niż Y\" means I prefer X to Y.",
            "ru": "\"Wolę X niż Y\" означает я предпочитаю X, а не Y."
          }
        },
        {
          "id": "ex6",
          "type": "fill_blank",
          "sentence": {
            "polish": "Bardzo _____ czytać książki.",
            "en": "I really like reading books.",
            "ru": "Мне очень нравится читать книги."
          },
          "correctAnswer": "lubię",
          "acceptableAnswers": ["lubię", "lubie"],
          "hint": {
            "en": "Bardzo makes it stronger - ''very much like''",
            "ru": "Bardzo делает его сильнее - ''очень нравится''"
          }
        }
      ]
    }'
);

-- Lesson 13: Present Continuous Actions
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'A1',
  13,
  3,
  3,
  'What Are You Doing? - Present Actions',
  'Что ты делаешь? - Настоящие действия',
  'Learn to describe ongoing actions in the present',
  'Научитесь описывать текущие действия',
  20,
  25,
  true,
  '{
      "exercises": [
        {
          "id": "ex1",
          "type": "multiple_choice",
          "question": {
            "en": "How do you ask \"What are you doing?\" in Polish?",
            "ru": "Как спросить \"Что ты делаешь?\" по-польски?"
          },
          "options": [
            {"id": "a", "text": "Co robisz?", "isCorrect": true},
            {"id": "b", "text": "Co masz?", "isCorrect": false},
            {"id": "c", "text": "Gdzie jesteś?", "isCorrect": false},
            {"id": "d", "text": "Jak się masz?", "isCorrect": false}
          ],
          "explanation": {
            "en": "\"Co robisz?\" uses the verb ''robić'' (to do/make) in present tense.",
            "ru": "\"Co robisz?\" использует глагол ''robić'' (делать) в настоящем времени."
          }
        },
        {
          "id": "ex2",
          "type": "fill_blank",
          "sentence": {
            "polish": "Teraz _____ telewizję.",
            "en": "Now I am watching television.",
            "ru": "Сейчас я смотрю телевизор."
          },
          "correctAnswer": "oglądam",
          "acceptableAnswers": ["oglądam", "ogladam"],
          "hint": {
            "en": "The verb ''to watch'' in first person",
            "ru": "Глагол ''смотреть'' в первом лице"
          }
        },
        {
          "id": "ex3",
          "type": "matching",
          "instruction": {
            "en": "Match the ongoing actions with their Polish translations",
            "ru": "Сопоставьте текущие действия с их польскими переводами"
          },
          "pairs": [
            {"left": "I am eating", "right": "Jem", "pairId": 1},
            {"left": "I am reading", "right": "Czytam", "pairId": 2},
            {"left": "I am writing", "right": "Piszę", "pairId": 3},
            {"left": "I am sleeping", "right": "Śpię", "pairId": 4}
          ]
        },
        {
          "id": "ex4",
          "type": "translation",
          "prompt": {
            "en": "Translate to Polish: She is cooking",
            "ru": "Переведите на польский: Она готовит"
          },
          "correctAnswer": "Ona gotuje",
          "acceptableAnswers": ["Ona gotuje", "ona gotuje", "Gotuje"],
          "hint": {
            "en": "Polish doesn''t need a separate continuous form",
            "ru": "В польском нет отдельной продолженной формы"
          }
        },
        {
          "id": "ex5",
          "type": "multiple_choice",
          "question": {
            "en": "What does \"Pracuję nad projektem\" mean?",
            "ru": "Что означает \"Pracuję nad projektem\"?"
          },
          "options": [
            {"id": "a", "text": "I am working on a project", "isCorrect": true},
            {"id": "b", "text": "I finished a project", "isCorrect": false},
            {"id": "c", "text": "I need a project", "isCorrect": false},
            {"id": "d", "text": "I like projects", "isCorrect": false}
          ],
          "explanation": {
            "en": "\"Pracuję nad\" means I am working on (something). ''Nad'' means over/on.",
            "ru": "\"Pracuję nad\" означает я работаю над (чем-то). ''Nad'' означает над."
          }
        },
        {
          "id": "ex6",
          "type": "fill_blank",
          "sentence": {
            "polish": "W tej chwili _____ z przyjacielem.",
            "en": "Right now I am talking with a friend.",
            "ru": "Прямо сейчас я разговариваю с другом."
          },
          "correctAnswer": "rozmawiam",
          "acceptableAnswers": ["rozmawiam"],
          "hint": {
            "en": "The verb ''to talk/chat'' - rozmawiać",
            "ru": "Глагол ''разговаривать'' - rozmawiać"
          }
        }
      ]
    }'
);

-- Lesson 14: Past Tense Introduction
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'A2',
  14,
  3,
  4,
  'Talking About the Past',
  'Разговор о прошлом',
  'Learn basic past tense verbs in Polish',
  'Изучите базовые глаголы прошедшего времени',
  22,
  30,
  true,
  '{
      "exercises": [
        {
          "id": "ex1",
          "type": "multiple_choice",
          "question": {
            "en": "How do you say \"I was\" (masculine) in Polish?",
            "ru": "Как сказать \"я был\" по-польски?"
          },
          "options": [
            {"id": "a", "text": "byłem", "isCorrect": true},
            {"id": "b", "text": "jestem", "isCorrect": false},
            {"id": "c", "text": "będę", "isCorrect": false},
            {"id": "d", "text": "byłam", "isCorrect": false}
          ],
          "explanation": {
            "en": "''Byłem'' is past tense of ''być'' for masculine subject. ''Byłam'' is for feminine.",
            "ru": "''Byłem'' - прошедшее время глагола ''być'' для мужского рода. ''Byłam'' - для женского."
          }
        },
        {
          "id": "ex2",
          "type": "fill_blank",
          "sentence": {
            "polish": "Wczoraj _____ w kinie.",
            "en": "Yesterday I was at the cinema. (masculine speaker)",
            "ru": "Вчера я был в кино."
          },
          "correctAnswer": "byłem",
          "acceptableAnswers": ["byłem", "bylem"],
          "hint": {
            "en": "Past tense of ''to be'' - masculine",
            "ru": "Прошедшее время глагола ''быть'' - мужской род"
          }
        },
        {
          "id": "ex3",
          "type": "matching",
          "instruction": {
            "en": "Match present tense with past tense (masculine)",
            "ru": "Сопоставьте настоящее время с прошедшим (мужской род)"
          },
          "pairs": [
            {"left": "jestem (I am)", "right": "byłem (I was)", "pairId": 1},
            {"left": "mam (I have)", "right": "miałem (I had)", "pairId": 2},
            {"left": "robię (I do)", "right": "robiłem (I did)", "pairId": 3},
            {"left": "idę (I go)", "right": "szedłem (I went)", "pairId": 4}
          ]
        },
        {
          "id": "ex4",
          "type": "translation",
          "prompt": {
            "en": "Translate to Polish: I read a book (past, masculine)",
            "ru": "Переведите на польский: Я читал книгу"
          },
          "correctAnswer": "Czytałem książkę",
          "acceptableAnswers": ["Czytałem książkę", "czytalem ksiazke", "Czytałem ksiażkę"],
          "hint": {
            "en": "Add -łem to the verb stem",
            "ru": "Добавьте -łem к основе глагола"
          }
        },
        {
          "id": "ex5",
          "type": "multiple_choice",
          "question": {
            "en": "What does \"Jadłem śniadanie\" mean?",
            "ru": "Что означает \"Jadłem śniadanie\"?"
          },
          "options": [
            {"id": "a", "text": "I ate breakfast", "isCorrect": true},
            {"id": "b", "text": "I am eating breakfast", "isCorrect": false},
            {"id": "c", "text": "I will eat breakfast", "isCorrect": false},
            {"id": "d", "text": "I like breakfast", "isCorrect": false}
          ],
          "explanation": {
            "en": "''Jadłem'' is past tense of ''jeść'' (to eat) - masculine form.",
            "ru": "''Jadłem'' - прошедшее время глагола ''jeść'' (есть) - мужской род."
          }
        },
        {
          "id": "ex6",
          "type": "fill_blank",
          "sentence": {
            "polish": "W zeszłym tygodniu _____ do Warszawy.",
            "en": "Last week I went to Warsaw. (masculine)",
            "ru": "На прошлой неделе я ездил в Варшаву."
          },
          "correctAnswer": "jechałem",
          "acceptableAnswers": ["jechałem", "jechalem"],
          "hint": {
            "en": "Past tense of ''jechać'' (to go by vehicle)",
            "ru": "Прошедшее время глагола ''jechać'' (ехать)"
          }
        }
      ]
    }'
);

-- Lesson 15: Future Plans and Intentions
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'A2',
  15,
  3,
  5,
  'Future Plans and Intentions',
  'Планы и намерения на будущее',
  'Learn to talk about future plans and intentions',
  'Научитесь говорить о будущих планах и намерениях',
  20,
  30,
  true,
  '{
      "exercises": [
        {
          "id": "ex1",
          "type": "multiple_choice",
          "question": {
            "en": "How do you say \"I will be\" in Polish?",
            "ru": "Как сказать \"я буду\" по-польски?"
          },
          "options": [
            {"id": "a", "text": "będę", "isCorrect": true},
            {"id": "b", "text": "jestem", "isCorrect": false},
            {"id": "c", "text": "byłem", "isCorrect": false},
            {"id": "d", "text": "będzie", "isCorrect": false}
          ],
          "explanation": {
            "en": "''Będę'' is the future tense of ''być'' (to be) for first person.",
            "ru": "''Będę'' - будущее время глагола ''być'' (быть) для первого лица."
          }
        },
        {
          "id": "ex2",
          "type": "fill_blank",
          "sentence": {
            "polish": "Jutro _____ do kina.",
            "en": "Tomorrow I will go to the cinema.",
            "ru": "Завтра я пойду в кино."
          },
          "correctAnswer": "pójdę",
          "acceptableAnswers": ["pójdę", "pojde", "będę iść"],
          "hint": {
            "en": "Perfective future of ''iść'' (to go)",
            "ru": "Совершенный вид будущего времени ''iść'' (идти)"
          }
        },
        {
          "id": "ex3",
          "type": "matching",
          "instruction": {
            "en": "Match the time expressions with plans",
            "ru": "Сопоставьте временные выражения с планами"
          },
          "pairs": [
            {"left": "Jutro", "right": "Tomorrow", "pairId": 1},
            {"left": "W przyszłym tygodniu", "right": "Next week", "pairId": 2},
            {"left": "Za miesiąc", "right": "In a month", "pairId": 3},
            {"left": "Wkrótce", "right": "Soon", "pairId": 4}
          ]
        },
        {
          "id": "ex4",
          "type": "translation",
          "prompt": {
            "en": "Translate to Polish: I will study Polish",
            "ru": "Переведите на польский: Я буду учить польский"
          },
          "correctAnswer": "Będę uczyć się polskiego",
          "acceptableAnswers": ["Będę uczyć się polskiego", "bede uczyc sie polskiego", "Będę się uczyć polskiego"],
          "hint": {
            "en": "Use compound future: będę + infinitive",
            "ru": "Используйте составное будущее: będę + инфинитив"
          }
        },
        {
          "id": "ex5",
          "type": "multiple_choice",
          "question": {
            "en": "What does \"Chcę zostać lekarzem\" mean?",
            "ru": "Что означает \"Chcę zostać lekarzem\"?"
          },
          "options": [
            {"id": "a", "text": "I want to become a doctor", "isCorrect": true},
            {"id": "b", "text": "I am a doctor", "isCorrect": false},
            {"id": "c", "text": "I was a doctor", "isCorrect": false},
            {"id": "d", "text": "I like doctors", "isCorrect": false}
          ],
          "explanation": {
            "en": "''Zostać'' means to become. This expresses intention or aspiration.",
            "ru": "''Zostać'' означает стать. Выражает намерение или стремление."
          }
        },
        {
          "id": "ex6",
          "type": "fill_blank",
          "sentence": {
            "polish": "W wakacje _____ do Polski.",
            "en": "During vacation I will travel to Poland.",
            "ru": "Во время отпуска я поеду в Польшу."
          },
          "correctAnswer": "pojadę",
          "acceptableAnswers": ["pojadę", "pojade"],
          "hint": {
            "en": "Perfective future of ''jechać'' (to travel)",
            "ru": "Совершенный вид будущего времени ''jechać'' (ехать)"
          }
        }
      ]
    }'
);
