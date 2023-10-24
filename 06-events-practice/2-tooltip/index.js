class Tooltip {
  static instance;
  element;

  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }

    Tooltip.instance = this;
  }

  initialize () {
    this.initEventListeners();
  }


  initEventListeners() {
    document.addEventListener('pointerover', this.onPointerOver);
    document.addEventListener('pointerout', this.onPointerOut);
  }

  onPointerOver = e => {
    const element = e.target.closest('[data-tooltip]');

    if (element) {
      this.render(element.dataset.tooltip);
      document.addEventListener('pointermove', this.onPointerMove);
    }
  };

  onPointerOut = () => {
    this.remove();
  }

  onPointerMove = (e) => {
    // const delta = 10;
    const left = e.clientX;
    const top = e.clientY;

    this.element.style.left = left + 'px';
    this.element.style.top = top + 'px';
  }

  render(elementTemplate) {
    this.element = document.createElement('div');
    this.element.className = 'tooltip';
    this.element.innerHTML = elementTemplate;

    document.body.append(this.element);
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    document.removeEventListener('pointerover', this.onPointerOver);
    document.removeEventListener('pointerout', this.onPointerOut);
    document.removeEventListener('pointermove', this.onPointerMove);
    this.remove();
    this.element = null;
  }
}

export default Tooltip;
