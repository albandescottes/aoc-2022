import { Day } from "../day";

class Day3 extends Day {
  constructor() {
    super(3);
  }

  solveForPartOne(input: string): string {
    const down = "a".codePointAt(0) as number;
    const upper = "A".codePointAt(0) as number;
    const data = input.split("\n");
    const dataSplit = data.map((v) => ({
      a: v.slice(0, v.length / 2),
      b: v.slice(v.length / 2),
    }));
    const dataSame = dataSplit.map((o) =>
      [...new Set(o.a.split("").filter((c) => o.b.indexOf(c) !== -1))].join("")
    );
    const dataPoint = dataSame.map((v) =>
      v.match(/^[A-Z]$/)
        ? 27 + v.charCodeAt(0) - upper
        : 1 + v.charCodeAt(0) - down
    );
    return dataPoint.reduce((a, b) => a + b).toString();
  }

  solveForPartTwo(input: string): string {
    const down = "a".codePointAt(0) as number;
    const upper = "A".codePointAt(0) as number;
    const data = input.split("\n");
    const chunkSize = 3;
    const dataSplit = [];
    for (let i = 0; i < data.length; i += chunkSize) {
      dataSplit.push(data.slice(i, i + chunkSize));
    }
    const dataSame = dataSplit
      .map((chunk) => [
        ...new Set(
          chunk
            .map((c) => c.split(""))
            .reduce((p, c) => p.filter((e) => c.includes(e)))
        ),
      ])
      .flatMap((a) => a);
    const dataPoint = dataSame.map((v) =>
      v.match(/^[A-Z]$/)
        ? 27 + v.charCodeAt(0) - upper
        : 1 + v.charCodeAt(0) - down
    );
    return dataPoint.reduce((a, b) => a + b).toString();
  }
}

export default new Day3();
