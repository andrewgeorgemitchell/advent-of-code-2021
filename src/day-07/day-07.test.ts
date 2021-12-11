import {
  findFuelCostForPosition,
  findShortestMiddleGroundPosition,
} from "./day-07.service";

const testFileInput = `16,1,2,0,4,2,7,1,2,14`;

describe("Day 07", () => {
  const testFileInputArray = testFileInput.split(",").map(Number);

  test("find fuel usage for paths to 1", () => {
    expect(
      findFuelCostForPosition({
        endPosition: 1,
        currentPositions: testFileInputArray,
      })
    ).toBe(41);
  });

  test("find fuel usage for paths to 2", () => {
    expect(
      findFuelCostForPosition({
        endPosition: 2,
        currentPositions: testFileInputArray,
      })
    ).toBe(37);
  });

  test("find fuel usage for paths to 10", () => {
    expect(
      findFuelCostForPosition({
        endPosition: 10,
        currentPositions: testFileInputArray,
      })
    ).toBe(71);
  });

  test("Test find shortest middle ground position", () => {
    expect(findShortestMiddleGroundPosition(testFileInputArray)).toBe(37);
  });

  test("find fuel usage for paths to 2 using exponential fuel cost", () => {
    expect(
      findFuelCostForPosition({
        endPosition: 2,
        currentPositions: testFileInputArray,
        exponentialFuelCost: true,
      })
    ).toBe(206);
  });

  test("find fuel usage for paths to 5 using exponential fuel cost", () => {
    expect(
      findFuelCostForPosition({
        endPosition: 5,
        currentPositions: testFileInputArray,
        exponentialFuelCost: true,
      })
    ).toBe(168);
  });

  test("Test find shortest middle ground position with exponential fuel cost", () => {
    expect(findShortestMiddleGroundPosition(testFileInputArray, true)).toBe(168);
  });
});
