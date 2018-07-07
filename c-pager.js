import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import {GridConfiguration} from "./core/index"
import CTd from "./c-td";

export default class CPager extends PolymerElement {
    static get template() {
        return html`
    <style>

    </style>
    <template is="dom-repeat" items="{{pages}}">
        <a href="">{{item}}</a>
    </template>
    `;
    }
    static get properties() {
        return {
            prop1: {
                type: String,
                value: 'c-pager',
            },
            gridConfiguration: {
                type: Object,
                value: {}
            },
            data: {
                type: Array,
            },
            pages: {
                type: Array,
                computed: "_computePages(gridConfiguration.numOfPages)"
              },
        };
    }

    ready() {
        super.ready();
        // this.data = axios.get(gridConfiguration.urlCompile(gridConfiguration))
    }

    _computePages(numOfPages) {
        return [...Array(numOfPages).keys()]
      }
}

window.customElements.define('c-pager', CPager);
