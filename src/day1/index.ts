import { Day } from "../day";

class Day1 extends Day {

    constructor(){
        super(1);
    }

    extractDatasAndSort(input: string): number[] {
        const data = input.split('\n');
        return data.reduce((acc, value) => {
            if (value !== "") {
                acc[acc.length - 1] = (acc.at(-1) || 0) + (+value); 
                return acc;
            } 
            return [...acc, 0];
        }, [0] as number[])
        .sort((a,b) => b-a);
    }

    solveForPartOne(input: string): string {
        const [max, ..._] = this.extractDatasAndSort(input);
        return `${max}`;
    }

    solveForPartTwo(input: string): string {
        const [one,two,three, ..._] = this.extractDatasAndSort(input);
        return `${one+two+three}`;
    }
}

export default new Day1;