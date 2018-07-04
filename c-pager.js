import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import CTd from "./c-td";

export default class CPager extends PolymerElement {
    static get template() {
        return html`
    <style>

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
                value: 'c-pager',
            },
            url: {
                type: String,
                value: "",
            },
            pageNumber: {
                type: Number,
                value: 1
            },
            numOfPages: {
                type: Number,
                value: 1,
            },
            pages: {
                type: Array,
                computed: "_computePages(numOfPages)"
              },
        };
    }

    ready() {
        super.ready();
    }

    _computePages(numOfPages) {
        return [...Array(numOfPages).keys()]
      }
}

window.customElements.define('c-pager', CTr);
