const fs = require("fs");

const filePath = "./data.json";
const data = fs.readFileSync(filePath, "utf8");
const parsedData = JSON.parse(data);

const inputDataPath = "./condition.json";
const condition = fs.readFileSync(inputDataPath, "utf8");
const parsedCondition = JSON.parse(condition);

function sortByCondition(parsedData, parsedCondition) {
  const filteredData = parsedData.data.filter((item) => {
    //For exclude condition
    if (parsedCondition.condition.hasOwnProperty("exclude")) {
      for (const i of parsedCondition.condition.exclude) {
        for (const key in i) {
          if (item[key] === i[key]) {
            return false;
          }
        }
      }
      return item;
    } else {
      //For include condition
      for (const i of parsedCondition.condition.include) {
        for (const key in i) {
          if (item[key] === i[key]) {
            return item; // Виключаємо елемент, якщо він відповідає умові
          }
        }
      }
      return false;
    }
  });

  if (
    parsedCondition.condition.sortBy &&
    parsedCondition.condition.sortBy.length > 0
  ) {
    for (const key of filteredData) {
      console.log(key);
      if (key.email.toLowerCase().includes(key.name.toLowerCase())) {
        return key;
      }
    }
  }

  return filteredData;
}

const result = sortByCondition(parsedData, parsedCondition);

console.log(result);
// Вихідні дані

const outputData = { result: result };
console.log(JSON.stringify(outputData));
