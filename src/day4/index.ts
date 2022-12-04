import { Day } from "../day";

class Day4 extends Day {
  private range(s: number, e: number) {
    return Array(e - s + 1)
      .fill(0)
      .map((_, idx) => s + idx);
  }
  constructor() {
    super(4);
  }

  solveForPartOne(input: string): string {
    const data = input
      .split("\n")
      .map((v) => v.split(",").map((s) => s.split("-").map((n) => +n)));
    const dataIntersect = data.filter((d) => {
      const [a, b] = d;
      const [a1, a2] = a;
      const [b1, b2] = b;
      const one = this.range(a1, a2);
      const two = this.range(b1, b2);
      const interserct = one.filter((v) => two.includes(v));
      if (one.length > two.length) {
        return two.length === interserct.length;
      } else {
        return one.length === interserct.length;
      }
    });
    return `${dataIntersect.length}`;
  }

  solveForPartTwo(input: string): string {
    const data = input
      .split("\n")
      .map((v) => v.split(",").map((s) => s.split("-").map((n) => +n)));
    const dataIntersect = data.filter((d) => {
      const [a, b] = d;
      const [a1, a2] = a;
      const [b1, b2] = b;
      const one = this.range(a1, a2);
      const two = this.range(b1, b2);
      const interserct = one.filter((v) => two.includes(v));
      return interserct.length > 0;
    });
    return `${dataIntersect.length}`;
  }
}

export default new Day4();
