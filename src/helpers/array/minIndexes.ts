export function minIndexes(arr: number[]): number[] {
    let min = arr[0];
    let minIndexes: number[] = [];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
            minIndexes = [i];
        } else if (arr[i] === min) {
            minIndexes.push(i);
        }
    }

    return minIndexes;
}
