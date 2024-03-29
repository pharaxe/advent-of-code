import * as lineReader from "line-reader";

export type Direction = "forward" | "up" | "down";

export type Command = {
  direction: Direction;
  amount: number;
};

export type Position = {
  depth: number;
  horizontal: number;
};

export const lineToCommand = (line: string): Command => {
  const [direction, amount] = line.split(" ");

  return {
    direction: direction as Direction,
    amount: Number.parseInt(amount),
  };
};

const applyCommand = (pos: Position, command: Command): Position => {
  const newPosition = { ...pos };

  switch (command.direction) {
    case "forward":
      newPosition.horizontal += command.amount;
      break;
    case "down":
      newPosition.depth += command.amount;
      break;
    case "up":
      newPosition.depth -= command.amount;
      break;
  }

  return newPosition;
};

const main = (lines: string[]): void => {
  const commands = lines.map(lineToCommand);
  const startPosition: Position = {
    depth: 0,
    horizontal: 0,
  };

  const finalPosition = commands.reduce(applyCommand, startPosition);

  console.log(finalPosition.depth * finalPosition.horizontal);
};

const filename = process.argv[2];
const lines = [];
if (filename) { 
  lineReader.eachLine(filename, (line, last) => {
    lines.push(line);
    if (last) {
      main(lines);
    }
  });
}
