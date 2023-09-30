const defaultOptions = {
  data: [],
  label: 'New Label',
  link: '',
  value: 0,
};

export default class ColumnChart {

  chartHeight = 50;

  constructor(options = defaultOptions) {
    this.data = options.data || defaultOptions.data;
    this.label = options.label || defaultOptions.label ;
    this.value = options.value;
    this.link = options.link;
    this.formatHeading = options.formatHeading;

    this.element = this.render();
  }

  prepareCols() {
    const yMax = this.data.length ? Math.max(...this.data) : 0;
    const yRatio = yMax ? this.chartHeight / yMax : 0;

    this.colData = this.data.map(value => ({
      colHeight: String(Math.floor(value * yRatio)),
      tooltipValue: (value / yMax * 100).toFixed(0) + '%'
    }));

    return this.colData.map(col => {
      return `<div style="--value: ${col.colHeight}" data-tooltip="${col.tooltipValue}"></div>`;
    }).join('');
  }

  createTemplate() {
    const link = this.link
      ? `<a href="/${this.link}" class="column-chart__link">View all</a>`
      : '';
    this.value = this.formatHeading ? this.formatHeading(this.value) : this.value;
    const cols = this.prepareCols();

    return (
      `
      <div class="column-chart" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">Total ${this.label}${link}</div>
        <div class="column-chart__container">
          <div
            data-element="header"
            class="column-chart__header"
          >
            ${this.value}
          </div>
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
    if (!this.data.length) {
      element.classList.add('column-chart_loading');
    }
    element.innerHTML = this.createTemplate();

    return element;
  }

  render() {
    return this.createElement();
  }
}
