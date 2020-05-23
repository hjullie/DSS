export function transpose(matrix: number[][]): number[][] {
    const newMatrix: number[][] = [];

    matrix.forEach((row, i) => {
        if (i === 0) {
            row.forEach(() => newMatrix.push([]));
        }

        row.forEach((item, j) => {
            newMatrix[j].push(item);
        })
    })

    return newMatrix;
}

// [[1, 2]] -> [[1], [2]]
