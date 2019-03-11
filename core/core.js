import * as rxjs  from "rxjs";
import * as rxjsOperators  from 'rxjs/operators';

export let bindParams = function(func, ...bindedParams){
    return function(params){
        func(params, ...bindedParams)
    }
}

export let generateUUID = function() {
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


class OneTimeEventManager {
    constructor(){
        this.eventEmiter;
        this.eventPromise = rxjs.Observable.create(e => this.eventEmiter = e)
        .pipe(rxjsOperators.first())
        .toPromise();
    }
}

class MutliEventManager {
    constructor(){
        this.eventEmiter;
        this.eventPromise = rxjs.Observable.create(e => this.eventEmiter = e);
    }
}

export let EventManager = {
    createOneTimeEM(){
        return new OneTimeEventManager();
    },
    createEM(){
        return new MutliEventManager();
    }
}

