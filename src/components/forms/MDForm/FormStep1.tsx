import React from 'react';

import {Button, Grid} from "@material-ui/core";
import {ListInput} from "../../ListInput/ListInput";
import {IField} from "../../../types";
import {fieldsValidators} from "../../../validators/fieldsValidators";

import styles from "./FormSteps.module.css";
import commonStyles from "../../../common.module.css";
import {FORM_FIELDS} from "../../../constants";

const EMPTY_VALUE = '';
const INITIAL_COUNT = 2;

interface IFormStep1Props {
    onSubmit: (criteria: string[], experts: string[]) => void;
}

export const FormStep1: React.FC<IFormStep1Props> = ({onSubmit}) => {
    const [alternatives, setAlternatives] = React.useState<IField[]>(new Array(INITIAL_COUNT).fill({
        value: EMPTY_VALUE,
        error: ''
    }));
    const [experts, setExperts] = React.useState<IField[]>(new Array(INITIAL_COUNT).fill({
        value: EMPTY_VALUE,
        error: ''
    }));

    const validate = React.useCallback(() => {
        let isValid = true;
        const newCriteria = [...alternatives];

        newCriteria.forEach(({value}, index) => {
            const validators = fieldsValidators[FORM_FIELDS.EXPERTS];
            let error = '';

            for (let validator of validators) {
                const currError = validator(value);

                if (currError) {
                    error = currError;
                    break;
                }
            }

            if (error) {
                newCriteria[index].error = error;

                isValid = false;
            }
        });

        setAlternatives(newCriteria);

        const newExperts = [...experts];

        newExperts.forEach(({value}, index) => {
            const validators = fieldsValidators[FORM_FIELDS.ALTERNATIVES];
            let error = '';

            for (let validator of validators) {
                const currError = validator(value);

                if (currError) {
                    error = currError;
                    break;
                }
            }

            if (error) {
                newExperts[index].error = error;

                isValid = false;
            }
        });

        setExperts(newExperts);

        return isValid;
    }, [alternatives, experts]);

    const onStepSubmit = React.useCallback(() => {
        const isValid = validate();

        if (isValid) {
            const criteriaValues = alternatives.map(({value}) => value);
            const expertsValues = experts.map(({value}) => value);

            onSubmit(criteriaValues, expertsValues);
        }
    }, [experts, alternatives, onSubmit, validate]);

    return (
        <Grid container>
            <div className={commonStyles.title}>
                Введите названия альтернатив и экспертов
            </div>

            <Grid justify={'space-between'} container>
                <Grid container item xs={5}>
                    <ListInput name={FORM_FIELDS.ALTERNATIVES} data={alternatives} onChange={setAlternatives}
                               placeholderPrefix={'Альтернатива'}
                               maxCount={7}
                    />
                </Grid>

                <Grid container item xs={5}>
                    <ListInput name={FORM_FIELDS.EXPERTS} data={experts} onChange={setExperts}
                               placeholderPrefix={'Эксперт'}/>
                </Grid>
            </Grid>

            <Grid className={commonStyles.submit} justify={'flex-end'} container>
                <Button size="large" onClick={onStepSubmit} variant="contained" color="primary">
                    Далее
                </Button>
            </Grid>
        </Grid>
    );
};
