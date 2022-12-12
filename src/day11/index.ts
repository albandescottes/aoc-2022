import { Day } from "../day";

interface Monkey {
  id: number;
  items: any[];
  op: (n: bigint) => bigint;
  div: bigint;
  mod: (n: bigint) => number;
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
      const items = l2.match(nRgx)!.map((v) => BigInt(v));
      const o = l3.split(" = ")[1];
      const div = l4.match(nRgx)?.at(0);
      const t = l5.match(nRgx)?.at(0);
      const f = l6.match(nRgx)?.at(0);
      const [l, m, r] = o.split(" ");
      const op = (n: bigint) => {
        // cannot use eval cause js is shit
        const ll = l === "old" ? n : BigInt(l);
        const rr = r === "old" ? n : BigInt(r);
        if (m === "+") {
          return ll + rr;
        } else if (m === "*") {
          return ll * rr;
        } else if (m === "/") {
          return ll / rr;
        } else {
          return ll - rr;
        }
      };
      const mod = (n: bigint) => (BigInt(n) % BigInt(div!) == 0n ? +t! : +f!);
      return { id: +id!, items, op, div: BigInt(div!), mod, cnt: 0 } as Monkey;
    });
  }

  solvePuzzle(
    n: number,
    monkeys: Monkey[],
    fn: (v: bigint) => bigint
  ): Monkey[] {
    for (let i = 0; i < n; i++) {
      monkeys.forEach((m, i) => {
        const ops = m.items.map((item) => {
          const afterOp = m.op(item);
          const val = fn(afterOp);
          const idx = m.mod(val);
          return { idx, val };
        }) as { idx: number; val: bigint }[];
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

  solveForPartOne(input: string): string {
    const monkeys = this.parseMonkey(input);
    const fn = (v: bigint) => v / 3n;
    const [m1, m2, _] = this.solvePuzzle(20, monkeys, fn).sort(
      (a, b) => b.cnt - a.cnt
    );
    return `${m1.cnt * m2.cnt}`;
  }

  solveForPartTwo(input: string): string {
    const monkeys = this.parseMonkey(input);
    const modulo = monkeys.map(m => m.div).reduce((acc, d) => acc*d, 1n)
    const fn = (v: bigint) => v % modulo;
    const [m1, m2, _] = this.solvePuzzle(10000, monkeys, fn).sort(
      (a, b) => b.cnt - a.cnt
    );
    return `${m1.cnt * m2.cnt}`;
  }
}

export default new Day11();
