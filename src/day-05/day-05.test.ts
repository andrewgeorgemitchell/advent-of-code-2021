import {
  convertFileToLineSegments,
  LineSegment,
  convertLineSegmentToPoints,
  Point,
  findIntersectionPoints,
  convertLineSegmentsToPoints,
} from "./day-05.service";

const testFileInput = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

const lineSegmentOutput = [
  { start: { x: 0, y: 9 }, end: { x: 5, y: 9 } },
  { start: { x: 8, y: 0 }, end: { x: 0, y: 8 } },
  { start: { x: 9, y: 4 }, end: { x: 3, y: 4 } },
  { start: { x: 2, y: 2 }, end: { x: 2, y: 1 } },
  { start: { x: 7, y: 0 }, end: { x: 7, y: 4 } },
  { start: { x: 6, y: 4 }, end: { x: 2, y: 0 } },
  { start: { x: 0, y: 9 }, end: { x: 2, y: 9 } },
  { start: { x: 3, y: 4 }, end: { x: 1, y: 4 } },
  { start: { x: 0, y: 0 }, end: { x: 8, y: 8 } },
  { start: { x: 5, y: 5 }, end: { x: 8, y: 2 } },
];

const lineSegmentInput1: LineSegment = {
  start: { x: 0, y: 9 },
  end: { x: 5, y: 9 },
};

const lineSegmentPoints1: Point[] = [
  { x: 0, y: 9 },
  { x: 1, y: 9 },
  { x: 2, y: 9 },
  { x: 3, y: 9 },
  { x: 4, y: 9 },
  { x: 5, y: 9 },
];
const lineSegmentInput2: LineSegment = {
  start: { x: 3, y: 4 },
  end: { x: 1, y: 4 },
};
const lineSegmentPoints2: Point[] = [
  { x: 3, y: 4 },
  { x: 2, y: 4 },
  { x: 1, y: 4 },
];

const lineSegmentInput3: LineSegment = {
  start: { x: 1, y: 1 },
  end: { x: 3, y: 3 },
};
const lineSegmentPoints3: Point[] = [
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: 3 },
];

describe("Day 5", () => {
  test("convert fileString to line segments", () => {
    expect(convertFileToLineSegments(testFileInput)).toEqual(lineSegmentOutput);
  });

  test("convertLineSegmentToPoints", () => {
    expect(
      convertLineSegmentToPoints({ lineSegment: lineSegmentInput1 })
    ).toEqual(lineSegmentPoints1);
  });

  test("convertLineSegmentToPoints2", () => {
    expect(
      convertLineSegmentToPoints({ lineSegment: lineSegmentInput2 })
    ).toEqual(lineSegmentPoints2);
  });

  test("test diagonal to points", () => {
    expect(
      convertLineSegmentToPoints({
        lineSegment: lineSegmentInput3,
        checkDiagonal: true,
      })
    ).toEqual(lineSegmentPoints3);
  });

  test("convertLineSegmentToPoints", () => {
    expect(
      convertLineSegmentsToPoints({ lineSegments: [lineSegmentInput1] })
    ).toEqual(lineSegmentPoints1);
  });

  test("find all intersection points without diagonals", () => {
    expect(
      findIntersectionPoints(
        convertLineSegmentsToPoints({ lineSegments: lineSegmentOutput })
      )
    ).toEqual(5);
  });

  test("find all intersection points with diagonals", () => {
    expect(
      findIntersectionPoints(
        convertLineSegmentsToPoints({
          lineSegments: lineSegmentOutput,
          checkDiagonal: true,
        })
      )
    ).toEqual(12);
  });
});
