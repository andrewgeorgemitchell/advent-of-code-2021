import {
  calculatePosition,
  calculatePositionWithAngle,
  convertFileStringToArray,
  DirectionEnum,
} from "./day-02";

const testFileInput = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

const testInput = [
  { direction: DirectionEnum.Forward, magnitude: 5 },
  { direction: DirectionEnum.Down, magnitude: 5 },
  { direction: DirectionEnum.Forward, magnitude: 8 },
  { direction: DirectionEnum.Up, magnitude: 3 },
  { direction: DirectionEnum.Down, magnitude: 8 },
  { direction: DirectionEnum.Forward, magnitude: 2 },
];

describe("Day 02", () => {
  test("convert file to array", () => {
    expect(convertFileStringToArray(testFileInput)).toEqual(testInput);
  });

  test("calculatePosition properly predicts position with test input", () => {
    const { x, y } = calculatePosition(testInput);
    expect(x).toBe(15);
    expect(y).toBe(10);
    expect(x * y).toEqual(150);
  });

  test("calculatePositionWithAim properly predicts position with test input", () => {
    const { x, y } = calculatePositionWithAngle(testInput);
    expect(x).toBe(15);
    expect(y).toBe(60);
    expect(x * y).toEqual(900);
  });
});
