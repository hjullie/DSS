import React, {ChangeEvent} from "react";
import {Fab, Grid, TextField} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import styles from "./ListInput.module.css";
import {fieldsValidators} from "../../validators/fieldsValidators";
import {IField} from "../../types";
import {FORM_FIELDS} from "../../constants";

const EMPTY_VALUE = '';
const INITIAL_COUNT = 2;

interface IListInputProps {
    name: FORM_FIELDS;
    data: IField[];
    onChange: (data: IField[]) => void;
    placeholderPrefix: string;
    maxCount?: number;
}

export const ListInput: React.FC<IListInputProps> = ({name, data, onChange, placeholderPrefix, maxCount}) => {
    const addVisible = !maxCount || data.length !== maxCount;
    const onValueChange = React.useCallback((index: number) => {
        return (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.currentTarget.value;
            const newData = [...data];
            const validators = fieldsValidators[name] || [];
            let error = '';

            for (let validator of validators) {
                const currError = validator(value);

                if (currError) {
                    error = currError;
                    break;
                }
            }

            newData[index] = {value, error};

            onChange(newData);
        }
    }, [data, name, onChange]);

    const onAdd = React.useCallback(() => {
        const newData = [...data, {value: EMPTY_VALUE, error: ''}];

        onChange(newData);
    }, [data, onChange]);


    const onDelete = React.useCallback((index) => {
        return () => {
            const newData = [...data.slice(0, index), ...data.slice(index + 1)];

            onChange(newData);
        }
    }, [data, onChange]);

    return (
        <Grid container direction={'column'}>
            {data.map(({value, error}, index) => {
                return (
                    <Grid key={index} className={styles.input} container>
                        <TextField placeholder={`${placeholderPrefix} ${index + 1}`}
                                   value={value}
                                   variant={'outlined'}
                                   onChange={onValueChange(index)}
                                   label={error || undefined}
                                   error={Boolean(error)}
                                   fullWidth
                        />
                        {index >= INITIAL_COUNT && (
                            <CloseIcon className={styles.deleteIcon} onClick={onDelete(index)}/>
                        )}
                    </Grid>
                );
            })}
            {addVisible && <Grid justify={'flex-end'} container item>
                <Fab onClick={onAdd} color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </Grid>}
        </Grid>
    );
};
