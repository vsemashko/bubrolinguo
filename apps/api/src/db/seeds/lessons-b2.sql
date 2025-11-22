-- Seed data for B2 (Upper Intermediate) lessons
-- 5 comprehensive B2-level Polish lessons

-- Lesson 26: Conditional Mood
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'Conditional Mood - Real and Hypothetical Conditions',
  'Условное наклонение - Реальные и гипотетические условия',
  'Master Polish conditional constructions with "gdyby" and express hypothetical situations',
  'Освойте польские условные конструкции с "gdyby" и выражайте гипотетические ситуации',
  'B2',
  26,
  6,
  1,  25,
  40,
  true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {
          "en": "Which sentence correctly expresses an UNREAL condition in the present?",
          "ru": "Какое предложение правильно выражает НЕРЕАЛЬНОЕ условие в настоящем?"
        },
        "options": [
          {"id": "a", "text": "Gdybym miał czas, pojechałbym na wakacje (If I had time, I would go on vacation)", "isCorrect": true},
          {"id": "b", "text": "Jeśli mam czas, pojadę na wakacje (If I have time, I will go on vacation)", "isCorrect": false},
          {"id": "c", "text": "Gdy miałem czas, pojechałem na wakacje (When I had time, I went on vacation)", "isCorrect": false},
          {"id": "d", "text": "Kiedy będę miał czas, pojadę na wakacje (When I have time, I will go)", "isCorrect": false}
        ],
        "explanation": {
          "en": "Gdybym + conditional (miał, pojechałbym) expresses unreal/hypothetical situations. Jeśli + real tenses is for real conditions. Formation: gdyby + past tense + conditional with -bym/-byś/-by.",
          "ru": "Gdybym + условное наклонение (miał, pojechałbym) выражает нереальные/гипотетические ситуации. Jeśli + реальные времена - для реальных условий. Образование: gdyby + прошедшее время + условное с -bym/-byś/-by."
        }
      },
      {
        "id": "ex2",
        "type": "translation",
        "prompt": {
          "en": "Translate using conditional: If I were rich, I would buy a house by the sea",
          "ru": "Переведите используя условное наклонение: Если бы я был богат, я бы купил дом у моря"
        },
        "correctAnswer": "Gdybym był bogaty, kupiłbym dom nad morzem",
        "acceptableAnswers": ["Gdybym był bogaty kupiłbym dom przy morzu", "Gdybym był zamożny, kupiłbym dom nad morzem"],
        "hint": {
          "en": "Use gdybym był (if I were), bogaty (rich), kupiłbym (I would buy), dom nad morzem (house by the sea)",
          "ru": "Используйте gdybym był (если бы я был), bogaty (богатый), kupiłbym (я бы купил), dom nad morzem (дом у моря)"
        }
      },
      {
        "id": "ex3",
        "type": "fill_blank",
        "sentence": "Gdybyś ___ wcześniej, nie spóźniłbyś się. (If you had left earlier, you would not have been late)",
        "options": ["wyszedł", "wychodzisz", "wyjdziesz", "wychodziłeś"],
        "correctAnswer": "wyszedł",
        "explanation": {
          "en": "Past unreal conditions use: gdyby + past tense (wyszedł) + conditional (spóźniłbyś się). This describes a hypothetical past situation that did not happen.",
          "ru": "Нереальные условия в прошлом используют: gdyby + прошедшее время (wyszedł) + условное (spóźniłbyś się). Это описывает гипотетическую прошлую ситуацию, которая не произошла."
        }
      },
      {
        "id": "ex4",
        "type": "matching",
        "instruction": {
          "en": "Match the conditional sentence types with examples",
          "ru": "Сопоставьте типы условных предложений с примерами"
        },
        "pairs": [
          {"left": "Real condition (present/future)", "right": "Jeśli będzie padać, zostanę w domu"},
          {"left": "Unreal condition (present)", "right": "Gdybym wiedział, powiedziałbym ci"},
          {"left": "Unreal condition (past)", "right": "Gdybym był przeczytał książkę, zdałbym egzamin"},
          {"left": "Polite request", "right": "Czy mógłby Pan mi pomóc?"}
        ]
      },
      {
        "id": "ex5",
        "type": "listening",
        "audioText": "Gdybym wygrał na loterii, kupiłbym dom nad jeziorem. Najpierw jednak musiałbym rzucić pracę. Gdyby moja żona się zgodziła, przeprowadzilibyśmy się na wieś. To byłoby wspaniałe życie!",
        "question": {
          "en": "What hypothetical actions does the speaker describe?",
          "ru": "Какие гипотетические действия описывает говорящий?"
        },
        "correctAnswer": "win lottery → buy house by lake, quit job, wife agrees → move to countryside",
        "options": ["loteria, dom, praca, przeprowadzka", "tylko kupno domu", "tylko rzucenie pracy", "realne plany"]
      },
      {
        "id": "ex6",
        "type": "speaking",
        "prompt": {
          "en": "Complete these conditional sentences: 1) If I could travel anywhere... 2) If I had learned Polish earlier... 3) If I were the president...",
          "ru": "Завершите эти условные предложения: 1) Если бы я мог поехать куда угодно... 2) Если бы я изучал польский раньше... 3) Если бы я был президентом..."
        },
        "sampleAnswer": "1) Gdybym mógł pojechać gdziekolwiek, pojechałbym do Japonii. 2) Gdybym zaczął uczyć się polskiego wcześniej, teraz mówiłbym płynnie. 3) Gdybym był prezydentem, poprawiłbym system edukacji.",
        "tips": {
          "en": "Formation: gdybym/gdybyś/gdyby + past tense verb + conditional verb with -bym/-byś/-by/-byśmy/-byście. Example: Gdybym miał (if I had), zrobiłbym (I would do)",
          "ru": "Образование: gdybym/gdybyś/gdyby + глагол в прошедшем времени + условный глагол с -bym/-byś/-by/-byśmy/-byście. Пример: Gdybym miał (если бы у меня было), zrobiłbym (я бы сделал)"
        }
      }
    ]
  }'
);

-- Lesson 27: Passive Voice
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'Passive Voice - Formation and Usage',
  'Страдательный залог - Образование и употребление',
  'Learn to form and use Polish passive voice and impersonal constructions',
  'Научитесь образовывать и использовать польский страдательный залог и безличные конструкции',
  'B2',
  27,
  6,
  2,  25,
  40,
  true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {
          "en": "Which sentence is in the passive voice?",
          "ru": "Какое предложение в страдательном залоге?"
        },
        "options": [
          {"id": "a", "text": "Ten dom został zbudowany w 1920 roku (This house was built in 1920)", "isCorrect": true},
          {"id": "b", "text": "Zbudowałem ten dom w 1920 roku (I built this house in 1920)", "isCorrect": false},
          {"id": "c", "text": "Ten dom jest stary (This house is old)", "isCorrect": false},
          {"id": "d", "text": "Będę budował dom (I will be building a house)", "isCorrect": false}
        ],
        "explanation": {
          "en": "Passive voice in Polish: zostać/być + passive participle (-ny/-ty ending). Zostać emphasizes the action, być emphasizes the state. Example: List został napisany (letter was written) vs. List jest napisany (letter is written - state).",
          "ru": "Страдательный залог в польском: zostać/być + страдательное причастие (окончание -ny/-ty). Zostać подчёркивает действие, być - состояние. Пример: List został napisany (письмо было написано) vs. List jest napisany (письмо написано - состояние)."
        }
      },
      {
        "id": "ex2",
        "type": "translation",
        "prompt": {
          "en": "Transform to passive: They published this book last year",
          "ru": "Преобразуйте в страдательный залог: Они опубликовали эту книгу в прошлом году"
        },
        "correctAnswer": "Ta książka została opublikowana w zeszłym roku",
        "acceptableAnswers": ["Ta książka była opublikowana w zeszłym roku", "Książka została wydana w zeszłym roku"],
        "hint": {
          "en": "Use została opublikowana (was published). Move the object (książka) to subject position. The agent (they) is usually omitted in passive.",
          "ru": "Используйте została opublikowana (была опубликована). Переместите дополнение (książka) в позицию подлежащего. Действующее лицо (они) обычно опускается в страдательном залоге."
        }
      },
      {
        "id": "ex3",
        "type": "fill_blank",
        "sentence": "W tym muzeum ___ eksponaty z XIX wieku. (In this museum, 19th-century exhibits are displayed)",
        "options": ["są wystawiane", "wystawiają", "zostały wystawione", "wystawiałem"],
        "correctAnswer": "są wystawiane",
        "explanation": {
          "en": "Są wystawiane (are displayed) uses być + passive participle for ongoing/habitual passive actions. This describes a permanent state of the museum, not a one-time event.",
          "ru": "Są wystawiane (выставлены) использует być + страдательное причастие для продолжающихся/привычных пассивных действий. Это описывает постоянное состояние музея, а не единичное событие."
        }
      },
      {
        "id": "ex4",
        "type": "matching",
        "instruction": {
          "en": "Match active sentences with their passive equivalents",
          "ru": "Сопоставьте активные предложения с их пассивными эквивалентами"
        },
        "pairs": [
          {"left": "Ktoś ukradł mój rower", "right": "Mój rower został ukradziony"},
          {"left": "Napisali artykuł", "right": "Artykuł został napisany"},
          {"left": "Budują nowy most", "right": "Nowy most jest budowany"},
          {"left": "Zaprosili nas na kolację", "right": "Zostaliśmy zaproszeni na kolację"}
        ]
      },
      {
        "id": "ex5",
        "type": "listening",
        "audioText": "To muzeum zostało otwarte w 1985 roku. Zbiory są regularnie uzupełniane nowymi eksponatami. W zeszłym miesiącu została zorganizowana specjalna wystawa o historii Polski. Zwiedzający byli bardzo zadowoleni.",
        "question": {
          "en": "Identify all passive constructions in the text",
          "ru": "Определите все пассивные конструкции в тексте"
        },
        "correctAnswer": "zostało otwarte, są uzupełniane, została zorganizowana, byli zadowoleni",
        "options": ["4 passive constructions", "2 passive constructions", "no passive voice", "only active voice"]
      },
      {
        "id": "ex6",
        "type": "speaking",
        "prompt": {
          "en": "Describe your city or workplace using passive voice (what was built, what is done, what will be opened)",
          "ru": "Опишите свой город или рабочее место, используя страдательный залог (что было построено, что делается, что будет открыто)"
        },
        "sampleAnswer": "Moje miasto zostało założone w XV wieku. Stare Miasto jest chronione przez UNESCO. W centrum są organizowane różne festiwale kulturalne. W przyszłym roku zostanie otwarty nowy park.",
        "tips": {
          "en": "Key forms: został/została/zostało + participle (completed action), jest/są + participle (ongoing/state), zostanie/zostaną + participle (future). Impersonal: Mówi się (it is said), Pisze się (one writes)",
          "ru": "Ключевые формы: został/została/zostało + причастие (завершённое действие), jest/są + причастие (продолжающееся/состояние), zostanie/zostaną + причастие (будущее). Безличные: Mówi się (говорят), Pisze się (пишут)"
        }
      }
    ]
  }'
);

-- Lesson 28: Reported Speech
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'Reported Speech - Indirect Communication',
  'Косвенная речь - Непрямое общение',
  'Master the transformation from direct to indirect speech in Polish',
  'Освойте преобразование прямой речи в косвенную в польском языке',
  'B2',
  28,
  6,
  3,  25,
  40,
  true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {
          "en": "Transform to reported speech: Maria said: \"I am tired.\"",
          "ru": "Преобразуйте в косвенную речь: Мария сказала: «Я устала.»"
        },
        "options": [
          {"id": "a", "text": "Maria powiedziała, że jest zmęczona", "isCorrect": true},
          {"id": "b", "text": "Maria powiedziała, że jestem zmęczona", "isCorrect": false},
          {"id": "c", "text": "Maria mówi, że jest zmęczona", "isCorrect": false},
          {"id": "d", "text": "Maria powiedziała, była zmęczona", "isCorrect": false}
        ],
        "explanation": {
          "en": "In reported speech, use że (that) + change pronouns (ja→ona, jestem→jest) but tenses often stay the same in Polish, unlike English. Reporting verb: powiedział/a (said), zapytał/a (asked), odpowiedział/a (answered).",
          "ru": "В косвенной речи используйте że (что) + меняйте местоимения (ja→ona, jestem→jest), но времена часто остаются прежними в польском, в отличие от английского. Глаголы ввода: powiedział/a (сказал), zapytał/a (спросил), odpowiedział/a (ответил)."
        }
      },
      {
        "id": "ex2",
        "type": "translation",
        "prompt": {
          "en": "Transform to reported speech: Jan asked: \"Where do you live?\"",
          "ru": "Преобразуйте в косвенную речь: Ян спросил: «Где ты живёшь?»"
        },
        "correctAnswer": "Jan zapytał, gdzie mieszkam",
        "acceptableAnswers": ["Jan spytał gdzie mieszkam", "Jan zapytał mnie, gdzie mieszkam"],
        "hint": {
          "en": "Use zapytał (asked) + gdzie (where) without że. Question words (gdzie, kiedy, dlaczego) replace że in indirect questions. No comma needed after zapytał.",
          "ru": "Используйте zapytał (спросил) + gdzie (где) без że. Вопросительные слова (gdzie, kiedy, dlaczego) заменяют że в косвенных вопросах. Запятая после zapytał не нужна."
        }
      },
      {
        "id": "ex3",
        "type": "fill_blank",
        "sentence": "Powiedział, ___ przyjdzie jutro. (He said that he will come tomorrow)",
        "options": ["że", "czy", "gdy", "kiedy"],
        "correctAnswer": "że",
        "explanation": {
          "en": "Że (that) introduces reported statements. Czy introduces yes/no indirect questions (Zapytał, czy przyjdę = He asked whether I will come). Note: że is often optional in spoken Polish but recommended in writing.",
          "ru": "Że (что) вводит косвенные утверждения. Czy вводит косвенные вопросы да/нет (Zapytał, czy przyjdę = Он спросил, приду ли я). Примечание: że часто опускается в разговорном польском, но рекомендуется в письменной речи."
        }
      },
      {
        "id": "ex4",
        "type": "matching",
        "instruction": {
          "en": "Match direct speech with reported speech",
          "ru": "Сопоставьте прямую речь с косвенной"
        },
        "pairs": [
          {"left": "\"Jestem głodny\" - powiedział", "right": "Powiedział, że jest głodny"},
          {"left": "\"Czy lubisz kawę?\" - zapytała", "right": "Zapytała, czy lubię kawę"},
          {"left": "\"Kiedy przyjdziesz?\" - spytał", "right": "Spytał, kiedy przyjdę"},
          {"left": "\"Nie mogę ci pomóc\" - odpowiedział", "right": "Odpowiedział, że nie może mi pomóc"}
        ]
      },
      {
        "id": "ex5",
        "type": "listening",
        "audioText": "Wczoraj rozmawiałem z Anną. Powiedziała, że planuje wyjazd do Krakowa. Zapytałem, kiedy wyjeżdża. Odpowiedziała, że prawdopodobnie w przyszłym tygodniu. Spytała mnie, czy chciałbym pojechać z nią.",
        "question": {
          "en": "What information was communicated in reported speech?",
          "ru": "Какая информация была передана в косвенной речи?"
        },
        "correctAnswer": "Anna plans trip to Kraków, leaving next week, asks if I want to join",
        "options": ["wyjazd, czas, zaproszenie", "tylko wyjazd", "tylko pytanie", "bezpośrednia rozmowa"]
      },
      {
        "id": "ex6",
        "type": "speaking",
        "prompt": {
          "en": "Report a recent conversation you had: what someone said, asked, and answered",
          "ru": "Перескажите недавний разговор: что кто-то сказал, спросил и ответил"
        },
        "sampleAnswer": "Wczoraj rozmawiałem z kolegą z pracy. Powiedział, że ma problem z komputerem. Zapytałem, co się stało. Odpowiedział, że komputer się nie włącza. Zaproponowałem, że mu pomogę. Był bardzo wdzięczny.",
        "tips": {
          "en": "Key verbs: powiedział/a że (said that), zapytał/a czy/gdzie/kiedy (asked whether/where/when), odpowiedział/a że (answered that), dodał/a że (added that), wyjaśnił/a że (explained that), stwierdził/a że (stated that)",
          "ru": "Ключевые глаголы: powiedział/a że (сказал что), zapytał/a czy/gdzie/kiedy (спросил ли/где/когда), odpowiedział/a że (ответил что), dodał/a że (добавил что), wyjaśnił/a że (объяснил что), stwierdził/a że (утверждал что)"
        }
      }
    ]
  }'
);

-- Lesson 29: Abstract Topics and Discussion
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'Abstract Topics - Politics, Society, and Environment',
  'Абстрактные темы - Политика, общество и окружающая среда',
  'Discuss complex social issues and express opinions on abstract topics',
  'Обсуждайте сложные социальные вопросы и выражайте мнения по абстрактным темам',
  'B2',
  29,
  6,
  4,  25,
  40,
  true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {
          "en": "Which phrase best expresses: \"In my opinion, climate change is the biggest threat\"?",
          "ru": "Какая фраза лучше выражает: «По моему мнению, изменение климата - наибольшая угроза»?"
        },
        "options": [
          {"id": "a", "text": "Moim zdaniem, zmiana klimatu to największe zagrożenie", "isCorrect": true},
          {"id": "b", "text": "Myślę, że pogoda się zmienia", "isCorrect": false},
          {"id": "c", "text": "Lubię zmiany klimatu", "isCorrect": false},
          {"id": "d", "text": "Klimat jest duży", "isCorrect": false}
        ],
        "explanation": {
          "en": "Opinion phrases: Moim zdaniem / W mojej opinii (in my opinion), Uważam, że (I believe that), Z mojego punktu widzenia (from my point of view), Wydaje mi się, że (it seems to me that). Use zagrożenie (threat), wyzwanie (challenge), problem (problem).",
          "ru": "Фразы для выражения мнения: Moim zdaniem / W mojej opinii (по моему мнению), Uważam, że (я считаю что), Z mojego punktu widzenia (с моей точки зрения), Wydaje mi się, że (мне кажется что). Используйте zagrożenie (угроза), wyzwanie (вызов), problem (проблема)."
        }
      },
      {
        "id": "ex2",
        "type": "translation",
        "prompt": {
          "en": "Translate: We should invest more in renewable energy sources",
          "ru": "Переведите: Мы должны инвестировать больше в возобновляемые источники энергии"
        },
        "correctAnswer": "Powinniśmy inwestować więcej w odnawialne źródła energii",
        "acceptableAnswers": ["Powinniśmy więcej inwestować w źródła energii odnawialnej", "Trzeba inwestować więcej w odnawialne źródła energii"],
        "hint": {
          "en": "Use powinniśmy (we should), inwestować (to invest), odnawialne źródła energii (renewable energy sources). Alternative: trzeba + infinitive (one must/should)",
          "ru": "Используйте powinniśmy (мы должны), inwestować (инвестировать), odnawialne źródła energii (возобновляемые источники энергии). Альтернатива: trzeba + инфинитив (нужно/следует)"
        }
      },
      {
        "id": "ex3",
        "type": "fill_blank",
        "sentence": "Nierówność społeczna jest poważnym ___ we współczesnym świecie. (Social inequality is a serious issue in the modern world)",
        "options": ["problemem", "budynkiem", "jedzeniem", "samochodem"],
        "correctAnswer": "problemem",
        "explanation": {
          "en": "Abstract topic vocabulary: problem (problem/issue), kwestia (matter/issue), zagadnienie (topic/issue), zjawisko (phenomenon), tendencja (trend), wyzwanie (challenge). Use instrumental case after jest (problemem, wyzwaniem).",
          "ru": "Лексика абстрактных тем: problem (проблема), kwestia (вопрос), zagadnienie (тема), zjawisko (явление), tendencja (тенденция), wyzwanie (вызов). Используйте творительный падеж после jest (problemem, wyzwaniem)."
        }
      },
      {
        "id": "ex4",
        "type": "matching",
        "instruction": {
          "en": "Match abstract concepts with related vocabulary",
          "ru": "Сопоставьте абстрактные концепции со связанной лексикой"
        },
        "pairs": [
          {"left": "Środowisko (Environment)", "right": "zanieczyszczenie, recykling, ekologia, zagrożenie"},
          {"left": "Polityka (Politics)", "right": "rząd, wybory, demokracja, parlament"},
          {"left": "Społeczeństwo (Society)", "right": "nierówność, sprawiedliwość, kultura, tradycja"},
          {"left": "Gospodarka (Economy)", "right": "inflacja, bezrobocie, wzrost, inwestycje"}
        ]
      },
      {
        "id": "ex5",
        "type": "listening",
        "audioText": "Moim zdaniem, jednym z największych wyzwań współczesnego świata jest zmiana klimatu. Powoduje ona ekstremalne zjawiska pogodowe i zagraża przyszłości naszej planety. Uważam, że rządy powinny podjąć zdecydowane działania, aby ograniczyć emisję gazów cieplarnianych.",
        "question": {
          "en": "What is the speaker''s opinion and proposed solution?",
          "ru": "Каково мнение говорящего и предлагаемое решение?"
        },
        "correctAnswer": "climate change is biggest challenge, governments should reduce greenhouse gas emissions",
        "options": ["zmiana klimatu, działania rządów", "tylko pogoda", "tylko gazy", "brak opinii"]
      },
      {
        "id": "ex6",
        "type": "speaking",
        "prompt": {
          "en": "Express your opinion on one of these topics: immigration, technology and society, education system, or environmental protection",
          "ru": "Выразите своё мнение по одной из этих тем: иммиграция, технологии и общество, система образования или защита окружающей среды"
        },
        "sampleAnswer": "Moim zdaniem, ochrona środowiska to najważniejsze wyzwanie naszych czasów. Uważam, że każdy obywatel powinien być odpowiedzialny za segregację śmieci i ograniczenie zużycia plastiku. Z mojego punktu widzenia, rządy powinny wprowadzić surowsze przepisy dotyczące ochrony przyrody.",
        "tips": {
          "en": "Useful phrases: Moim zdaniem (in my opinion), Z jednej strony... z drugiej strony (on one hand... on the other hand), Co więcej (moreover), Jednakże (however), W konsekwencji (consequently), Dlatego (therefore)",
          "ru": "Полезные фразы: Moim zdaniem (по моему мнению), Z jednej strony... z drugiej strony (с одной стороны... с другой стороны), Co więcej (более того), Jednakże (однако), W konsekwencji (вследствие), Dlatego (поэтому)"
        }
      }
    ]
  }'
);

-- Lesson 30: Advanced Reading Comprehension
INSERT INTO lessons (
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises
) VALUES (
  'Advanced Reading - Literature, News, and Academic Texts',
  'Продвинутое чтение - Литература, новости и академические тексты',
  'Develop skills to comprehend complex Polish texts from various genres',
  'Развивайте навыки понимания сложных польских текстов различных жанров',
  'B2',
  30,
  6,
  5,  25,
  40,
  true,
  '{
    "exercises": [
      {
        "id": "ex1",
        "type": "multiple_choice",
        "question": {
          "en": "Read: \"Niemcewicz, wybitny pisarz epoki oświecenia, zasłynął przede wszystkim jako autor dramatów i powieści historycznych.\" What is the main point?",
          "ru": "Прочитайте: «Niemcewicz, выдающийся писатель эпохи просвещения, прославился прежде всего как автор драм и исторических романов.» В чём главная мысль?"
        },
        "options": [
          {"id": "a", "text": "Niemcewicz was an Enlightenment writer known for dramas and historical novels", "isCorrect": true},
          {"id": "b", "text": "Niemcewicz only wrote dramas", "isCorrect": false},
          {"id": "c", "text": "Historical novels were not popular in the Enlightenment", "isCorrect": false},
          {"id": "d", "text": "Niemcewicz was a politician", "isCorrect": false}
        ],
        "explanation": {
          "en": "Reading strategy: Identify main ideas (wybitny - outstanding, zasłynął - became famous, przede wszystkim - primarily). Look for: author''s purpose, main arguments, supporting details. Academic vocabulary: epoka (era), wybitny (outstanding), zasłynął (became famous).",
          "ru": "Стратегия чтения: Определите главные идеи (wybitny - выдающийся, zasłynął - прославился, przede wszystkim - прежде всего). Ищите: цель автора, основные аргументы, подтверждающие детали. Академическая лексика: epoka (эпоха), wybitny (выдающийся), zasłynął (прославился)."
        }
      },
      {
        "id": "ex2",
        "type": "translation",
        "prompt": {
          "en": "Read and explain the meaning: \"Badania naukowe wykazały, że regularna aktywność fizyczna wpływa korzystnie na zdrowie psychiczne.\"",
          "ru": "Прочитайте и объясните значение: «Научные исследования показали, что регулярная физическая активность благоприятно влияет на психическое здоровье.»"
        },
        "correctAnswer": "Scientific research has shown that regular physical activity positively affects mental health",
        "acceptableAnswers": ["Studies showed exercise helps mental health", "Research proved physical activity benefits psychological well-being"],
        "hint": {
          "en": "Key terms: badania naukowe (scientific research), wykazały (showed/demonstrated), wpływa korzystnie (affects positively), zdrowie psychiczne (mental health)",
          "ru": "Ключевые термины: badania naukowe (научные исследования), wykazały (показали), wpływa korzystnie (благоприятно влияет), zdrowie psychiczne (психическое здоровье)"
        }
      },
      {
        "id": "ex3",
        "type": "fill_blank",
        "sentence": "Według najnowszych danych statystycznych, liczba bezrobotnych ___ w ciągu ostatniego kwartału. (According to the latest statistical data, the number of unemployed has decreased in the last quarter)",
        "options": ["spadła", "wzrosła", "była", "miała"],
        "correctAnswer": "spadła",
        "explanation": {
          "en": "News article vocabulary: według (according to), dane statystyczne (statistical data), spadła (decreased), wzrosła (increased), w ciągu (during/within), kwartał (quarter). Context clues help determine meaning.",
          "ru": "Лексика новостных статей: według (согласно), dane statystyczne (статистические данные), spadła (снизилась), wzrosła (выросла), w ciągu (в течение), kwartał (квартал). Контекстные подсказки помогают определить значение."
        }
      },
      {
        "id": "ex4",
        "type": "matching",
        "instruction": {
          "en": "Match text types with their characteristic features",
          "ru": "Сопоставьте типы текстов с их характерными чертами"
        },
        "pairs": [
          {"left": "Artykuł naukowy (Academic article)", "right": "terminologia specjalistyczna, struktura logiczna, bibliografia"},
          {"left": "Artykuł prasowy (News article)", "right": "nagłówek, lead, faktografia, obiektywizm"},
          {"left": "Tekst literacki (Literary text)", "right": "metafory, język figuratywny, styl autorski"},
          {"left": "Esej (Essay)", "right": "teza, argumentacja, wnioski, opinia autora"}
        ]
      },
      {
        "id": "ex5",
        "type": "listening",
        "audioText": "W ostatnich latach obserwujemy dynamiczny rozwój sztucznej inteligencji. Technologia ta znajduje zastosowanie w wielu dziedzinach, od medycyny po finanse. Jednakże jej rozwój rodzi również obawy dotyczące bezpieczeństwa danych i etyki. Eksperci podkreślają konieczność wprowadzenia odpowiednich regulacji prawnych.",
        "question": {
          "en": "What is the text structure: main topic, applications, concerns, and expert opinion?",
          "ru": "Какова структура текста: основная тема, применение, опасения и мнение экспертов?"
        },
        "correctAnswer": "AI development, applications in medicine and finance, concerns about data security and ethics, need for regulations",
        "options": ["rozwój AI, zastosowania, obawy, regulacje", "tylko technologia", "tylko obawy", "tylko eksperci"]
      },
      {
        "id": "ex6",
        "type": "speaking",
        "prompt": {
          "en": "Summarize a recent news article or book chapter you read, including main points, supporting details, and your analysis",
          "ru": "Резюмируйте недавнюю новостную статью или главу книги, которую вы прочитали, включая основные пункты, подтверждающие детали и ваш анализ"
        },
        "sampleAnswer": "Niedawno przeczytałem artykuł o kryzysie klimatycznym. Autor przedstawił dane naukowe pokazujące wzrost temperatury globalnej. Podkreślił wpływ działalności człowieka na środowisko. Z jednej strony, rządy podejmują działania, z drugiej strony, tempo zmian jest niewystarczające. Moim zdaniem, tekst przekonująco argumentuje za pilnością problemu.",
        "tips": {
          "en": "Useful phrases for analysis: Autor twierdzi, że (author claims), Tekst przedstawia (text presents), Z jednej strony... z drugiej (on one hand... on the other), Można wywnioskować (one can conclude), Główna teza (main thesis)",
          "ru": "Полезные фразы для анализа: Autor twierdzi, że (автор утверждает), Tekst przedstawia (текст представляет), Z jednej strony... z drugiej (с одной стороны... с другой), Można wywnioskować (можно сделать вывод), Główna teza (главный тезис)"
        }
      }
    ]
  }'
);
