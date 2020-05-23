export function multiply (matrix1: number[][], matrix2: number[][]) {
    const result = new Array(matrix1.length).fill(0).map(_ => new Array(matrix2[0].length).fill(0));

    return result.map((row, i) => {
        return row.map((_, j) => {
            return matrix1[i].reduce((sum, elm, k) => sum + (elm * matrix2[k][j]) ,0)
        })
    })
}
