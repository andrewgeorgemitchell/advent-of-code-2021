import fs from "fs";
import {
  Bingo,
  convertFile,
  findLastWinner,
  playBingo,
} from "./day-04.service";

const main = () => {
  const fileString = fs.readFileSync(__dirname + "/day-04.data.txt").toString();
  const { boards, randomNums } = convertFile(fileString);

  // Part 1
  const bingoBoards = boards.map((board) => new Bingo(board));
  console.log(
    "Part 1:",
    playBingo({
      boards: bingoBoards,
      randomNums,
    })
  );

  // Part 2
  console.log(
    "Part 2:",
    findLastWinner({
      boards: bingoBoards,
      randomNums,
    })
  );
};

export default main;
