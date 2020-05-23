import React from "react";
import {Methods, MethodsByType, MethodsType} from "../../constants";
import {Breadcrumbs, Link, Typography} from "@material-ui/core";
import {RouteByMethod, Routes, routes} from "../../routes";
import {useHistory} from "react-router-dom";

interface BreadCrumbsProps {
    method: Methods;
}

export const BreadCrumbs: React.FC<BreadCrumbsProps> = ({method}) => {
    const methodType = MethodsByType[MethodsType.Group].includes(method) ? MethodsType.Group : MethodsType.Individual;

    const history = useHistory();

    const onClick = React.useCallback((route) => () => {
        history.push(route);
    }, [history]);

    return (
        <Breadcrumbs>
            <Link color="inherit" onClick={onClick(routes[Routes.Home])}>
                Главная
            </Link>
            <Link color="inherit"
                  onClick={onClick(methodType === MethodsType.Group ? routes[Routes.Group] : routes[Routes.Individual])}>
                {methodType}
            </Link>
            <Typography color="textPrimary">{method}</Typography>
        </Breadcrumbs>
    );
}
