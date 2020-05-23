import React from 'react';

import {Form} from "../Form/Form";
import {FormStep1} from "./FormStep1";
import {FormStep2} from "./FormStep2";
import {FormStep3} from "./FormStep3";
import {Methods} from "../../../constants";

const stepTitles = ['Критерии и альтернативы', 'Матрицы попарного сравнения', 'Результаты'];

export const AHPForm: React.FC = () => {
    const [step, setStep] = React.useState<number>(1);
    const [criteria, setCriteria] = React.useState<string[]>([]);
    const [alternatives, setAlternatives] = React.useState<string[]>([]);
    const [criteriaData, setCriteriaData] = React.useState<number[][]>([]);
    const [alternativesData, setAlternativesData] = React.useState<number[][][]>([]);

    const onStep1Submit = React.useCallback((criteria: string[], alternatives: string[]) => {
        setCriteria(criteria);
        setAlternatives(alternatives);

        setStep(step + 1);
    }, [step]);

    const onStep2Submit = React.useCallback((criteriaData: number[][], alternativesData: number[][][]) => {
        setCriteriaData(criteriaData);
        setAlternativesData(alternativesData);

        setStep(step + 1);
    }, [step]);

    const getStepContent = React.useCallback(() => {
        switch (step) {
            case 1:
                return <FormStep1 onSubmit={onStep1Submit} />;
            case 2:
                return <FormStep2 criteria={criteria} alternatives={alternatives} onSubmit={onStep2Submit}/>;
            case 3:
                return <FormStep3 criteria={criteria} alternatives={alternatives} alternativesData={alternativesData} criteriaData={criteriaData} />;
            default:
                return <div>'Unknown step'</div>;
        }
    }, [alternatives, alternativesData, criteria, criteriaData, onStep1Submit, onStep2Submit, step]);

    return (
        <Form method={Methods.AnalyticHierarchyProcess} getFormStepContent={getStepContent} step={step} stepTitles={stepTitles} />
    );
};
