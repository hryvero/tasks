const fs = require("fs");

const filePath = "./data.json";
const data = fs.readFileSync(filePath, "utf8");
const parsedData = JSON.parse(data);

const inputDataPath = "./condition.json";
const condition = fs.readFileSync(inputDataPath, "utf8");
const parsedCondition = JSON.parse(condition);

// for (const i of parsedCondition.condition.exclude) {
//   for (const key in i) {
//     // console.log(key);
//     if (item[key] === i[key]) {
//       return false; // Виключаємо елемент, якщо він відповідає умові
//     }
//     return true;
//   }
// }
// console.log();

// console.log();

function sortByCondition(parsedData, parsedCondition) {
  const filteredData = parsedData.data.filter((item) => {
    if (parsedCondition.condition.hasOwnProperty("exclude")) {
      for (const i of parsedCondition.condition.exclude) {
        for (const key in i) {
          // console.log(key);
          if (item[key] === i[key]) {
            return false; // Виключаємо елемент, якщо він відповідає умові
          }
        }
      }
      return item;
    }
  });

  if (
    parsedCondition.condition.sortBy &&
    parsedCondition.condition.sortBy.length > 0
  ) {
    filteredData.sort((a, b) => {
      const field = parsedCondition.condition.sortBy[0];
      return a[field] - b[field]; // Сортування за полем "rating"
    });
  }

  return filteredData;
}

const result = sortByCondition(parsedData, parsedCondition);

// Вихідні дані
const outputData = { result: result };
console.log(JSON.stringify(outputData));
