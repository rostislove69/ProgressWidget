class ProgressWidget {
  constructor() {
    this.view = null;
  }

  async initialize() {
    await this._loadTemplate();
    this._setupEventListeners();
  }

  setValue(value) {
    const progressbar = this.view.querySelector(".progressbar");
    progressbar.style.setProperty("--value", value);
  }

  enableAnimation() {
    const animationCheckbox = this.view.querySelector(".animation");
    const progressbar = this.view.querySelector(".progressbar");
    animationCheckbox.checked = true;
    progressbar.classList.add("animated");
  }

  disableAnimation() {
    const animationCheckbox = this.view.querySelector(".animation");
    const progressbar = this.view.querySelector(".progressbar");
    animationCheckbox.checked = false;
    progressbar.classList.remove("animated");
  }

  showWidget() {
    const visabilityCheckbox = this.view.querySelector(".visability");
    visabilityCheckbox.checked = false;
    this.view.classList.remove("hide");
  }

  hideWidget() {
    const visabilityCheckbox = this.view.querySelector(".visability");
    visabilityCheckbox.checked = true;
    this.view.classList.add("hide");
  }

  _loadTemplate() {
    return fetch("./components/progress-widget/progress-widget.html")
      .then((response) => response.text())
      .then((html) => {
        const div = document.createElement("div");
        div.innerHTML = html.trim();
        this.view = div.firstChild;
        document.body.prepend(this.view);
      })
      .catch((error) => console.error("Error loading template:", error));
  }

  _setupEventListeners() {
    const valueInput = this.view.querySelector(".controll-bar__value-input");
    const animationCheckbox = this.view.querySelector(".animation");
    const visabilityCheckbox = this.view.querySelector(".visability");

    valueInput.addEventListener("input", () => {
      let value = valueInput.value;
      if (value === "") {
        value = 0;
      } else if (value < 0) {
        valueInput.value = 0;
        value = 0;
      } else if (value > 100) {
        valueInput.value = 100;
        value = 100;
      }
      this.setValue(value);
    });

    animationCheckbox.addEventListener("change", () => {
      if (animationCheckbox.checked) {
        this.enableAnimation();
      } else {
        this.disableAnimation();
      }
    });

    visabilityCheckbox.addEventListener("change", () => {
      if (visabilityCheckbox.checked) {
        this.hideWidget();
      } else {
        this.showWidget();
      }
    });
  }
}

export const progressWidget = new ProgressWidget();
