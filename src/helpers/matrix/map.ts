export function map<T = number>(matrix: T[][], fn: (value: T, i: number, j: number) => T) {
    return matrix.map((row, i) => {
        return row.map((value, j) => {
            return fn(value, i, j);
        })
    })
}
