import { Day } from "../day";

interface Dir {
  i: number;
  n: string;
  p?: number;
  fileSize: number;
  d: number[];
  s?: number;
}

type mapDirs = { [k: number]: Dir };

// après test, il n'y a jamais deux fois ls dans le même dir
// donc on peut ommetre la vérificaiton avant création
// et ne pas avoir un mapping de fichiers
class Day7 extends Day {
  uuidv1 = 1;
  constructor() {
    super(7);
  }

  private initEmptyDir(i: number, n: string, p: number): Dir {
    return { i, n, p, fileSize: 0, d: [] };
  }

  private parseData(data: string[]): mapDirs {
    const dirs: mapDirs = { 0: { i: 0, n: "/", fileSize: 0, d: [] } };
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
      } else if (split[1] == "ls") mode = "ls";
      else if (mode === "ls") {
        const [type, name] = split;
        if (type === "dir") {
          const nd = this.initEmptyDir(this.uuidv1++, name, curr.i);
          dirs[curr.i] = { ...dirs[curr.i], d: [...dirs[curr.i].d, nd.i] };
          dirs[nd.i] = nd;
        } else {
          const fileSize = dirs[curr.i].fileSize + +type;
          dirs[curr.i] = { ...dirs[curr.i], fileSize };
        }
      }
    });
    Object.keys(dirs).forEach((k) => {
      dirs[+k] = { ...dirs[+k], s: this.computeSize(dirs, +k) };
    });
    return dirs;
  }

  private computeSize(dirs: mapDirs, idx: number): number {
    const curr = dirs[idx];
    const totDirs = curr.d
      .map((i) => {
        return this.computeSize(dirs, i);
      })
      .reduce((a, b) => a + b, 0);
    return curr.fileSize + totDirs;
  }

  solveForPartOne(input: string): string {
    const data = input.split("\n");
    const dirs = this.parseData(data);
    const tH = 1e5;
    const sumSubTH = Object.keys(dirs)
      .map((k) => dirs[+k].s || 0)
      .filter((s) => s < tH)
      .reduce((a, b) => a + b);
    return `${sumSubTH}`;
  }

  solveForPartTwo(input: string): string {
    const data = input.split("\n");
    const dirs = this.parseData(data);
    const total = dirs[0].s || 0;
    const dirsByWeigth = Object.keys(dirs)
      .map((k) => dirs[+k].s || 0)
      .sort((a, b) => b - a);
    const firstNotEnough = dirsByWeigth.findIndex(
      (v) => total - 4e7 - v > 0
    );
    return `${dirsByWeigth[firstNotEnough - 1]}`;
  }
}

export default new Day7();
