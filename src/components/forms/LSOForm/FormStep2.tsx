import React from 'react';

import {MyTableFilterRow} from "./MyTableFilterRow/MyTableFilterRow";
import MaterialTable, {Column} from "material-table";

import styles from "./FormStep2.module.css";
import {ICriteriaData} from "./LSOForm";
import {CriteriaType} from "../../../constants";

const customFilterAndSearch = (filterValue: (number | "")[], rowData: any, columnDef: any) => {
    const cellValue = columnDef.field && rowData[columnDef.field] as number;
    return Boolean(!cellValue || ((!filterValue[0] || cellValue >= filterValue[0]) && (!filterValue[1] || cellValue <= filterValue[1])));
}

interface IFormStep1Props {
    criteria: ICriteriaData[];
}

export const FormStep2: React.FC<IFormStep1Props> = ({criteria}) => {
    const [data, setData] = React.useState<object[]>([]);

    const columns: Column<any>[] = criteria.map(({name, type, lookup}) => {
        const lookupValues = lookup && lookup.reduce((acc, value) => {
            return {...acc, [value]: value};
        }, {})

        return (
            {
                title: name,
                field: name,
                type: type === CriteriaType.Number ? 'numeric' : undefined,
                customFilterAndSearch: type === CriteriaType.Number ? customFilterAndSearch : undefined,
                lookup: lookupValues,
            }
        );
    })

    return (
        <div className={styles.container}>
            <MaterialTable
                style={{width: '100%', padding: '30px', boxSizing: 'border-box'}}
                title="Введите альтернативы, указав соответствующие значения для каждого критерия"
                columns={[
                    { title: 'Название альтернативы', field: 'Альтернатива', filtering: false },
                    ...columns
                ]}
                data={data}
                options={{
                    filtering: true,
                    search: false,
                }}
                editable={{
                    isEditable: () => true,
                    isDeletable: () => true,
                    onRowAdd: newRow =>
                        new Promise((resolve) => {
                            setData([...data, newRow]);
                            resolve();
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve) => {
                            const dataDelete = [...data];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);
                            setData([...dataDelete]);
                            resolve();
                        }),
                }}
                localization={{
                    body: {
                        emptyDataSourceMessage: 'Нет записей',
                        addTooltip: 'Добавить',
                        deleteTooltip: 'Удалить',
                        editTooltip: 'Редактировать',
                        filterRow: {
                            filterTooltip: 'Фильтрация'
                        },
                        editRow: {
                            deleteText: 'Вы уверены?',
                            cancelTooltip: 'Отменить',
                            saveTooltip: 'Сохранить'
                        }
                    },
                    header: {
                        actions: 'Действия'
                    },
                    pagination: {
                        labelDisplayedRows: '{from}-{to} из {count}',
                        labelRowsSelect: 'строк',
                        labelRowsPerPage: 'Строк на станице:',
                        firstAriaLabel: 'Первая страница',
                        firstTooltip: 'Первая страница',
                        previousAriaLabel: 'Предыдущая страница',
                        previousTooltip: 'Предыдущая страница',
                        nextAriaLabel: 'Следующая страница',
                        nextTooltip: 'Следующая страница',
                        lastAriaLabel: 'Последняя страница',
                        lastTooltip: 'Последняя страница'
                    },
                }}
                // @ts-ignore
                components={{
                    FilterRow: MyTableFilterRow,
                }}
                onFilterChange={(filters) => {console.log(filters)}}
            />
        </div>
    );
};
