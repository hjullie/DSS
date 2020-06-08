import React from 'react';

import {Grid, Paper, Step, StepLabel, Stepper} from "@material-ui/core";

import commonStyles from "../../../common.module.css";
import {BreadCrumbs} from "../../BreadCrumbs/BreadCrumbs";
import {Methods} from "../../../constants";

interface FormProps {
    method: Methods;
    getFormStepContent: () => React.ReactNode;
    step: number;
    stepTitles: string[];
}

export const Form: React.FC<FormProps> = ({method, getFormStepContent, step, stepTitles}) => {

    return (
        <Grid className={commonStyles.content} xs={10} container>
            <BreadCrumbs className={commonStyles.breadCrumbs} method={method} />

            <Stepper className={commonStyles.stepper} activeStep={step - 1}>
                {stepTitles.map((label, index) => {
                    return (
                        <Step key={index}>
                            <StepLabel>
                                {label}
                            </StepLabel>
                        </Step>
                    )}
                )}
            </Stepper>

            <Paper className={commonStyles.form} elevation={1}>
                {getFormStepContent()}
            </Paper>
        </Grid>
    );
};
