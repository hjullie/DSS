import React from "react";
import {Methods, MethodsByType, MethodsType} from "../../constants";
import {Breadcrumbs, Link, Typography} from "@material-ui/core";
import {Routes, routes} from "../../routes";
import {useHistory} from "react-router-dom";

import styles from "./BreadCrumbs.module.css";

interface BreadCrumbsProps {
    method: Methods;
    className?: string;
}

export const BreadCrumbs: React.FC<BreadCrumbsProps> = ({method, className}) => {
    const methodType = MethodsByType[MethodsType.Group].includes(method) ? MethodsType.Group : MethodsType.Individual;

    const history = useHistory();

    const onClick = React.useCallback((route) => () => {
        history.push(route);
    }, [history]);

    return (
        <Breadcrumbs className={className}>
            <Link className={styles.link} color="inherit" onClick={onClick(routes[Routes.Home])}>
                Главная
            </Link>
            <Link className={styles.link} color="inherit"
                  onClick={onClick(methodType === MethodsType.Group ? routes[Routes.Group] : routes[Routes.Individual])}>
                {methodType}
            </Link>
            <Typography color="textPrimary">{method}</Typography>
        </Breadcrumbs>
    );
}
