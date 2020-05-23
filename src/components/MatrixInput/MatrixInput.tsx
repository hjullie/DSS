import React, {ChangeEvent} from "react";
import {Grid, TextField} from "@material-ui/core";
import styles from "./MatrixInput.module.css";
import classNames from "classnames";
import {IField} from "../../types";

interface IMatrixInputProps {
    className?: string;
    title?: string;
    labels: string[];
    yLabels?: string[];
    data: IField[][];
    onFieldChange: (value: string, position: {i: number; j: number}) => void;
}

export const MatrixInput: React.FC<IMatrixInputProps> = ({className, title, labels, yLabels, data, onFieldChange}) => {
    const onValueChange = React.useCallback((i: number, j: number) => {
        return (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.currentTarget.value;
            onFieldChange(value, {i, j})
        }
    }, [onFieldChange]);

    // const onBlur = React.useCallback((i: number, j: number) => {
    //     return (e: FocusEvent<HTMLInputElement>) => {
    //         onChange(e, i, j);
    //     }
    // }, []);

    return (
      <Grid className={className} direction={'column'}>
          <Grid container item spacing={1}>
              <>
                  <Grid className={classNames(styles.item, styles.label)} item>
                      <b className={styles.labelText}>{title}</b>
                  </Grid>
                  {labels.map((label, index) => {
                      return (
                          <Grid className={classNames(styles.item, styles.label)} key={`label-top-${index}`} item>
                              <span className={styles.labelText}>{label}</span>
                          </Grid>
                      )
                  })}
              </>
          </Grid>

          {data.map((row, i) => {
              return (
                  <Grid key={`row-${i}`} container item spacing={1}>
                      <Grid className={classNames(styles.item, styles.label)} key={`label-left-${i}`} item>
                          <span className={styles.labelText}>{(yLabels && yLabels[i]) || labels[i]}</span>
                      </Grid>

                      {row.map(({value, error}, j) => {
                          return (
                              <Grid key={`item-${i}-${j}`} className={styles.item} item>
                                  <TextField
                                      value={value}
                                      onChange={onValueChange(i, j)}
                                      variant={'outlined'}
                                      error={Boolean(error)}
                                      disabled={!yLabels && i === j}
                                      // onBlur={onBlur(i, j)}
                                      fullWidth
                                  />
                              </Grid>
                          )}
                      )}
                  </Grid>
              )}
          )}
      </Grid>
    );
};
