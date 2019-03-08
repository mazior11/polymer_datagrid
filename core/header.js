import BaseBody from "./base-body";
import ENUMS from "./enums";

export default class Header extends BaseBody {
    constructor(table) {
        super(table);
        this.type = ENUMS.ELEMENT_TYPE.HEADER;
    }

    Dispose(){
        super.Dispose();
    }

}