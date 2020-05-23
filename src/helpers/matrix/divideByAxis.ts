import nj from "numjs";
import {MatrixAxis} from "../../constants";

export function divideByAxis(matrix: number[][], divider: number[], axis: MatrixAxis): number[][] {
    const prepMatrix = axis === MatrixAxis.Column ? nj.array(matrix).T.tolist() : matrix;
    const resultMatrix = prepMatrix.map((row, index) => row.map((item) => item / divider[index]));

    return axis === MatrixAxis.Column ? nj.array(resultMatrix).T.tolist() : resultMatrix;
}
