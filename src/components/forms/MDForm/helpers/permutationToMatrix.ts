export function permutationToMatrix(perm: number[], size: number): number[][] {
    const matrix = new Array(size).fill(0).map(_ => new Array(size).fill(0));

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            if (i === j) {
                matrix[i][j] = 0;
            } else if (i > j) {
                matrix[i][j] = -matrix[j][i];
            } else {
                const index = (2 * size - i - 1) * i / 2 + j - i - 1;

                matrix[i][j] = perm[index];
            }
        }
    }

    return matrix;
}
