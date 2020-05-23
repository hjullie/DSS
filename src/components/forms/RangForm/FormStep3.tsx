import React from 'react';

import {Matrix} from "../../Matrix/Matrix";

import styles from "./FormSteps.module.css";
import commonStyles from "../../../common.module.css";
import {map} from "../../../helpers/matrix/map";
import {sumByAxis} from "../../../helpers/matrix/sumByAxis";
import {MatrixAxis} from "../../../constants";
import {sum} from "../../../helpers/array/sum";
import {sortByArray} from "../../../helpers/array/sortByArray";

interface IFormStep3Props {
    experts: string[];
    alternatives: string[];
    matrixData: number[][];
}

export const FormStep3: React.FC<IFormStep3Props> = ({experts, alternatives, matrixData}) => {
    const columnSums = sumByAxis(matrixData, MatrixAxis.Column);
    const fullSum = sum(columnSums);
    const weights = columnSums.map((value) => value / fullSum);

    const sortedAlternatives = sortByArray(alternatives, weights);

    return (
        <div className={styles.container}>
            <div className={commonStyles.title}>
                Веса альтернатив
            </div>

            <span className={styles.info}>
                {weights.map((w, weightIndex) => {
                    return (
                        <span key={weightIndex}>
                            {weightIndex !== 0 ? ',' : ''} <b>"{alternatives[weightIndex]}"</b> = {w.toFixed(2)}
                        </span>
                    );
                })}
            </span>

            <div className={commonStyles.title}>
                Ранжирование альтернатив
            </div>

            <div>
                {sortedAlternatives.map((alternative, index) => {
                    return (
                        <b>
                            {index === 0 ? alternative : `, ${alternative}`}
                        </b>
                    );
                })}
            </div>
        </div>
    );
};
