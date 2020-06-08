import React, {ChangeEvent} from 'react';

import {Button, Grid, IconButton, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {IField} from "../../../types";

import styles from "./FormStep1.module.css";
import commonStyles from "../../../common.module.css";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import {deepCopy} from "../../../helpers/object/deepCopy";
import AddIcon from "@material-ui/icons/Add";
import classNames from "classnames";
import {CriteriaType} from "../../../constants";
import {ICriteriaData} from "./LSOForm";

const EMPTY_VALUE = '';
const INITIAL_COUNT = 1;
const EMPTY_ERROR = 'Это поле обязательно';

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

export interface ICriteriaField {
    name: IField;
    type: CriteriaType,
    lookup: IField[],
}

interface IFormStep1Props {
    onSubmit: (criteria: ICriteriaData[]) => void;
}

export const FormStep1: React.FC<IFormStep1Props> = ({onSubmit}) => {
    const [criteria, setCriteria] = React.useState<ICriteriaField[]>(new Array(INITIAL_COUNT).fill(emptyCriteria));

    const validate = React.useCallback(() => {
        let isValid = true;
        const newCriteria = deepCopy(criteria);

        newCriteria.forEach(({name, type, lookup}, index) => {
            if (!name.value) {
                newCriteria[index].name.error = EMPTY_ERROR;

                isValid = false;
            }

            if (type === CriteriaType.String) {
                lookup.forEach((value) => {
                    if (!value.value) {
                        value.error = EMPTY_ERROR;

                        isValid = false;
                    }
                })
            }
        });

        setCriteria(newCriteria);

        return isValid;
    }, [criteria]);

    const onStepSubmit = React.useCallback(() => {
        const isValid = validate();

        if (isValid) {
            const criteriaData = criteria.map(({name, type, lookup}) => (
                {
                    type,
                    name: name.value,
                    lookup: type === CriteriaType.String ? lookup.map(({value}) => value) : undefined,
                })
            );

            onSubmit(criteriaData);
        }
    }, [onSubmit, validate]);

    const onCriteriaNameChange = React.useCallback((index: number) => {
        return (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.currentTarget.value;
            const newData = deepCopy(criteria);
            const error = value ? '' : EMPTY_ERROR;

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
            const error = value ? '' : EMPTY_ERROR;

            newData[i].lookup[j] = {value, error};

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

            newData[index].lookup.push({value: '', error: ''});

            setCriteria(newData);
        }
    }, [criteria])

    const onCriteriaLookupDelete = React.useCallback((i: number, j: number) => {
        return (_e: ChangeEvent<{}>) => {
            const newData = deepCopy(criteria);

            newData[i].lookup = newData[i].lookup.filter((_, index) => index !== j);

            setCriteria(newData);
        }
    }, [criteria]);

    return (
        <Grid container>
            <div className={commonStyles.title}>
                Введите критерии
            </div>

            <div className={styles.list}>
                {criteria.map(({name: {value, error}, type, lookup}, index) => {
                    return (
                        <div key={index} className={styles.criteria}>
                            <div className={styles.field}>
                                <InputLabel className={styles.label}>Название</InputLabel>
                                <div style={{position: "relative"}}>
                                    <TextField placeholder={`Критерий ${index + 1}`}
                                               value={value}
                                               variant={'outlined'}
                                               onChange={onCriteriaNameChange(index)}
                                               label={error || undefined}
                                               error={Boolean(error)}
                                               fullWidth
                                    />

                                    {index >= INITIAL_COUNT && (
                                        <DeleteIcon
                                            className={classNames(styles.deleteIcon, styles.deleteCriteriaIcon)}
                                            onClick={onCriteriaDelete(index)}
                                        />
                                    )}
                                </div>
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

                                {type === CriteriaType.String && (
                                    <div className={styles.values}>
                                        <InputLabel className={styles.label}>Значения</InputLabel>

                                        {lookup.map(({value, error}, jndex) => {
                                            return (
                                                <div className={styles.value}>
                                                    <TextField
                                                        key={jndex}
                                                        placeholder={`Значение ${jndex + 1}`}
                                                        value={value}
                                                        variant={'outlined'}
                                                        onChange={onCriteriaLookupChange(index, jndex)}
                                                        label={error || undefined}
                                                        error={Boolean(error)}
                                                        fullWidth
                                                    />

                                                    {jndex > 0 && (
                                                        <CloseIcon className={styles.deleteIcon} onClick={onCriteriaLookupDelete(index, jndex)}/>
                                                    )}
                                                </div>
                                            );
                                        })}

                                        <IconButton className={styles.addValueButton} size="small" onClick={onCriteriaValueAdd(index)} color="default" aria-label="add">
                                            <AddIcon />
                                        </IconButton>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>


            <Grid className={commonStyles.submit} justify="space-between" container>
                <Button onClick={onCriteriaAdd} startIcon={<AddIcon />} size="large" variant="contained" color="default">
                    Добавить критерий
                </Button>
                <Button onClick={onStepSubmit} size="large" variant="contained" color="primary">
                    Далее
                </Button>
            </Grid>
        </Grid>
    );
};
