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
}
