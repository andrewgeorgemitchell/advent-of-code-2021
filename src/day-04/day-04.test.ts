import { Bingo, convertFile, Marked, playBingo, findLastWinner } from './day-04.service';

const testInput = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

const testOutputRandoms = [
  7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18,
  20, 8, 19, 3, 26, 1,
];

const testOutputBoards = [
  [
    [22, 13, 17, 11, 0],
    [8, 2, 23, 4, 24],
    [21, 9, 14, 16, 7],
    [6, 10, 3, 18, 5],
    [1, 12, 20, 15, 19],
  ],
  [
    [3, 15, 0, 2, 22],
    [9, 18, 13, 17, 5],
    [19, 8, 7, 25, 23],
    [20, 11, 10, 24, 4],
    [14, 21, 16, 12, 6],
  ],
  [
    [14, 21, 17, 24, 4],
    [10, 16, 15, 9, 19],
    [18, 8, 23, 26, 20],
    [22, 11, 13, 6, 5],
    [2, 0, 12, 3, 7],
  ],
];

describe("Day 04", () => {
  test("data file conversion", () => {
    const { randomNums, boards } = convertFile(testInput);
    expect(randomNums).toEqual(testOutputRandoms);
    expect(boards).toEqual(testOutputBoards);
  });

  test('Board.addMarked', () => {
    const board = new Bingo(testOutputBoards[0]);
    board.addMarked(22);
    expect(board.marked[0][0]).toEqual(Marked.M);
    expect(board.marked[0][1]).toEqual(board.board[0][1]);
    board.addMarked(14);
    expect(board.marked[2][2]).toEqual(Marked.M);
  })

  test("Board.checkWinner vertical", () => {
    const board = new Bingo(testOutputBoards[0]);
    board.addMarked(22);
    board.addMarked(8);
    board.addMarked(21);
    board.addMarked(6);
    board.addMarked(1);
    expect(board.checkWinner()).toBe(true);
  });

  test("Board.checkWinner horizontal", () => {
    const board = new Bingo(testOutputBoards[0]);
    board.addMarked(22);
    board.addMarked(13);
    board.addMarked(17);
    board.addMarked(11);
    board.addMarked(0);
    expect(board.checkWinner()).toBe(true);
  });

  test("Board.sumUnmarked is correct", () => {
    const board = new Bingo(testOutputBoards[2]);
    board.addMarked(7);
    board.addMarked(4);
    board.addMarked(9);
    board.addMarked(5);
    board.addMarked(11);
    board.addMarked(17);
    board.addMarked(23);
    board.addMarked(2);
    board.addMarked(0);
    board.addMarked(14);
    board.addMarked(21);
    board.addMarked(24);
    expect(board.sumUnmarked()).toBe(188);
  });

  test("playBingo works", () => {
    const boards = testOutputBoards.map((board) => new Bingo(board))
    expect(
      playBingo({
        randomNums: testOutputRandoms,
        boards,
      })
    ).toBe(4512);
  });

  test("which board wins last", () => {
    const boards = testOutputBoards.map((board) => new Bingo(board))
    expect(
      findLastWinner({
        randomNums: testOutputRandoms,
        boards,
      })
    ).toBe(1924);
  })
});
