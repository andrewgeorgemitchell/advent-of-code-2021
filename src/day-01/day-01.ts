import fs from "fs";
import { countIncreases, groupArrayBy3Overlapping } from "./day-01.service";

const main = () => {
  const fileString = fs
    .readFileSync(__dirname + "/day-01-1.data.txt")
    .toString();

  const fileInputArray = fileString
    .split("\n")
    .map((string) => parseInt(string));

  console.log("Part 1: ", countIncreases(fileInputArray));

  console.log(
    "Part 2: ",
    countIncreases(groupArrayBy3Overlapping(fileInputArray))
  );
};

export default main;
