import { EventManager } from "../core/core";
import { EventManager } from "./core";

export default class BaseAddon {
    constructor(TableType, HeaderType, BodyType, ColumnType, CellHeaderType, CellBodyType){
        this._TableType = TableType;
        this._HeaderType = HeaderType || BaseBody;
        this._BodyType = BodyType || BaseBody;
        this._ColumnType = ColumnType || Column;
        this._CellHeaderType = CellHeaderType || Cell;
        this._CellBodyType = CellBodyType || Cell;
        this._whenInitializeEM = EventManager.createOneTimeEM();

        this.whenInitialized = this._whenInitializeEM.eventPromise;
        this.table;
    }

    createHeader(){
        this.table.header = new this._HeaderType();
    }

    createBody(){
        this.table.body = new this._BodyType();
    }


    createTable(){
        this.table = new this._TableType();
    }

    createColumn(){
        let column = new this._ColumnType();
        column.table = this.table;
        this.table.columns.push(column);
    }

    createCellHeader(){
        return new this._CellHeaderType();
    }

    createCellBody(){
        return new this._CellBodyType();
    }

    initialize(){
        
    }
}

class BaseEl {
    constructor(){
        this._coreEl;
    }

    initialize(){
        this._coreEl = coreEl;
    }

    get coreEl() {
        return this._coreEl;
    }

    get htmlEL() {
        return this._baseEl.htmlEL;
    }

    get whenHTMLElReady() {
        return this._baseEl.whenHTMLElReady;
    }

    get whenHTMLElConnected() {
        return this._baseEl.whenHTMLElConnected;
    }

    get whenObjectConstructed() {
        return this._baseEl.whenObjectConstructed;
    }

    get whenDataChanged() {
        return this._baseEl.whenDataChanged;
    }

    Dispose(){
        this._coreEl = null;
    }
}

export class Table extends BaseEl {
    constructor(){
        this.columns = [];
    }

    initialize(coreEl){
        super.initialize(coreEl)
    }

    get header(){
        return this._header;
    }

    set header(value){
        this._header = value;
        this._header.table = this;
    }

    get body(){
        return this._body;
    }

    set body(value){
        this._body = value;
        this._body.table = this;
    }

    get columns(){
        return this._columns;
    }

    get whenDataReady(){
        return this.super.coreEl.whenDataReady;
    }

    get renderComplete(){
        return this.super.coreEl.renderComplete;
    }
}

export class BaseBody extends BaseEl {
    constructor(){
    }

    initialize(coreEl){
        super.initialize(coreEl)
    }

    get table(){
        return this._table;
    }

    set table(value){
        this._table = value;
    }

    get rows(){
        return super.coreEl.rows;
    }

    get type(){
        return super.coreEl.type;
    }

    get whenDataReady(){
        return super.coreEl.whenDataReady;
    }

    get whenRowCreated(){
        return super.coreEl.whenRowCreated;
    }

    get whenColumnCreated(){
        return super.coreEl.whenColumnCreated;
    }

}

export class Column extends BaseEl {
    constructor(){
    }
        get table(){
            return this._table;
        }

        set table(value){
            this._table = value;
        }
    }
}

export class Cell extends BaseEl {
    constructor(){
        super()
    }

    initialize(coreEl){
        super.initialize(coreEl)
    }
}