import React from "react";

import {FormStep1, ICriteriaField} from "./FormStep1";
import {FormStep2} from "./FormStep2";
import {Form} from "../Form/Form";
import {CriteriaType, Methods} from "../../../constants";

export interface ICriteriaData {
    name: string;
    type: CriteriaType;
    lookup?: string[];
}

const stepTitles = ['Критерии', 'Таблица альтернатив'];

export const LSOForm: React.FC = () => {
    const [step, setStep] = React.useState<number>(1);
    const [criteria, setCriteria] = React.useState<ICriteriaData[]>([]);

    const onStep1Submit = React.useCallback((criteria: ICriteriaData[]) => {
        setCriteria(criteria);

        setStep(step + 1);
    }, [step]);

    const getStepContent = React.useCallback(() => {
        switch (step) {
            case 1:
                return <FormStep1 onSubmit={onStep1Submit}/>;
            case 2:
                return <FormStep2 criteria={criteria} />;
            default:
                return <div>'Unknown step'</div>;
        }
    }, [criteria, onStep1Submit, step]);

    return (
        <Form method={Methods.LexicographicSemiOrdering} getFormStepContent={getStepContent} step={step} stepTitles={stepTitles}/>
    );
}
