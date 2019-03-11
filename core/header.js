import BaseBody from "./base-body";
import HeaderData from "./data-header"
import ENUMS from "./enums";

export default class Header extends BaseBody {
    constructor(table) {
        super(table);
        this.type = ENUMS.ELEMENT_TYPE.HEADER;
    }

    processData(data){
        data = [data[0]]
        let processData = data.map((obj, index) => {
            this.createRow(index)
            return this.columns.map((col) => {
                let value = col.headerName;
                let column = this.getColumn(col.id)
                let row = this.getRow(index);
                let headerData = new HeaderData(value, column, row);
                return headerData;
          });
        })
        this.isDataReady = true;
        return processData
    }

    Dispose(){
        super.Dispose();
    }

}