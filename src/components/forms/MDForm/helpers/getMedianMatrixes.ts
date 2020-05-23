import {permutations} from "../../../../helpers/permutations";
import {minIndexes} from "../../../../helpers/array/minIndexes";
import {permutationToMatrix} from "./permutationToMatrix";

export function getMedianMatrixes(matrixes: number[][][], size: number) {
    return new Promise<{matrix: number[][]; coef: number[]}[]>((resolve) => {
        const permutationsList: number[][] = permutations([-1, 1], size * (size - 1) / 2);

        const coefficientsList = permutationsList.map((perm) => {
            return matrixes.map((matrix) => {
                const vector: number[] = [];

                for (let i = 0; i < size - 1; i++) {
                    for (let j = i + 1; j < size; j++) {
                        vector.push(matrix[i][j]);
                    }
                }

                return perm.reduce((acc, val, index) => {
                    return acc + Math.abs(val - vector[index]);
                }, 0);
            })
        });

        const medianMatrixIndexes = minIndexes(coefficientsList.map((coefList) => {
            return Math.sqrt(coefList.reduce((acc, item) => acc + item * item, 0));
        }))

        resolve(medianMatrixIndexes.map((index) => {
            return {matrix: permutationToMatrix(permutationsList[index], size), coef: coefficientsList[index]};
        }));
    })
}
