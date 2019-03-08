import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
// import * as sanitize from "sanitize-html"

export default class CTd extends PolymerElement {
    constructor() {
        super();
        this.firstRowNumber = 0;
    }

    static get template() {
        return html`
        <style>
            :host {
                border-right: solid black 1px;
                border-bottom: solid black 1px;
                display: inline-block;
                padding: 5px;
                flex-shrink: 0;
            }
        
            #resize-wrapper-div {
                position: relative;
                float: right;
            }
        
            #resize-div {
                width: 1px;
                background: transparent;
                position: absolute;
                top: -10px;
                right: -11px;
                border: 5px solid transparent;
            }
        
            #resize-div:hover {
                cursor: col-resize;
            }
        
            .vertical-line {
                width: 0;
                height: 400px;
                position: absolute;
                top: -5px;
                right: -5px;
                border-right: 2px dashed black;
            }
        
            #content-holder-div {
                overflow: hidden;
                float: left;
                width: 99%;
                word-wrap: break-word;
            }
        </style>
        <div id='content-holder-div'>
        <div>{{cellValue}}</div>
        </template>
        </div>
        <template is="dom-if" if="{{_isEqualTo(type, 'HEADER')}}">
            <div id='resize-wrapper-div'>
                <div id="resize-div">
                </div>
            </div>
        </template>
      `;
    }
    static get properties() {
        return {
            prop1: {
                type: String,
                value: 'c-td',
            },
            cellData: {
                type: "Object",
                reflectToAttribute: true,
            },
            cellValue: {
                type: "string",
                computed: "_getCellValue(cellData)"
            },
            type: {
                type: "string",
                reflectToAttribute: true,
            },
            rowNumber: {
                type: "number",
                reflectToAttribute: true,
            },
            colNumber: {
                type: "number",
                reflectToAttribute: true,
            }
        };
    }

    connectedCallback() {
        super.connectedCallback();
        this.cellData.isHTMLELConnected = true;
    }

    ready() {
        super.ready();
        this.cellData.htmlEl = this;
        this.cellData.isHTMLELReady = true;
    }

    _getCellValue(cellData) {
        return cellData.value;
    }

    _isEqualTo(variable, value) {
        return variable == value;
    }

    _sanitizeHtml(value){
        return sanitize(value);
    }

}


window.customElements.define('c-td', CTd);
