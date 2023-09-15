const fs = require("fs");

const filePath = "./rules-for-converting.json";
const rules = fs.readFileSync(filePath, "utf8");
const parsedRules = JSON.parse(rules);

const inputDataPath = "./input.json";
const data = fs.readFileSync(inputDataPath, "utf8");
const inputData = JSON.parse(data);

let expandedObject;

// // Функція для конвертації відстані

function convertDistance(inputData) {
  const { distance, convertTo } = inputData;

  const keys = Object.keys(parsedRules);
  if (!keys.includes(distance.unit) || !keys.includes(convertTo)) {
    console.log("These values are not supported");
  }

  // Ітерація через ключі вкладених об'єктів
  for (const outerKey in parsedRules) {
    if (outerKey == distance.unit) {
      const innerObject = parsedRules[outerKey];

      for (let innerKey in innerObject) {
        if (innerKey == convertTo) {
          const resultValue = innerObject[innerKey];
          expandedObject = resultValue;
        }
      }
    }
  }

  //Обчислення конвертованої відстані
  const convertedValue = distance.value * expandedObject;

  // Округлення до сотих
  const roundedValue = Math.round(convertedValue * 100) / 100;

  return { unit: convertTo, value: roundedValue };
}

const result = convertDistance(inputData);
console.log(JSON.stringify(result));
