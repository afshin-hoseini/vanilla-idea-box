import "./ideaBox.css";
import UserInfo from "./userInfo/index";
import { createBorderPath } from "./ideaBoxBorderGenerator";

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
  const bkg = createContentBkg(container);
  const userInfoDiv = document.createElement("div");
  const textContentDiv = document.createElement("div");

  userInfoDiv.classList.add("ib-user-info");
  textContentDiv.classList.add("ib-text");

  container.append(userInfoDiv, textContentDiv);

  const closeBtn = makeCloseButton();
  const userInfo = UserInfo(userInfoDiv, { size: "large", ...ideaData });
  // createBorderPath(1, 800, 543.64)

  const ideaBox = {
    open() {
      // contentDiv.classList.add("opened");

      bkg.setState("opened");
      userInfoDiv.classList.add("opened");
      userInfo.setSize("large");
      setTimeout(() => {}, 600);
    },
    init() {}
  };

  ideaBox.init();
  return ideaBox;
}

function makeCloseButton() {
  const closebtn = document.createElement("button");
  closebtn.classList.add("ib-close-btn");
  closebtn.innerText = "Close";
  return closebtn;
}

/**
 *
 * @param {HTMLDivElement} container
 */
function createContentBkg(container) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add("ib-content-bkg");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.id = "p1";

  svg.appendChild(path);

  container.appendChild(svg);

  const bkg = {
    /**
     * @param {"opened"|"closed"} state
     */
    setState(state) {
      if (state === "opened") {
        svg.classList.add("opened");
        svg.setAttribute("viewBox", "-1 -1 801 541");
        path.setAttribute("d", createBorderPath(1, 799, 539, 100, state));

        path.classList.add("loading");
        setTimeout(() => {
          path.onanimationend = () => {
            console.log("===> FINISHED");
            document.querySelector("#grad-stop").classList.add("animate");
          };
          path.onanimationiteration = () => {
            console.log("===> Iteration");
            path.classList.replace("loading", "finished");
          };
        }, 4000);
      } else {
        svg.classList.remove("opened");
        path.setAttribute("d", createBorderPath(1, 300, 270, 70, state));
      }
    },
    init() {
      this.setState("closed");
    }
  };

  bkg.init();
  return bkg;
}
