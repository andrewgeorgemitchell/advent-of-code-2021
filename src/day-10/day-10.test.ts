import {
    convertFileStringToArray,
    filterOutIncompleteLines,
    sanitizeLine,
    findErrorChar,
    findErrorCharScoreTotal,
    findErrorScoreInLines
} from './day-10';


const fileInput = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`

const fileOutput = [
  '[({(<(())[]>[[{[]{<()<>>',
  '[(()[<>])]({[<{<<[]>>(',
  '{([(<{}[<>[]}>{[]{[(<()>',
  '(((({<>}<{<{<>}{[]{[]{}',
  '[[<[([]))<([[{}[[()]]]',
  '[{[{({}]{}}([{[{{{}}([]',
  '{<[[]]>}<{[{[{[]{()[[[]',
  '[<(<(<(<{}))><([]([]()',
  '<{([([[(<>()){}]>(<<{{',
  '<{([{{}}[<[[[<>{}]]]>[]]',
]

const sanitizedLines = [
  '[({([[{{',
  '({[<{(',
  '{([(<[}>{{[(',
  '((((<{<{{',
  '[[<[)<([',
  '[{[{(]}([{[{(',
  '<{[{[{{[[',
  '[<(<(<(<))><((',
  '<{([([>(<<{{',
  '<{([',
]

const expectedFilterOutput = [
  '{([(<[}>{{[(',
  '[[<[)<([',
  '[{[{(]}([{[{(',
  '[<(<(<(<))><((',
  '<{([([>(<<{{',
]

const expectedIllegalChars = [
  '}',
  ')',
  ']',
  ')',
  '>',
]

const scoreTotal = 26397;

describe('Day 10', () => {
  test('convert file string to array', () => {
    expect(convertFileStringToArray(fileInput)).toEqual(fileOutput)
  })

  test('sanitize Lines properly', () => {
    expect(fileOutput.map(sanitizeLine)).toEqual(sanitizedLines)
  })

  test('filter out incomplete lines', () => {
    const input = fileInput.split('\n')
    const result = filterOutIncompleteLines(input)
    expect(result).toEqual(expectedFilterOutput)
  })

  test('find illegal chars', () => {
    expect(expectedFilterOutput.map(findErrorChar)).toEqual(expectedIllegalChars)
  })

  test('find illegal char score total', () => {
    expect(findErrorCharScoreTotal(expectedIllegalChars)).toEqual(scoreTotal)
  })

  test('find error score from non sanitized lines', () =>{
    expect(findErrorScoreInLines(fileOutput)).toEqual(scoreTotal)
  })
});