import React from "react";

import {FormStep1, ICriteriaData} from "./FormStep1";
import {FormStep2} from "./FormStep2";
import {Form} from "../Form/Form";
import {Methods} from "../../../constants";

const stepTitles = ['Критерии', 'Таблица альтернатив', 'Результаты'];

export const LSOForm: React.FC = () => {
    const [step, setStep] = React.useState<number>(1);
    const [criteria, setCriteria] = React.useState<string[]>([]);
    const [experts, setExperts] = React.useState<string[]>([]);
    const [alternativesData, setAlternativesData] = React.useState<number[][][]>([]);

    const onStep1Submit = React.useCallback((criteria: ICriteriaData[]) => {

        setStep(step + 1);
    }, [step]);

    const getStepContent = React.useCallback(() => {
        switch (step) {
            case 2:
                return <FormStep1 onSubmit={onStep1Submit}/>;
            case 1:
                return <FormStep2 />;
            default:
                return <div>'Unknown step'</div>;
        }
    }, [alternativesData, experts, onStep1Submit, step]);

    return (
        <Form method={Methods.LexicographicSemiOrdering} getFormStepContent={getStepContent} step={step} stepTitles={stepTitles}/>
    );
}
