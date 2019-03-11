import { EventManager } from "./core";
export class Dispose {
    constructor(){
        this._isDisposed = false;
    }

    get isDisposed(){
        return this._isDisposed;
    }

    Dispose(){
        if(this._isDisposed)
            return;
        this._isDisposed = true;
    }
    
}

export default class BaseEl extends Dispose {
    constructor() {
        super();
        this._isHTMLELReady = false;
        this._isHTMLELConnected = false;
        this._htmlEL;
        this._whenHTMLElReadyEM = EventManager.createOneTimeEM();
        this._whenHTMLElConnectedEM = EventManager.createOneTimeEM();
        this._whenObjectConstructedEM = EventManager.createOneTimeEM();
        this._whenDataChangedEM = EventManager.createOneTimeEM();
        this.whenHTMLElReady = this._whenHTMLElReadyEM.eventPromise;
        this.whenHTMLElConnected = this._whenHTMLElConnectedEM.eventPromise;
        this.whenObjectConstructed = this._whenObjectConstructedEM.eventPromise;
        this.whenDataChanged = this._whenDataChangedEM.eventPromise;
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
            this._whenHTMLElReadyEM.eventEmiter.next();
        else
            this._whenHTMLElReadyEM.eventEmiter.throw();
    }

    get isHTMLELConnected() {
        return this._isHTMLELConnected;
    }

    set isHTMLELConnected(value) {
        this._isHTMLELConnected = value;
        if (value)
            this._whenHTMLElConnectedEM.eventEmiter.next();
        else
            this._whenHTMLElConnectedEM.eventEmiter.throw();
    }



    setToPixelVal(value){
        return value + 'px';
    }

    Dispose(){
        super.Dispose();
        this._htmlEL = null;
    }
}