/**
 * @typedef {{
 * size:"small"|"large",
 * fullName?: string,
 * date?: Date,
 * profilePic?: string
 * }} UserInfoElementOptions
 */

"use strict";
import "./style.css";

/**
 *
 * @param {HTMLDivElement} container
 * @param {UserInfoElementOptions} options
 */
export default function (container, options = "small") {
  const wrapper = document.createElement("div");
  wrapper.classList.add("user-info-wrapper", options.size);

  const userPic = document.createElement("img");
  userPic.classList.add("user-info-pic", options.size);

  /** Including full name and another arbitrary info */
  const infoContainer = document.createElement("div");
  infoContainer.classList.add("user-info-container", options.size);

  infoContainer.innerHTML = `
    <span class="txt-fullname"> Afshin Hoseini </span>
    <span class="txt-date"> 9h </span>
  `;

  wrapper.append(userPic, infoContainer);
  container.appendChild(wrapper);

  userPic.src = options.profilePic;
}
