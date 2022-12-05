import { Day } from "../day";

interface Order {
  cnt: number;
  s: number;
  e: number;
}
interface Game {
  stacks: string[][];
  ords: Order[];
}

class Day5 extends Day {
  constructor() {
    super(5);
  }
  parseInput(input: string): Game {
    const lines = input.split("\n");
    const stacksTemp: string[][] = [];
    const ords: Order[] = [];
    lines.forEach((l) => {
      if (l.match(/\[|[A-Z]|\]/)) {
        const s = (l + " ").match(/.{4}/g)?.map((v) => v[1]) as string[];
        stacksTemp.push(s);
      } else if (l.match(/[a-z]+/)) {
        const [cnt, s, e] = l
          .replace("move ", "")
          .replace(" from ", "_")
          .replace(" to ", "_")
          .split("_")
          .map((v) => +v);
        ords.push({ cnt, s: s - 1, e: e - 1 });
      }
    });
    const stacks: string[][] = [];
    stacksTemp.reverse().forEach((s) =>
      s.forEach((v, idx) => {
        if (v !== " ") {
          stacks[idx] = [...(stacks[idx] || []), v];
        }
      })
    );
    return { stacks, ords };
  }

  solveForPartOne(input: string): string {
    const { stacks, ords }: Game = this.parseInput(input);
    ords.forEach((o) => {
      const out = stacks[o.s].splice(-o.cnt, o.cnt).reverse();
      if (out) {
        stacks[o.e].push(...out);
      }
    });
    const res = stacks.map((s) => s.at(-1)).join("");
    return `${res}`;
  }

  solveForPartTwo(input: string): string {
    const { stacks, ords }: Game = this.parseInput(input);
    ords.forEach((o) => {
      const out = stacks[o.s].splice(-o.cnt, o.cnt);
      if (out) {
        stacks[o.e].push(...out);
      }
    });
    const res = stacks.map((s) => s.at(-1)).join("");
    return `${res}`;
  }
}

export default new Day5();
