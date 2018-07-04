import Data from "./data";
import ENUMS from "./enums";

export default class HeaderData extends Data {
    constructor() {
        super();
        this.type = ENUMS.ELEMENT_TYPE.HEADER;
        this._columnMouseEnterListeners = [];
        this._htmlEl4CleanUp = this.htmlEL;

        this._eventResizeMouseUp = this._eventResizeMouseUp.bind(this);
        this._eventResizeMouseDown = this._eventResizeMouseDown.bind(this);
        this._eventResizeMouseMove = this._eventResizeMouseMove.bind(this);

        this._eventRepositionMouseDown = this._eventRepositionMouseDown.bind(this);
        this._eventRepositonMouseUp = this._eventRepositonMouseUp.bind(this);
        this._eventRepositionMouseMove = this._eventRepositionMouseMove.bind(this);
        this._eventRepositionColumnMouseOver = this._eventRepositionColumnMouseOver.bind(this);

        this.whenHTMLElReady
            .then(() => this._setUpColumnResizeEvents())
            .then(() => this._setUpColumnPositionEvents())
            
    }

    get column() {
        return super.column;
    }
    set column(column) {
        super.column = column;
        super.column.headerSubColumn.dataRows.push(this)
    }

    cleanUp(){
        super.cleanUp();
    
        this._columnMouseEnterListeners.forEach(listener => {
            listener.col.detachFromEvent(listener.id);
        });
        this._columnMouseEnterListeners = [];  

        this._cleanEventReposition();
        this._cleanEventResize();
        this._htmlEl4CleanUp = null;
    }

    //#region Column Position

    _setUpColumnPositionEvents() {
        let htmlEl = this.htmlEl;
        let contentHolderDiv = htmlEl.shadowRoot.querySelector('#content-holder-div');
        contentHolderDiv.addEventListener('mousedown', this._eventRepositionMouseDown)
        document.addEventListener('mouseup', this._eventRepositonMouseUp)
    }

    _eventRepositionMouseDown(e) {
        let htmlEl = this.htmlEl;
        let contentHolderDivCopy = htmlEl.shadowRoot.querySelector('#content-holder-div').cloneNode(true);
        contentHolderDivCopy.style.border = "solid 1px blue";
        contentHolderDivCopy.style.padding = "5px 10px";
        contentHolderDivCopy.style.borderRadius = "5px";
        contentHolderDivCopy.style.position = "fixed";
        contentHolderDivCopy.style.left = this.setToPixelVal(e.clientX + 10);
        contentHolderDivCopy.style.top = this.setToPixelVal(e.clientY - 15);
        contentHolderDivCopy.style.backgroundColor = 'white';
        contentHolderDivCopy.setAttribute('class', 'content-holder-copy-div');
        this.column.table.htmlEl.shadowRoot.appendChild(contentHolderDivCopy);
        document.body.style.cursor = "move";
        document.addEventListener('mousemove', this._eventRepositionMouseMove)
        this.column.table.columns.forEach(column => {
            let listener = column.attachToEvent('mouseenter', this._eventRepositionColumnMouseOver);
            this._columnMouseEnterListeners.push(listener);
        }) 
        this._eventRepositionColumnMouseOver.enteredColumn = this.column;
        e.preventDefault();
    }

    _eventRepositonMouseUp(e) {
        let contentHolderDivCopy = this.column.table.htmlEl.shadowRoot.querySelector('.content-holder-copy-div');
        document.body.style.cursor = "unset";
        document.removeEventListener('mousemove', this._eventRepositionMouseMove)
        this._columnMouseEnterListeners.forEach(listener => {
            listener.col.detachFromEvent(listener.id);
        });
        this._columnMouseEnterListeners = [];
        if (contentHolderDivCopy)
            contentHolderDivCopy.remove();
    }

    _eventRepositionMouseMove(e){
        let contentHolderDivCopy = this.column.table.htmlEl.shadowRoot.querySelector('.content-holder-copy-div');
        contentHolderDivCopy.style.left = this.setToPixelVal(e.clientX + 10);
        contentHolderDivCopy.style.top = this.setToPixelVal(e.clientY - 15);
    }

    _eventRepositionColumnMouseOver(e, column){
        if(column.id == this._eventRepositionColumnMouseOver.enteredColumn)
            return
        this._eventRepositionColumnMouseOver.enteredColumn= column.id;            
        if(column.id == this.column.id)
            return
        this.column.table.moveColumn(this.column.position, column.position)
    }

    _cleanEventReposition(){
        let htmlEl = this._htmlEl4CleanUp;
        let contentHolderDiv = htmlEl.shadowRoot.querySelector('#content-holder-div');
        contentHolderDiv.removeEventListener('mousedown', this._eventRepositionMouseDown);
        document.removeEventListener('mouseup', this._eventRepositonMouseUp);
        this._columnMouseEnterListeners.forEach(listener => {
            listener.col.detachFromEvent(listener.id);
        });
    }

    //#endregion Column Position

    //#region Column Resize

    _setUpColumnResizeEvents() {
        let htmlEl = this.htmlEl;
        let resizeDiv = htmlEl.shadowRoot.querySelector('#resize-div');
        let tableHeight = this.column.table.htmlEl.offsetHeight;
        resizeDiv.style.height = this.setToPixelVal(tableHeight - 45);
        resizeDiv.addEventListener('mousedown', this._eventResizeMouseDown);
        document.addEventListener('mouseup', this._eventResizeMouseUp);
    }

    _eventResizeMouseDown(e) {
        let htmlEl = this.htmlEl;
        let resizeWrapperDiv = htmlEl.shadowRoot.querySelector('#resize-wrapper-div');
        let verticalDiv = document.createElement('div');
        verticalDiv.setAttribute('class', "vertical-line");
        let tableHeight = this.column.table.htmlEl.offsetHeight;
        verticalDiv.style.height = this.setToPixelVal(tableHeight - 15); //table height - scroll height
        resizeWrapperDiv.appendChild(verticalDiv)
        this._eventResizeMouseMove.verticalDiv = verticalDiv;
        this._eventResizeMouseMove.clientXOld = void (0);
        document.addEventListener('mousemove', this._eventResizeMouseMove)
        document.body.style.cursor = "col-resize";
    }

    _eventResizeMouseUp(e) {
        let htmlEl = this.htmlEl;
        let verticalDiv = htmlEl.shadowRoot.querySelector('.vertical-line');
        document.removeEventListener('mousemove', this._eventResizeMouseMove);
        document.body.style.cursor = "unset";
        if (verticalDiv) {
            let columnWidth = verticalDiv.offsetLeft + this.htmlEl.offsetWidth - 12; //12 - paddings and borders of cell
            let currColumn = this.column;
            currColumn.width = columnWidth;
            verticalDiv.remove();
        }
    }

    _eventResizeMouseMove(e) {
        let hpos = 0;
        let verticalDiv = this._eventResizeMouseMove.verticalDiv;
        let clientXOld = this._eventResizeMouseMove.clientXOld;
        if (clientXOld)
            hpos = e.clientX - clientXOld;
        this._eventResizeMouseMove.clientXOld = e.clientX;
        verticalDiv.style.left = this.setToPixelVal(verticalDiv.offsetLeft + hpos);
        e.preventDefault();
    }

    _cleanEventResize(){
        let htmlEl = this._htmlEl4CleanUp;
        let resizeDiv = htmlEl.shadowRoot.querySelector('#resize-div');
        resizeDiv.style.height = this.setToPixelVal(htmlEl.offsetHeight);
        resizeDiv.removeEventListener('mousedown', this._eventResizeMouseDown);
        document.removeEventListener('mouseup', this._eventResizeMouseUp);
        document.removeEventListener('mousemove', this._eventResizeMouseMove);
    }
    //#endregion Column Resize
}