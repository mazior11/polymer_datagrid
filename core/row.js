import BaseEl from "./base-el";

export default class Row extends BaseEl {
    constructor(table) {
        super();
        this.table = table;
        this.dataColumns = [];
        this.id;
        this.number;
    }

    get isRender() {
        let index = this.dataColumns.findIndex(el => !el.isRender)
        return !(~index)
    }

    removeElement(dataColumn){
        if(!this.dataColumns || this.dataColumns.length <= 0)
            return undefined;
        let dataColumnIndex = this.dataColumns.find(dataColumn);
        return this._removeElementAt(dataColumnIndex);
    }

    removeElementFunc(func){
        if(!this.dataColumns || this.dataColumns.length <= 0)
            return undefined;
        let dataColumnIndex = this.dataColumns.findIndex(func);
        return this._removeElementAt(dataColumnIndex);
    }

    _removeElementAt(dataColumnIndex){
        return this.dataColumns.splice(dataColumnIndex, 1);
    }

    Dispose(){
        super.Dispose();
        this.table = null;
        this.dataColumns.forEach(dataColumn => dataColumn.Dispose())
        this.dataColumns = null;
    }
}