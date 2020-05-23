import React from 'react';

import {Button, Grid, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {MatrixInput} from "../../MatrixInput/MatrixInput";
import {parseMatrixes} from "../../../helpers/parseMatrixes";
import {IField} from "../../../types";
import {fieldsValidators} from "../../../validators/fieldsValidators";
import {deepCopy} from "../../../helpers/object/deepCopy";

import styles from "./FormSteps.module.css";
import commonStyles from "../../../common.module.css";
import {FORM_FIELDS} from "../../../constants";


const EMPTY_VALUE = '';

interface IFormStep1Props {
    criteria: string[];
    alternatives: string[];
    onSubmit: (criteriaMatrix: number[][], alternativesMatrixes: number[][][]) => void;
}

export const FormStep2: React.FC<IFormStep1Props> = ({criteria, alternatives, onSubmit}) => {
    const [criteriaMatrix, setCriteriaMatrix] = React.useState<IField[][]>(() => {
        return criteria.map((_, i) => {
            return criteria.map((_, j) => {
                return {
                    value: i === j ? '1' : EMPTY_VALUE,
                    error: '',
                };
            })
        });
    });

    const [alternativesMatrixes, setAlternativesMatrixes] = React.useState<IField[][][]>(() => {
        return criteria.map(() => {
            return alternatives.map((_, i) => {
                return alternatives.map((_, j) => {
                    return {
                        value: i === j ? '1' : EMPTY_VALUE,
                        error: '',
                    };
                })
            });
        })

    });

    const onCriteriaMatrixItemChange = React.useCallback((value: string, {i, j}: {i: number; j: number}) => {
        const matches = value.match(/^([1-9])$|^1\/([2-9])$/);
        const newData = [...criteriaMatrix];

        if (value.match(/^[1-9/]*$/)) {
            newData[i][j] = {
                value,
                error: !matches ? 'error' : '',
            };

            let oppositeValue = '';

            if (matches) {
                if (matches[2]) {
                    oppositeValue = `${matches[2]}`;
                } else if (matches[1] === '1') {
                    oppositeValue = '1';
                } else {
                    oppositeValue = `1/${matches[1]}`;
                }
            }

            newData[j][i] = {
                value: oppositeValue,
                error: '',
            };

            setCriteriaMatrix(newData);
        }
    }, [criteriaMatrix])

    const onAlternativesMatrixItemChange = React.useCallback((index) => {
        return (value: string, {i, j}: {i: number; j: number}) => {
            const matches = value.match(/^([1-9])$|^1\/([2-9])$/);
            const newData = [...alternativesMatrixes[index]];

            if (value.match(/^[1-9/]*$/)) {
                newData[i][j] = {
                    value,
                    error: !matches ? 'error' : '',
                };

                let oppositeValue = '';

                if (matches) {
                    if (matches[2]) {
                        oppositeValue = `${matches[2]}`;
                    } else if (matches[1] === '1') {
                        oppositeValue = '1';
                    } else {
                        oppositeValue = `1/${matches[1]}`;
                    }
                }

                newData[j][i] = {
                    value: oppositeValue,
                    error: '',
                };
            }

            const newAlternativesMatrixes = [...alternativesMatrixes];
            newAlternativesMatrixes[index] = newData;
            setAlternativesMatrixes(newAlternativesMatrixes)
        }
    }, [alternativesMatrixes]);

    const validate = React.useCallback(() => {
        let isValid = true;
        const newCriteriaMatrix = [...criteriaMatrix];

        newCriteriaMatrix.forEach((row, i) => {
            row.forEach(({value}, j) => {
                const validators = fieldsValidators[FORM_FIELDS.CRITERIA_MATRIX];
                let error = '';

                for (let validator of validators) {
                    const currError = validator(value);

                    if (currError) {
                        error = currError;
                        break;
                    }
                }

                if (error) {
                    newCriteriaMatrix[i][j].error = error;

                    isValid = false;
                }
            });
        });

        setCriteriaMatrix(newCriteriaMatrix);

        const newAlternativesMatrixes = deepCopy<IField[][][]>(alternativesMatrixes);

        newAlternativesMatrixes.forEach((matrix) => {
            matrix.forEach((row) => {
                row.forEach(({value}, index) => {
                    const validators = fieldsValidators[FORM_FIELDS.ALTERNATIVES_MATRIXES];
                    let error = '';

                    for (let validator of validators) {
                        const currError = validator(value);

                        if (currError) {
                            error = currError;
                            break;
                        }
                    }

                    if (error) {
                        row[index].error = error;

                        isValid = false;
                    }
                });
            });
        })

        setAlternativesMatrixes(newAlternativesMatrixes);

        return isValid;
    }, [alternativesMatrixes, criteriaMatrix]);

    const onStepSubmit = React.useCallback(() => {
        const isValid = validate();

        if (isValid) {
            onSubmit(parseMatrixes([criteriaMatrix])[0], parseMatrixes(alternativesMatrixes));
        }
    }, [alternativesMatrixes, criteriaMatrix, onSubmit, validate]);

    return (
        <Grid container justify={'center'}>
            <div className={commonStyles.title}>
                Попарно сравните критерии и альтернативы между собой, указав степень важности согласно таблице
            </div>

            <Table className={styles.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Уровни важности</TableCell>
                        <TableCell>Количественное значение</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Равная важность</TableCell>
                        <TableCell>1</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Немного лучше (хуже)</TableCell>
                        <TableCell>3 (1/3)</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Лучше (хуже)</TableCell>
                        <TableCell>5 (1/5)</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Значительно лучше (хуже)</TableCell>
                        <TableCell> 7 (1/7)</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Принципиально лучше (хуже)</TableCell>
                        <TableCell>9 (1/9)</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <div className={commonStyles.title}>
                Критерии
            </div>

            <MatrixInput className={styles.matrix} onFieldChange={onCriteriaMatrixItemChange} data={criteriaMatrix} labels={criteria}/>

            <div className={commonStyles.title}>
                Альтернативы
            </div>

            {criteria.map((cr, index) => {
                return (
                    <MatrixInput key={index} className={styles.matrix}
                                 onFieldChange={onAlternativesMatrixItemChange(index)} data={alternativesMatrixes[index]}
                                 title={cr} labels={alternatives}/>
                );
            })}

            <Grid className={commonStyles.submit} justify={'flex-end'} container>
                <Button size="large" onClick={onStepSubmit} variant="contained" color="primary">
                    Далее
                </Button>
            </Grid>
        </Grid>
    );
};
