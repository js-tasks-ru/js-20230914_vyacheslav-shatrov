export default class SortableTable {
  element;

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.sortedField = null;
    this.orderValue = null;

    this.render();
    // this.subElements = {
    //   header: this.element.querySelector('[data-element="header"]'),
    //   body: this.element.querySelector('[data-element="body"]'),
    // };
  }

  createHeaderCell(cellConfig) {
    let orderDirection = '';
    let headerCell = '';

    if (this.sortedField) {
      orderDirection = this.orderValue === "asc" ? `data-order="asc"` : `data-order="desc"`;
    }

    headerCell = `
      <div class="sortable-table__cell" data-id="${cellConfig.id}" data-sortable="true" ${orderDirection}>
        <span>${cellConfig.title}</span>
          ${cellConfig.id === this.sortedField ? this.createArrow() : ""}
      </div>
    `;

    return headerCell;
  }

  createArrow() {
    return `
      <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>
    `;
  }
  createCell(cellData) {
    return `<div class="sortable-table__cell">${cellData}</div>`;
  }

  createHeaderTemplate() {
    const cells = this.headerConfig.map(cellConfig => {
      return this.createHeaderCell(cellConfig);
    }).join('');

    const headerTemplate = `
      <div data-element="header" class="sortable-table__header sortable-table__row">
        ${cells}
      </div>
    `;

    return headerTemplate;
  }

  createBodyTemplate() {

    const rowsTemplate = this.data.map(rowData => {
      return this.createRowTemplate(rowData);
    }).join('');

    const bodyTemplate = `
    <div data-element="body" class="sortable-table__body">
      ${rowsTemplate}
    </div>
    `;

    return bodyTemplate;
  }

  createRowTemplate(rowData) {

    const rowTemplate = `
      <a href="${rowData.id}" class="sortable-table__row">

          <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/246743.jpg">
        ${this.createCell(rowData.title)}

        ${this.createCell(rowData.quantity)}
        ${this.createCell(rowData.price)}
        ${this.createCell(rowData.sales)}
      </a>
    `;

    return rowTemplate;
  }

  createTableTemplate() {
    const headerTemplate = this.createHeaderTemplate();

    const bodyTemplate = this.createBodyTemplate();

    return `
      <div class="sortable-table">
        ${headerTemplate}
        ${bodyTemplate}
      </div>
    `;
  }

  sortNumberValues(data, fieldValue, orderValue) {
    if (orderValue === 'asc') {
      data.sort((x, y) => x[fieldValue] - y[fieldValue]);
    } else if (orderValue === 'desc') {
      data.sort((x, y) => y[fieldValue] - x[fieldValue]);
    }

    return data;
  }

  sortStringValues(data, fieldValue, orderValue) {
    const locales = ['ru-RU-u-kf-upper', 'en-US-u-kf-upper'];

    if (orderValue === 'asc') {
      data.sort((x, y) => x[fieldValue].localeCompare(y[fieldValue], locales));
    } else if (orderValue === 'desc') {
      data.sort((x, y) => y[fieldValue].localeCompare(x[fieldValue], locales));
    }

    return data;
  }

  createElement(template) {

    this.element = document.createElement('div');
    this.element.classList.add('products-list__container');
    this.element.dataset.element = "productsContainer";
    this.element.innerHTML = template;

    return this.element;
  }

  sort(fieldValue, orderValue) {

    const newData = [...this.data];
    this.sortedField = fieldValue;
    this.orderValue = orderValue;
    if (typeof newData[0][fieldValue] === 'string') {
      this.data = this.sortStringValues(newData, fieldValue, orderValue);
    } else {
      this.data = this.sortNumberValues(newData, fieldValue, orderValue);
    }

    this.element = this.createElement(this.createTableTemplate());

  }

  render() {
    this.createElement(this.createTableTemplate());
  }
  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}

