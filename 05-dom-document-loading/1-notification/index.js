export default class NotificationMessage {

  static currentMessage = null;

  constructor(title = '', options = {}) {
    this.title = title;
    this.duration = options.duration;
    this.type = options.type;

    this.element = this.createElement();
  }

  createTemplate() {
    return `
      <div class="timer"></div>
      <div class="inner-wrapper">
        <div class="notification-header">${this.type}</div>
        <div class="notification-body">
          ${this.title}
        </div>
      </div>
    `;
  }

  createElement() {
    const element = document.createElement('div');
    element.classList.add("notification", this.type);
    element.setAttribute("style", `--value: ${this.duration / 1000}s;`);
    element.innerHTML = this.createTemplate();
    return element;
  }

  show(parentElement = document.body) {
    if (NotificationMessage.currentMessage) {
      NotificationMessage.currentMessage.destroy();
    }

    NotificationMessage.currentMessage = this;

    parentElement.append(this.element);
    this.timer = setTimeout(() => {
      this.destroy();
    }, this.duration);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    clearTimeout(this.timer);
    this.timer = null;
    this.remove();
    NotificationMessage.currentMessage = null;
  }
}
