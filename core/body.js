import BaseBody from "./base-body";
import ENUMS from "./enums"

export default class Body extends BaseBody {
    constructor(table) {
        super(table);
        this.type = ENUMS.ELEMENT_TYPE.BODY;
    }

    cleanUp(){
        super.cleanUp();
    }
}