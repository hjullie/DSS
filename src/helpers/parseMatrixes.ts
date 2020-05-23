import {IField} from "../types";

export function parseMatrixes(matrixes: IField[][][]) {
    return matrixes.map((matrix) => {
        return matrix.map((row) => {
            return row.map(({value}) => {
                const match = value.match(/1\/([1-9])/);

                return match ? 1 / parseInt(match[1]) : parseInt(value, 10);
            })
        })
    })
}
