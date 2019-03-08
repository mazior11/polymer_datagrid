import Body from "./body";
import Header from "./header";
import BaseEl from "./base-el";
import * as rxjs  from "rxjs";
import * as rxjsOperators  from 'rxjs/operators';
import { EventManager } from "./core";
import GridConfiguration from "./gridConfiguration";

export default class Table extends BaseEl {
    constructor(addons) {
        super();
        this._addons = addons || [];
        this._isReady = false;
        this._lastBodyCell;
        this._isRender = false;
        this._lastColumn;
        this._whenDataReadyEM = EventManager.createOneTimeEM();
        this._renderCompleteEM = EventManager.createOneTimeEM();
        this.columns = [];
        this.body = new Body(this);
        this.header = new Header(this);
        this.whenDataReady = this._whenDataReadyEM.eventPromise;
        this.renderComplete = this._renderCompleteEM.eventPromise;

        Promise.all([this.body.whenDataReady, this.header.whenDataReady]).then(() => {
            this._isReady = true;
            this._whenDataReadyEM.eventEmiter.next();
        })

        this.body.whenDataReady
            .then(() => this._setLastColumn())
            .then(() => this._lastColumn.bodySubColumn.whenLastCellIsSet)
            .then(() => this._setLastBodyCell())
            .then(() => this._observeRenderState())

        this.renderComplete
            .then(() => {
                let width100Percent = "100%";
                this.body.htmlEl.style.width = width100Percent;
                this.header.htmlEl.style.width = width100Percent;
            })
 
        this.renderComplete
            .then(() => {
                let bodyWrapper = this.htmlEl.$['body-wrapper-div'];
                bodyWrapper.addEventListener("scroll", (e) => this._onBodyHorizontalScroll(e))
            })
    }

    get addons(){
        return this.addons;
    }

    get htmlEl() {
        return super.htmlEl;
    }

    set htmlEl(value) {
        super.htmlEl = value;
        this.body.htmlEl = this.htmlEl.$.body;
        this.header.htmlEl = this.htmlEl.$.header;
    }

    get isRender() {
        return this._isRender;
    }

    get isReady() {
        return this._isReady;
    }

    get lastBodyCell() {
        return this._lastBodyCell;
    }

    moveColumn(oldPosition, newPosition){
        if(oldPosition < newPosition)
            this._moveColumnUp(oldPosition, newPosition)
        else
            this._moveColumnDown(oldPosition, newPosition)
    }

    Dispose(){
        super.Dispose();
        this._lastBodyCell = null;
        this._lastColumn = null;

        this.columns.forEach(column => column.Dispose())
        this.columns = [];

        this.body.Dispose();
        this.header.Dispose();

        this.body = null;
        this.header = null;
    }

    _moveColumnUp(oldPosition, newPosition){
        let columnToMove;
        for(let i = 0; i < this.columns.length; i++){
            let column = this.columns[i];
            if(column.position == oldPosition){
                columnToMove = column;
            }
            if(column.position > oldPosition && column.position <= newPosition){
                column.position = column.position -1;
            }
        }
        columnToMove.position = newPosition;
    }

    _moveColumnDown(oldPosition, newPosition){
        let columnToMove;
        for(let i = 0; i < this.columns.length; i++){
            let column = this.columns[i];
            if(column.position == oldPosition){
                columnToMove = column;
            }
            if(column.position < oldPosition && column.position >= newPosition){
                column.position = column.position +1;
            }
        }
        columnToMove.position = newPosition;
    }

    _onBodyHorizontalScroll(e) {
        let bodyWrapper = this.htmlEl.$['body-wrapper-div'];
        let header = this.header.htmlEl;
        header.style.right = this.setToPixelVal(bodyWrapper.scrollLeft);
    }

    _setLastColumn(){
        let colsLength = this.columns.length;
        if (!colsLength)
            return;
        this._lastColumn = this.columns[colsLength - 1];
    }

    _setLastBodyCell() {
        if (!this._lastColumn)
            return;
        this._lastBodyCell = this._lastColumn.bodySubColumn.lastCell;
    }

    _observeRenderState() {
        this._lastBodyCell.whenHTMLElConnected
            .then(() => {
                this._isRender = true;
                this._renderCompleteEM.eventEmiter.next();
            })
    }
}