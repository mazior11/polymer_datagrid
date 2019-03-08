import { EventManager } from "../core/core";
import { EventManager } from "./core";
import { createSecurePair } from "tls";

export default class BaseAddon {
    constructor(){
        this._table;
        this._whenInitializeEM = EventManager.createOneTimeEM();
        this.whenInitialized = this._whenInitializeEM.eventPromise;
    }

    initialize(table) {
        this._table = table;
        this.whenInitialized.next();
    }
}

class BaseEl {
    constructor(coreEl){
        this._coreEl = coreEl;
    }

    get coreEl() {
        return this._coreEl;
    }

    get htmlEL() {
        return this._baseEl.htmlEL;
    }

    get htmlEL() {
        return this._baseEl.whenHTMLElReady;
    }

    get htmlEL() {
        return this._baseEl.whenHTMLElConnected;
    }

    get htmlEL() {
        return this._baseEl.whenObjectConstructed;
    }

    get htmlEL() {
        return this._baseEl.whenDataChanged;
    }

    dispose(){
        this._coreEl = null;
    }
}

export class Table extends BaseEl {
    constructor(coreTable, THeaderType, TBodyType, TColumnType, TCellHeader, TCellBody){
        super(coreTable);
        THeaderType = THeaderType || BaseBody;
        TBodyType = TBodyType || BaseBody;
        TColumnType = TColumnType || Column;
        TCellHeader = TCellHeader || Cell;
        TCellBody = TCellBody || Cell;
        this._header = new THeaderType(this, coreTable.header);
        this._body = new TBodyType(this, coreTable.body);
    }

    get header(){
        return this._header;
    }

    get body(){
        return this._body;
    }

    get columns(){
        return this.super.coreEl.columns;
    }

    get whenDataReady(){
        return this.super.coreEl.whenDataReady;
    }

    get renderComplete(){
        return this.super.coreEl.renderComplete;
    }
}

export class BaseBody extends BaseEl {
    constructor(table, coreEl){
        super(coreEl);
        this._table = table;
    }

    get table(){
        return this._table;
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
    constructor(table, coreEl){
        super(coreEl)
        this._table = table;
    }
}

export class Cell extends BaseEl {
    constructor(coreEl){
        super(coreEl)
    }
}