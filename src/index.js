import ideaBoxContainer from "./ideaBoxContainer";

const cells = document.querySelectorAll(".cell");
const gridContainer = document.getElementById("ideas-container");

cells.forEach((cell) => {
  ideaBoxContainer(cell, gridContainer);
});
