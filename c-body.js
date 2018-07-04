import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import CTr from "./c-tr";

export default class CBody extends PolymerElement {
    static get template() {
        return html`
    <style>
        :host {
            <!-- display: table;
            table-layout: fixed; -->
        }
    </style>
    <template is="dom-repeat" items="{{data}}">
        <c-tr row-number="[[index]]" row-data="{{item}}" type="{{type}}"></c-tr>
    </template>
    `;
    }
    static get properties() {
        return {
            prop1: {
                type: String,
                value: 'c-body',
            },
            data: {
                type: "Array",
                reflectToAttribute: true,
            },
            type: {
                type: "string",
            }
        };
    }

    //some helpers
    _foreachRow(data, rowFunc, filter) {
        data.forEach(rowFunc)
    }

    _foreachCell(data, cellFunc) {
        let rowFunc = row => row.forEach(cellFunc);
        this._foreachRow(data, rowFunc)
    }
}

window.customElements.define('c-body', CBody);