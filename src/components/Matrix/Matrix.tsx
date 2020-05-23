import React from "react";
import {Table, TableBody, TableCell, TableRow} from "@material-ui/core";
import styles from "./Matrix.module.css";
import classNames from "classnames";

interface IMatrixProps {
    className?: string;
    title?: string;
    labels: string[];
    yLabels?: string[];
    data: number[][];
}

export const Matrix: React.FC<IMatrixProps> = ({className, data, title, labels, yLabels}) => {
    return (
        <Table className={classNames(styles.table, className)}>
            <TableBody>
                <TableRow className={styles.row}>
                    <TableCell className={styles.cell}>
                        <b>{title}</b>
                    </TableCell>
                    {labels.map((label, index) => {
                        return (
                            <TableCell className={styles.cell} key={'row-label-' + index}>
                                {label}
                            </TableCell>
                        )
                    })}
                </TableRow>

                {data.map((row, i) => {
                        return (
                            <TableRow key={i} className={styles.row}>
                                <TableCell className={styles.cell}>
                                    {(yLabels && yLabels[i]) || labels[i]}
                                </TableCell>

                                {row.map((value, j) => {
                                        return (
                                            <TableCell className={styles.cell} key={`item-${i}-${j}`}>
                                                {value}
                                            </TableCell>
                                        )
                                    }
                                )}
                            </TableRow>
                        )
                    }
                )}
            </TableBody>
        </Table>
    );
};
