-- Fixed lesson seed data

-- Lesson 16: Past Tense - Perfective & Imperfective Aspects
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'B1',
  16,
  4,
  1,
  'Past Tense - Understanding Polish Aspects',
  'Прошедшее время - Понимание польских аспектов',
  'Master the perfective and imperfective aspects in Polish past tense',
  'Освойте совершенный и несовершенный вид в польском прошедшем времени',
  25,
  35,
  true,
  '{
      "exercises": [
        {
          "id": "ex1",
          "type": "multiple_choice",
          "question": {
            "en": "Which sentence uses the PERFECTIVE aspect correctly?",
            "ru": "Какое предложение правильно использует СОВЕРШЕННЫЙ вид?"
          },
          "options": [
            {"id": "a", "text": "Przeczytałem książkę. (I read/finished the book)", "isCorrect": true},
            {"id": "b", "text": "Czytałem książkę. (I was reading the book)", "isCorrect": false},
            {"id": "c", "text": "Czytam książkę. (I am reading the book)", "isCorrect": false},
            {"id": "d", "text": "Będę czytał książkę. (I will be reading)", "isCorrect": false}
          ],
          "explanation": {
            "en": "Przeczytałem (perfective) indicates a completed action. The prefix prze- makes it perfective, showing the action was finished.",
            "ru": "Przeczytałem (совершенный вид) указывает на завершённое действие. Приставка prze- делает его совершенным, показывая, что действие закончено."
          }
        },
        {
          "id": "ex2",
          "type": "translation",
          "prompt": {
            "en": "Translate using IMPERFECTIVE aspect: I was eating breakfast when you called",
            "ru": "Переведите используя НЕСОВЕРШЕННЫЙ вид: Я ел завтрак, когда ты позвонил"
          },
          "correctAnswer": "Jadłem śniadanie, gdy zadzwoniłeś",
          "acceptableAnswers": ["Jadłem śniadanie gdy zadzwoniłeś", "Jadłem śniadanie, kiedy zadzwoniłeś"],
          "hint": {
            "en": "Use jadłem (imperfective - ongoing) and zadzwoniłeś (perfective - completed)",
            "ru": "Используйте jadłem (несовершенный - продолженный) и zadzwoniłeś (совершенный - завершённый)"
          }
        },
        {
          "id": "ex3",
          "type": "fill_blank",
          "sentence": "Wczoraj ___ przez dwie godziny. (Yesterday I studied for two hours - completed action)",
          "options": ["uczyłem się", "nauczyłem się"],
          "correctAnswer": "uczyłem się",
          "explanation": {
            "en": "Use imperfective uczyłem się because the focus is on the duration (przez dwie godziny), not completion",
            "ru": "Используйте несовершенный uczyłem się, потому что акцент на продолжительности (przez dwie godziny), а не на завершении"
          }
        },
        {
          "id": "ex4",
          "type": "matching",
          "instruction": {
            "en": "Match the imperfective verbs with their perfective counterparts",
            "ru": "Сопоставьте несовершенные глаголы с их совершенными парами"
          },
          "pairs": [
            {"left": "robić (to do)", "right": "zrobić (to finish doing)"},
            {"left": "pisać (to write)", "right": "napisać (to finish writing)"},
            {"left": "czytać (to read)", "right": "przeczytać (to finish reading)"},
            {"left": "mówić (to speak)", "right": "powiedzieć (to say/tell)"}
          ]
        },
        {
          "id": "ex5",
          "type": "listening",
          "audioText": "Kiedy byłem dzieckiem, często chodziłem do kina. W zeszłą sobotę poszedłem do nowego kina w centrum.",
          "question": {
            "en": "Which verbs indicate repeated past actions vs. single completed action?",
            "ru": "Какие глаголы указывают на повторяющиеся действия в прошлом, а какие на единичное завершённое действие?"
          },
          "correctAnswer": "chodziłem (repeated), poszedłem (single completed)",
          "options": ["chodziłem (repeated), poszedłem (single)", "both are repeated", "both are single actions", "neither indicates frequency"]
        },
        {
          "id": "ex6",
          "type": "speaking",
          "prompt": {
            "en": "Describe what you did yesterday using both perfective and imperfective verbs",
            "ru": "Опишите, что вы делали вчера, используя совершенные и несовершенные глаголы"
          },
          "sampleAnswer": "Wczoraj rano wstałem o ósmej. Jadłem śniadanie i czytałem gazetę. Potem poszedłem do pracy.",
          "tips": {
            "en": "Use perfective for completed actions (wstałem - got up, poszedłem - went) and imperfective for ongoing actions (jadłem - was eating, czytałem - was reading)",
            "ru": "Используйте совершенный вид для завершённых действий (wstałem - встал, poszedłem - пошёл) и несовершенный для продолженных действий (jadłem - ел, czytałem - читал)"
          }
        }
      ]
    }'
);

-- Lesson 17: Future Tense Formation
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'B1',
  17,
  4,
  2,
  'Future Tense in Polish',
  'Будущее время в польском языке',
  'Learn how to express future actions in Polish',
  'Научитесь выражать будущие действия на польском',
  20,
  30,
  true,
  '{
      "exercises": [
        {
          "id": "ex1",
          "type": "multiple_choice",
          "question": {
            "en": "How do you say: I will read a book (completed action in future)?",
            "ru": "Как сказать: Я прочитаю книгу (завершённое действие в будущем)?"
          },
          "options": [
            {"id": "a", "text": "Przeczytam książkę", "isCorrect": true},
            {"id": "b", "text": "Będę czytał książkę", "isCorrect": false},
            {"id": "c", "text": "Czytałem książkę", "isCorrect": false},
            {"id": "d", "text": "Czytam książkę", "isCorrect": false}
          ],
          "explanation": {
            "en": "Perfective verbs in present form express future: przeczytam = I will read (and finish)",
            "ru": "Совершенные глаголы в настоящем времени выражают будущее: przeczytam = я прочитаю (и закончу)"
          }
        },
        {
          "id": "ex2",
          "type": "translation",
          "prompt": {
            "en": "Translate: Tomorrow I will be working all day",
            "ru": "Переведите: Завтра я буду работать весь день"
          },
          "correctAnswer": "Jutro będę pracował cały dzień",
          "acceptableAnswers": ["Jutro będę pracował cały dzień", "Jutro będę pracować cały dzień"],
          "hint": {
            "en": "Use będę + imperfective verb (infinitive or past form)",
            "ru": "Используйте będę + несовершенный глагол (инфинитив или прошедшая форма)"
          }
        },
        {
          "id": "ex3",
          "type": "fill_blank",
          "sentence": "W przyszłym roku ___ do Polski. (Next year I will go to Poland)",
          "options": ["pojadę", "będę jechał", "jechałem"],
          "correctAnswer": "pojadę",
          "explanation": {
            "en": "Pojadę (perfective) indicates a completed future trip. Use będę jechał only for ongoing process.",
            "ru": "Pojadę (совершенный) указывает на завершённую будущую поездку. Będę jechał только для продолженного процесса."
          }
        },
        {
          "id": "ex4",
          "type": "matching",
          "instruction": {
            "en": "Match the future forms",
            "ru": "Сопоставьте формы будущего времени"
          },
          "pairs": [
            {"left": "zrobię", "right": "I will do/finish"},
            {"left": "będę robił", "right": "I will be doing"},
            {"left": "napiszę", "right": "I will write/finish writing"},
            {"left": "będę pisał", "right": "I will be writing"}
          ]
        },
        {
          "id": "ex5",
          "type": "listening",
          "audioText": "Za tydzień jadę do Krakowa. Będę tam przez trzy dni. Zwiedzę Wawel i stare miasto.",
          "question": {
            "en": "What will the speaker do in Krakow?",
            "ru": "Что будет делать говорящий в Кракове?"
          },
          "correctAnswer": "Visit Wawel castle and old town",
          "options": ["Visit Wawel and old town", "Stay for a week", "Go to Warsaw", "Study Polish"]
        },
        {
          "id": "ex6",
          "type": "speaking",
          "prompt": {
            "en": "Talk about your plans for next weekend",
            "ru": "Расскажите о своих планах на следующие выходные"
          },
          "sampleAnswer": "W następny weekend pójdę na koncert. Spotkam się z przyjaciółmi. Będziemy razem spędzać czas.",
          "tips": {
            "en": "Use perfective for specific completed actions, będę/będziemy + verb for ongoing activities",
            "ru": "Используйте совершенный вид для конкретных завершённых действий, będę/będziemy + глагол для продолженных действий"
          }
        }
      ]
    }'
);

-- Lesson 18: Instrumental Case
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'B1',
  18,
  4,
  3,
  'Instrumental Case - Narzędnik',
  'Творительный падеж - Narzędnik',
  'Master the instrumental case for professions, tools, and more',
  'Освойте творительный падеж для профессий, инструментов и многого другого',
  25,
  35,
  true,
  '{
      "exercises": [
        {
          "id": "ex1",
          "type": "multiple_choice",
          "question": {
            "en": "Complete: Jestem ___ (I am a teacher)",
            "ru": "Дополните: Jestem ___ (Я учитель)"
          },
          "options": [
            {"id": "a", "text": "nauczycielem", "isCorrect": true},
            {"id": "b", "text": "nauczyciel", "isCorrect": false},
            {"id": "c", "text": "nauczyciela", "isCorrect": false},
            {"id": "d", "text": "nauczycielowi", "isCorrect": false}
          ],
          "explanation": {
            "en": "After być (to be) for professions, use instrumental case: nauczycielem",
            "ru": "После być для профессий используется творительный падеж: nauczycielem"
          }
        },
        {
          "id": "ex2",
          "type": "translation",
          "prompt": {
            "en": "Translate: I write with a pen",
            "ru": "Переведите: Я пишу ручкой"
          },
          "correctAnswer": "Piszę długopisem",
          "acceptableAnswers": ["Piszę długopisem", "Piszę piórem"],
          "hint": {
            "en": "długopis (pen) becomes długopisem in instrumental",
            "ru": "długopis (ручка) становится długopisem в творительном падеже"
          }
        },
        {
          "id": "ex3",
          "type": "fill_blank",
          "sentence": "Jadę do pracy ___ (I go to work by bus)",
          "options": ["autobusem", "autobus", "autobusa"],
          "correctAnswer": "autobusem",
          "explanation": {
            "en": "Use instrumental with means of transportation: jechać autobusem (by bus)",
            "ru": "Используйте творительный падеж с видами транспорта: jechać autobusem (автобусом)"
          }
        },
        {
          "id": "ex4",
          "type": "matching",
          "instruction": {
            "en": "Match professions in nominative with instrumental forms",
            "ru": "Сопоставьте профессии в именительном с формами творительного падежа"
          },
          "pairs": [
            {"left": "lekarz (doctor)", "right": "lekarzem"},
            {"left": "studentka (female student)", "right": "studentką"},
            {"left": "inżynier (engineer)", "right": "inżynierem"},
            {"left": "pielęgniarka (nurse)", "right": "pielęgniarką"}
          ]
        },
        {
          "id": "ex5",
          "type": "listening",
          "audioText": "Moja siostra jest architektką. Pracuje w dużej firmie. Do pracy jeździ tramwajem.",
          "question": {
            "en": "What is the speaker sister profession and how does she commute?",
            "ru": "Кем работает сестра говорящего и как она добирается до работы?"
          },
          "correctAnswer": "She is an architect and commutes by tram",
          "options": ["Architect, by tram", "Engineer, by bus", "Teacher, by car", "Doctor, by metro"]
        },
        {
          "id": "ex6",
          "type": "speaking",
          "prompt": {
            "en": "Describe your profession and how you get to work/school",
            "ru": "Опишите свою профессию и как вы добираетесь на работу/учёбу"
          },
          "sampleAnswer": "Jestem programistą. Pracuję zdalnie, więc nie muszę nigdzie jeździć. Czasami jeżdżę do biura pociągiem.",
          "tips": {
            "en": "Remember: profession after być uses instrumental, and so does means of transport after jechać",
            "ru": "Помните: профессия после być использует творительный падеж, как и вид транспорта после jechać"
          }
        }
      ]
    }'
);

-- Lesson 19: Comparative and Superlative Forms
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'B1',
  19,
  4,
  4,
  'Making Comparisons',
  'Сравнения в польском',
  'Learn how to compare things using comparative and superlative forms',
  'Научитесь сравнивать вещи, используя сравнительную и превосходную степени',
  20,
  30,
  true,
  '{
      "exercises": [
        {
          "id": "ex1",
          "type": "multiple_choice",
          "question": {
            "en": "How do you say: Warsaw is bigger than Krakow?",
            "ru": "Как сказать: Варшава больше, чем Краков?"
          },
          "options": [
            {"id": "a", "text": "Warszawa jest większa niż Kraków", "isCorrect": true},
            {"id": "b", "text": "Warszawa jest duża niż Kraków", "isCorrect": false},
            {"id": "c", "text": "Warszawa jest największa", "isCorrect": false},
            {"id": "d", "text": "Warszawa jest bardzo duża", "isCorrect": false}
          ],
          "explanation": {
            "en": "Comparative: duży → większy (bigger). Use niż (than) for comparisons.",
            "ru": "Сравнительная степень: duży → większy (больше). Используйте niż (чем) для сравнений."
          }
        },
        {
          "id": "ex2",
          "type": "translation",
          "prompt": {
            "en": "Translate: This book is the most interesting",
            "ru": "Переведите: Эта книга самая интересная"
          },
          "correctAnswer": "Ta książka jest najciekawsza",
          "acceptableAnswers": ["Ta książka jest najciekawsza", "Ta książka to najciekawsza"],
          "hint": {
            "en": "Superlative: add naj- to comparative form. ciekawy → ciekawszy → najciekawszy",
            "ru": "Превосходная степень: добавьте naj- к сравнительной форме. ciekawy → ciekawszy → najciekawszy"
          }
        },
        {
          "id": "ex3",
          "type": "fill_blank",
          "sentence": "Mój brat jest ___ ode mnie. (My brother is older than me)",
          "options": ["starszy", "stary", "najstarszy"],
          "correctAnswer": "starszy",
          "explanation": {
            "en": "Comparative: stary → starszy (older). Use od/ode + genitive for than with people.",
            "ru": "Сравнительная степень: stary → starszy (старше). Используйте od/ode + родительный для чем с людьми."
          }
        },
        {
          "id": "ex4",
          "type": "matching",
          "instruction": {
            "en": "Match adjectives with their comparative forms",
            "ru": "Сопоставьте прилагательные с их сравнительными формами"
          },
          "pairs": [
            {"left": "dobry (good)", "right": "lepszy (better)"},
            {"left": "zły (bad)", "right": "gorszy (worse)"},
            {"left": "mały (small)", "right": "mniejszy (smaller)"},
            {"left": "wysoki (tall)", "right": "wyższy (taller)"}
          ]
        },
        {
          "id": "ex5",
          "type": "listening",
          "audioText": "Polski jest trudniejszy niż angielski, ale łatwiejszy niż chiński. Dla mnie najłatwiejszy język to rosyjski.",
          "question": {
            "en": "According to the speaker, which language is the easiest?",
            "ru": "По мнению говорящего, какой язык самый лёгкий?"
          },
          "correctAnswer": "Russian",
          "options": ["Russian", "English", "Polish", "Chinese"]
        },
        {
          "id": "ex6",
          "type": "speaking",
          "prompt": {
            "en": "Compare your hometown with another city you know",
            "ru": "Сравните свой родной город с другим городом, который вы знаете"
          },
          "sampleAnswer": "Moje miasto jest mniejsze niż Warszawa. Jest spokojniejsze i czystsze. Warszawa jest bardziej nowoczesna.",
          "tips": {
            "en": "Use bardziej + adjective for longer adjectives (bardziej nowoczesny - more modern)",
            "ru": "Используйте bardziej + прилагательное для длинных прилагательных (bardziej nowoczesny - более современный)"
          }
        }
      ]
    }'
);

-- Lesson 20: Modal Verbs
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'B1',
  20,
  4,
  5,
  'Modal Verbs - Expressing Possibility and Necessity',
  'Модальные глаголы - Возможность и необходимость',
  'Learn to use móc, musieć, chcieć, and powinien correctly',
  'Научитесь правильно использовать móc, musieć, chcieć и powinien',
  20,
  30,
  true,
  '{
      "exercises": [
        {
          "id": "ex1",
          "type": "multiple_choice",
          "question": {
            "en": "Which sentence expresses I must/have to go?",
            "ru": "Какое предложение выражает Я должен идти?"
          },
          "options": [
            {"id": "a", "text": "Muszę iść", "isCorrect": true},
            {"id": "b", "text": "Mogę iść", "isCorrect": false},
            {"id": "c", "text": "Chcę iść", "isCorrect": false},
            {"id": "d", "text": "Powinienem iść", "isCorrect": false}
          ],
          "explanation": {
            "en": "Musieć = must/have to (strong obligation). Móc = can/may, chcieć = want, powinien = should.",
            "ru": "Musieć = должен (сильная обязанность). Móc = мочь, chcieć = хотеть, powinien = следует."
          }
        },
        {
          "id": "ex2",
          "type": "translation",
          "prompt": {
            "en": "Translate: Can you help me?",
            "ru": "Переведите: Можешь мне помочь?"
          },
          "correctAnswer": "Możesz mi pomóc?",
          "acceptableAnswers": ["Możesz mi pomóc?", "Czy możesz mi pomóc?"],
          "hint": {
            "en": "Use móc (can/be able). Conjugate: mogę, możesz, może...",
            "ru": "Используйте móc (мочь). Спряжение: mogę, możesz, może..."
          }
        },
        {
          "id": "ex3",
          "type": "fill_blank",
          "sentence": "Jestem zmęczony. ___ odpocząć. (I am tired. I should rest)",
          "options": ["Powinienem", "Muszę", "Mogę"],
          "correctAnswer": "Powinienem",
          "explanation": {
            "en": "Powinien = should (advice/recommendation). Powinienem odpocząć = I should rest.",
            "ru": "Powinien = следует (совет/рекомендация). Powinienem odpocząć = мне следует отдохнуть."
          }
        },
        {
          "id": "ex4",
          "type": "matching",
          "instruction": {
            "en": "Match modal verbs with their meanings",
            "ru": "Сопоставьте модальные глаголы с их значениями"
          },
          "pairs": [
            {"left": "Mogę to zrobić", "right": "I can do it"},
            {"left": "Muszę to zrobić", "right": "I must/have to do it"},
            {"left": "Chcę to zrobić", "right": "I want to do it"},
            {"left": "Powinienem to zrobić", "right": "I should do it"}
          ]
        },
        {
          "id": "ex5",
          "type": "listening",
          "audioText": "Nie mogę przyjść na spotkanie, bo muszę pracować. Może przyjdę później, jeśli będę mogła.",
          "question": {
            "en": "Why can the speaker come to the meeting?",
            "ru": "Почему говорящий не может прийти на встречу?"
          },
          "correctAnswer": "Because she/he has to work",
          "options": ["Has to work", "Doesn want to", "Is sick", "Has another meeting"]
        },
        {
          "id": "ex6",
          "type": "speaking",
          "prompt": {
            "en": "Talk about things you must do, should do, and want to do this week",
            "ru": "Расскажите о том, что вы должны, следует и хотите сделать на этой неделе"
          },
          "sampleAnswer": "Muszę skończyć projekt w pracy. Powinienem więcej ćwiczyć. Chcę obejrzeć nowy film w weekend.",
          "tips": {
            "en": "Remember: muszę (must), powinienem (should), chcę (want) + infinitive",
            "ru": "Помните: muszę (должен), powinienem (следует), chcę (хочу) + инфинитив"
          }
        }
      ]
    }'
);

-- Lesson 21: Complex Sentences with Conjunctions
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'B1',
  21,
  5,
  1,
  'Complex Sentences with Conjunctions',
  'Сложные предложения с союзами',
  'Learn to connect ideas using Polish conjunctions: because, although, when',
  'Научитесь соединять идеи, используя польские союзы: потому что, хотя, когда',
  25,
  35,
  true,
  '{
      "exercises": [
        {
          "id": "ex1",
          "type": "multiple_choice",
          "question": {
            "en": "Which conjunction means ''because'' and is used in formal contexts?",
            "ru": "Какой союз означает ''потому что'' и используется в формальных контекстах?"
          },
          "options": [
            {"id": "a", "text": "ponieważ", "isCorrect": true},
            {"id": "b", "text": "bo", "isCorrect": false},
            {"id": "c", "text": "chociaż", "isCorrect": false},
            {"id": "d", "text": "gdy", "isCorrect": false}
          ],
          "explanation": {
            "en": "Ponieważ is the formal way to say ''because''. Bo is informal. Both mean the same but ponieważ is preferred in writing and formal speech.",
            "ru": "Ponieważ - это формальный способ сказать ''потому что''. Bo - неформальный. Оба означают одно и то же, но ponieważ предпочтительнее в письменной речи и формальном общении."
          }
        },
        {
          "id": "ex2",
          "type": "translation",
          "prompt": {
            "en": "Translate: I went to the store because I needed bread",
            "ru": "Переведите: Я пошёл в магазин, потому что мне нужен был хлеб"
          },
          "correctAnswer": "Poszedłem do sklepu, ponieważ potrzebowałem chleba",
          "acceptableAnswers": ["Poszedłem do sklepu bo potrzebowałem chleba", "Poszedłem do sklepu, bo potrzebowałem chleba"],
          "hint": {
            "en": "Use poszedłem (I went), do sklepu (to the store), ponieważ/bo (because), potrzebowałem (I needed)",
            "ru": "Используйте poszedłem (я пошёл), do sklepu (в магазин), ponieważ/bo (потому что), potrzebowałem (мне нужен был)"
          }
        },
        {
          "id": "ex3",
          "type": "fill_blank",
          "sentence": "Poszedłem do kina, ___ padał deszcz. (I went to the cinema, although it was raining)",
          "options": ["chociaż", "ponieważ", "kiedy", "gdy"],
          "correctAnswer": "chociaż",
          "explanation": {
            "en": "Chociaż means ''although'' or ''even though''. It introduces a contrasting idea. Mimo że is a synonym.",
            "ru": "Chociaż означает ''хотя'' или ''несмотря на то что''. Оно вводит контрастную идею. Mimo że - синоним."
          }
        },
        {
          "id": "ex4",
          "type": "matching",
          "instruction": {
            "en": "Match the conjunctions with their meanings",
            "ru": "Сопоставьте союзы с их значениями"
          },
          "pairs": [
            {"left": "ponieważ / bo", "right": "because (потому что)"},
            {"left": "chociaż / mimo że", "right": "although (хотя)"},
            {"left": "kiedy / gdy", "right": "when (когда)"},
            {"left": "jeśli / jeżeli", "right": "if (если)"}
          ]
        },
        {
          "id": "ex5",
          "type": "listening",
          "audioText": "Nie poszedłem do pracy, bo byłem chory. Chociaż czułem się źle, zadzwoniłem do szefa. Kiedy mówiłem z nim, obiecałem wrócić jutro.",
          "question": {
            "en": "Identify all conjunctions in the text and their meanings",
            "ru": "Определите все союзы в тексте и их значения"
          },
          "correctAnswer": "bo (because), chociaż (although), kiedy (when)",
          "options": ["bo, chociaż, kiedy", "tylko bo i chociaż", "tylko kiedy", "nie ma spojników"]
        },
        {
          "id": "ex6",
          "type": "speaking",
          "prompt": {
            "en": "Create sentences using: 1) ponieważ 2) chociaż 3) kiedy",
            "ru": "Создайте предложения, используя: 1) ponieważ 2) chociaż 3) kiedy"
          },
          "sampleAnswer": "1) Uczę się polskiego, ponieważ mieszkam w Polsce. 2) Chociaż jest zimno, pójdę na spacer. 3) Kiedy wrócę do domu, zjem kolację.",
          "tips": {
            "en": "Remember: ponieważ (because - formal), chociaż (although), kiedy/gdy (when). Use commas before these conjunctions.",
            "ru": "Помните: ponieważ (потому что - формально), chociaż (хотя), kiedy/gdy (когда). Ставьте запятые перед этими союзами."
          }
        }
      ]
    }'
);

-- Lesson 22: At the Doctor - Health and Body
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'B1',
  22,
  5,
  2,
  'At the Doctor - Health and Body',
  'У врача - Здоровье и тело',
  'Master medical vocabulary and learn to describe symptoms in Polish',
  'Освойте медицинскую лексику и научитесь описывать симптомы по-польски',
  25,
  35,
  true,
  '{
      "exercises": [
        {
          "id": "ex1",
          "type": "multiple_choice",
          "question": {
            "en": "How do you say ''I have a headache'' in Polish?",
            "ru": "Как сказать ''У меня болит голова'' по-польски?"
          },
          "options": [
            {"id": "a", "text": "Boli mnie głowa", "isCorrect": true},
            {"id": "b", "text": "Mam ból głowy", "isCorrect": false},
            {"id": "c", "text": "Jestem chory na głowę", "isCorrect": false},
            {"id": "d", "text": "Moja głowa boli", "isCorrect": false}
          ],
          "explanation": {
            "en": "Boli mnie + body part is the most common way to say something hurts. Mam ból + genitive also works but is less common. Example: Boli mnie brzuch (My stomach hurts).",
            "ru": "Boli mnie + часть тела - самый распространённый способ сказать, что что-то болит. Mam ból + родительный падеж также работает, но менее распространён. Пример: Boli mnie brzuch (У меня болит живот)."
          }
        },
        {
          "id": "ex2",
          "type": "translation",
          "prompt": {
            "en": "Translate: I have a fever and a sore throat",
            "ru": "Переведите: У меня жар и боль в горле"
          },
          "correctAnswer": "Mam gorączkę i boli mnie gardło",
          "acceptableAnswers": ["Mam temperaturę i boli mnie gardło", "Mam gorączkę i ból gardła"],
          "hint": {
            "en": "Use mam gorączkę (I have fever), boli mnie gardło (my throat hurts)",
            "ru": "Используйте mam gorączkę (у меня жар), boli mnie gardło (у меня болит горло)"
          }
        },
        {
          "id": "ex3",
          "type": "fill_blank",
          "sentence": "Chciałbym umówić ___ do lekarza. (I would like to make an appointment with the doctor)",
          "options": ["wizytę", "termin", "spotkanie", "rozmowę"],
          "correctAnswer": "wizytę",
          "explanation": {
            "en": "Umówić wizytę (to make an appointment) is the standard phrase. You can also say: Czy mogę umówić wizytę na czwartek? (Can I make an appointment for Thursday?)",
            "ru": "Umówić wizytę (записаться на приём) - стандартная фраза. Также можно сказать: Czy mogę umówić wizytę na czwartek? (Могу я записаться на приём на четверг?)"
          }
        },
        {
          "id": "ex4",
          "type": "matching",
          "instruction": {
            "en": "Match the symptoms with their Polish translations",
            "ru": "Сопоставьте симптомы с их польскими переводами"
          },
          "pairs": [
            {"left": "headache", "right": "ból głowy"},
            {"left": "cough", "right": "kaszel"},
            {"left": "fever", "right": "gorączka"},
            {"left": "nausea", "right": "mdłości"},
            {"left": "dizziness", "right": "zawroty głowy"}
          ]
        },
        {
          "id": "ex5",
          "type": "listening",
          "audioText": "Dzień dobry, doktorze. Od trzech dni boli mnie głowa i mam kaszel. Wczoraj wieczorem miałem też gorączkę. Czy to może być grypa?",
          "question": {
            "en": "What symptoms does the patient describe?",
            "ru": "Какие симптомы описывает пациент?"
          },
          "correctAnswer": "headache for 3 days, cough, fever last evening",
          "options": ["ból głowy, kaszel, gorączka", "tylko kaszel", "tylko gorączka", "ból brzucha i kaszel"]
        },
        {
          "id": "ex6",
          "type": "speaking",
          "prompt": {
            "en": "You are at the doctor. Describe your symptoms using at least 3 medical terms",
            "ru": "Вы у врача. Опишите свои симптомы, используя минимум 3 медицинских термина"
          },
          "sampleAnswer": "Dzień dobry, doktorze. Od dwóch dni boli mnie gardło i mam kaszel. Wczoraj zaczęłam mieć gorączkę. Czy może mi pani wypisać receptę na antybiotyk?",
          "tips": {
            "en": "Useful phrases: Boli mnie... (hurts me), Mam... (I have), Od kiedy? (Since when?), Czy może Pan/Pani wypisać receptę? (Can you write a prescription?)",
            "ru": "Полезные фразы: Boli mnie... (болит), Mam... (у меня есть), Od kiedy? (С какого времени?), Czy może Pan/Pani wypisać receptę? (Можете выписать рецепт?)"
          }
        }
      ]
    }'
);

-- Lesson 23: Travel and Transportation
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'B1',
  23,
  5,
  3,
  'Travel and Transportation',
  'Путешествия и транспорт',
  'Learn to buy tickets, ask for directions, and discuss accommodation in Polish',
  'Научитесь покупать билеты, спрашивать дорогу и обсуждать жильё по-польски',
  25,
  35,
  true,
  '{
      "exercises": [
        {
          "id": "ex1",
          "type": "multiple_choice",
          "question": {
            "en": "How do you say ''a round-trip ticket'' in Polish?",
            "ru": "Как сказать ''билет туда-обратно'' по-польски?"
          },
          "options": [
            {"id": "a", "text": "bilet powrotny", "isCorrect": false},
            {"id": "b", "text": "bilet w obie strony", "isCorrect": true},
            {"id": "c", "text": "bilet dwukierunkowy", "isCorrect": false},
            {"id": "d", "text": "bilet tam i z powrotem", "isCorrect": false}
          ],
          "explanation": {
            "en": "Bilet w obie strony (ticket in both directions) is the standard term. Bilet w jedną stronę means one-way ticket. Example: Poproszę bilet w obie strony do Krakowa.",
            "ru": "Bilet w obie strony (билет в обе стороны) - стандартный термин. Bilet w jedną stronę означает билет в одну сторону. Пример: Poproszę bilet w obie strony do Krakowa."
          }
        },
        {
          "id": "ex2",
          "type": "translation",
          "prompt": {
            "en": "Translate: Excuse me, how do I get to the train station?",
            "ru": "Переведите: Извините, как добраться до вокзала?"
          },
          "correctAnswer": "Przepraszam, jak dojść do dworca kolejowego?",
          "acceptableAnswers": ["Przepraszam jak dostać się na dworzec", "Przepraszam, jak dojechać do dworca?"],
          "hint": {
            "en": "Use przepraszam (excuse me), jak dojść (how to get on foot) or jak dojechać (how to get by vehicle), dworzec kolejowy (train station)",
            "ru": "Используйте przepraszam (извините), jak dojść (как дойти пешком) или jak dojechać (как доехать), dworzec kolejowy (железнодорожный вокзал)"
          }
        },
        {
          "id": "ex3",
          "type": "fill_blank",
          "sentence": "O której godzinie ___ pociąg do Warszawy? (What time does the train to Warsaw depart?)",
          "options": ["odjeżdża", "przyjeżdża", "jedzie", "wraca"],
          "correctAnswer": "odjeżdża",
          "explanation": {
            "en": "Odjeżdża (departs) is used for asking when transport leaves. Przyjeżdża (arrives) is for arrivals. Example: Pociąg odjeżdża o 15:30 i przyjeżdża o 18:00.",
            "ru": "Odjeżdża (отправляется) используется для вопроса о времени отправления. Przyjeżdża (прибывает) - для прибытия. Пример: Pociąg odjeżdża o 15:30 i przyjeżdża o 18:00."
          }
        },
        {
          "id": "ex4",
          "type": "matching",
          "instruction": {
            "en": "Match the transportation vocabulary",
            "ru": "Сопоставьте транспортную лексику"
          },
          "pairs": [
            {"left": "dworzec kolejowy", "right": "train station"},
            {"left": "przystanek autobusowy", "right": "bus stop"},
            {"left": "lotnisko", "right": "airport"},
            {"left": "peron", "right": "platform"},
            {"left": "rozkład jazdy", "right": "timetable/schedule"}
          ]
        },
        {
          "id": "ex5",
          "type": "listening",
          "audioText": "Dzień dobry. Poproszę bilet w obie strony do Gdańska na jutro. O której odjeżdża najbliższy pociąg? Czy jest przesiadka? I ile kosztuje bilet?",
          "question": {
            "en": "What information is the person asking about?",
            "ru": "О какой информации спрашивает человек?"
          },
          "correctAnswer": "round-trip ticket, departure time, transfers, price",
          "options": ["bilety, godzina, przesiadki, cena", "tylko bilety", "tylko godzina odjazdu", "tylko cena"]
        },
        {
          "id": "ex6",
          "type": "speaking",
          "prompt": {
            "en": "You are at a ticket office. Buy a train ticket and ask about the journey",
            "ru": "Вы в кассе. Купите билет на поезд и спросите о поездке"
          },
          "sampleAnswer": "Dzień dobry. Poproszę bilet w obie strony do Wrocławia na piątek. O której odjeżdża pociąg? Ile trwa podróż? Czy są jakieś przesiadki? Ile to kosztuje?",
          "tips": {
            "en": "Key phrases: Poproszę bilet... (I would like a ticket), O której odjeżdża? (What time does it leave?), Ile trwa? (How long?), Ile kosztuje? (How much?)",
            "ru": "Ключевые фразы: Poproszę bilet... (Я хотел бы билет), O której odjeżdża? (Во сколько отправляется?), Ile trwa? (Сколько длится?), Ile kosztuje? (Сколько стоит?)"
          }
        }
      ]
    }'
);

-- Lesson 24: Polish Culture and Traditions
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'B1',
  24,
  5,
  4,
  'Polish Culture and Traditions',
  'Польская культура и традиции',
  'Explore Polish holidays, celebrations, and cultural customs',
  'Исследуйте польские праздники, торжества и культурные обычаи',
  25,
  35,
  true,
  '{
      "exercises": [
        {
          "id": "ex1",
          "type": "multiple_choice",
          "question": {
            "en": "What is Wigilia?",
            "ru": "Что такое Wigilia?"
          },
          "options": [
            {"id": "a", "text": "Christmas Eve dinner (Сочельник)", "isCorrect": true},
            {"id": "b", "text": "Easter breakfast (Пасхальный завтрак)", "isCorrect": false},
            {"id": "c", "text": "New Year celebration (Празднование Нового года)", "isCorrect": false},
            {"id": "d", "text": "Name day party (Именины)", "isCorrect": false}
          ],
          "explanation": {
            "en": "Wigilia is the traditional Christmas Eve dinner in Poland, celebrated on December 24th. It starts when the first star appears. The meal includes 12 dishes (no meat) and begins with sharing opłatek (Christmas wafer).",
            "ru": "Wigilia - это традиционный польский ужин в Сочельник, который отмечается 24 декабря. Он начинается, когда появляется первая звезда. Ужин включает 12 блюд (без мяса) и начинается с разделения opłatek (рождественская облатка)."
          }
        },
        {
          "id": "ex2",
          "type": "translation",
          "prompt": {
            "en": "Translate: On Easter Monday we celebrate Śmigus-Dyngus by splashing water",
            "ru": "Переведите: В Пасхальный понедельник мы отмечаем Śmigus-Dyngus, обливая водой"
          },
          "correctAnswer": "W Poniedziałek Wielkanocny obchodzimy Śmigus-Dyngus oblewając się wodą",
          "acceptableAnswers": ["W lany poniedziałek świętujemy Śmigus-Dyngus polewając wodą", "W Poniedziałek Wielkanocny świętujemy Śmigus-Dyngus"],
          "hint": {
            "en": "Use obchodzimy/świętujemy (we celebrate), Poniedziałek Wielkanocny (Easter Monday), oblewając się wodą (splashing with water)",
            "ru": "Используйте obchodzimy/świętujemy (мы отмечаем), Poniedziałek Wielkanocny (Пасхальный понедельник), oblewając się wodą (обливаясь водой)"
          }
        },
        {
          "id": "ex3",
          "type": "fill_blank",
          "sentence": "W Polsce ___ są tak samo ważne jak urodziny. (In Poland, name days are as important as birthdays)",
          "options": ["imieniny", "święta", "urodziny", "wigilia"],
          "correctAnswer": "imieniny",
          "explanation": {
            "en": "Imieniny (name days) are traditional Catholic celebrations of the feast day of the saint whose name you bear. Many Poles celebrate both birthdays and name days.",
            "ru": "Imieniny (именины) - это традиционные католические празднования дня святого, чьё имя вы носите. Многие поляки отмечают и дни рождения, и именины."
          }
        },
        {
          "id": "ex4",
          "type": "matching",
          "instruction": {
            "en": "Match Polish holidays with their dates or characteristics",
            "ru": "Сопоставьте польские праздники с их датами или характеристиками"
          },
          "pairs": [
            {"left": "Wigilia", "right": "December 24 - 12 meatless dishes"},
            {"left": "Śmigus-Dyngus", "right": "Easter Monday - water splashing"},
            {"left": "Wszystkich Świętych", "right": "November 1 - visiting graves with candles"},
            {"left": "Andrzejki", "right": "November 29/30 - fortune telling"}
          ]
        },
        {
          "id": "ex5",
          "type": "listening",
          "audioText": "W Polsce Boże Narodzenie jest bardzo ważnym świętem rodzinnym. Wigilia zaczyna się, gdy pojawi się pierwsza gwiazda. Cała rodzina siedzi przy stole i dzieli się opłatkiem, życząc sobie wszystkiego najlepszego. Potem jemy dwanaście tradycyjnych potraw.",
          "question": {
            "en": "What are the key elements of Polish Christmas Eve described?",
            "ru": "Какие ключевые элементы польского Сочельника описаны?"
          },
          "correctAnswer": "first star, family gathering, sharing opłatek, 12 traditional dishes",
          "options": ["gwiazda, rodzina, opłatek, 12 potraw", "tylko opłatek", "tylko kolacja", "prezenty pod choinką"]
        },
        {
          "id": "ex6",
          "type": "speaking",
          "prompt": {
            "en": "Describe a Polish tradition or holiday that interests you",
            "ru": "Опишите польскую традицию или праздник, который вас интересует"
          },
          "sampleAnswer": "Bardzo ciekawa jest tradycja Wigilii. Wigilia to święto 24 grudnia. Polacy jedzą dwanaście potraw bez mięsa. Przed kolacją dzielą się opłatkiem i życzą sobie zdrowia i szczęścia. Jest też puste miejsce przy stole dla niespodziewanego gościa.",
          "tips": {
            "en": "Other traditions to mention: Śmigus-Dyngus (water Monday), Wszystkich Świętych (candles on graves), Andrzejki (fortune telling), imieniny (name days)",
            "ru": "Другие традиции: Śmigus-Dyngus (обливной понедельник), Wszystkich Świętych (свечи на могилах), Andrzejki (гадания), imieniny (именины)"
          }
        }
      ]
    }'
);

-- Lesson 25: Business Polish - Basic Professional Communication
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'B1',
  25,
  5,
  5,
  'Business Polish - Professional Communication',
  'Деловой польский - Профессиональное общение',
  'Master basic business communication: emails, phone calls, and job interviews',
  'Освойте базовое деловое общение: электронные письма, телефонные звонки и собеседования',
  25,
  35,
  true,
  '{
      "exercises": [
        {
          "id": "ex1",
          "type": "multiple_choice",
          "question": {
            "en": "What is the most formal way to start a business email in Polish?",
            "ru": "Как наиболее формально начать деловое письмо по-польски?"
          },
          "options": [
            {"id": "a", "text": "Szanowny Panie / Szanowna Pani", "isCorrect": true},
            {"id": "b", "text": "Drogi Panie / Droga Pani", "isCorrect": false},
            {"id": "c", "text": "Hej", "isCorrect": false},
            {"id": "d", "text": "Cześć", "isCorrect": false}
          ],
          "explanation": {
            "en": "Szanowny Panie (Dear Sir) / Szanowna Pani (Dear Madam) is the most formal greeting. Use Drogi/Droga for less formal business emails. End with: Z poważaniem (Yours faithfully) or Łączę pozdrowienia (Kind regards).",
            "ru": "Szanowny Panie (Уважаемый господин) / Szanowna Pani (Уважаемая госпожа) - самое формальное обращение. Используйте Drogi/Droga для менее формальных деловых писем. Заканчивайте: Z poważaniem (С уважением) или Łączę pozdrowienia (С наилучшими пожеланиями)."
          }
        },
        {
          "id": "ex2",
          "type": "translation",
          "prompt": {
            "en": "Translate this phone phrase: Could you connect me with the sales department?",
            "ru": "Переведите эту телефонную фразу: Не могли бы вы соединить меня с отделом продаж?"
          },
          "correctAnswer": "Czy mógłby Pan/mogłaby Pani połączyć mnie z działem sprzedaży?",
          "acceptableAnswers": ["Proszę połączyć mnie z działem sprzedaży", "Czy może Pan/Pani połączyć z działem handlowym"],
          "hint": {
            "en": "Use Czy mógłby/mogłaby Pan/Pani (Could you - formal), połączyć (connect), dział sprzedaży (sales department)",
            "ru": "Используйте Czy mógłby/mogłaby Pan/Pani (Не могли бы вы - формально), połączyć (соединить), dział sprzedaży (отдел продаж)"
          }
        },
        {
          "id": "ex3",
          "type": "fill_blank",
          "sentence": "Dzwonię w ___ ogłoszenia o pracę. (I am calling regarding the job advertisement)",
          "options": ["sprawie", "temacie", "kwestii", "związku"],
          "correctAnswer": "sprawie",
          "explanation": {
            "en": "W sprawie (regarding/concerning) is the standard business phrase. Example: Piszę w sprawie faktury (I am writing regarding the invoice). Other uses: w kwestii (regarding a matter), odnośnie (concerning).",
            "ru": "W sprawie (относительно/касательно) - стандартная деловая фраза. Пример: Piszę w sprawie faktury (Я пишу относительно счёта). Другие варианты: w kwestii (по вопросу), odnośnie (касательно)."
          }
        },
        {
          "id": "ex4",
          "type": "matching",
          "instruction": {
            "en": "Match business Polish phrases with their English equivalents",
            "ru": "Сопоставьте деловые польские фразы с их английскими эквивалентами"
          },
          "pairs": [
            {"left": "Z poważaniem", "right": "Yours faithfully / Sincerely"},
            {"left": "W załączeniu", "right": "Attached / In the attachment"},
            {"left": "Proszę o kontakt", "right": "Please contact me"},
            {"left": "Dziękuję za uwagę", "right": "Thank you for your attention"},
            {"left": "Czekam na odpowiedź", "right": "I await your response"}
          ]
        },
        {
          "id": "ex5",
          "type": "listening",
          "audioText": "Dzień dobry, nazywam się Jan Kowalski. Dzwonię w sprawie ogłoszenia o pracę na stanowisko programisty. Chciałbym umówić rozmowę kwalifikacyjną. Czy mogę prosić o kontakt z działem HR? Mój numer telefonu to 555-123-456.",
          "question": {
            "en": "What is the purpose of the call and what does the caller request?",
            "ru": "Какова цель звонка и о чём просит звонящий?"
          },
          "correctAnswer": "calling about programmer job, wants to schedule interview, asks for HR contact",
          "options": ["praca programisty, rozmowa, kontakt HR", "tylko pytanie o pracę", "tylko podanie numeru", "rezerwacja spotkania"]
        },
        {
          "id": "ex6",
          "type": "speaking",
          "prompt": {
            "en": "Practice a job interview introduction: name, experience, why you want this job",
            "ru": "Попрактикуйтесь во введении на собеседовании: имя, опыт, почему вы хотите эту работу"
          },
          "sampleAnswer": "Dzień dobry. Nazywam się Anna Nowak. Mam trzy lata doświadczenia w marketingu cyfrowym. Pracowałam w dwóch firmach IT. Interesuję się tą pracą, ponieważ Państwa firma jest liderem w branży i chciałabym rozwijać swoje umiejętności w międzynarodowym zespole.",
          "tips": {
            "en": "Key phrases: Nazywam się... (My name is), Mam ... lat doświadczenia (I have ... years of experience), Pracowałem/am w... (I worked in), Interesuję się (I am interested), ponieważ (because)",
            "ru": "Ключевые фразы: Nazywam się... (Меня зовут), Mam ... lat doświadczenia (У меня ... лет опыта), Pracowałem/am w... (Я работал в), Interesuję się (Я интересуюсь), ponieważ (потому что)"
          }
        }
      ]
    }'
);
