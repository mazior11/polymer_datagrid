import BaseBody from "./base-body";
import BodyData from "./data-body"
import ENUMS from "./enums"

export default class Body extends BaseBody {
    constructor(table) {
        super(table);
        this.type = ENUMS.ELEMENT_TYPE.BODY;
    }

    processData(data) {
        let processData = data.map((obj, index) => {
            this.createRow(index)
            return this.columns.map((col) => {
                let value = col.html(obj);
                let column = this.getColumn(col.id)
                let row = this.getRow(index);
                let bodyData = new BodyData(value, column, row);
                return bodyData;
          });
        })
        this.isDataReady = true;
        return processData;
      }

    Dispose(){
        super.Dispose();
    }
}