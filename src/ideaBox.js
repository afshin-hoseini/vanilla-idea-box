import "./ideaBox.css";
/**
 *
 * @param {HTMLDivElement} container
 */
export default function (container) {
  const contentDiv = document.createElement("div");
  const userInfoDiv = document.createElement("div");
  const textContentDiv = document.createElement("div");
  const headerInfo = document.createElement("div");

  contentDiv.classList.add("ib-content");
  userInfoDiv.classList.add("ib-user-info");
  textContentDiv.classList.add("ib-text");

  headerInfo.classList.add("id-header-info");

  contentDiv.append(userInfoDiv, textContentDiv);
  container.append(headerInfo, contentDiv);

  const ideaBox = {
    open() {
      contentDiv.classList.add("opened");

      setTimeout(() => {
        userInfoDiv.classList.add("disapeared");
        headerInfo.classList.add("apeared");
      }, 200);
    },
    init() {}
  };

  ideaBox.init();
  return ideaBox;
}
