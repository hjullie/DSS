import {
    Button,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary, Link,
    Tab,
    Tabs,
    Typography
} from "@material-ui/core";
import React, {useState} from "react";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from "./MethodsAccordion.module.css";
import {useHistory} from "react-router-dom";
import {RouteByMethod, Routes, routes} from "../../routes";
import {Methods, MethodsByType, MethodsType} from "../../constants";

const DESCRIPTIONS = {
    [Methods.AnalyticHierarchyProcess]: "Метод аналитических иерархий относится к категории индивидуальных методов принятия решений. Суть метода заключается в вычислении ценности каждой альтернативы, путем оценки критериев между собой и сравнения альтернатив по заданным критериям.",
    [Methods.MinimumDistance]: "Метод минимального расстояния относится к категории групповых методов принятия решений. Метод основан на анализе ранжировок альтернатив, заданных экспертами.",
    [Methods.Preference]: "Метод предпочтений относится к категории групповых методов принятия решений. Метод основан на присвоении ранга альтернативе каждым экспертом.",
    [Methods.Rang]: "Метод ранга относится к категории групповых методов принятия решений. Метод основан на балльных оценках альтернатив, указываемых несколькими экспертами.",
    [Methods.LexicographicSemiOrdering]: "Метод лексикографического полуупорядочивания относится к категории индивидуальных методов принятия решений. Метод основан на количественной оценке каждой альтернативы.",
}
const FILTERS = Object.values(MethodsType);


interface IMethodAccordionProps {
    type: MethodsType;
    className?: string;
}

export const MethodAccordion: React.FC<IMethodAccordionProps> = ({type, className}) => {
    const history = useHistory();
    const [filterValue, setFilterValue] = useState<number>(() => {
        return (
            FILTERS.findIndex((currType) => currType === type)
        );
    })

    const onMethodClick = React.useCallback((method: Methods) => () => {
        history.push(RouteByMethod[method]);
    }, [history]);

    const onFilterChange = React.useCallback((_e: React.ChangeEvent<{}>, value) => {
        setFilterValue(value);

        if (FILTERS[value] === MethodsType.Group) {
            history.push(routes[Routes.Group]);
        } else if (FILTERS[value] === MethodsType.Individual) {
            history.push(routes[Routes.Individual]);
        } else {
            history.push(routes[Routes.Home]);
        }
    }, [])

    return (
        <div className={className}>
            <Typography align="center" variant="h3">Система поддержки принятия решений</Typography>

            <Tabs
                className={styles.tabs}
                value={filterValue}
                onChange={onFilterChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                {FILTERS.map((type, index) => {
                    return (
                        <Tab key={index} label={type} />
                    );
                })}
            </Tabs>

            {Object.values(Methods)
                .filter((method) => {
                    if (type === MethodsType.Individual) {
                        return MethodsByType[MethodsType.Individual].includes(method);
                    } else if (type === MethodsType.Group) {
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
                                <div className={styles.title}>
                                    {method}
                                </div>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className={styles.detail}>
                                <Typography color="textSecondary">
                                    {DESCRIPTIONS[method]}
                                </Typography>

                                <Button
                                    className={styles.button}
                                    key={index}
                                    variant="contained" color="primary"
                                    size="medium"
                                    onClick={onMethodClick(method)}
                                >
                                    Рассчитать
                                </Button>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    );
                })
            }

            {FILTERS[filterValue] === MethodsType.All && (
                <Typography className={styles.footer} color="textSecondary">
                    Также вы можете <Link className={styles.link} color="inherit" onClick={() => {history.push(routes[Routes.Fit])}} underline="always">подобрать</Link> метод исходя из условий
                </Typography>
            )}
        </div>
    );
};

