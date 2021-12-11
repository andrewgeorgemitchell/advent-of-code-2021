export type Point = {
  x: number;
  y: number;
};

export type LineSegment = {
  start: Point;
  end: Point;
};

export type Map = Array<Array<number | null>>;

export const convertFileToLineSegments = (file: string): LineSegment[] => {
  const lines = file.split("\n");
  return lines.map((line) => {
    const [start, end] = line.split(" -> ");
    const [startX, startY] = start.split(",").map(Number);
    const [endX, endY] = end.split(",").map(Number);
    return {
      start: { x: startX, y: startY },
      end: { x: endX, y: endY },
    };
  });
};

export const convertLineSegmentToPoints = ({
  lineSegment: {
    start: { x: startX, y: startY },
    end: { x: endX, y: endY },
  },
  checkDiagonal = false,
}: {
  lineSegment: LineSegment;
  checkDiagonal?: boolean;
}): Point[] => {
  const points: Point[] = [];
  const xDiff = endX - startX;
  const yDiff = endY - startY;
  if (endX === startX) {
    for (let i = 0; i <= Math.abs(yDiff); i++) {
      const yNeg = yDiff < 0;
      points.push({
        x: startX,
        y: startY + (yNeg ? i * -1 : i),
      });
    }
  } else if (startY === endY) {
    for (let i = 0; i <= Math.abs(xDiff); i++) {
      const xNeg = xDiff < 0;
      points.push({
        x: startX + (xNeg ? i * -1 : i),
        y: startY,
      });
    }
  } else if (checkDiagonal) {
    for (let i = 0; i <= Math.abs(xDiff); i++) {
      const xNeg = xDiff < 0;
      const yNeg = yDiff < 0;
      points.push({
        x: startX + (xNeg ? i * -1 : i),
        y: startY + (yNeg ? i * -1 : i),
      });
    }
  }
  return points;
};

export const convertLineSegmentsToPoints = ({
  lineSegments,
  checkDiagonal = false,
}: {
  lineSegments: LineSegment[];
  checkDiagonal?: boolean;
}): Point[] => {
  return lineSegments.reduce<Point[]>((acc, lineSegment) => {
    return [
      ...acc,
      ...convertLineSegmentToPoints({ lineSegment, checkDiagonal }),
    ];
  }, []);
};

export const findIntersectionPoints = (points: Point[]): number => {
  const pointFrequency: Record<`${number},${number}`, number> = {};
  for (let i = 0; i < points.length; i++) {
    const point1 = points[i];
    for (let j = i + 1; j < points.length; j++) {
      const point2 = points[j];
      if (point1.x === point2.x && point1.y === point2.y) {
        if (pointFrequency[`${point1.x},${point1.y}`]) {
          pointFrequency[`${point1.x},${point1.y}`]++;
        } else {
          pointFrequency[`${point1.x},${point1.y}`] = 1;
        }
        break;
      }
    }
  }
  return Object.keys(pointFrequency).length;
};
