import React, {ChangeEvent} from 'react';

import {Button, Fab, Grid, IconButton, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {IField} from "../../../types";

import styles from "./FormStep1.module.css";
import commonStyles from "../../../common.module.css";
import CloseIcon from "@material-ui/icons/Close";
import {deepCopy} from "../../../helpers/object/deepCopy";
import AddIcon from "@material-ui/icons/Add";

enum CriteriaType {
    String = 'Множество',
    Number = 'Число',
}

const EMPTY_VALUE = '';
const INITIAL_COUNT = 2;

const emptyCriteria = {
    name: {
        value: EMPTY_VALUE,
        error: '',
    },
    type: CriteriaType.String,
    lookup: [
        {
            value: EMPTY_VALUE,
            error: '',
        }
    ]
}

export interface ICriteriaData {
    name: IField;
    type: CriteriaType,
    lookup?: IField[],
}

interface IFormStep1Props {
    onSubmit: (criteria: ICriteriaData[]) => void;
}

export const FormStep1: React.FC<IFormStep1Props> = ({onSubmit}) => {
    const [criteria, setCriteria] = React.useState<ICriteriaData[]>(new Array(INITIAL_COUNT).fill(emptyCriteria));

    // const validate = React.useCallback(() => {
    //     let isValid = true;
    //     const newCriteria = [...alternatives];
    //
    //     newCriteria.forEach(({value}, index) => {
    //         const validators = fieldsValidators[FORM_FIELDS.EXPERTS];
    //         let error = '';
    //
    //         for (let validator of validators) {
    //             const currError = validator(value);
    //
    //             if (currError) {
    //                 error = currError;
    //                 break;
    //             }
    //         }
    //
    //         if (error) {
    //             newCriteria[index].error = error;
    //
    //             isValid = false;
    //         }
    //     });
    //
    //     setAlternatives(newCriteria);
    //
    //     return isValid;
    // }, [alternatives, experts]);
    //
    // const onStepSubmit = React.useCallback(() => {
    //     const isValid = validate();
    //
    //     if (isValid) {
    //         const criteriaValues = alternatives.map(({value}) => value);
    //         const expertsValues = experts.map(({value}) => value);
    //
    //         onSubmit(criteriaValues, expertsValues);
    //     }
    // }, [experts, alternatives, onSubmit, validate]);

    const onCriteriaNameChange = React.useCallback((index: number) => {
        return (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.currentTarget.value;
            const newData = deepCopy(criteria);
            const error = value ? '' : 'Это поле обязательно';

            newData[index].name = {value, error};

            setCriteria(newData);
        }
    }, [criteria]);

    const onCriteriaTypeChange = React.useCallback((index: number) => {
        return (e: ChangeEvent<{value: unknown}>) => {
            const value = e.target.value;
            const newData = deepCopy(criteria);

            newData[index].type = value as CriteriaType;

            setCriteria(newData);
        }
    }, [criteria]);

    const onCriteriaLookupChange = React.useCallback((i: number, j: number) => {
        return (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.currentTarget.value;
            const newData = deepCopy(criteria);
            const error = value ? '' : 'Это поле обязательно';

            if (newData[i].lookup) {
                // @ts-ignore
                newData[i].lookup[j] = {value, error};
            }

            setCriteria(newData);
        }
    }, [criteria]);

    const onCriteriaAdd = React.useCallback(() => {
        const newData = [...criteria, emptyCriteria];

        setCriteria(newData);
    }, [criteria]);


    const onCriteriaDelete = React.useCallback((index) => {
        return () => {
            const newData = [...criteria.slice(0, index), ...criteria.slice(index + 1)];

            setCriteria(newData);
        }
    }, [criteria]);

    const onCriteriaValueAdd = React.useCallback((index: number) => {
        return () => {
            const newData = deepCopy(criteria);

            if (newData[index].lookup) {
                // @ts-ignore
                newData[index].lookup.push({value: '', error: ''});
            }

            setCriteria(newData);
        }
    }, [criteria])

    return (
        <Grid container>
            <div className={commonStyles.title}>
                Введите критерии
            </div>

            <div className={styles.list}>
                {criteria.map(({name: {value, error}, type, lookup}, index) => {
                    return (
                        <div key={index} className={styles.criteria}>
                            {index >= INITIAL_COUNT && (
                                <CloseIcon className={styles.deleteIcon} onClick={onCriteriaDelete(index)}/>
                            )}

                            <div className={styles.field}>
                                <InputLabel className={styles.label}>Название</InputLabel>
                                <TextField placeholder={`Критерий ${index + 1}`}
                                           value={value}
                                           variant={'outlined'}
                                           onChange={onCriteriaNameChange(index)}
                                           label={error || undefined}
                                           error={Boolean(error)}
                                           fullWidth
                                />
                            </div>

                            <div className={styles.field}>
                                <InputLabel className={styles.label}>Тип</InputLabel>
                                <Select
                                    value={type}
                                    onChange={onCriteriaTypeChange(index)}
                                    fullWidth
                                >
                                    {Object.values(CriteriaType).map((type, index) => {
                                        return (
                                            <MenuItem key={index} value={type}>{type}</MenuItem>
                                        );
                                    })}
                                </Select>
                            </div>

                            {type === CriteriaType.String && (
                                <div className={styles.field}>
                                    <InputLabel className={styles.label}>Значения</InputLabel>

                                    {lookup && lookup.map(({value, error}, jndex) => {
                                        return (
                                            <TextField
                                                className={styles.value}
                                                key={jndex}
                                                placeholder={`Значение ${jndex + 1}`}
                                                value={value}
                                                variant={'outlined'}
                                                onChange={onCriteriaLookupChange(index, jndex)}
                                                label={error || undefined}
                                                error={Boolean(error)}
                                                fullWidth
                                            />
                                        );
                                    })}

                                    <IconButton className={styles.addValueButton} size="small" onClick={onCriteriaValueAdd(index)} color="default" aria-label="add">
                                        <AddIcon />
                                    </IconButton>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>


            <Grid className={commonStyles.submit} justify="space-between" container>
                <Button onClick={onCriteriaAdd} startIcon={<AddIcon />} size="large" variant="contained" color="default">
                    Добавить критерий
                </Button>
                <Button size="large" variant="contained" color="primary">
                    Далее
                </Button>
            </Grid>
        </Grid>
    );
};
