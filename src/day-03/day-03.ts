import fs from "fs";
import {
  C02RateComparator,
  calculateGammaEpsilonNumbers,
  calculateRating,
  convertBinaryArrayToDecimal,
  convertBinaryToBits,
  O2RateComparator,
} from "./day-03.service";

const main = () => {
  const fileString = fs.readFileSync(__dirname + "/day-03.data.txt").toString();

  // Part 1
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
};

export default main;
