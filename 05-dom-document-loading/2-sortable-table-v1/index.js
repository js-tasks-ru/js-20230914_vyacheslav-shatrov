export default class SortableTable {

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.sortedField = null;
    this.orderValue = null;

    this.render();
    this.subElements = { body: this.element.querySelector('[data-element="body"]') };

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

  createCell(config, cellData) {
    if (config.id === 'images') {
      return this.headerConfig[0].template(cellData.images[0]);
    } else {
      return `<div class="sortable-table__cell">${cellData[config.id]}</div>`;
    }
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

    const rowsTemplate = this.data.map((rowData, i) => {
      return this.createRowTemplate(rowData, i);
    }).join('');

    const bodyTemplate = `
    <div data-element="body" class="sortable-table__body">
      ${rowsTemplate}
    </div>
    `;

    return bodyTemplate;
  }

  createRowTemplate(rowData, rowIndex) {
    let rowTemplate = '';
    for (let i = 0; i < this.headerConfig.length; i++) {
      const config = this.headerConfig[i];
      const cellData = this.data[rowIndex];

      rowTemplate += this.createCell(config, cellData);
    }

    return `
      <a href="${rowData.id}" class="sortable-table__row">
        ${rowTemplate}
      </a>
    `;
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

    this.subElements = { body: this.element.querySelector('[data-element="body"]') };

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

    this.render();
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

