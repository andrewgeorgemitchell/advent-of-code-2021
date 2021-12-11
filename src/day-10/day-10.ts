import fs from "fs";

const fileString = fs
  .readFileSync(__dirname + "/day-10.data.txt", "utf8")
  .toString();

const chars = {
  "<": -1,
  ">": 1,
  "{": -1,
  "}": 1,
  "(": -1,
  ")": 1,
  "[": -1,
  "]": 1,
};

const illegalChars = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

export const convertFileStringToArray = (fileString: string): string[] => {
  return fileString.split("\n");
};

const sumUpLine = (line: string): number => {
  return line.split("").reduce((acc, char) => {
    return acc + chars[char];
  }, 0);
};

const determineIfLineIsIncomplete = (line: string): boolean => {
  const sum = sumUpLine(line);
  if (Math.abs(sum) === line.length) {
    return true;
  }
  return false;
};

export const sanitizeLine = (line: string): string => {
  if (
    !line.includes("()") &&
    !line.includes("{}") &&
    !line.includes("[]") &&
    !line.includes("<>")
  ) {
    return line;
  }
  return sanitizeLine(
    line.replace("()", "").replace("{}", "").replace("[]", "").replace("<>", "")
  );
};

export const filterOutIncompleteLines = (lines: string[]): string[] => {
  const sanitizeLines = lines.map(sanitizeLine);
  return sanitizeLines.filter((line) => {
    return !determineIfLineIsIncomplete(line);
  });
};

export const findErrorChar = (line: string): string => {
  for (let i = 0; i < line.length; i++) {
    const currentChar = line[i];
    if (chars[currentChar] > 0) {
      return currentChar;
    }
  }
};

export const findErrorCharScoreTotal = (lines: string[]): number => {
  return lines.reduce((acc, line) => {
    const errorChar = findErrorChar(line);
    const errorCharScore = illegalChars[errorChar];
    return acc + errorCharScore;
  }, 0);
}

export const findErrorScoreInLines = (lines: string[]): number => {
  const filteredLines = filterOutIncompleteLines(lines);
  return findErrorCharScoreTotal(filteredLines.map(findErrorChar));
}

// Part 1
console.log(findErrorScoreInLines(convertFileStringToArray(fileString)));