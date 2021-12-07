import fs from "fs";

const fileString = fs.readFileSync(__dirname + "/day-03.data.txt").toString();

export const convertBinaryToBits = (
  fileString: string
): Array<Array<number>> => {
  return fileString.split("\n").map((row: string) => {
    return row.split("").map((bit: string) => parseInt(bit));
  });
};

export const charFrequencyForCol = (
  col: number,
  matrix: Array<Array<number>>
): Record<number, number> => {
  const frequency: Record<number, number> = {};
  for (let i = 0; i < matrix.length; i++) {
    const current = matrix[i][col];
    if (current in frequency) {
      frequency[current]++;
    } else {
      frequency[current] = 1;
    }
  }
  return frequency;
};

export const convertBinaryArrayToDecimal = (arr: Array<number>): number =>
  parseInt(arr.join(""), 2);
// Part 1

export const calculateGammaEpsilonNumbers = (
  bits: Array<Array<number>>
): { gamma: Array<number>; epsilon: Array<number> } => {
  const gamma = [];
  const epsilon = [];
  for (let i = 0; i < bits[0].length; i++) {
    const { 0: zeros, 1: ones } = charFrequencyForCol(i, bits);
    if (ones > zeros) {
      gamma.push(1);
      epsilon.push(0);
    } else {
      gamma.push(0);
      epsilon.push(1);
    }
  }
  return { gamma, epsilon };
};

console.log("Part 1:");
const { gamma, epsilon } = calculateGammaEpsilonNumbers(
  convertBinaryToBits(fileString)
);
const gammaValue = convertBinaryArrayToDecimal(gamma);
const epsilonValue = convertBinaryArrayToDecimal(epsilon);
console.log("{gamma, epsilon}: ", { gamma, epsilon });
console.log("Gamma Decimal: ", gammaValue);
console.log("Epsilon Decimal: ", epsilonValue);
console.log("product: ", epsilonValue * gammaValue);

// Part 2

export const calculateRating = ({
  col = 0,
  matrix,
  comparator,
}: {
  col?: number;
  matrix: Array<Array<number>>;
  comparator: ({
    zeroTotal,
    oneTotal,
  }: {
    zeroTotal: number;
    oneTotal: number;
  }) => number;
}): number[] => {
  if (matrix.length === 1) {
    return matrix[0];
  }

  const chars = charFrequencyForCol(col, matrix);

  const compareValue = comparator({ zeroTotal: chars[0], oneTotal: chars[1] });

  const newMatrix = matrix.filter((arr) => arr[col] === compareValue);

  return calculateRating({
    col: col + 1,
    matrix: newMatrix,
    comparator,
  });
};

export const O2RateComparator = ({
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
};

export const C02RateComparator = ({
  zeroTotal,
  oneTotal,
}: {
  zeroTotal: number;
  oneTotal: number;
}): number => {
  if (zeroTotal > oneTotal) {
    return 1;
  } else if (zeroTotal < oneTotal) {
    return 0;
  } else {
    return 0;
  }
};

console.log("Part 2:");
const O2Rating = convertBinaryArrayToDecimal(
  calculateRating({
    matrix: convertBinaryToBits(fileString),
    comparator: O2RateComparator,
  })
);
const C02Rating = convertBinaryArrayToDecimal(
  calculateRating({
    matrix: convertBinaryToBits(fileString),
    comparator: C02RateComparator,
  })
);
console.log("O2Rating:", O2Rating);
console.log("C02Rating:", C02Rating);
console.log("product: ", O2Rating * C02Rating);
