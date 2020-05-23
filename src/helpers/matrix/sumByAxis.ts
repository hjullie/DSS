import {MatrixAxis} from "../../constants";
import {sum} from "../array/sum";
import nj from "numjs"

export function sumByAxis(matrix: number[][], axis: MatrixAxis): number[] {
    const prepMatrix = axis === MatrixAxis.Column ? nj.array(matrix).T.tolist() : matrix;

    return prepMatrix.map((row) => sum(row));
}
