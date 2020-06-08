import React from 'react';

import {Grid, Table, TableBody, TableCell, TableRow} from "@material-ui/core";
import {reduce} from "../../../helpers/matrix/reduce";
import {multiply} from "../../../helpers/matrix/multiply";
import {transpose} from "../../../helpers/matrix/transpose";
import MultiplyIcon from '@material-ui/icons/Close';
import EqualIcon from '@material-ui/icons/DragHandle';

import styles from "./FormSteps.module.css";
import commonStyles from "../../../common.module.css";
import {sortByArray} from "../../../helpers/array/sortByArray";


interface IFormStep3Props {
    criteria: string[];
    alternatives: string[];
    criteriaData: number[][];
    alternativesData: number[][][];
}

export const FormStep3: React.FC<IFormStep3Props> = ({criteria, alternatives, criteriaData, alternativesData}) => {
    const criteriaNorm = reduce(criteriaData);
    const matrixData = transpose(alternativesData.map((matrix) => reduce(matrix)));
    const alternativesNorm = transpose(multiply(matrixData, transpose([criteriaNorm])))[0];
    const sortedAlternatives = sortByArray(alternatives, alternativesNorm);
    const optimal = sortedAlternatives[0];

    return (
        <Grid container direction="column" alignItems="center">
            <div className={commonStyles.title}>
                В результате сформирован вектор весов критериев и матрица весов альтернатив
            </div>

            <Grid justify={'space-between'} alignItems={"center"} container>
                <Table className={styles.tableThin}>
                    <TableBody>
                        <TableRow>
                            <TableCell/>
                            <TableCell>
                                <b>Вес в долях</b>
                            </TableCell>
                        </TableRow>

                        {criteria.map((criterion, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>
                                        <b>{criterion}</b>
                                    </TableCell>
                                    <TableCell>
                                        {criteriaNorm[index].toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            )}
                        )}
                    </TableBody>
                </Table>

                <MultiplyIcon />

                <Table className={styles.tableThin}>
                    <TableBody>
                        <TableRow>
                            <TableCell/>

                            {criteria.map((criterion, index) => {
                                return (
                                    <TableCell key={index}>
                                        <b>{criterion}</b>
                                    </TableCell>
                                );
                            })}
                        </TableRow>

                        {alternatives.map((alternative, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell>
                                        <b>{alternative}</b>
                                    </TableCell>

                                    {criteria.map((_, j) => {
                                        return (
                                            <TableCell key={`${i} + ${j}`}>
                                                {matrixData[i][j].toFixed(2)}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            )}
                        )}
                    </TableBody>
                </Table>

                <EqualIcon />

                <Table className={styles.tableThin}>
                    <TableBody>
                        <TableRow>
                            <TableCell/>
                            <TableCell>
                                <b>Вес в долях</b>
                            </TableCell>
                        </TableRow>

                        {alternatives.map((alternative, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>
                                        <b>{alternative}</b>
                                    </TableCell>
                                    <TableCell>
                                        {alternativesNorm[index].toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            )}
                        )}
                    </TableBody>
                </Table>
            </Grid>

            <div className={commonStyles.title}>
                Ранжирование альтернатив
            </div>

            <div className={styles.info}>
                {sortedAlternatives.map((alternative, index) => {
                    return (
                        <b>
                            {index === 0 ? alternative : `, ${alternative}`}
                        </b>
                    );
                })}
            </div>

            <div>
                Оптимальная альтернатива - <b>{optimal}</b>
            </div>
        </Grid>
    );
};
