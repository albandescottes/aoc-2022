import { Day } from "../day";

type numbers = [number, number];
enum Order {
  U = "U",
  D = "D",
  L = "L",
  R = "R",
}
const fnAdd: { [key in Order]: (arg: numbers) => numbers } = {
  U: ([x, y]: numbers) => [x, y + 1],
  D: ([x, y]: numbers) => [x, y - 1],
  L: ([x, y]: numbers) => [x - 1, y],
  R: ([x, y]: numbers) => [x + 1, y],
};

class Day9 extends Day {
  constructor() {
    super(9);
  }

  flatOrder = (s: string): Order[] => {
    const [dir, len] = s.split(" ");
    return Array<Order>(+len).fill(dir as Order);
  };

  flatData(input: string): Order[] {
    return input
      .split("\n")
      .map((l) => this.flatOrder(l))
      .flatMap((arr) => arr);
  }

  areHandTLinked([xH, yH]: numbers, [xT, yT]: numbers): boolean {
    return Math.abs(xT - xH) <= 1 && Math.abs(yT - yH) <= 1;
  }
  moveTNearH([xH, yH]: numbers, [xT, yT]: numbers, idx?: number): numbers {
    const xOffset = Math.abs(xH - xT);
    const xOffsetSign = (xH - xT) / xOffset;
    const yOffset = Math.abs(yH - yT);
    const yOffsetSign = (yH - yT) / yOffset;
    if (
      (xOffset === 2 && yOffset === 1) ||
      (xOffset === 1 && yOffset === 2) ||
      (xOffset === 2 && yOffset === 2)
    ) {
      return [xT + xOffsetSign, yT + yOffsetSign];
    } else if (xOffset === 2) {
      return [xT + xOffsetSign, yT];
    } else {
      return [xT, yT + yOffsetSign];
    }
  }

  isAlreadyVisited(pos: numbers, visited: numbers[]): boolean {
    return visited.some((v) => v[0] === pos[0] && v[1] === pos[1]);
  }

  moveSnakeForNchild(data: Order[], n = 1): number {
    let h: numbers = [0, 0];
    let ts: numbers[] = Array(n).fill([0, 0]);
    const tVisited: numbers[] = [[0, 0]];
    data.forEach((dir) => {
      h = fnAdd[dir](h);
      ts.forEach((t, i) => {
        const base = i === 0 ? h : ts[i - 1];
        if (!this.areHandTLinked(base, t)) {
          const newPos = this.moveTNearH(base, t);
          ts[i] = newPos;
          if (i === ts.length - 1 && !this.isAlreadyVisited(newPos, tVisited)) {
            tVisited.push(newPos);
          }
        }
      });
    });
    return tVisited.length;
  }

  solveForPartOne(input: string): string {
    const data = this.flatData(input);
    return `${this.moveSnakeForNchild(data, 1)}`;
  }

  solveForPartTwo(input: string): string {
    const data = this.flatData(input);

    return `${this.moveSnakeForNchild(data, 9)}`;
  }
}

export default new Day9();
