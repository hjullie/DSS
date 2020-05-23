export function sortByArray<T = string>(arr: T[], valueArr: number[]) {
    return [...arr].sort((a, b) => {
        const index1 = arr.indexOf(a);
        const index2 = arr.indexOf(b);

        return valueArr[index2] - valueArr[index1];
    })
}
