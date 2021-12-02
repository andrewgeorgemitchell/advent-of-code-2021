import fs from "fs";

const fileString = fs.readFileSync(__dirname + "/day-01-1.data.txt").toString();

const fileInputArray = fileString.split("\n").map((string) => parseInt(string));

export const countIncreases = (array: number[]) => {
  let iterator = 0;

  for (let i = 1; i < array.length; i++) {
    const currentDepth = array[i];
    const previousDepth = array[i - 1];
    if (currentDepth > previousDepth) {
      iterator++;
    }
  }

  return iterator;
};

console.log("Part 1: ", countIncreases(fileInputArray));

export const groupArrayBy3Overlapping = (array: number[]): number[] => {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    const currentDepth = array[i];
    const nextDepth = array[i + 1];
    const nextNextDepth = array[i + 2];
    newArray.push([
      ...(currentDepth ? [currentDepth] : []),
      ...(nextDepth ? [nextDepth] : []),
      ...(nextNextDepth ? [nextNextDepth] : []),
    ].reduce((acc, curr) => acc + curr));
  }
  return newArray;
};

console.log(
  "Part 2: ",
  countIncreases(groupArrayBy3Overlapping(fileInputArray))
);
