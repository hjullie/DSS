import {Button, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography} from "@material-ui/core";
import React from "react";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from "./MethodsAccordion.module.css";
import {useHistory} from "react-router-dom";
import {RouteByMethod} from "../../routes";
import {Methods, MethodsByType, MethodsType} from "../../constants";

export enum MethodAccordionType {
    Group,
    Individual,
    All,
}

const DESCRIPTIONS = {
    [Methods.AnalyticHierarchyProcess]: "Метод аналитических иерархий относится к категории индивидуальных методов принятия решений. Суть метода заключается в вычислении ценности каждой альтернативы, путем оценки критериев между собой и сравнения альтернатив по заданным критериям.",
    [Methods.MinimumDistance]: "Метод минимального расстояния относится к категории групповых методов принятия решений. Метод основан на анализе ранжировок альтернатив, заданных экспертами.",
    [Methods.Preference]: "Метод предпочтений относится к категории групповых методов принятия решений. Метод основан на присвоении ранга альтернативе каждым экспертом.",
    [Methods.Rang]: "Метод ранга относится к категории групповых методов принятия решений. Метод основан на балльных оценках альтернатив, указываемых несколькими экспертами.",
    [Methods.LexicographicSemiOrdering]: "Метод лексикографического полуупорядочивания относится к категории индивидуальных методов принятия решений. Метод основан на количественной оценке каждой альтернативы.",
}

interface IMethodAccordionProps {
    type: MethodAccordionType;
    className?: string;
}

export const MethodAccordion: React.FC<IMethodAccordionProps> = ({type, className}) => {
    const history = useHistory();

    const onClick = React.useCallback((method: Methods) => () => {
        history.push(RouteByMethod[method]);
    }, [history]);

    return (
        <div className={className}>
            {Object.values(Methods)
                .filter((method) => {
                    if (type === MethodAccordionType.Individual) {
                        return MethodsByType[MethodsType.Individual].includes(method);
                    } else if (type === MethodAccordionType.Group) {
                        return MethodsByType[MethodsType.Group].includes(method);
                    }

                    return true;
                })
                .map((method, index) => {
                    return (
                        <ExpansionPanel key={index}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                {method}
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className={styles.detail}>
                                <Typography color="textSecondary">
                                    {DESCRIPTIONS[method]}
                                </Typography>

                                {method !== Methods.LexicographicSemiOrdering && (
                                    <Button
                                        className={styles.button}
                                        key={index}
                                        variant="contained" color="primary"
                                        size="medium"
                                        onClick={onClick(method)}
                                    >
                                        Рассчитать
                                    </Button>
                                )}
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    );
                })
            }
        </div>
    );
};

