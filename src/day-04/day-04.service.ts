type Board = Array<Array<number>>;
export enum Marked {
  M = "m",
}
type MarkedBoard = Array<Array<number | Marked>>;

export const convertFile = (
  fileString: string
): {
  randomNums: number[];
  boards: Board[];
} => {
  const [numArr, ...rest] = fileString.split("\n");
  const boards = rest.reduce<Board[]>((acc, cur) => {
    const copy = [...acc];
    if (cur.length === 0) {
      copy.push([]);
      return copy;
    }
    copy[copy.length - 1].push(
      cur
        .split(" ")
        .filter((s) => s.length > 0)
        .map((s) => parseInt(s))
    );
    return copy;
  }, []);
  return {
    randomNums: numArr.split(",").map((s) => parseInt(s)),
    boards: boards,
  };
};

interface IBingo {
  board: Board;
  marked: MarkedBoard;
  winner: boolean;
  lastCalled: number;

  checkWinner: () => boolean;
  addMarked: (number: number) => void;
  sumUnmarked: () => number;
}

export class Bingo implements IBingo {
  board: Board;
  marked: MarkedBoard;
  lastCalled: number = 0;
  winner: boolean;

  constructor(board: Board) {
    this.board = [...board.map((row) => [...row])];
    this.marked = [...board.map((row) => [...row])];
  }

  checkWinner() {
    for (let i = 0; i < this.marked.length; i++) {
      const element = this.marked[i];
      // check horizontal
      if (element.every((e) => e === Marked.M)) {
        this.winner = true;
        return true;
      }
      const currentCol = [];
      for (let j = 0; j < this.marked.length; j++) {
        currentCol.push(this.marked[j][i]);
      }
      // check vertical
      if (currentCol.every((e) => e === Marked.M)) {
        this.winner = true;
        return true;
      }
    }
    return false;
  }

  addMarked(number: number) {
    for (let i = 0; i < this.marked.length; i++) {
      const row = this.marked[i];
      if (row.includes(number)) {
        this.marked[i][row.indexOf(number)] = Marked.M;
        this.lastCalled = number;
      }
    }
  }

  sumUnmarked() {
    return this.marked.reduce((acc, curr) => {
      const filtered = curr.filter((e) => e !== Marked.M) as number[];
      const sum = filtered.reduce((a, c) => a + c, 0);
      return acc + sum;
    }, 0);
  }
}

// Solve

export const playBingo = ({
  boards,
  randomNums,
}: {
  boards: Bingo[];
  randomNums: number[];
}): number => {
  for (let i = 0; i < randomNums.length; i++) {
    const current = randomNums[i];
    for (let b = 0; b < boards.length; b++) {
      const board = boards[b];
      board.addMarked(current);
      if (board.checkWinner()) {
        return board.sumUnmarked() * board.lastCalled;
      }
    }
  }
};

export const findLastWinner = ({
  boards,
  randomNums,
}: {
  boards: Bingo[];
  randomNums: number[];
}): number => {
  let winners: Bingo[] = [];
  for (let i = 0; i < randomNums.length; i++) {
    const current = randomNums[i];
    for (let b = 0; b < boards.length; b++) {
      const board = boards[b];
      if (board.winner) {
        continue;
      }
      board.addMarked(current);
      if (board.checkWinner()) {
        winners.push(board);
      }
      if (winners.length === boards.length) {
        break;
      }
    }
  }
  const lastWinner = winners[winners.length - 1];
  return lastWinner.sumUnmarked() * lastWinner.lastCalled;
};
