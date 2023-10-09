export default class SortableTable {
  element;

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.sortedField = null;
    this.element = this.render();
  }

  createHeaderCell(cellConfig) {
    let orderDirection = '';
    let headerCell = '';

    orderDirection = order.value === "asc" ? `data-order="asc"` : `data-order="desc"`;

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

    const rowsTemplate = this.data.map(rowData => {
      return this.createRowTemplate(rowData);
    }).join('');

    return `
      <div class="sortable-table">
        ${headerTemplate}
        ${rowsTemplate}
      </div>
    `;
  }

  sort(fieldValue, orderValue) {
    const newData = [...this.data];
    this.sortedField = fieldValue;
    if (typeof newData[0][fieldValue] === 'string') {
      this.data = this.sortStringValues(newData, fieldValue, orderValue);
    } else {
      this.data = this.sortNumberValues(newData, fieldValue, orderValue);
    }

    return this.update();
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

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

  update() {
    const root = document.getElementById('root');
    root.innerHTML = '';

    this.element = document.createElement('div');
    this.element.classList.add('products-list__container');
    this.element.dataset.element = "productsContainer";
    this.element.innerHTML = this.createTableTemplate();
    root.append(this.element);
    return this.element;
  }

  render() {
    return this.update();
  }
}

