import {Methods} from "./constants";

export enum Routes {
    Home,
    Group,
    Individual,
    MD,
    AHP,
    Preference,
    Rang,
    LSO,
    Fit,
}

export const routes = {
    [Routes.Home]: '/',
    [Routes.Group]: '/group',
    [Routes.Fit]: '/fit',
    [Routes.Individual]: '/individual',
    [Routes.AHP]: '/ahp',
    [Routes.MD]: '/md',
    [Routes.Preference]: '/preference',
    [Routes.Rang]: '/rang',
    [Routes.LSO]: '/lso',
}

export const RouteByMethod = {
    [Methods.AnalyticHierarchyProcess]: routes[Routes.AHP],
    [Methods.MinimumDistance]: routes[Routes.MD],
    [Methods.Preference]: routes[Routes.Preference],
    [Methods.Rang]: routes[Routes.Rang],
    [Methods.LexicographicSemiOrdering]: routes[Routes.LSO],
}
