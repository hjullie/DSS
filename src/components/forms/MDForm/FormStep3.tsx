import React from 'react';

import {CircularProgress} from "@material-ui/core";
import {Matrix} from "../../Matrix/Matrix";
import {getMedianMatrixes} from "./helpers/getMedianMatrixes";
import {sumByAxis} from "../../../helpers/matrix/sumByAxis";
import {MatrixAxis} from "../../../constants";

import styles from "./FormSteps.module.css";
import commonStyles from "../../../common.module.css";
import {sortByArray} from "../../../helpers/array/sortByArray";

interface IFormStep3Props {
    experts: string[];
    alternatives: string[];
    alternativesData: number[][][];
}

export const FormStep3: React.FC<IFormStep3Props> = ({experts, alternatives, alternativesData}) => {
    const [medians, setMedians] = React.useState<{ matrix: number[][]; coef: number[] }[]>();

    React.useEffect(() => {
        getMedianMatrixes(alternativesData, alternatives.length)
            .then((medians) => {
                setMedians(medians);
            })
    })

    return (
        <div className={styles.container}>
            {!medians ? (
                <CircularProgress/>
            ) : (
                <>
                    <div className={commonStyles.title}>
                        Исходные матрицы
                    </div>

                    <div className={styles.matrixes}>
                        {alternativesData.map((matrix, index) => {
                            return (
                                <Matrix key={'alternative-matrix-' + index} className={styles.matrix}
                                        title={experts[index]} labels={alternatives} data={matrix}/>
                            );
                        })}
                    </div>

                    <div className={commonStyles.title}>
                        Матрица(ы) с минимальным суммарным расстоянием до всех экспертных матриц
                    </div>

                    {medians.map(({matrix, coef}, matrixIndex) => {
                        return (
                            <div className={styles.median}>
                                <Matrix key={'median-matrix-' + matrixIndex} className={styles.matrix}
                                        labels={alternatives} data={matrix}/>

                                <span>
                                    Расстояние до экспертной матрицы
                                    {coef.map((c, coefIndex) => {
                                        return (
                                            <span key={'coef-' + matrixIndex + coefIndex}>
                                                {coefIndex !== 0 ? ',' : ''}
                                                <b> "{experts[coefIndex]}"</b> = {c * 2}
                                            </span>
                                        );
                                    })}
                                </span>

                            </div>
                        );
                    })}

                    <div className={commonStyles.title}>
                        Медиана Кемени-Снелла (ранжировка(и), наиболее точно удовлетворяющая всем экспертам)
                    </div>

                    {medians.map(({matrix}, matrixIndex) => {
                        const sums = sumByAxis(matrix, MatrixAxis.Row);

                        return (
                            <div key={matrixIndex} className={styles.median}>
                                <span>
                                    {sortByArray(alternatives, sums).map((alternative, index) => {
                                        return (
                                            <b>
                                                {index === 0 ? alternative : `, ${alternative}`}
                                            </b>
                                        );
                                    })}
                                </span>

                            </div>
                        );
                    })}
                </>
            )}
        </div>
    );
};
