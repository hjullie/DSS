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
    onSubmit: (matrix: number[][]) => void;
}

export const FormStep2: React.FC<IFormStep1Props> = ({alternatives, experts, onSubmit}) => {
    const [matrix, setMatrix] = React.useState<IField[][]>(() => {
        return experts.map(() => {
            return alternatives.map(() => {
                return {
                    value: EMPTY_VALUE,
                    error: '',
                };
            })
        })
    });

    const onMatrixItemChange = React.useCallback((value: string, {i, j}: { i: number; j: number }) => {
        const newData = [...matrix];

        if (value.match(/^[0-9]*$/)) {
            const parsedValue = parseInt(value, 10);

            newData[i][j] = {
                value,
                error: parsedValue < 1 || parsedValue > 10 ? 'error' : '',
            };

            setMatrix(newData)
        }
    }, [matrix]);

    const validate = React.useCallback(() => {
        let isValid = true;

        const newData = deepCopy<IField[][]>(matrix);

        newData.forEach((row) => {
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

        setMatrix(newData);

        return isValid;
    }, [matrix]);

    const onStepSubmit = React.useCallback(() => {
        const isValid = validate();

        if (isValid) {
            onSubmit(parseMatrixes([matrix])[0]);
        }
    }, [matrix, onSubmit, validate]);

    return (
        <Grid container justify={'center'}>
            <div className={commonStyles.title}>
                Заполните матрицу
                <Tooltip arrow
                         title={
                             <span className={commonStyles.tooltipText}>
                                 Укажите значение от 1 до 10, наиболее важной альтернативе присваивается значение 10
                             </span>
                         }
                >
                    <HelpOutlineIcon className={styles.icon}/>
                </Tooltip>
            </div>

            <MatrixInput className={styles.matrix}
                         onFieldChange={onMatrixItemChange}
                         data={matrix}
                         labels={alternatives}
                         yLabels={experts}
            />


            <Grid className={commonStyles.submit} justify={'flex-end'} container>
                <Button size="large" onClick={onStepSubmit} variant="contained" color="primary">
                    Далее
                </Button>
            </Grid>
        </Grid>
    );
};
