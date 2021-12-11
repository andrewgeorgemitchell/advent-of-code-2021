import { countIncreases, groupArrayBy3Overlapping } from "./day-01.service";

describe("Day 01", () => {
  test("Test countIncreases", () => {
    expect(countIncreases([1, 2, 3, 4])).toBe(3);
  });

  test("Test groupArrayBy", () => {
    console.log(
      "groupArrayBy3Overlapping([1, 2, 3, 4]):",
      groupArrayBy3Overlapping([1, 2, 3, 4])
    );
    expect(groupArrayBy3Overlapping([1, 2, 3, 4])).toEqual([6, 9, 7, 4]);
  });
});
