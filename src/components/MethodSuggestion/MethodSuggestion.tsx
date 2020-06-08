import React from 'react';

import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid, Link,
    Paper,
    Radio,
    RadioGroup,
    TextField, Typography
} from "@material-ui/core";

import commonStyles from "../../common.module.css";
import {Methods, MethodsType} from "../../constants";
import {IField} from "../../types";

import styles from "./MethodSuggestion.module.css";
import {RouteByMethod} from "../../routes";
import { useHistory } from 'react-router-dom';

const LABELS = {
    [MethodsType.All]: 'Любой',
    [MethodsType.Individual]: 'Индивидуальный',
    [MethodsType.Group]: 'Групповой',
}

const EMPTY_VALUE_ERROR = 'Это поле обязательно';

const getMethodCondition = (method: Methods, alternativesCount: number, criteriaCount: number, methodsType: MethodsType) => {
    if (!alternativesCount) {
        return false;
    }

    if (method === Methods.AnalyticHierarchyProcess) {
        return alternativesCount <= 10 && criteriaCount <= 10 && (methodsType === MethodsType.Individual || methodsType === MethodsType.All);
    }

    if (method === Methods.LexicographicSemiOrdering) {
        return (methodsType === MethodsType.Individual || methodsType === MethodsType.All);
    }

    if (method === Methods.MinimumDistance) {
        return alternativesCount <= 7 && (methodsType === MethodsType.Group || methodsType === MethodsType.All);
    }

    if (method === Methods.Preference) {
        return (methodsType === MethodsType.Group || methodsType === MethodsType.All);
    }

    if (method === Methods.Rang) {
        return (methodsType === MethodsType.Group || methodsType === MethodsType.All);
    }
}

export const MethodSuggestion: React.FC = () => {
    const [alternativesCount, setAlternativesCount] = React.useState<IField>({error: '', value: '2'});
    const [hasCriteria, setHasCriteria] = React.useState<boolean>(false);
    const [criteriaCount, setCriteriaCount] = React.useState<IField>({error: '', value: '1'});
    const [methodType, setMethodType] = React.useState<MethodsType>(MethodsType.All);
    const [isCheckout, setIsCheckout] = React.useState<boolean>(false);

    const handleAlternativesCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (value.match(/^[0-9]*$/)) {
            const parsedValue = parseInt(value, 10);
            let error = '';

            if (!value) {
                error = EMPTY_VALUE_ERROR;
            }

            if (parsedValue < 2) {
                error = 'Минимальное значение 2';
            }

            setAlternativesCount({value, error});
        }
    };

    const handleCriteriaCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (value.match(/^[0-9]*$/)) {
            const parsedValue = parseInt(value, 10);
            let error = '';

            if (!value) {
                error = EMPTY_VALUE_ERROR;
            }

            if (parsedValue < 1) {
                error = 'Минимальное значение 1';
            }

            setCriteriaCount({value, error});
        }
    };

    const handleMethodTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMethodType((event.target as HTMLInputElement).value as MethodsType);
    };

    const onSubmit = () => {
        let formValid = true;

        if (alternativesCount.error) {
            formValid = false;
        } else if (!alternativesCount.value) {
            formValid = false;
            setAlternativesCount({value: alternativesCount.value, error: EMPTY_VALUE_ERROR});
        }

        if (hasCriteria) {
            if (criteriaCount.error) {
                formValid = false;
            } else if (!criteriaCount.value) {
                formValid = false;
                setCriteriaCount({value: criteriaCount.value, error: EMPTY_VALUE_ERROR});
            }
        }

        if (formValid) {
            setIsCheckout(true);
        }
    }

    const availableMethods = Object
        .values(Methods)
        .filter((method) => {
            const alternatives = parseInt(alternativesCount.value, 10);
            const criteria = hasCriteria ? parseInt(criteriaCount.value, 10) : 0;

            return getMethodCondition(method, alternatives, criteria, methodType);
        });

    const history = useHistory();

    const onMethodClick = React.useCallback((method: Methods) => () => {
        history.push(RouteByMethod[method]);
    }, [history]);

    return (
        <Grid className={commonStyles.content} xs={6} container>
            <Paper className={commonStyles.form} elevation={1}>
                {!isCheckout ? (
                    <Grid className={commonStyles.content} direction="column" container>
                        <FormControl className={styles.field} component="fieldset">
                            <FormLabel className={styles.label} component="legend">Количество альтернатив</FormLabel>
                            <TextField
                                value={alternativesCount.value}
                                error={Boolean(alternativesCount.error)}
                                label={alternativesCount.error || undefined}
                                variant={'outlined'}
                                onChange={handleAlternativesCountChange}
                            />
                        </FormControl>

                        <FormControl className={styles.field} component="fieldset">
                            <FormGroup>
                                <FormControlLabel
                                    className={styles.label}
                                    control={
                                        <Checkbox
                                            color="primary"
                                            checked={hasCriteria}
                                            onChange={() => {
                                                setHasCriteria(!hasCriteria)
                                            }}
                                        />
                                    }
                                    label="Есть конкретные критерии"
                                />
                            </FormGroup>
                        </FormControl>

                        {hasCriteria && (
                            <FormControl className={styles.field} component="fieldset">
                                <FormLabel className={styles.label} component="legend">Количество критериев</FormLabel>
                                <TextField
                                    value={criteriaCount.value}
                                    error={Boolean(criteriaCount.error)}
                                    label={criteriaCount.error || undefined}
                                    variant={'outlined'}
                                    onChange={handleCriteriaCountChange}
                                />
                            </FormControl>
                        )}

                        <FormControl className={styles.field} component="fieldset">
                            <FormLabel component="legend">Способ оценки</FormLabel>
                            <RadioGroup value={methodType} onChange={handleMethodTypeChange}>
                                {Object
                                    .values(MethodsType)
                                    .map((method, index) => {
                                        return (
                                            <FormControlLabel
                                                key={index}
                                                value={method}
                                                control={<Radio color="primary"/>}
                                                label={LABELS[method]}
                                            />
                                        );
                                    })
                                }
                            </RadioGroup>
                        </FormControl>

                        <Grid className={commonStyles.submit} justify={'flex-end'} container>
                            <Button size="medium" onClick={onSubmit} variant="contained" color="primary">
                                Подобрать
                            </Button>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid className={commonStyles.content} direction="column" container>
                        <div className={commonStyles.title}>
                            Подходящие методы
                        </div>

                        {availableMethods.map((method,  index) => {
                            return (
                                <Link className={styles.link} key={index} color="textPrimary" onClick={onMethodClick(method)}>
                                    {method}
                                </Link>
                            );
                        })}

                        <Grid className={commonStyles.submit} justify={'flex-end'} container>
                            <Button size="medium" onClick={() => {setIsCheckout(false)}} variant="contained" color="primary">
                                Ввести другие параметры
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Paper>
        </Grid>
    );
};
