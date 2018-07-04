import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import CTd from "./c-td";

export default class CTr extends PolymerElement {
    static get template() {
        return html`
    <style>
        :host {
            padding: 0;
            margin: 0;
            list-style: none;
    
            -ms-box-orient: horizontal;
            display: -webkit-box;
            display: -moz-box;
            display: -ms-flexbox;
            display: -moz-flex;
            display: -webkit-flex;
            display: flex;
    
            -webkit-flex-flow: row;
            flex-flow: row;
        }
    </style>
    <template is="dom-repeat" items="{{rowData}}">
        <c-td cell-data="{{item}}" col-number="[[index]]" row-number="[[rowNumber]]" type="{{type}}"></c-td>
    </template>
    `;
    }
    static get properties() {
        return {
            prop1: {
                type: String,
                value: 'c-tr',
            },
            rowData: {
                type: "Array",
                reflectToAttribute: true,
            },
            type: {
                type: "string",
                reflectToAttribute: true,
            },
            rowNumber: {
                type: "number",
                reflectToAttribute: true,
            }
        };
    }

    ready() {
        super.ready();
        if (this.rowData.length > 0) {
            this.rowData[0].row.htmlEL = this;
        }
    }
}

window.customElements.define('c-tr', CTr);
