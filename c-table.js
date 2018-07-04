import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import Table, { BodyData, HeaderData, ENUMS } from "./core/index";
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
      <c-pager></c-pager>
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
        type: "array",
        value: [],
      },
      columns: {
        type: "array",
        value: []
      },
      table: {
        type: "object",
        value: new Table()
      },
      headerData: {
        type: "array",
        value: [],
        computed: '_processHeaderData(data)'
      },
      bodyData: {
        type: "array",
        value: [],
        computed: '_processBodyData(data)'
      },
      bodyType: {
        type: "object",
        value: ENUMS.ELEMENT_TYPE
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

  _processBodyData(data) {
    let processData = data.map((obj, index) => {
      return this.columns.map((col) => {
        let bodyData = new BodyData();
        bodyData.value = col.html(obj);
        bodyData.column = this.table.body.getOrCreateColumn(col.id)
        bodyData.row = this.table.body.getOrCreateRow(index);
        return bodyData;
      });
    })
    this.table.body.isDataReady = true;
    return processData;
  }

  _processHeaderData(data) {
    //set columns before process any data
    if (this.autoGenerateColumns)
      this.columns = this._toColumns(this.data[0]);

    data = [data[0]]
    let processData = data.map((obj, index) => {
      return this.columns.map((col) => {
        let headerData = new HeaderData();
        headerData.value = col.header;
        headerData.column = this.table.header.getOrCreateColumn(col.id)
        headerData.row = this.table.header.getOrCreateRow(index);
        return headerData;
      });
    })
    this.table.header.isDataReady = true;
    return processData
  }

  _toColumns(obj) {
    return Object.keys(obj).map(function (key, index) {
      return {
        id: key,
        header: key,
        html: (obj) => obj[key]
      };
    });
  }
}

window.customElements.define('c-table', CTable);
