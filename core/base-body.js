import LazyPromise from "./lazy-promise";
import BaseEl from "./base-el";
import Column from "./column";
import Row from "./row";
import ENUMS from "./enums";

export default class BaseBody extends BaseEl {
    constructor(table) {
        super();
        this._isDataReady = false;
        this.rows = [];
        this.table = table;
        this.type = ENUMS.ELEMENT_TYPE.UNDEFINED;
        this.whenDataReady = new LazyPromise();
    }

    get isDataReady() {
        return this._isDataReady;
    }

    get columns() {
        return this.table.columns;
    }

    set isDataReady(value) {
        this._isDataReady = value;
        if (value)
            this.whenDataReady.resolve();
        else
            this.whenDataReady.reject();
    }

    getOrCreateRow(rowId) {
        let row = this.getRow(rowId)
        if (row)
            return row
        return this.createRow(rowId)
    }

    createRow(rowId) {
        var row = new Row(this.table);
        row.id = rowId;
        this.rows.push(row)
        return row
    }

    getRow(rowId) {
        return this.rows.find(row => row.id === rowId)
    }


    getOrCreateColumn(colId) {
        let col = this.getColumn(colId)
        if (col)
            return col
        return this.createColumn(colId)
    }

    createColumn(colId) {
        var column = new Column(this.table);
        column.id = colId;
        this.columns.push(column)
        return column
    }

    getColumn(colId) {
        return this.columns.find(col => col.id === colId)
    }

    cleanUp(){
        super.cleanUp();
        this.table = null;

        this.rows.forEach(row => row.cleanUp())
        this.rows = null;
    }
}