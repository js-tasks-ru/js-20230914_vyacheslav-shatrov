export default class NotificationMessage {

  element;

  constructor(title, options = {}) {
    this.title = title || '';
    this.duration = options.duration || 0;
    this.type = options.type || 'error';

    this.element = this.render();
  }

  createTemplate() {
    return `
      <div class="notification success" style="--value:${this.duration}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">
            ${this.title}
          </div>
        </div>
      </div>
    `;
  }

  createElement() {
    const element = document.createDocumentFragment();
    element.innerHTML = this.createTemplate();
    return element;
  }

  show() {
    this.element = this.createElement();

    return document.getElementById('btn1').append(this.element);
    // setTimeout(() => {
    //   this.destroy(element);
    // }, this.duration);

  }

  render() {
    return this.createElement();
  }

  destroy(element) {
    element.remove();
  }
}
