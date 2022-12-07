import { Day } from "../day";

interface Dir {
  i: number;
  n: string;
  p?: number;
  f: number[];
  d: number[];
  s?: number;
}

interface File {
  i: number;
  n: string;
  s: number;
}

type mapDirs = { [k: number]: Dir };
type mapFiles = { [k: number]: File };

class Day7 extends Day {
  uuidv1 = 1;
  constructor() {
    super(7);
  }

  private initEmptyDir(i: number, n: string, p: number): Dir {
    return { i, n, p, f: [], d: [] };
  }

  private initNewFile(i: number, n: string, s: number): File {
    return { i, n, s };
  }

  private parseData(data: string[]): { dirs: mapDirs; files: mapFiles } {
    const dirs: mapDirs = { 0: { i: 0, n: "/", f: [], d: [] } };
    const files: mapFiles = {};
    let curr = dirs[0];
    let mode: "cd" | "ls";
    data.forEach((s) => {
      const split = s.split(" ");
      // parse si $ ls/cd alors on change de mode
      if (split[1] == "cd") {
        mode = "cd";
        const path = split[2];
        if (path === ".." && curr.p !== undefined) {
          curr = dirs[curr.p];
        } else if (path !== "..") {
          const idx = dirs[curr.i].d.find((i) => dirs[i]?.n === path);
          if (idx !== undefined) curr = dirs[idx];
        }
        // console.log('curr', curr.n, curr.d);
      } else if (split[1] == "ls") mode = "ls";
      // si pas ls/cd et mode ls
      else if (mode === "ls") {
        const [type, name] = split;
        // console.log("trying to add", type, name, "in", curr.n);
        if (type === "dir") {
          const idx = dirs[curr.i].d.find((i) => dirs[i]?.n === name);
          if (idx === undefined) {
            const nd = this.initEmptyDir(this.uuidv1++, name, curr.i);
            dirs[curr.i] = { ...dirs[curr.i], d: [...dirs[curr.i].d, nd.i] };
            dirs[nd.i] = nd;
          }
        } else {
          const idx = dirs[curr.i].f.find((i) => files[i]?.n === name);
          if (idx === undefined) {
            const nd = this.initNewFile(this.uuidv1++, name, +type);
            dirs[curr.i] = { ...dirs[curr.i], f: [...dirs[curr.i].f, nd.i] };
            files[nd.i] = nd;
          }
        }
      }
    });

    return {
      dirs,
      files,
    };
  }

  private computeSize(dirs: mapDirs, files: mapFiles, idx: number): number {
    const curr = dirs[idx];
    const totFiles = curr.f.map((i) => files[i].s).reduce((a, b) => a + b, 0);
    const totDirs = curr.d.map((i) => {
      return this.computeSize(dirs, files, i);
    }).reduce((a, b) => a + b, 0);
    return totFiles + totDirs;
  }

  solveForPartOne(input: string): string {
    const data = input.split("\n");
    const { dirs, files } = this.parseData(data);
    Object.keys(dirs).forEach((k) => {
        dirs[+k] = {...dirs[+k], s: this.computeSize(dirs, files, +k)}});
    const lighweightDirs = Object.keys(dirs)
    .map(k => dirs[+k].s || 0)
    .filter(s => s < 100000);
    return `${lighweightDirs.reduce((a,b) => a+b)}`;
  }

  solveForPartTwo(input: string): string {
    const data = input.split("\n");
    const { dirs, files } = this.parseData(data);
    Object.keys(dirs).forEach((k) => {
        dirs[+k] = {...dirs[+k], s: this.computeSize(dirs, files, +k)}});

    const total = dirs[0].s || 0;
    const dirsByWeigth = Object.keys(dirs)
    .map(k => ({ dir: +k, w: (dirs[+k].s || 0)}))
    .sort((a,b) => b.w - a.w);
    const firstNotEnough = dirsByWeigth
    .findIndex((v) => ((30000000 - (70000000 - total)) - v.w) > 0)
    return `${dirsByWeigth[firstNotEnough-1].w}`
  }
}

export default new Day7();
