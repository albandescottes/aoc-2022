import { Day } from "../day";

class Day8 extends Day {
  constructor() {
    super(8);
  }

  solveForPartOne(input: string): string {
    const data = input.split("\n").map((l) => l.split("").map((v) => +v));
    const res = data.map((r) => r.map((v) => false));
    const J = data.length;
    const I = data[0].length;
    for (let j = 0; j < J; j++) {
      for (let i = 0; i < I; i++) {
        const check = data[j][i];
        const lineX = data[j];
        const lineY = data.map((v) => v[i]);
        const beforeX = lineX.slice(0, i);
        const afterX = lineX.slice(i + 1);
        const beforeY = lineY.slice(0, j);
        const afterY = lineY.slice(j + 1);
        const isMaxBeforeX = check > Math.max(...beforeX);
        const isMaxAfterX = check > Math.max(...afterX);
        const isMaxBeforeY = check > Math.max(...beforeY);
        const isMaxAfterY = check > Math.max(...afterY);
        res[j][i] = isMaxBeforeX || isMaxAfterX || isMaxBeforeY || isMaxAfterY;
      }
    }

    const total = res
      .map((arr) => arr.filter((v) => v == true).length)
      .reduce((a, b) => a + b);
    return `${total}`;
  }

  untilFail(val: number, arr: number[]): number {
    if (arr.length == 0) return 0;
    let cnt = 1;
    let curr = arr[0];
    while (cnt < arr.length) {
      if (curr >= val) break;
      cnt++;
      curr = arr[cnt - 1];
    }
    return cnt;
  }

  solveForPartTwo(input: string): string {
    const data = input.split("\n").map((l) => l.split("").map((v) => +v));
    const res = data.map((r) => r.map((v) => 0));
    const J = data.length;
    const I = data[0].length;
    for (let j = 0; j < J; j++) {
      for (let i = 0; i < I; i++) {
        const check = data[j][i];
        const lineX = data[j];
        const lineY = data.map((v) => v[i]);
        const beforeX = lineX.slice(0, i).reverse();
        const afterX = lineX.slice(i + 1);
        const beforeY = lineY.slice(0, j).reverse();
        const afterY = lineY.slice(j + 1);
        const nbBeforeX = this.untilFail(check, beforeX);
        const nbAfterX = this.untilFail(check, afterX);
        const nbBeforeY = this.untilFail(check, beforeY);
        const nbAfterY = this.untilFail(check, afterY);
        res[j][i] = nbBeforeX * nbAfterX * nbBeforeY * nbAfterY;
      }
    }
    const total = Math.max(...res.flatMap((v) => v));
    return `${total}`;
  }
}

export default new Day8();
