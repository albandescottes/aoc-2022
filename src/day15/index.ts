import { Day } from "../day";

const xy = (x: number, y: number) => `${x} ${y}`;
const d = (x: number, y: number, x1: number, y1: number) =>
  Math.abs(x - x1) + Math.abs(y - y1);

class Day15 extends Day {
  constructor() {
    super(15);
  }

  solveForPartOne(input: string): string {
    const rgx =
      /^Sensor at x=([-0-9]+), y=([-0-9]+): closest beacon is at x=([-0-9]+), y=([-0-9]+)$/;
    const data = input
      .split("\n")
      .map((l) => {
        const [xS, yS, xB, yB] = l
          .replace(/Sensor at x=| y=| closest beacon is at x=/g, "")
          .replace(":", ",")
          .split(",");
        return [xS, yS, xB, yB];
      })
      .map((v) => v.map((e) => +e));
    const set = new Set<string>();
    const yWatch = 2000000;
    const setB = new Set(data.map(([xS, yS, xB, yB]) => xy(xB, yB)));
    console.log(new Date().toISOString());
    data.forEach(([xS, yS, xB, yB]) => {
      const dMax = d(xS, yS, xB, yB);
      const dY = Math.abs(yS - yWatch);
      const max = Math.abs(dMax - dY) + 1;
      for (let i = 0; i < max; i++) {
        const points = [1, -1]
          .map((v) => [xS + i * v, yWatch])
          .filter(([xx, yy]) => d(xS, yS, xx, yy) <= dMax)
          .map(([xx, yy]) => xy(xx, yy))
          .filter((s) => !setB.has(s) && !set.has(s));
        [...new Set(points)].forEach((p) => {
          if (!set.has(p)) set.add(p);
        });
      }
    });
    console.log(new Date().toISOString());
    return `${set.size}`;
  }

  solveForPartTwo(input: string): string {
    const rgx =
      /^Sensor at x=([-0-9]+), y=([-0-9]+): closest beacon is at x=([-0-9]+), y=([-0-9]+)$/;
    const data = input
      .split("\n")
      .map((l) => {
        const [xS, yS, xB, yB] = l
          .replace(/Sensor at x=| y=| closest beacon is at x=/g, "")
          .replace(":", ",")
          .split(",");
        return [xS, yS, xB, yB];
      })
      .map((v) => v.map((e) => +e));
    const dataWithD = data.map(([xS, yS, xB, yB]) => [
      xS,
      yS,
      xB,
      yB,
      d(xS, yS, xB, yB),
    ]);
    const rangeDown = 0;
    const rangeUp = 4000000;
    console.log(new Date().toISOString());
    let idxFail;
    let rangeFail;
    for (let i = 0; i <= rangeUp; i++) {
      const acc: [number, number][] = [];
      const intervals = dataWithD
        .filter((d) => {
          const dist = d[4];
          const dY = Math.abs(d[1] - i);
          return dY <= dist;
        })
        .map((d) => {
          const offset = Math.abs(d[4] - Math.abs(d[1] - i));
          const x = d[0];
          const min = x - offset;
          const max = x + offset;
          return [Math.max(rangeDown, min), Math.min(max, rangeUp)];
        })
        .sort(([a, b], [aa, bb]) => a - aa);
      intervals.forEach(([min, max]) => {
        const lastIdx = acc.length - 1;
        if (acc.length && acc[lastIdx][1] >= min - 1) {
          acc[lastIdx][1] = Math.max(acc[lastIdx][1], max);
        } else {
          acc.push([min, max]);
        }
      });
      if (acc.length > 1) {
        idxFail = i;
        rangeFail = acc;
        break;
      }
    }
    console.log(new Date().toISOString());

    return `${((rangeFail?.[0]?.[1] || -1) + 1) * 4000000 + (idxFail || 0)}`;
  }
}

export default new Day15();
