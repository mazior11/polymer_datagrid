export default class LazyPromise {
    constructor(onFulfilled, onRejected) {
        this._then = [];
        this._onFulfilled = onFulfilled;
        this._onRejected = onRejected;
        this._resolveValue;
        this.then = this.then.bind(this);
        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this);
        this.state = LazyPromise.state.DEFERRED;
        this._promise;
    }

    then(onFulfilled, onRejected) {
        let lazyPromise = new LazyPromise(onFulfilled, onRejected)
        this._then.push(lazyPromise);
        if (this.state === LazyPromise.state.RESOLVE)
            lazyPromise.resolve(this._resolveValue);
        else if (this.state === LazyPromise.state.REJECT)
            lazyPromise.reject();
        return lazyPromise;
    }

    resolve(val) {
        this._resolveValue = val;
        this._promise = Promise.resolve().then(this._onFulfilled);
        this._then.forEach(lazyPromise => {
            this._promise.then(() => lazyPromise.resolve(val))
        })
        this.state = LazyPromise.state.RESOLVE;
        return this._promise;
    }

    reject() {
        this._promise = Promise.reject().then(this._onRejected);
        this._then.forEach(lazyPromise => {
            this._promise.then(() => lazyPromise.reject())
        })
        this.state = LazyPromise.state.REJECT;
        this._promise;
    }
}

LazyPromise.state = {
    "RESOLVE": 0,
    "REJECT": 1,
    "DEFERRED": 2
}