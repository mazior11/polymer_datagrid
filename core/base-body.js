import BaseEl from "./base-el";
import Column from "./column";
import Row from "./row";
import ENUMS from "./enums";
import { EventManager } from "./core";

export default class BaseBody extends BaseEl {
    constructor(table) {
        super();
        this._isDataReady = false;
        this._whenDataReadyEM = EventManager.createOneTimeEM();
        this._whenRowCreatedEM = EventManager.createOneTimeEM();
        this._whenColumnCreatedEM = EventManager.createOneTimeEM();
        this.rows = [];
        this.table = table;
        this.type = ENUMS.ELEMENT_TYPE.UNDEFINED;
        this.whenDataReady = this._whenDataReadyEM.eventPromise;
        this.whenRowCreated = this._whenRowCreatedEM.eventPromise;
        this.whenColumnCreated = this._whenColumnCreatedEM.eventPromise;
    }

    get columns() {
        return this.table.columns;
    }

    get isDataReady() {
        return this._isDataReady;
    }

    set isDataReady(value) {
        this._isDataReady = value;
        if (value)
            this._whenDataReadyEM.eventEmiter.next();
        else
            this._whenDataReadyEM.eventEmiter.throw();
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
        this.rows.push(row);
        this._whenRowCreatedEM.eventEmiter.next();
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
        this._whenColumnCreatedEM.eventEmiter.next();
        return column
    }

    getColumn(colId) {
        return this.columns.find(col => col.id === colId)
    }

    Dispose(){
        super.Dispose();
        this.table = null;
        this.rows.forEach(row => row.Dispose())
        this.rows = null;
    }
}