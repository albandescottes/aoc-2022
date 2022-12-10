import { Day } from "../day";

class Day10 extends Day {
  constructor() {
    super(10);
  }

  flatCmds(input: string): number[] {
    return input
      .split("\n")
      .map((s) => this.extractCmd(s))
      .flatMap((v) => v);
  }
  extractCmd(s: string): number[] {
    const [cmd, v] = s.split(" ");
    return cmd === "noop" ? [0] : [0, +v];
  }

  solveForPartOne(input: string): string {
    let register = 1;
    let total = 0;
    const idxs = [20, 60, 100, 140, 180, 220];
    const cmds = this.flatCmds(input);
    cmds.forEach((cmd, idx) => {
      if (idxs.includes(idx + 1)) {
        total += (idx + 1) * register;
      }
      register += cmd;
    });
    return `${total}`;
  }

  solveForPartTwo(input: string): string {
    let register = 1;
    const lines: string[] = [];
    const cmds = this.flatCmds(input);
    const idxs = (r: number) => [r, r + 1, r + 2];
    const chunkSize = 40;
    for (let i = 0; i < 7; i++) {
      let line = "";
      const start = i * chunkSize;
      cmds.slice(start, start + chunkSize).forEach((cmd, idx) => {
        const sprite = idxs(register);
        line += sprite.includes(idx + 1) ? "#" : ".";
        // console.log("\n");
        // console.log([...lines, line].map((l) => l.padEnd(39, ".")).join("\n"));
        register += cmd;
      });
      lines.push(line);
    }

    return lines.join("\n");
  }
}

export default new Day10();
