import { Day } from "../day";
type p = [number, number];
const xy = ([x, y]: p) => `${x} ${y}`;

const nxP = (rSet: Set<string>, sSet: Set<string>, [x, y]: p): p => {
  const sub = xy([x, y + 1]);
  if (!rSet.has(sub) && !sSet.has(sub)) return [x, y + 1];
  if (!rSet.has(sub) && !sSet.has(sub)) return [x, y + 1];
  const subLeft = xy([x - 1, y + 1]);
  if (!rSet.has(subLeft) && !sSet.has(subLeft)) return [x - 1, y + 1];
  const subRight = xy([x + 1, y + 1]);
  if (!rSet.has(subRight) && !sSet.has(subRight)) return [x + 1, y + 1];
  return [x, y] as p;
};

const nxPPuzz1 = (
  rSet: Set<string>,
  sSet: Set<string>,
  yMax: number,
  [x, y]: p
): p | null => {
  if (y + 1 === yMax) return null;
  return nxP(rSet, sSet, [x, y]);
};

const nxPPuzz2 = (
  rSet: Set<string>,
  sSet: Set<string>,
  yMax: number,
  [x, y]: p
): p => {
  if (y + 1 === yMax) return [x, y];
  return nxP(rSet, sSet, [x, y]);
};

class Day14 extends Day {
  constructor() {
    super(14);
  }

  parseInput(input: string): { data: string[]; maxY: number } {
    let maxY = 0;
    const data = input
      .split("\n")
      .map((l) =>
        l
          .split(" -> ")
          .map((v, i, arr) => {
            if (i === arr.length - 1) {
              return [];
            }
            const [x, y] = v.split(",").map((n) => +n);
            const [xx, yy] = arr[i + 1].split(",").map((n) => +n);
            const [minXL, _] = [x, xx].sort((a, b) => a - b);
            const [minYL, maxYL] = [y, yy].sort((a, b) => a - b);
            if (maxY < maxYL) maxY = maxYL;
            if (x === xx) {
              return Array(Math.abs(y - yy) + 1)
                .fill("")
                .map((_, i) => [x, minYL + i]);
            } else {
              return Array(Math.abs(x - xx) + 1)
                .fill("")
                .map((_, i) => [minXL + i, y]);
            }
          })
          .flatMap((v) => v)
      )
      .flatMap((v) => v)
      .map((v) => xy([v[0], v[1]]));
    return { data, maxY };
  }

  solveForPartOne(input: string): string {
    const { data, maxY } = this.parseInput(input);
    const setRock = new Set<string>(data);
    const setSand = new Set<string>();
    const start: p = [500, 0];
    let cnt = 0;
    const maxYpuzz1 = maxY + 1;
    while (true) {
      let curr = start;
      let nx = nxPPuzz1(setRock, setSand, maxYpuzz1, curr);
      while (nx !== null && xy(curr) !== xy(nx)) {
        curr = nx;
        nx = nxPPuzz1(setRock, setSand, maxYpuzz1, curr);
      }
      if (nx === null) {
        break;
      }
      cnt++;
      setSand.add(xy(nx));
    }
    return `${cnt}`;
  }

  solveForPartTwo(input: string): string {
    const { data, maxY } = this.parseInput(input);
    const setRock = new Set<string>(data);
    const setSand = new Set<string>();
    const start: p = [500, 0];
    let cnt = 0;
    const maxYpuzz2 = maxY + 2;
    while (true) {
      let curr = start;
      let nx = nxPPuzz2(setRock, setSand, maxYpuzz2, curr);
      while (xy(nx) !== xy(start) && xy(curr) !== xy(nx)) {
        curr = nx;
        nx = nxPPuzz2(setRock, setSand, maxYpuzz2, curr);
      }

      cnt++;
      setSand.add(xy(nx));
      if (xy(nx) === xy(start)) {
        break;
      }
    }
    return `${cnt}`;
  }
}

export default new Day14();
