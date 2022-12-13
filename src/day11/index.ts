import { Day } from "../day";

interface Monkey {
  id: number;
  items: any[];
  op: (n: number) => number;
  div: number;
  mod: (n: number) => number;
  cnt: number;
}

class Day11 extends Day {
  constructor() {
    super(11);
  }
  parseMonkey(input: string): Monkey[] {
    const nRgx = /[0-9]+/g;
    const chunkSize = 6;
    const chunks = [];
    const data = input.split("\n").filter((l) => l !== "");
    for (let i = 0; i < data.length; i += chunkSize) {
      chunks.push(data.slice(i, i + chunkSize));
    }
    return chunks.map((c) => {
      const [l1, l2, l3, l4, l5, l6] = c;
      const id = l1.match(nRgx)?.at(0);
      const items = l2.match(nRgx)!.map((v) => +v);
      const o = l3.split(" = ")[1];
      const div = l4.match(nRgx)?.at(0);
      const t = l5.match(nRgx)?.at(0);
      const f = l6.match(nRgx)?.at(0);
      const op = (n: number) => eval(o.replace(/old/g, `${n}`));
      const mod = (n: number) => (n % +div! == 0 ? +t! : +f!);
      return { id: +id!, items, op, div: +div!, mod, cnt: 0 } as Monkey;
    });
  }

  solvePuzzle(
    n: number,
    monkeys: Monkey[],
    fn: (v: number) => number
  ): Monkey[] {
    for (let i = 0; i < n; i++) {
      monkeys.forEach((m, i) => {
        const ops = m.items.map((item) => {
          const afterOp = m.op(item);
          const val = fn(afterOp);
          const idx = m.mod(val);
          return { idx, val };
        }) as { idx: number; val: number }[];
        monkeys[i] = {
          ...m,
          cnt: m.cnt + ops.length,
          items: [],
        };
        ops.forEach((op) => {
          monkeys[op.idx].items.push(op.val);
        });
      });
    }
    return monkeys;
  }

  getProdTwoMaxM(monkeys: Monkey[]): number {
    return monkeys
      .map((m) => m.cnt)
      .sort((a, b) => b - a)
      .slice(0, 2)
      .reduce((a, b) => a * b, 1);
  }

  solveForPartOne(input: string): string {
    const monkeys = this.parseMonkey(input);
    const fn = (v: number) => Math.floor(v / 3);
    const res = this.getProdTwoMaxM(this.solvePuzzle(20, monkeys, fn));

    return `${res}`;
  }

  solveForPartTwo(input: string): string {
    const monkeys = this.parseMonkey(input);
    const modulo = monkeys.map((m) => m.div).reduce((acc, d) => acc * d, 1);
    const fn = (v: number) => v % modulo;
    const res = this.getProdTwoMaxM(this.solvePuzzle(10000, monkeys, fn));
    return `${res}`;
  }
}

export default new Day11();
