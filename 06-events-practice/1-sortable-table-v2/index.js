import { default as SortableTableV1 } from "../../05-dom-document-loading/2-sortable-table-v1/index.js";

export default class SortableTable extends SortableTableV1 {
  arrow;

  constructor(headerConfig = [], options = {}) {
    super(headerConfig, options.data);
    this.data = options.data;
    this.sortedField = 'title';
    this.render();

    this.subElements = {
      body: this.element.querySelector('[data-element="body"]'),
      header: this.element.querySelector('[data-element="header"]'),
    };

    this.subElements.header.addEventListener("pointerdown", this.onSortClick);

  }

  onSortClick = (e) => {
    const sortedCell = e.target.closest(".sortable-table__cell");

    if (SortableTable.arrow) {
      SortableTable.arrow.remove();
    }

    if (sortedCell.dataset.sortable === "true") {
      const field = sortedCell.dataset.id;
      const order = sortedCell.dataset.order === "desc" ? "asc" : "desc";

      this.subElements.header.innerHTML = this.createSortedHeaderTemplate(field, order);
      this.subElements.body.innerHTML = this.createBodyTemplate();
    }
  }

  createSortedHeaderTemplate(fieldValue, orderValue) {

    const newData = [...this.data];
    this.sortedField = fieldValue;
    this.orderValue = orderValue;
    if (typeof newData[0][fieldValue] === 'string') {
      this.data = this.sortStringValues(newData, fieldValue, orderValue);
    } else {
      this.data = this.sortNumberValues(newData, fieldValue, orderValue);
    }

    const cells = this.headerConfig.map(cellConfig => {
      return this.createHeaderCell(cellConfig);
    }).join('');

    return cells;
  }

  destroy() {
    super.destroy();
    this.subElements.header.removeEventListener("pointerdown", this.onSortClick);
  }
}
