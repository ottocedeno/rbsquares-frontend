class Utility {
  static renderError(error) {
    alert(error);
  }

  static createSectionLabel(labelText) {
    const label = document.createElement("h2");
    label.className = "section-label";
    label.innerText = labelText;
    return label;
  }

  static createDimBackground() {
    const dimContainer = document.createElement("div");
    dimContainer.className = "dim-container";
    return dimContainer;
  }

  static removeCard(card) {
    let container = card.parentNode;
    container.previousElementSibling.remove();
    container.remove();
  }
}
