import ideaBox from "./ideaBox";

/**
 * Creates and controls the state of an idea box.
 * @param {HTMLDivElement} gridCell
 * @param {HTMLDivElement} gridContiner
 */
export default function (gridCell, gridContiner) {
  const ideaContainer = document.createElement("div");
  const initialStatus = "closed";
  const root = document.body;

  ideaContainer.classList.add("idea-container", initialStatus);
  gridCell.appendChild(ideaContainer);

  const ibView = ideaBox(ideaContainer);

  const containerController = {
    gridCell,
    status: initialStatus,
    ideaContainer,
    /** @type DOMRect */
    cellPosition: null,
    open() {
      const rect = ideaContainer.getBoundingClientRect();
      this.status = "opened";
      this.cellPosition = rect;

      ideaContainer.remove();
      root.appendChild(ideaContainer);

      ideaContainer.classList.replace("closed", "opened");

      ideaContainer.style.top = `${rect.top}px`;
      ideaContainer.style.left = `${rect.left}px`;
      ideaContainer.style.width = `${rect.width}px`;
      ideaContainer.style.height = `${rect.height}px`;

      const gr = gridContiner.getBoundingClientRect();
      const tox = rect.left - gr.left + rect.width / 2;
      const toy = rect.top - gr.top + rect.height / 2;
      gridContiner.style.transformOrigin = `${tox}px ${toy}px`;

      gridContiner.classList.add("disapeared");
      ibView.open();
    },
    close() {
      ideaContainer.classList.replace("opened", "closed");
      this.status = "closed";
      gridContiner.classList.remove("disapeared");
    },
    toggleStatus() {
      if (this.status === "closed") this.open();
      else this.close();
    },
    init() {
      ideaContainer.onclick = this.toggleStatus.bind(this);
    }
  };

  containerController.init();
  return containerController;
}
