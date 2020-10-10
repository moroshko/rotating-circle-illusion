export function range(from, to) {
  const result = [];

  for (let i = from; i <= to; i++) {
    result.push(i);
  }

  return result;
}

export function getPoint({ radius, radians }) {
  return {
    x: radius * Math.cos(radians),
    y: -radius * Math.sin(radians),
  };
}

export function getCenterPoint(linesData) {
  const pointsCount = linesData.length;

  if (pointsCount < 2) {
    return null;
  }

  let sumX = 0;
  let sumY = 0;

  for (let i = 0; i < pointsCount; i++) {
    const { projection } = linesData[i];

    sumX += projection.x;
    sumY += projection.y;
  }

  return {
    x: sumX / pointsCount,
    y: sumY / pointsCount,
  };
}

export function getProjectionPoint({ point, p1 }) {
  if (p1.x === 0) {
    return {
      x: 0,
      y: point.y,
    };
  }

  const m = p1.y / p1.x;
  const x = (m * point.y + point.x) / (1 + m * m);

  return {
    x,
    y: m * x,
  };
}
