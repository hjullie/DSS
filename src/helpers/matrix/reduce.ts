import {sumByAxis} from "./sumByAxis";
import {divideByAxis} from "./divideByAxis";
import {MatrixAxis} from "../../constants";

export function reduce(matrix: number[][]): number[] {
    const sumColumnMatrix = sumByAxis(matrix, MatrixAxis.Column)
    const divColumnMatrix = divideByAxis(matrix, sumColumnMatrix.map((value) => value * matrix[0].length), MatrixAxis.Column)
    return sumByAxis(divColumnMatrix, MatrixAxis.Row);
}
