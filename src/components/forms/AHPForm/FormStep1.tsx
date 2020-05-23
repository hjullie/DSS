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
    onSubmit: (criteria: string[], alternatives: string[]) => void;
}

export const FormStep1: React.FC<IFormStep1Props> = ({onSubmit}) => {
    const [criteria, setCriteria] = React.useState<IField[]>(new Array(INITIAL_COUNT).fill({
        value: EMPTY_VALUE,
        error: ''
    }));
    const [alternatives, setAlternatives] = React.useState<IField[]>(new Array(INITIAL_COUNT).fill({
        value: EMPTY_VALUE,
        error: ''
    }));

    const validate = React.useCallback(() => {
        let isValid = true;
        const newCriteria = [...criteria];

        newCriteria.forEach(({value}, index) => {
            const validators = fieldsValidators[FORM_FIELDS.CRITERIA];
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

        setCriteria(newCriteria);

        const newAlternatives = [...alternatives];

        newAlternatives.forEach(({value}, index) => {
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
                newAlternatives[index].error = error;

                isValid = false;
            }
        });

        setAlternatives(newAlternatives);

        return isValid;
    }, [criteria, alternatives]);

    const onStepSubmit = React.useCallback(() => {
        const isValid = validate();

        if (isValid) {
            const criteriaValues = criteria.map(({value}) => value);
            const alternativesValues = alternatives.map(({value}) => value);

            onSubmit(criteriaValues, alternativesValues);
        }
    }, [alternatives, criteria, onSubmit, validate]);

    return (
        <Grid container>
            <div className={commonStyles.title}>
                Введите названия критериев и альтернатив
            </div>

            <Grid justify={'space-between'} container>
                <Grid container item xs={5}>
                    <ListInput name={FORM_FIELDS.CRITERIA} data={criteria} onChange={setCriteria}
                               placeholderPrefix={'Критерий'}
                               maxCount={10}
                    />
                </Grid>

                <Grid container item xs={5}>
                    <ListInput name={FORM_FIELDS.ALTERNATIVES} data={alternatives} onChange={setAlternatives}
                               placeholderPrefix={'Альтернатива'}
                               maxCount={10}
                    />
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
