import {MTableFilterRow} from "material-table";
import React from "react";
import Slider from "@material-ui/core/Slider";
import {RangeInput} from "../../../RangeInput/RangeInput";

export class MyTableFilterRow extends MTableFilterRow {
    renderNumberTypeFilter(columnDef) {
        console.log(columnDef)
        return (
            <RangeInput value={columnDef.tableData.filterValue}
                        onChange={(newValue) => this.props.onFilterChanged(columnDef.tableData.id, newValue)}
            />
            // <Slider
            //     value={columnDef.tableData.filterValue || [100, 102]}
            //     onChange={(_event, newValue) => this.props.onFilterChanged(columnDef.tableData.id, newValue)}
            //     valueLabelDisplay="auto"
            // />
        );
    }

    getComponentForColumn(columnDef) {
        if (columnDef.filtering === false) {
            return null;
        }

        if (columnDef.field || columnDef.customFilterAndSearch) {
            if (columnDef.filterComponent) {
                return this.renderFilterComponent(columnDef);
            } else if (columnDef.lookup) {
                return this.renderLookupFilter(columnDef);
            } else if (columnDef.type === 'boolean') {
                return this.renderBooleanFilter(columnDef);
            } else if (['date', 'datetime', 'time'].includes(columnDef.type)) {
                return this.renderDateTypeFilter(columnDef);
            } else if (columnDef.type === 'numeric') {
                return this.renderNumberTypeFilter(columnDef);
            } else {
                return this.renderDefaultFilter(columnDef);
            }
        }
    }
}
