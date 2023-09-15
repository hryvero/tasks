// Завдання:
// Необхідно реалізувати опитувальник, в якому порядок та список запитань залежить від
// переданої конфігурації у форматі JSON. Опитувальник повинен підтримувати лише
// запитання з варіантами відповідей, наприклад:
// {"What is your marital status?": ["Single", "Married"]}
// {"Are you planning on getting married next year?": ["Yes", "No"]}
// {"How long have you been married?": ["Less than a year", "More than a year"]}
// {"Have you celebrated your one year anniversary?": ["Yes", "No"]}
// Запитання в опитувальнику повинні визначатися динамічно на основі відповідей
// користувача - наступне запитання повинно залежати від відповіді на попереднє. Вам
// необхідно продумати, як буде працювати ця логіка, і розробити формат JSON конфігурації
// (він буде відрізнятись від прикладу вище), яка дозволить задавати правила, що пов'яжуть
// запитання з відповідями.
// Для тестування роботи опитувальника потрібно створити скрипт, що працює з кодом логіки
// опитування і проходить по всім можливим шляхам опитувань. Для вирішення завдання не
// потрібно реалізовувати інтерфейс користувача, достатньо імплементувати скрипт та логіку
// опитування.
// Вхідні параметри:
// JSON конфігурація, у вибраному вами форматі, з запитаннями та доступними відповідями,
// що пов’язує відповіді користувача та наступні запитання.
// Вихідні дані:
// JSON об’єкт, що є результатом роботи скрипту тестування, з інформацією про кількість всіх
// можливих шляхів опитувань (paths.number), та всіма можливими послідовностями
// запитань з відповідями (paths.list):

// {"paths": {"number": 3, "list": [
// [{"What is your marital status?": "Single"},
// {"Are you planning on getting married next year?": "Yes/No"}],
// [{"What is your marital status?": "Married"},
// {"How long have you been married?": "Less than a year"}],
// [{"What is your marital status?": "Married"},
// {"How long have you been married?": "More than a year"},
// {"Have you celebrated your one year anniversary?": "Yes/No"}],
// ]}}

function runSurvey(config) {
  config.map((i) => console.log(i));
  const paths = { number: 0, list: [] };
  const currentPath = [];

  function traverse(questionIndex) {
    if (questionIndex >= config.length) {
      // Додаємо поточний шлях до списку шляхів
      paths.list.push(currentPath.slice());
      paths.number++;
      return;
    }

    const question = config[questionIndex];
    const questionText = Object.keys(question)[0];
    const choices = question[questionText];

    for (const choice of choices) {
      const answer = {};
      answer[questionText] = choice;
      currentPath.push(answer);

      // Рекурсивно переходимо до наступного питання
      traverse(questionIndex + 1);

      // Після повернення назад, видаляємо поточну відповідь
      currentPath.pop();
    }
  }

  // Починаємо опитування з першого питання
  traverse(0);

  return { paths };
}

// Приклад вхідних даних (конфігурація опитування)
const surveyConfig = [
  { "What is your marital status?": ["Single", "Married"] },
  { "Are you planning on getting married next year?": ["Yes", "No"] },
  {
    "How long have you been married?": ["Less than a year", "More than a year"],
  },
  { "Have you celebrated your one year anniversary?": ["Yes", "No"] },
];

// Запускаємо опитування і виводимо результат
const result = runSurvey(surveyConfig);
console.log(JSON.stringify(result, null, 2));
