import { Day } from "../day";

const order = Array(26)
  .fill("a".codePointAt(0))
  .map((c, i) => String.fromCodePoint(c + i));

type P = [number, number];
type Pos = [P, number];

class Day12 extends Day {
  constructor() {
    super(12);
  }

  solveForPartOne(input: string): string {
    let S: P;
    let E: P;
    const hill = input.split("\n").map((l, i) => {
      const xS = l.indexOf("S");
      const xE = l.indexOf("E");
      if (xS !== -1) S = [i, xS];
      if (xE !== -1) E = [i, xE];
      return l.replace("S", "a").replace("E", "z").split("");
    });

    if (S! === undefined || E! === undefined) {
      return "fail";
    }
    S = S!;
    E = E!;
    const MAX_X = hill[0].length;
    const MAX_Y = hill.length;

    const pToS = (p: P) => `${p[0]} ${p[1]}`;

    const isEnd = ([y, x]: P) => y === E[0] && x === E[1];

    const getNei = ([y, x]: P): P[] =>
      [
        [y, x - 1],
        [y, x + 1],
        [y - 1, x],
        [y + 1, x],
      ].filter(
        ([yy, xx]) => xx >= 0 && xx < MAX_X && yy >= 0 && yy < MAX_Y
      ) as P[];

    const visited = new Set(pToS(S));
    let min;
    const arr: Pos[] = [[S, 1]];
    while (arr.length) {
      const [p, cnt] = arr.shift()!;
      const nei = getNei(p);
      const [y, x] = p;
      if (isEnd(p)) {
        min = cnt - 1;
        break;
      }
      nei
        .filter(
          ([yN, xN]) =>
            order.indexOf(hill[yN][xN]) <= order.indexOf(hill[y][x]) + 1
        )
        .filter((ptv) => !visited.has(pToS(ptv)))
        .forEach((ptv) => {
          visited.add(pToS(ptv));
          arr.push([ptv, cnt + 1]);
        });
    }
    return `${min}`;
  }

  solveForPartTwo(input: string): string {
    let E: P;
    const hill = input.split("\n").map((l, i) => {
      const xE = l.indexOf("E");
      if (xE !== -1) E = [i, xE];
      return l.replace("S", "a").replace("E", "z").split("");
    });

    const starts: P[] = hill
      .map((l, y) =>
        l.map((c, x) => [c, [y, x]] as [string, P]).filter((v) => v[0] === "a")
      )
      .flatMap((v) => v)
      .map((v) => v[1]);
    if (E! === undefined) {
      return "fail";
    }
    E = E!;
    const MAX_X = hill[0].length;
    const MAX_Y = hill.length;

    const pToS = (p: P) => `${p[0]} ${p[1]}`;

    const isEnd = ([y, x]: P) => y === E[0] && x === E[1];

    const getNei = ([y, x]: P): P[] =>
      [
        [y, x - 1],
        [y, x + 1],
        [y - 1, x],
        [y + 1, x],
      ].filter(
        ([yy, xx]) => xx >= 0 && xx < MAX_X && yy >= 0 && yy < MAX_Y
      ) as P[];

    const min: any = starts
      .map((S) => {
        const visited = new Set(pToS(S));
        let localMin: number = Infinity;
        const arr: Pos[] = [[S, 1]];
        while (arr.length) {
          const [p, cnt] = arr.shift()!;
          const nei = getNei(p);
          const [y, x] = p;
          if (isEnd(p)) {
            localMin = cnt - 1;
            break;
          }
          nei
            .filter(
              ([yN, xN]) =>
                order.indexOf(hill[yN][xN]) <= order.indexOf(hill[y][x]) + 1
            )
            .filter((ptv) => !visited.has(pToS(ptv)))
            .forEach((ptv) => {
              visited.add(pToS(ptv));
              arr.push([ptv, cnt + 1]);
            });
        }
        return localMin;
      })
      .sort((a, b) => a - b)
      .at(0);

    return `${+min}`;
  }
}

export default new Day12();
