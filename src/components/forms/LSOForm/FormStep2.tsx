import React from 'react';

import {MyTableFilterRow} from "./MyTableFilterRow/MyTableFilterRow";
import MaterialTable from "material-table";

interface IFormStep1Props {
}

export const FormStep2: React.FC<IFormStep1Props> = ({}) => {
    return (
        <MaterialTable
            title="Введите альтернативы, указав соответствующие значения для каждого критерия"
            columns={[
                { title: 'Название альтернативы', field: 'Альтернатива', filtering: false },
                {
                    title: 'Цена',
                    field: 'Цена',
                    type: 'numeric',
                    customFilterAndSearch: (filterValue: (number | "")[], rowData, columnDef) => {
                        // @ts-ignore
                        const cellValue = columnDef.field && rowData[columnDef.field] as number;
                        return Boolean(!cellValue || ((!filterValue[0] || cellValue >= filterValue[0]) && (!filterValue[1] || cellValue <= filterValue[1])));
                    }
                },
                {
                    title: 'Цвет',
                    field: 'Цвет',
                    lookup: { "Рыжий": 'Рыжий', "Черный": 'Черный', "Белый": 'Белый' },
                },
            ]}
            data={[
                { 'Альтернатива': 'Альтернатива 1', 'Цена': 1000, 'Цвет': "Рыжий" },
                { 'Альтернатива': 'Альтернатива 2', 'Цена': 110, 'Цвет': "Черный" },
                { 'Альтернатива': 'Альтернатива 3', 'Цена': 50, 'Цвет': "Белый" },
                { 'Альтернатива': 'Альтернатива 4', 'Цена': 2000, 'Цвет': "Черный" },
            ]}
            options={{
                filtering: true,
                search: false,
            }}
            editable={{
                isEditable: () => false,
                isDeletable: () => false,
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            {
                                /* const data = this.state.data;
                                data.push(newData);
                                this.setState({ data }, () => resolve()); */
                            }
                            reject();
                        }, 1000);
                    }),
            }}
            // @ts-ignore
            components={{
                FilterRow: MyTableFilterRow,
            }}
            onFilterChange={(filters) => {console.log(filters)}}
        />
    );
};
