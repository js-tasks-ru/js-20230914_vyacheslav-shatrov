const defaultParams = {
  data: [],
  link: '',
  value: 0,
};

export default class ColumnChart {
  constructor(options = defaultParams) {
    this.data = options.data;
    this.label = options.label;
    this.value = options.value;
    this.link = options.link;

    this.element = this.createElement();
  }

  prepareCols() {
    this.colData = this.data.map(value => ({
      value: value / 2,
      tooltipValue: value
    }));

    return this.colData.map(col => {
      return `<div style="--value: ${col.value}" data-tooltip="${col.tooltipValue}%"></div>`;
    }).join('');
  }

  template() {
    const loading = !this.data.length ? 'column-chart_loading' : '';
    const link = this.link
      ? `<a href="/${this.link}" class="column-chart__link">View all</a>`
      : '';
    const cols = this.prepareCols();

    return (
      `
      <div class="column-chart ${loading}" style="--chart-height: 50">
      <div class="column-chart__title">Total ${this.label}${link}</div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">$${this.value}</div>
        <div data-element="body" class="column-chart__chart">
          ${cols}
        </div>
      </div>
    </div>`
    );
  }

  update(data) {
    this.data = data;
    this.createElement();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

  createElement() {
    const element = document.createElement('div');
    element.innerHTML = this.template();

    return element;
  }
}
