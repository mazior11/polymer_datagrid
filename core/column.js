import { bindParams, generateUUID } from "./core";
import { Dispose } from "./base-el";
import ENUMS from "./enums";
import { EventManager } from "./core";

class SubColumn extends Dispose {
    constructor() {
        super();
        this._firstCell;
        this._lastCell;
        this._whenLastCellIsSetEM = EventManager.createOneTimeEM();
        this._whenFirstCellIsSetEM = EventManager.createOneTimeEM();
        this.whenLastCellIsSet = this._whenLastCellIsSetEM.eventPromise;
        this.whenFirstCellIsSet = this._whenFirstCellIsSetEM.eventPromise;
        this.dataRows = [];
    }

    get lastCell() {
        return this._lastCell;
    }

    set lastCell(value) {
        this._lastCell = value;
        this._whenLastCellIsSetEM.eventEmiter.next();
    }

    get firstCell() {
        return this._firstCell;
    }

    set firstCell(value) {
        this._firstCell = value;
        this._whenFirstCellIsSetEM.eventEmiter.next();
    }

    get width() {
        return this.firstCell.htmlEl.offsetWidth;
    }

    set width(value) {
        return this.dataRows.forEach(dataRow => dataRow.htmlEl.style.width = value + 'px');
    }

    Dispose(){
        super.Dispose();

        this._firstCell = null;
        this._lastCell = null;

        this.dataRows.forEach(dataRow => dataRow.Dispose())
        this.dataRows = null;
    }
}

export default class Column extends Dispose  {
    constructor(table) {
        super();
        this.table = table;
        this.header = table.header;
        this.body = table.body;
        this._position = Column.position;
        this._renderCompleteEM = EventManager.createOneTimeEM();
        this.id;
        this.dataRows = [];
        this.bodySubColumn = new SubColumn();
        this.headerSubColumn = new SubColumn();
        this.renderComplete = this._renderCompleteEM.eventPromise;
        this.eventListeners = [];
        Column.position++;

        this._eventFuncBase = this._eventFuncBase.bind(this)
        this._removeEventListener = this._removeEventListener.bind(this)

        this.header.whenDataReady
            .then(() => {
                let headerDataRows = this.headerSubColumn.dataRows;
                if (headerDataRows.length > 0) {
                    this.headerSubColumn.firstCell = headerDataRows[0];
                    this.headerSubColumn.lastCell = headerDataRows[headerDataRows.length - 1];
                }
            })

        this.body.whenDataReady
            .then(() => {
                let bodyDataRows = this.bodySubColumn.dataRows;
                if (bodyDataRows.length > 0) {
                    this.bodySubColumn.firstCell = bodyDataRows[0];
                    this.bodySubColumn.lastCell = bodyDataRows[bodyDataRows.length - 1];
                }
            })
            .then(() => {
                return this.bodySubColumn.firstCell.whenHTMLElConnected;
            })
            .then(() => {
                this._renderCompleteEM.eventEmiter.next();
            })

        this.renderComplete
            .then(() => this._initColumnWidth())
            .then(() => this._setDataRowsPosistion())
    }

    get position(){
        return this._position;
    }

    set position(value){
        this._position = value;
        this._setDataRowsPosistion();
    }

    get width() {
        return this.headerSubColumn.width;
    }

    set width(value) {
        this.headerSubColumn.width = value;
        this.bodySubColumn.width = value;
    }

    get isRender() {
        return this._lastBodyCell.isRender;
    }

    removeElement(dataRow){
        if(!this.dataRows || this.dataRows.length <= 0)
            return undefined;
        let dataRowIndex = this.dataRows.find(dataRow);
        return this._removeElementAt(dataRowIndex);
    }

    removeElementFunc(func){
        if(!this.dataRows || this.dataRows.length <= 0)
            return undefined;
        let dataRowIndex = this.dataRows.findIndex(func);
        return this._removeElementAt(dataRowIndex);
    }

    _removeElementAt(dataRowIndex){
        let dataRow = this.dataRows.splice(dataRowIndex, 1);
        switch(dataRow.type){
            case ENUMS.ELEMENT_TYPE.BODY:
                this.bodySubColumn.dataRows.splice(dataRowIndex, 1); 
                break;
            case ENUMS.ELEMENT_TYPE.HEADER:
                this.headerSubColumn.dataRows.splice(dataRowIndex, 1); 
                break;
            default:
                break;
        }
        return dataRow;
    }

    Dispose(){
        super.Dispose();

        this.table = null;
        this.header = null;
        this.body = null;

        this.dataRows.forEach(dataRow => dataRow.Dispose())
        this.dataRows = null;

        this.bodySubColumn.Dispose();
        this.headerSubColumn.Dispose();

        this.bodySubColumn = null;
        this.headerSubColumn = null;
        this.eventListeners.forEach(listener => {
            this._removeEventListener(listener);
        })
        this.eventListeners = null;
    }

    attachToEvent(eventName, handler, capture){
        let localHanlder = bindParams(this._eventFuncBase, handler);
        let guid = generateUUID();
        let listener = {
            handler: localHanlder,
            capture,
            event: eventName,
            id: guid,
            col: this
        }
        this.eventListeners.push(listener);
        this.dataRows.forEach(dataRow => {
            dataRow.htmlEl.addEventListener(listener.event, listener.handler, capture)
        })
        return listener;
    }

    detachFromEvent(listenerId){
        let listener = this.eventListeners.find(el => el.id = listenerId)
        this._removeEventListener(listener)
        this.eventListeners = this.eventListeners.filter(el => el.id != listenerId)
    }

    _removeEventListener(listener){
        this.dataRows.forEach(dataRow => {
            dataRow.htmlEl.removeEventListener(listener.event, listener.handler, listener.capture);
        })
    }

    _initColumnWidth() {
        let width = 0;
        for(let dataRow of this.dataRows){
            let dataRowWidth = dataRow.htmlEl.offsetWidth;
            if(dataRowWidth > width)
            width = dataRowWidth;
        }
        this.width = width;
    }

    _setDataRowsPosistion(){
        this.dataRows.forEach(dataRow => dataRow.htmlEl.style.order = this._position + 1)
    }

    _eventFuncBase(e, func){
        func(e, this)
    }
}

Column.position = 0;