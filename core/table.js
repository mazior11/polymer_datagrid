import Body from "./body";
import Header from "./header";
import LazyPromise from "./lazy-promise";
import BaseEl from "./base-el";

export default class Table extends BaseEl {
    constructor() {
        super();
        this._isReady = false;
        this._lastBodyCell;
        this._isRender = false;
        this._lastColumn;
        this.columns = [];
        this.body = new Body(this);
        this.header = new Header(this);
        this.whenDataReady = new LazyPromise();
        this.renderComplete = new LazyPromise();

        Promise.all([this.body.whenDataReady, this.header.whenDataReady]).then(() => {
            this._isReady = true;
            this.whenDataReady.resolve();
        })

        this.body.whenDataReady
            .then(() => this._setLastColumn())
            .then(() => this._lastColumn.bodySubColumn.whenLastCellIsSet)
            .then(() => this._setLastBodyCell())
            .then(() => this._observeRenderState())

        this.renderComplete
            .then(() => {
                let width100Precent = "100%";
                this.body.htmlEl.style.width = width100Precent;
                this.header.htmlEl.style.width = width100Precent;
            })
 
        this.renderComplete
            .then(() => {
                let bodyWrapper = this.htmlEl.$['body-wrapper-div'];
                bodyWrapper.addEventListener("scroll", (e) => this._onBodyHorizontalScroll(e))
            })
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

    cleanUp(){
        super.cleanUp();
        this._lastBodyCell = null;
        this._lastColumn = null;

        this.columns.forEach(column => column.cleanUp())
        this.columns = [];

        this.body.cleanUp();
        this.header.cleanUp();

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
                this.renderComplete.resolve();
            })
    }
}