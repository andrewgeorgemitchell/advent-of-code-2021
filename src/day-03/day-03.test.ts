import {
  calculateGammaEpsilonNumbers,
  charFrequencyForCol,
  convertBinaryToBits,
  calculateRating,
  O2RateComparator,
  C02RateComparator,
  convertBinaryArrayToDecimal,
} from "./day-03.service";

const testInputFileString = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

const testOutput = [
  [0, 0, 1, 0, 0],
  [1, 1, 1, 1, 0],
  [1, 0, 1, 1, 0],
  [1, 0, 1, 1, 1],
  [1, 0, 1, 0, 1],
  [0, 1, 1, 1, 1],
  [0, 0, 1, 1, 1],
  [1, 1, 1, 0, 0],
  [1, 0, 0, 0, 0],
  [1, 1, 0, 0, 1],
  [0, 0, 0, 1, 0],
  [0, 1, 0, 1, 0],
];

describe("Day 03", () => {
  test("file conversion", () => {
    const output = convertBinaryToBits(testInputFileString);
    expect(output).toEqual(testOutput);
  });

  test("charFrequency for column", () => {
    expect(charFrequencyForCol(0, testOutput)).toEqual({ 0: 5, 1: 7 });
  });

  test("convertBinaryArrayToDecimal", () => {
    expect(convertBinaryArrayToDecimal([0, 1, 0, 1, 0])).toBe(10);
  });

  test("calculateGammaEpsilonNumbers works as expected", () => {
    const { gamma, epsilon } = calculateGammaEpsilonNumbers(testOutput);
    expect(gamma).toEqual([1, 0, 1, 1, 0]);
    expect(epsilon).toEqual([0, 1, 0, 0, 1]);
  });

  test("calculateRating for O2", () => {
    const result = calculateRating({
      col: 0,
      matrix: testOutput,
      comparator: ({
        zeroTotal,
        oneTotal,
      }: {
        zeroTotal: number;
        oneTotal: number;
      }): number => {
        if (zeroTotal > oneTotal) {
          return 0;
        } else if (zeroTotal < oneTotal) {
          return 1;
        } else {
          return 1;
        }
      },
    });
    expect(result).toEqual([1, 0, 1, 1, 1]);
  });

  test("calculateRating for O2", () => {
    const result = calculateRating({
      matrix: testOutput,
      comparator: O2RateComparator,
    });
    expect(result).toEqual([1, 0, 1, 1, 1]);
  });

  test("calculateRating for C02", () => {
    const co2Expected = [0, 1, 0, 1, 0];
    const result = calculateRating({
      matrix: testOutput,
      comparator: C02RateComparator,
    });
    expect(result).toEqual(co2Expected);
  });
});
