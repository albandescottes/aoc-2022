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

const flatOrder = ([ord, len]: string[]): Order[] =>
  Array<Order>(+len).fill(ord as Order);

class Day9 extends Day {
  constructor() {
    super(9);
  }

  flatData(input: string): Order[] {
    return input
      .split("\n")
      .map((l) => flatOrder(l.split(" ")))
      .flatMap((arr) => arr);
  }

  areNumbersLinked([xH, yH]: numbers, [xT, yT]: numbers): boolean {
    return Math.abs(xT - xH) <= 1 && Math.abs(yT - yH) <= 1;
  }
  moveToHead([xH, yH]: numbers, [xT, yT]: numbers): numbers {
    const fn = (x1: number, x2: number) => ((x1 - x2) / Math.abs(x1 - x2)) | 0;
    return [xT + fn(xH, xT), yT + fn(yH, yT)];
  }

  isAlreadyVisited(pos: numbers, visited: numbers[]): boolean {
    return visited.some((v) => v[0] === pos[0] && v[1] === pos[1]);
  }

  moveSnakeForNchild(data: Order[], n = 1): number {
    const isTail = (i: number) => i === n - 1;
    const s: numbers = [0, 0];
    let head: numbers = s;
    const ns: numbers[] = Array(n).fill(s);
    const visited: numbers[] = [s];
    data.forEach((dir) => {
      head = fnAdd[dir](head);
      ns.forEach((n, i) => {
        const base = i === 0 ? head : ns[i - 1];
        if (!this.areNumbersLinked(base, n)) {
          const pos = this.moveToHead(base, n);
          ns[i] = pos;
          if (isTail(i) && !this.isAlreadyVisited(pos, visited)) {
            visited.push(pos);
          }
        }
      });
    });
    return visited.length;
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
