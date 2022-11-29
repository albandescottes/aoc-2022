import { Day } from "../day";

class Day1 extends Day {

    constructor(){
        super(1);
    }

    solveForPartOne(input: string): string {
        const data = input.split('\n');
        return data.filter((v,i,arr) => i !== 0 ? arr[i-1] < v : false).length.toString();
    }

    solveForPartTwo(input: string): string {
        const data = input.split('\n');
        const dataV2 = data.map((v,i,arr) => {
            const prev = arr[i-1] ?? 0;
            const next = arr[i+1] ?? 0;
            return v+prev+next;
        });
        return dataV2.slice(0,dataV2.length-2).filter((v,i,arr) => i !== 0 ? arr[i-1] < v : false).length.toString();
    }
}

export default new Day1;