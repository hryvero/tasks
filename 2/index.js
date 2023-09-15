const fs = require("fs");

const filePath = "./data.json";
const data = fs.readFileSync(filePath, "utf8");
const parsedData = JSON.parse(data);

const inputDataPath = "./condition.json";
const condition = fs.readFileSync(inputDataPath, "utf8");
const parsedCondition = JSON.parse(condition);

console.log(parsedCondition.condition);

function sortByCondition(parsedData, parsedCondition) {
  const filteredData = parsedData.data.filter((item) => {
    for (const excludeCondition of parsedCondition.condition.exclude) {
      const keys = Object.keys(excludeCondition);
      for (const key of keys) {
        if (item[key] === excludeCondition[key]) {
          return false; // Виключаємо елемент, якщо він відповідає умові
        }
      }
    }
    return true; // Залишаємо елемент, якщо не відповідає жодній умові
  });

  if (
    parsedCondition.condition.sortBy &&
    parsedCondition.condition.sortBy.length > 0
  ) {
    filteredData.sort((a, b) => {
      const field = condition.sortBy[0];
      return a[field] - b[field]; // Сортування за полем "rating"
    });
  }

  return filteredData;
}

const result = sortByCondition(parsedData, parsedCondition);

// Вихідні дані
const outputData = { result: result };
console.log(JSON.stringify(outputData));
