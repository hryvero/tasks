interface Point {
  x: number;
  y: number;
  z: number;
}

interface Probes {
  count: number;
  coordinates: Point[];
}
function generateRandomLocation(): Point {
  // Генерація координат
  return {
    x: Math.floor(Math.random() * 101),
    y: Math.floor(Math.random() * 101),
    z: Math.floor(Math.random() * 101),
  };
}

function calculateDistance(point1: Point, point2: Point): number {
  // Обчислення відстані між двома точками у просторі

  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  const dz = point1.z - point2.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function findAsteroidLocation(probesCount: number) {
  // Створення початкового зонду для спуску
  let currentLocation: Point = generateRandomLocation();
  let minDistance: number = Number.MAX_VALUE;
  let locationOfAsteroid: Point | null = null;





  const probes: Probes = {
    count: probesCount,
    coordinates: [],
  };

  // Ітерацію для кожного зонду
  for (let i = 0; i < probesCount; i++) {
    const probeLocation: Point = generateRandomLocation();
    const distance: number = calculateDistance(currentLocation, probeLocation);

    probes.coordinates.push(probeLocation);

    //Якщо відстань мінімальна присвоюємо астеорїду і зонду одну локацію
    if (distance < minDistance) {
      minDistance = distance;
      locationOfAsteroid = probeLocation;
    }
  }

  return {
    result: {
      location: locationOfAsteroid,
      probes,
    },
  };
}

// Кількість зондів
const probesCount: number = 4;

const result = findAsteroidLocation(probesCount);
console.log(JSON.stringify(result, null, 2));

