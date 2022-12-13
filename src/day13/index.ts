import { Day } from "../day";

type aOn = any[] | number;
class Day13 extends Day {
  constructor() {
    super(13);
  }

  fn(l: aOn, r: aOn): boolean | null {
    const lArr = typeof l === "object";
    const rArr = typeof r === "object";
    if (lArr && rArr) {
      const max = Math.max(l.length, r.length);
      let n = max;
      let res = null;
      while (n > 0) {
        const idx = max - n;
        const ll = l[idx];
        const rr = r[idx];
        if (rr === undefined && ll !== undefined) {
          return false;
        } else if (rr !== undefined && ll === undefined) {
          return true;
        }
        const comp = this.fn(ll, rr);
        if (comp !== null) {
          if (comp) {
            return true;
          } else {
            return false;
          }
        }
        n--;
      }
      return res;
    } else if (lArr && !rArr) {
      if (r === undefined) return false;
      return this.fn(l, [r]);
    } else if (!lArr && rArr) {
      if (l === undefined) return false;
      return this.fn([l], r);
    } else {
      if (l === r) {
        return null;
      }
      return r >= l;
    }
  }

  solveForPartOne(input: string): string {
    const lines = input
      .split("\n")
      .filter((l) => l !== "")
      .map((l) => JSON.parse(l));
    const chunk = 2;
    const duels = [];
    for (let i = 0; i < lines.length; i += chunk) {
      duels.push([...lines.slice(i, i + chunk)]);
    }
    const res = duels
      .map(([left, right], i) => (this.fn(left, right) ? i + 1 : 0))
      .reduce((a, b) => a + b);
    return `${res}`;
  }

  solveForPartTwo(input: string): string {
    const lines = input
      .split("\n")
      .filter((l) => l !== "")
      .map((l) => JSON.parse(l));
    const linesSorted = [...lines, [[2]], [[6]]].sort((a, b) =>
      this.fn(a, b) ? -1 : 1
    );
    const idx2 = linesSorted.findIndex((l) => JSON.stringify(l) === "[[2]]");
    const idx6 = linesSorted.findIndex((l) => JSON.stringify(l) === "[[6]]");
    return `${(idx2 + 1) * (idx6 + 1)}`;
  }
}

export default new Day13();
