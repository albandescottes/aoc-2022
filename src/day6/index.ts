import { Day } from "../day";

class Day6 extends Day {
  constructor() {
    super(6);
  }

  private getIndex(input: string[], chunk: number): number {
    let start = 0;
    let end = chunk;
    while (end < input.length) {
      const sample = input.slice(start, end);
      const uniq = [...new Set(sample)];
      if (uniq.length === chunk) {
        break;
      }
      start++;
      end++;
    }
    return end;
  }

  solveForPartOne(input: string): string {
    const data = input.split("");
    return `${this.getIndex(data, 4)}`;
  }

  solveForPartTwo(input: string): string {
    const data = input.split("");
    return `${this.getIndex(data, 14)}`;
  }
}

export default new Day6();
