import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import Table, { ENUMS, GridConfiguration } from "./core/index";
import CBody from "./c-body";
import CPager from "./c-pager"

export default class CTable extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          resize: both;
          border: 1px solid black;
        }
      </style>
      <div style="overflow-x: hidden;">
        <div id="header-wrapper-div">
          <c-body data={{headerData}} type="{{bodyType.HEADER}}" id="header" style="position: relative;"></c-body>
        </div>
        <div id="body-wrapper-div" style="max-height: 400px; overflow: scroll;">
          <c-body data={{bodyData}} type="{{bodyType.BODY}}" id="body"></c-body>
        </div>
      </div>
      <c-pager data={{data}} grid-configuration="{{gridConfiguration}}"></c-pager>
      <slot style='display: none'>
        <slot>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'c-table',
      },
      data: {
        type: Array,
        observer: "_processData"
      },
      gridConfiguration: {
        type: Object,
        value: new GridConfiguration()
      },
      columns: {
        type: Array,
        value: []
      },
      table: {
        type: Object,
        value: new Table()
      },
      headerData: {
        type: Array,
        value: [],
      },
      bodyData: {
        type: Array,
        value: [],
      },
      bodyType: {
        type: Object,
        value: ENUMS.ELEMENT_TYPE
      },
      autoPaging: {
        type: Boolean,
      },
      autoGenerateColumns: {
        type: Boolean,
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
  }

  ready() {
    super.ready();
    this.table.htmlEl = this;
  }

  _processData(data){
    //set columns before process any data
    if (this.autoGenerateColumns)
      this.columns = this._toColumns(this.data[0]);

    this.table.createColumnsFromDefinition(this.columns);

    this.headerData = this.table.header.processData(data);
    this.bodyData = this.table.body.processData(data);
  }

  _toColumns(obj) {
    return Object.keys(obj).map(function (key, index) {
      return {
        id: key,
        headerName: key
      };
    });
  }
}

window.customElements.define('c-table', CTable);
