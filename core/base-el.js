import LazyPromise from "./lazy-promise";

export class CleanUp {
    constructor(){
        this._wasCleanUp = false;
    }

    get wasCleanUp(){
        return this._wasCleanUp;
    }

    cleanUp(){
        if(this._wasCleanUp)
            return;
        this._wasCleanUp = true;
    }
    
}

export default class BaseEl extends CleanUp {
    constructor() {
        super();
        this._isHTMLELReady = false;
        this._isHTMLELConnected = false;
        this._htmlEL;
        this.whenHTMLElReady = new LazyPromise();
        this.whenHTMLElConnected = new LazyPromise();
        this.whenObjectConstructed = new LazyPromise();
        this.whenDataChanged = new LazyPromise();
    }

    get htmlEL() {
        return this._htmlEL;
    }

    set htmlEL(value) {
        this._htmlEL = value;
    }

    get isHTMLELReady() {
        return this._isHTMLELReady;
    }

    set isHTMLELReady(value) {
        this._isHTMLELReady = value;
        if (value)
            this.whenHTMLElReady.resolve();
        else
            this.whenHTMLElReady.reject();
    }

    get isHTMLELConnected() {
        return this._isHTMLELConnected;
    }

    set isHTMLELConnected(value) {
        this._isHTMLELConnected = value;
        if (value)
            this.whenHTMLElConnected.resolve();
        else
            this.whenHTMLElConnected.reject();
    }



    setToPixelVal(value){
        return value + 'px';
    }

    cleanUp(){
        super.cleanUp();
        this._htmlEL = null;
    }
}