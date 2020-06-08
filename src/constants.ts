export enum CriteriaType {
    String = 'Множество',
    Number = 'Число',
}

export enum MatrixAxis {
    Row,
    Column,
}

export enum FORM_FIELDS {
    CRITERIA,
    EXPERTS,
    ALTERNATIVES,
    CRITERIA_MATRIX,
    ALTERNATIVES_MATRIXES,
}

export enum Methods {
    AnalyticHierarchyProcess = 'Метод аналитических иерархий',
    LexicographicSemiOrdering = 'Метод лексикографического полуупорядочивания',
    MinimumDistance = 'Метод минимального расстояния',
    Preference = 'Метод предпочтений',
    Rang = 'Метод ранга',
}

export enum MethodsType {
    All = "Все",
    Individual = 'Индивидуальные методы',
    Group = 'Групповые методы',
}

export const MethodsByType = {
    [MethodsType.Individual]: [
        Methods.AnalyticHierarchyProcess,
        Methods.LexicographicSemiOrdering,
    ],
    [MethodsType.Group]: [
        Methods.MinimumDistance,
        Methods.Preference,
        Methods.Rang,
    ]
}
