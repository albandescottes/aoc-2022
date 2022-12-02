import { Day } from "../day";

type abc = "A" | "B" | "C";
type xyz = "X" | "Y" | "Z";
type union = abc | xyz;
type all = union | "_";

type Scores = {
  [key in xyz]: number;
};

type Games = {
  [k in union]: all[];
};

// A - X rock = 1
// B - Y paper = 2
// C - Z scissors = 3

class Day2 extends Day {
  handScoresOne: Scores = {
    X: 1,
    Y: 2,
    Z: 3,
  };
  handScoresTwo: Scores = {
    X: 0,
    Y: 3,
    Z: 6,
  };
  games: Games = {
    // for part one
    X: ["B", "_", "_", "A", "_", "_", "C"],
    Y: ["C", "_", "_", "B", "_", "_", "A"],
    Z: ["A", "_", "_", "C", "_", "_", "B"],
    // for part two
    A: ["_", "Y", "Z", "X"],
    B: ["_", "X", "Y", "Z"],
    C: ["_", "Z", "X", "Y"],
  };
  constructor() {
    super(2);
  }

  extractData(input: string): { l: abc; r: xyz }[] {
    return input
      .split("\n")
      .map((s) => s.split(" "))
      .map((v) => ({ l: v[0] as abc, r: v[1] as xyz }));
  }

  getGameResult(key: union, val: union) {
    return this.games[key].indexOf(val);
  }

  solveForPartOne(input: string): string {
    const datas = this.extractData(input);
    const res = datas
      .map((d) => this.handScoresOne[d.r] + this.getGameResult(d.r, d.l))
      .reduce((a, b) => a + b);
    return `${res}`;
  }

  solveForPartTwo(input: string): string {
    const datas = this.extractData(input);
    const res = datas
      .map((d) => this.handScoresTwo[d.r] + this.getGameResult(d.l, d.r))
      .reduce((a, b) => a + b);
    return `${res}`;
  }
}

export default new Day2();
