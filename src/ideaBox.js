import "./ideaBox.css";
import UserInfo from "./userInfo/index";

const ideaData = {
  fullName: "Afshin Hoseini",
  profilePic:
    "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png"
};
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

  headerInfo.classList.add("ib-header-info");

  contentDiv.append(userInfoDiv, textContentDiv);
  container.append(headerInfo, contentDiv);

  const closeBtn = (function () {
    const closebtn = document.createElement("button");
    closebtn.classList.add("ib-close-btn");
    closebtn.innerText = "Close";
    return closebtn;
  })();

  UserInfo(userInfoDiv, { size: "small", ...ideaData });
  createContentClipSvg();

  const ideaBox = {
    open() {
      contentDiv.classList.add("opened");

      UserInfo(headerInfo, { size: "large", ...ideaData });
      headerInfo.appendChild(closeBtn);

      setTimeout(() => {
        userInfoDiv.classList.add("disapeared");
        headerInfo.classList.add("apeared");
      }, 600);
    },
    init() {}
  };

  ideaBox.init();
  return ideaBox;
}

function createContentClipSvg() {
  document.body.appendChild(
    (function () {
      const svg = document.createElement("svg");
      svg.setAttribute("width", "0");
      svg.setAttribute("height", "0");
      svg.id = "ib-content-svg";
      svg.innerHTML = `
      <defs>
        <clipPath id="ib-content-clip">
          <circle cx="100" cy="100" r="40" />
          <circle cx="60" cy="60" r="40" />
        </clipPath>
      </defs>
    `;

      return svg;
    })()
  );
}
