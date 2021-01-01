/**
 * @typedef {{
 * fullName?: string,
 * date?: Date,
 * profilePic?: string
 * }} UserInfoElementOptions
 */

import "./style.css";

/**
 *
 * @param {HTMLDivElement} container
 * @param {UserInfoElementOptions} options
 */
export default function (container, options) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("user-info-wrapper", "small");

  const userPic = document.createElement("img");
  userPic.classList.add("user-info-pic", "small");

  /** Including full name and another arbitrary info */
  const infoContainer = document.createElement("div");
  infoContainer.classList.add("user-info-container", "small");

  infoContainer.innerHTML = `
    <span class="txt-fullname"> Afshin Hoseini </span>
    <span class="txt-date"> 9h </span>
  `;

  wrapper.append(userPic, infoContainer);
  container.appendChild(wrapper);

  userPic.src = options.profilePic;

  const userInfo = {
    currentSize: "small",
    /**
     * @param {"small"|"large"} size
     */
    setSize(size) {
      if (size === this.currentSize) return;
      [wrapper, userPic, infoContainer].forEach((e) =>
        e.classList.replace(this.currentSize, size)
      );
    }
  };

  return userInfo;
}
