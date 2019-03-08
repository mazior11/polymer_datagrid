import { EventManager } from "./core";
import BaseEl from "./base-el";
import ENUMS from "./enums";

export default class Data extends BaseEl {
    constructor() {
        super();
        this._row;
        this._column;
        this._renderCompleteEM = EventManager.createOneTimeEM();
        this.value;
        this.type = ENUMS.ELEMENT_TYPE.UNDEFINED;
        this.renderComplete = this._renderCompleteEM.eventPromise;
    }

    get column() {
        return this._column;
    }
    set column(column) {
        column.dataRows.push(this)
        this._column = column;
    }

    get row() {
        return this._row;
    }
    set row(row) {
        row.dataColumns.push(this);
        this._row = row;
    }

    Dispose(){
        super.Dispose();
        this._row.removeElement(this);
        this._column.removeElement(this);
        this._row = null;
        this._column = null;
    }
}