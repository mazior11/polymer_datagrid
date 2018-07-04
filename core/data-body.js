import Data from "./data";
import ENUMS from "./enums";

export default class BodyData extends Data {
    constructor(){
        super();
        this.type = ENUMS.ELEMENT_TYPE.BODY;
    }

    get column() {
        return super.column;
    }
    set column(column) {
        super.column = column;
        super.column.bodySubColumn.dataRows.push(this)
    }

    cleanUp(){
        super.cleanUp();
    }
}