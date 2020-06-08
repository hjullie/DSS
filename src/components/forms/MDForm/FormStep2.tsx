import React from 'react';

import {Button, Grid, Tooltip} from "@material-ui/core";
import {MatrixInput} from "../../MatrixInput/MatrixInput";
import {parseMatrixes} from "../../../helpers/parseMatrixes";
import {IField} from "../../../types";
import {fieldsValidators} from "../../../validators/fieldsValidators";
import {deepCopy} from "../../../helpers/object/deepCopy";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import styles from "./FormSteps.module.css";
import commonStyles from "../../../common.module.css";
import {FORM_FIELDS} from "../../../constants";

const EMPTY_VALUE = '';

interface IFormStep1Props {
    alternatives: string[];
    experts: string[];
    onSubmit: (criteriaMatrixes: number[][][]) => void;
}

export const FormStep2: React.FC<IFormStep1Props> = ({alternatives, experts, onSubmit}) => {
    const [alternativesMatrixes, setAlternativesMatrixes] = React.useState<IField[][][]>(() => {
        return experts.map(() => {
            return alternatives.map((_, i) => {
                return alternatives.map((_, j) => {
                    return {
                        value: i === j ? '0' : EMPTY_VALUE,
                        error: '',
                    };
                })
            });
        })

    });

    const onAlternativesMatrixItemChange = React.useCallback((index) => {
        return (value: string, {i, j}: { i: number; j: number }) => {
            const matches = value.match(/^1$|^-1$/);
            const newData = [...alternativesMatrixes[index]];

            if (value.match(/^[-1]*$/)) {
                newData[i][j] = {
                    value,
                    error: !matches ? 'error' : '',
                };

                let oppositeValue = '';

                if (matches) {
                    if (matches[0] === '1') {
                        oppositeValue = '-1';
                    } else {
                        oppositeValue = '1';
                    }
                }

                newData[j][i] = {
                    value: oppositeValue,
                    error: '',
                };

                const newAlternativesMatrixes = [...alternativesMatrixes];
                newAlternativesMatrixes[index] = newData;
                setAlternativesMatrixes(newAlternativesMatrixes)
            }
        }
    }, [alternativesMatrixes]);

    const validate = React.useCallback(() => {
        let isValid = true;

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
    }, [alternativesMatrixes]);

    const onStepSubmit = React.useCallback(() => {
        const isValid = validate();

        if (isValid) {
            onSubmit(parseMatrixes(alternativesMatrixes));
        }
    }, [alternativesMatrixes, onSubmit, validate]);

    return (
        <Grid container justify={'center'}>
            <div className={commonStyles.title}>
                Заполните матрицы попарного сравнения
                <Tooltip arrow
                         title={
                            <span className={commonStyles.tooltipText}>Укажите значение 1, если альтернатива лучше, и значение -1, если хуже</span>
                         }
                >
                    <HelpOutlineIcon className={styles.icon} />
                </Tooltip>
            </div>

            {experts.map((expert, index) => {
                return (
                    <MatrixInput key={index} className={styles.matrix}
                                 onFieldChange={onAlternativesMatrixItemChange(index)}
                                 data={alternativesMatrixes[index]}
                                 title={expert} labels={alternatives}/>
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
